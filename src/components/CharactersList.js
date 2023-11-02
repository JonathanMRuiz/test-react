import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_CHARACTERS, ADD_CHARACTER } from "../graphql/queries";

function CharactersList() {
  const [newCharacterName, setNewCharacterName] = useState("");
  const [newCharacterSpecies, setNewCharacterSpecies] = useState("");
  const [newCharacterStatus, setNewCharacterStatus] = useState("");
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  const [addCharacter] = useMutation(ADD_CHARACTER, {
    update(cache, { data: { createCharacter } }) {
      // Actualiza la caché después de agregar un personaje
      cache.modify({
        fields: {
          characters(existingCharacters = []) {
            const newCharacterRef = cache.writeFragment({
              data: createCharacter.character,
              fragment: gql`
                fragment NewCharacter on Character {
                  id
                  name
                  species
                  status
                }
              `,
            });
            return [newCharacterRef, ...existingCharacters];
          },
        },
      });
    },
  });

  const handleAddCharacter = async () => {
    try {
      addCharacter({
        variables: {
          name: newCharacterName,
          species: newCharacterSpecies,
          status: newCharacterStatus,
        },
      });

      setNewCharacterName("");
      setNewCharacterSpecies("");
      setNewCharacterStatus("");
    } catch (error) {
      console.error("Error al agregar el personaje:", error);
      console.error("Mensaje de error:", error.message);
    }
    setNewCharacterName("");
    setNewCharacterSpecies("");
    setNewCharacterStatus("");
  };

  if (loading) {
    return <p>Cargando personajes...</p>;
  }

  if (error) {
    return <p>Error al cargar personajes: {error.message}</p>;
  }

  const characters = data.characters.results;

  return (
    <div>
      <h2>Lista de Personajes de Rick and Morty</h2>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <strong>{character.name}</strong> - {character.species},{" "}
            {character.status}
          </li>
        ))}
      </ul>
      <h3>Agregar nuevo personaje</h3>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={newCharacterName}
          onChange={(e) => setNewCharacterName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Especie"
          value={newCharacterSpecies}
          onChange={(e) => setNewCharacterSpecies(e.target.value)}
        />

        <input
          type="text"
          placeholder="Estado"
          value={newCharacterStatus}
          onChange={(e) => setNewCharacterStatus(e.target.value)}
        />

        <button onClick={handleAddCharacter}>Agregar</button>
      </div>
    </div>
  );
}

export default CharactersList;
