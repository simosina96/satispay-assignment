import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../GraphQL/Queries';
import { Table } from 'antd';
import { Button } from 'antd';

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

    const { data, error, loading, fetchMore } = useQuery(GET_POKEMONS, {
        variables: { after: '' },
        notifyOnNetworkStatusChange: true,
    })

    if (error) {
        console.log(error.message);
        return <div>An error occurred</div>
    }

    const hasNextPage = data?.pokemons.pageInfo.hasNextPage;

    return (
        <div style={{ width: '60%' }}>
            <p>Count - <span>{data?.pokemons.edges.length}</span></p>
            <Table bordered={true} loading={loading} showHeader={true} pagination={false}
                dataSource={
                    data?.pokemons.edges.length > 0 ?
                        data?.pokemons.edges.map((edge: any) => {
                            return {
                                key: edge.node.id,
                                name: edge.node.name,
                                classification: edge.node.classification,
                                types: edge.node.types.join(', '),
                            };
                        })
                        : undefined}
                columns={columns} />

            {hasNextPage && (
                <Button type="primary"
                    onClick={() => {
                        fetchMore({
                            variables: {
                                after: data.pokemons.pageInfo.endCursor,
                            }
                        })
                    }
                    }
                >Fetch more</Button>
            )}

        </div>


    )
}
