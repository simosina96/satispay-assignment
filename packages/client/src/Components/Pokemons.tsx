import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { LOAD_POKEMONS } from '../GraphQL/Queries'

export default function Pokemons() {
    const { error, loading, data } = useQuery(LOAD_POKEMONS)

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <div>
        </div>
    )
}
