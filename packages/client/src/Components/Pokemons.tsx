import { useLazyQuery } from '@apollo/client';
import { GET_POKEMONS } from '../GraphQL/Queries';
import { Table } from 'antd';
import { Button, Input, Select } from 'antd';
import { useState, useEffect } from 'react';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

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

const types = [
    {
        value: 'grass',
        name: 'Grass',
    },
    {
        value: 'poison',
        name: 'Poison',
    },
    {
        value: 'fire',
        name: 'Fire',
    },
    {
        value: 'flying',
        name: 'Flying',
    },
    {
        value: 'water',
        name: 'Water',
    },
    {
        value: 'bug',
        name: 'Bug',
    },
    {
        value: 'normal',
        name: 'Normal',
    },
    {
        value: 'electric',
        name: 'Electric',
    },
    {
        value: 'ground',
        name: 'Ground',
    },
    {
        value: 'fairy',
        name: 'Fairy',
    },
    {
        value: 'fighting',
        name: 'Fighting',
    },
    {
        value: 'psychic',
        name: 'Psychic',
    },
    {
        value: 'rock',
        name: 'Rock',
    },
    {
        value: 'steel',
        name: 'Steel',
    },
    {
        value: 'ice',
        name: 'Ice',
    },
    {
        value: 'ghost',
        name: 'Ghost',
    },
    {
        value: 'dragon',
        name: 'Dragon',
    }
]

export default function Pokemons() {

    const [dataSource, setDataSource] = useState();
    const [query, setQuery] = useState("");
    const [type, setType] = useState(undefined);

    const [getPokemons, { data, error, loading, fetchMore }] = useLazyQuery(GET_POKEMONS, {
        variables: { after: '', query: '', type: '' },
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        getPokemons();
    }, [getPokemons]);

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
            );
        }
    }, [data])

    if (error) {
        return <div>An error occurred...</div>
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    }

    function onSelectionChange(value: any) {
        setType(value);
    }

    const hasNextPage = data?.pokemons.pageInfo.hasNextPage;

    return (
        <div style={{ width: '50%' }}>

            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', paddingTop: '16px', paddingBottom: '16px', gap: '8px' }}>
                <Input placeholder="Search Pokèmons" allowClear onChange={onInputChange} value={query} style={{ minWidth: '160px', flex: 1 }} />

                <Select
                    style={{ minWidth: '160px', textAlign: 'left', flex: 1 }}
                    placeholder="Type"
                    optionFilterProp="children"
                    onChange={onSelectionChange}
                    allowClear
                    showSearch
                    value={type}
                    filterOption={(input, option) =>
                        option?.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {types.map(
                        (type) => {
                            return <Option key={type.value} value={type.value}>{type.name}</Option>
                        }
                    )}
                </Select>

                <Button
                    style={{ width: '150px' }}
                    type="primary"
                    icon={<SearchOutlined />}
                    disabled={!query && !type}
                    onClick={() => {
                        getPokemons({ variables: { after: '', query: query, type: type || '' } });
                    }}
                >Search</Button>

                <Button
                    style={{ width: '150px' }}
                    type="primary" danger
                    icon={<CloseOutlined />}
                    onClick={() => {
                        setQuery("");
                        setType(undefined);
                        getPokemons({ variables: { after: '', query: '', type: '' } });
                    }}
                >Reset</Button>
            </div>

            {/* <p>{data?.pokemons.edges.length} Pokèmons fetched.</span></p> */}
            <Table bordered={true} loading={loading} showHeader={true} pagination={false} dataSource={dataSource} columns={columns}
                style={{ marginBottom: "16px" }} />

            {hasNextPage && (
                <Button type="link" style={{ width: '100%', marginBottom: "16px" }}
                    onClick={() => {
                        fetchMore({
                            variables: { after: data.pokemons.pageInfo.endCursor, }
                        })
                    }}
                >See more</Button>
            )}

        </div>


    )
}
