import { useLazyQuery } from '@apollo/client';
import { GET_POKEMONS, GET_POKEMONS_BY_TYPE } from '../GraphQL/Queries';
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

export default function Pokemons() {

    const [dataSource, setDataSource] = useState();
    const [query, setQuery] = useState("");
    const [type, setType] = useState(undefined);

    const [getPokemons, { data, error, loading, fetchMore }] = useLazyQuery(GET_POKEMONS, {
        variables: { after: '', query: '' },
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
        return <div>An error occurred</div>
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    }

    function onSelectionChange(value: any) {
        setType(value);
    }

    function submit() {
        if (type) {
            // search using "pokemonsByType" query

            // TODO

        } else {
            // search using "pokemons" query
            getPokemons({ variables: { after: '', query: query } });
        }
    }

    const hasNextPage = data?.pokemons.pageInfo.hasNextPage;

    return (
        <div style={{ width: '70%' }}>

            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '16px', paddingBottom: '16px', gap: '8px' }}>
                <Input placeholder="Search Pokèmons" allowClear onChange={onInputChange} value={query} />

                <Select
                    style={{ width: '400px', textAlign: 'left' }}
                    clearIcon={true}
                    placeholder="Type"
                    optionFilterProp="children"
                    onChange={onSelectionChange}
                    value={type}
                    filterOption={(input, option) =>
                        option?.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>

                <Button
                    style={{ width: '150px' }}
                    type="primary"
                    icon={<SearchOutlined />}
                    disabled={!query && !type}
                    onClick={submit}
                >Search</Button>

                <Button
                    style={{ width: '150px' }}
                    type="primary" danger
                    icon={<CloseOutlined />}
                    onClick={() => {
                        setQuery("");
                        setType(undefined);
                        getPokemons({ variables: { after: '', query: '' } });
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
