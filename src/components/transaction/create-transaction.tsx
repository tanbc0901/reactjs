import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { Transaction } from '../../models/transaction';
import { fetchData } from '../../data-source/fetch-data';
import { useHistory } from 'react-router-dom';

export default function CreateTransaction(props: any) {
    const [saveState, setSaveState] = useState<{ body: string; } | null>(null);

    const history = useHistory();

    useEffect(() => {
        (async () => {
            if (!saveState) {
                return;
            }
            try {
                const data = await fetchData('http://localhost:3000/transactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: saveState.body,
                });
                if (data) {
                    history.push('/');
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [saveState]);

    function onBack() {
        history.push('/');
    };

    function onFinish(args: any) {
        var transaction = {
            ...args,
            requestedDate: new Date(args.requestedDate).getTime(),
            updatedDate: new Date(args.updatedDate).getTime(),
        }
        setSaveState({
            body: JSON.stringify(transaction),
        });
    }

    function onFinishFailed(...args: any) {
        console.log(args);
    }

    const defaultTransaction = {
        status: 'Active'
    }

    return (
        <div>
            <h3 className='transaction-title'>Create new transaction</h3>
            <FormEdit initialValues={defaultTransaction as Transaction} onFinish={onFinish} onFinishFailed={onFinishFailed} onBack={onBack} />
        </div>);
}


interface FormEditProps {
    initialValues: Transaction;
    onFinish: (formValue: any) => void;
    onFinishFailed: (error: any) => void;
    onBack: () => void;
}

export function FormEdit(props: FormEditProps) {
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 14,
        },
    }

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };


    function onBack() {
        props.onBack();
    }

    return (
        <Form
            {...layout}
            name='basic'
            form={form}
            initialValues={props.initialValues}
            onFinish={props.onFinish}
            onFinishFailed={props.onFinishFailed}
        >
            <Form.Item
                label='Subject'
                name='subject'
                rules={[{ required: true, message: 'Please input the subject' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item label='RequestedDate' name='requestedDate'
                rules={[{ required: true, message: 'Please input the Requested Date' }]}>
                <DatePicker />
            </Form.Item>

            <Form.Item label='Updated Update' name='updatedDate'
                rules={[{ required: true, message: 'Please input the Updated Update' }]}>
                <DatePicker />
            </Form.Item>

            <Form.Item label="Status" name="status">
                <Select>
                    <Select.Option value="active">Active</Select.Option>
                    <Select.Option value="resolved">Resolved</Select.Option>
                    <Select.Option value="inprogress">InProgress</Select.Option>
                    <Select.Option value="cancelled">Cancelled</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label='Description' name='description'>
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>

                <Button type='primary' htmlType='button' onClick={onBack}>
                    Back
                </Button>
            </Form.Item>
        </Form>
    );
}