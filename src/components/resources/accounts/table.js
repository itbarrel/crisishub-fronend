import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAccountsList } from '../../../store/slices/resources/account'

import { Table } from "antd";

const Accounts = memo((props) => {
    const { list } = useSelector(({ resources }) => resources.Account)

    const dispatch = useDispatch();

    const columns = [
        {
            title: "Name*",
            dataIndex: "name",
            key: "name",
            width: 120,
            render: (text) => <span className="gx-link">{text}</span>,
        },
        {
            title: "Domain Name*",
            dataIndex: "tenant_name",
            key: "tenant_name",
            width: 120,
        },
        {
            title: "Active",
            dataIndex: "active",
            key: "active",
            width: 120,
            render: (text) => <span className="gx-link">{(text) ? 'Yes' : 'No'}</span>,
        }
    ];

    // const expandedRowRender = (record) => <p>{record.description}</p>;
    // const title = () => "Here is title";
    const showHeader = true;
    // const footer = () => "Here is footer";
    const scroll = { y: 240 };
    const pagination = { position: "bottom" };

    const [tableSetting, setTableSetting] = useState({
        bordered: true,
        loading: false,
        pagination,
        size: "default",
        expandedRowRender: false,
        title: undefined,
        showHeader,
        footer: false,
        rowSelection: false,
        scroll: undefined,
        rowKey: 'id'
    });

    useEffect(() => {
        dispatch(getAccountsList())
    }, [])

    return (
        <>
            <Table className="gx-table-responsive" {...tableSetting} columns={columns} dataSource={list} />
        </>
    );
});

Accounts.displayName = Accounts;
export default Accounts;
