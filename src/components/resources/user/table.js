import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from '../../../store/slices/resources/user'
import { getRolesList } from '../../../store/slices/resources/role'
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
    const [sort, setSort] = useState({});
    sort ||= {};
    const handleSortChange = (pagination, filters, sorter) => {
        console.log("Various parameters", pagination, filters, sorter);
        setSort(sorter);
    };


    const handleDelete = (Current_user) => {
        log('handleDelete User', Current_user.key)
        dispatch(current_item(Current_user))
        dispatch(removeUser(Current_user.id))
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
            sorter: (a, b) => a.firstName.localeCompare(b.nafirstNameme),
            sortOrder: sort.columnKey === "firstName" && sort.order,
            ellipsis: true,
        },
        {
            title: "Email*",
            dataIndex: "email",
            key: "email",
            width: 120,
            sorter: (a, b) => a.email.localeCompare(b.email),
            sortOrder: sort.columnKey === "email" && sort.order,
            ellipsis: true,
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
                    <Button size="large" icon={<EditOutlined />} onClick={() => handleUpdate(record)} />
                    <Popconfirm title="Are you sure delete this User?" okText="Yes" cancelText="No" onConfirm={() => handleDelete(record)}>
                        <Button size="default" icon={<DeleteOutlined />} />
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
        dispatch(getRolesList())
    }, [])

    return (
        <>
            <UpdateUser visible={visible} setVisible={setVisible} selectedUser={selectedUser} title={'Update User'} off />
            <Table className="gx-table-responsive" {...tableSetting} onChange={handleSortChange} columns={columns} dataSource={list} />
        </>
    );
});

Accounts.displayName = Accounts;
export default Accounts;
