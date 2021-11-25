import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../GraphQL/Queries';
import { Table } from 'antd';
import { Button } from 'antd';
import { useState, useEffect } from 'react';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Types',
        dataIndex: 'types',
        key: 'types',
    },
    {
        title: 'Classification',
        dataIndex: 'classification',
        key: 'classification',
    },
];

export default function Pokemons() {

    const [dataSource, setDataSource] = useState()

    const { data, error, loading, fetchMore } = useQuery(GET_POKEMONS, {
        variables: { after: '' },
        notifyOnNetworkStatusChange: true,
    })

    useEffect(() => {
        if (data) {
            setDataSource(
                data.pokemons.edges.map((edge: any) => {
                    return {
                        key: edge.node.id,
                        name: edge.node.name,
                        classification: edge.node.classification,
                        types: edge.node.types.join(', '),
                    };
                })
            )
        }
    }, [data])

    if (error) {
        console.log(error.message);
        return <div>An error occurred</div>
    }

    const hasNextPage = data?.pokemons.pageInfo.hasNextPage;

    return (
        <div style={{ width: '70%' }}>
            {/* <p>{data?.pokemons.edges.length} Pokèmons fetched.</span></p> */}
            <Table bordered={true} loading={loading} showHeader={true} pagination={false} dataSource={dataSource} columns={columns} />

            {hasNextPage && (
                <Button type="primary"
                    onClick={() => {
                        fetchMore({
                            variables: { after: data.pokemons.pageInfo.endCursor, }
                        })
                    }}
                >Fetch more</Button>
            )}

        </div>


    )
}
