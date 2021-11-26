import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
query pokemons($after:ID!, $query:String, $type:String) {
    pokemons(type:$type, q:$query, after:$after, limit:10) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
            id
            name
            classification
            types
        }
      }
    }
  }
`

/*
export const GET_POKEMONS_BY_TYPE = gql`
query pokemonsByType($after:ID!, $query:String, $type:String) {
    pokemonsByType(type:$type, q:$query, after:$after, limit:10) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
            id
            name
            classification
            types
        }
      }
    }
  }
`
*/