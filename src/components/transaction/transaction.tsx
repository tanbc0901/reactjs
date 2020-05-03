import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { fetchData } from '../../data-source/fetch-data';
import { Transaction } from '../../models/transaction';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

export function TransactionData() {
    const columns = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Requested Date',
            dataIndex: 'requestedDate',
            key: 'requestedDate',
            render: (date: string) => (
                moment(date).format("DD-MM-YYYY")
            )
        },
        {
            title: 'Updated Date',
            key: 'updatedDate',
            dataIndex: 'updatedDate',
            render: (date: string) => (
                moment(date).format("DD-MM-YYYY")
            )
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status'
        },
        {
            key: 'id',
            dataIndex: 'Open',
            render: (_: any, item: { id: any; }) => {
                return (
                  <Button type='primary' onClick={() => viewDetails(item.id)}>
                    Open
                  </Button>
                );
            }
        }
    ];

    const history = useHistory();

    function viewDetails(id: any) {
        history.push('/transaction-detail/' + id);
    }

    const [data, setTransaction] = useState<Transaction[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const data = await fetchData('http://localhost:3000/transactions');
                setTransaction(data);
            } catch (e) {
                setTransaction([]);
            }
        })();
    }, []);

    return (
        <Table columns={columns} dataSource={data} />
    );
}