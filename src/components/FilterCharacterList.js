import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_FILTERED_CHARACTERS } from "../graphql/queries";

const FilterCharacterList = () => {
  const [status, setStatus] = useState(""); // Estado inicial
  const [orderBy, setOrderBy] = useState("name"); // Campo de orden inicial

  const { loading, error, data } = useQuery(GET_FILTERED_CHARACTERS, {
    variables: { status, orderBy },
  });

  console.log(GET_FILTERED_CHARACTERS);

  if (loading) {
    return <p>Cargando personajes...</p>;
  }

  if (error) {
    console.error("Error al cargar personajes:", error);
    console.error("Detalles del error:", error.message);
    return <p>Error al cargar personajes: {error.message}</p>;
    // Puedes mostrar un mensaje de error en tu interfaz de usuario aquí
  }

  const characters = data.characters.results;

  return (
    <div>
      <h2>Lista de Personajes de Rick and Morty (Filtrado y Ordenado)</h2>
      <div>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Todos</option>
          <option value="Alive">Vivo</option>
          <option value="Dead">Muerto</option>
        </select>

        <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
          <option value="name">Nombre</option>
          <option value="status">Estado</option>
          <option value="species">Especie</option>
        </select>
      </div>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <strong>{character.name}</strong> - {character.status},{" "}
            {character.species}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterCharacterList;
