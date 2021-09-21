import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from '../../../store/slices/resources/user'
import { Table, Divider, Button, Space, Popconfirm } from "antd";
import { log } from '../../../utils/console-log'
import { removeUser, remove } from '../../../store/slices/resources/user'
import UpdateData from '../user/model'

const Accounts = memo((props) => {

    const dispatch = useDispatch();
    const { list } = useSelector(({ resources }) => resources.User)
    const loader = useSelector(({ resources }) => resources.User.loading)
    const [loading, setLoading] = useState(loader)
    const [selectedUser, setSelectedUser] = useState([])
    const onSelectChange = selectedRowKeys => {
        log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedUser(selectedRowKeys);
    };
    const rowSelection = {
        selectedUser,
        onChange: onSelectChange,
    };

    const handleDelete = (key) => {
        log('handleDelete User', key)
        dispatch(removeUser(key))
        // dispatch(remove())
    };

    const handleUpdate = (user) => {
        log('handleUpdate User', user)
    };


    const columns = [
        {
            title: "Name*",
            dataIndex: "firstName",
            key: "firstName",
            width: 120,
        },
        {
            title: "Email*",
            dataIndex: "email",
            key: "email",
            width: 120,
        },
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
            width: 120,
            render: (text) => <span className="gx-link">{text}</span>,
        },
        {
            title: "Status",
            dataIndex: "active",
            key: "active",
            width: 120,
            render: (text) => <span className="gx-link">{(text) ? 'Yes' : 'No'}</span>,
        }, {
            title: 'Action',
            key: 'action',
            width: 360,
            render: (text, record) => (
                <>
                    <Button type="primary" size="small" style={{ width: 60, marginTop: 10 }} onClick={() => handleUpdate(record)}>
                        Update
                    </Button>
                    <Popconfirm title="Are you sure delete this User?" okText="Yes" cancelText="No" onConfirm={() => handleDelete(record.id)}>
                        <Button type="primary" size="small" style={{ width: 60, marginTop: 10 }}>
                            Delete
                        </Button>
                    </Popconfirm>
                </>
            ),
        }

    ];

    const showHeader = true;
    const pagination = { position: "bottom" };
    const [tableSetting, setTableSetting] = useState({
        bordered: true,
        loading: loading,
        pagination,
        size: "small",
        expandedRowRender: false,
        title: undefined,
        showHeader,
        footer: false,
        scroll: undefined,
        rowKey: 'id'
    });

    useEffect(() => {
        dispatch(getUserList())
    }, [])

    return (
        <>
            <Table className="gx-table-responsive" {...tableSetting} columns={columns} dataSource={list} />
        </>
    );
});

Accounts.displayName = Accounts;
export default Accounts;
