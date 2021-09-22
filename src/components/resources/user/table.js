import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from '../../../store/slices/resources/user'
import { Table, Button, Popconfirm } from "antd";
import { log } from '../../../utils/console-log'
import { removeUser, current_item } from '../../../store/slices/resources/user'
import UpdateUser from './form-model'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const Accounts = memo((props) => {

    const dispatch = useDispatch();
    const { list } = useSelector(({ resources }) => resources.User)
    const loader = useSelector(({ resources }) => resources.User.loading)
    const [loading, setLoading] = useState(loader)
    const [selectedUser, setSelectedUser] = useState({})
    const [visible, setVisible] = useState(false);

    const handleDelete = (key) => {
        log('handleDelete User', key)
        dispatch(removeUser(key))
    };

    const handleUpdate = (Current_user) => {
        log('handleUpdate User', Current_user)
        setVisible(true)
        dispatch(current_item(Current_user))
        setSelectedUser(Current_user);
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
                    <Button size="large" icon={<EditOutlined />}  onClick={() => handleUpdate(record)} />
                    <Popconfirm title="Are you sure delete this User?" okText="Yes" cancelText="No" onConfirm={() => handleDelete(record.id)}>
                        <Button size="default" icon={<DeleteOutlined />}/>
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
            <UpdateUser onShow={visible} selectedUser={selectedUser} title={'Update User'} off/>
            <Table className="gx-table-responsive" {...tableSetting} columns={columns} dataSource={list} />
        </>
    );
});

Accounts.displayName = Accounts;
export default Accounts;