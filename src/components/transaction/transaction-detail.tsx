import React, { useState, useEffect } from 'react'
import { fetchData } from '../../data-source/fetch-data';
import { Transaction } from '../../models/transaction';
import { Button, Form } from 'antd';
import { useHistory } from 'react-router-dom';

export default function TransactionDetail(props: any) {

  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const history = useHistory();

  function backHome() {
    history.goBack();
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData('http://localhost:3000/transactions/' + props.match.params.id);
        setTransaction(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <>
      <div>
        <Form {...formItemLayout}>
          <Form.Item label="Id">
            <span className="ant-form-text">{transaction?.id}</span>
          </Form.Item>
          <Form.Item label="Subject">
            <span className="ant-form-text">{transaction?.subject}</span>
          </Form.Item>
          <Form.Item label="Requested Date">
            <span className="ant-form-text">{transaction?.requestedDate}</span>
          </Form.Item>
          <Form.Item label="Updated Date">
            <span className="ant-form-text">{transaction?.updatedDate}</span>
          </Form.Item>
          <Form.Item label="Status">
            <span className="ant-form-text">{transaction?.status}</span>
          </Form.Item>
        </Form>

        <Button type='primary' onClick={backHome}>
          Back
        </Button>
      </div>
    </>
  );
}