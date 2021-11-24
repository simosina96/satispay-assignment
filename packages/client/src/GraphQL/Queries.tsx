import { gql } from '@apollo/client'

export const LOAD_POKEMONS = gql`
    query {
        pokemons (after:"010") {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`