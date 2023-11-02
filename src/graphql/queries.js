import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        status
        species
      }
    }
  }
`;

export const ADD_CHARACTER = gql`
  mutation AddCharacter($name: String!, $species: String!, $status: String!) {
    createCharacter(
      input: { name: $name, species: $species, status: $status }
    ) {
      character {
        id
        name
        species
        status
      }
    }
  }
`;

export const GET_FILTERED_CHARACTERS = gql`
  query GetFilteredCharacters($status: String, $orderBy: String) {
    characters(filter: { status: $status }, orderBy: $orderBy) {
      results {
        id
        name
        status
        species
      }
    }
  }
`;
