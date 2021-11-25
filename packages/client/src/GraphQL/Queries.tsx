import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
query pokemons($after:ID!) {
    pokemons(after:$after, limit:10) {
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