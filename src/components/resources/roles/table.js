import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRolesList, getPermissionEntities } from '../../../store/slices/resources/role'
import { Table, Button, Popconfirm } from "antd";
import { log } from '../../../utils/console-log'
import { removeRole, current_item } from '../../../store/slices/resources/role'
import UpdateRoleModal from './modal'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Role = memo((props) => {

    const dispatch = useDispatch();
    const { records } = useSelector(({ resources }) => resources.Role)
    const loader = useSelector(({ resources }) => resources.User.loading)
    const [loading, setLoading] = useState(loader)
    const [role, setRole] = useState({})
    const [visible, setVisible] = useState(false);

    const handleDelete = (key) => {
        log('handleDelete User', key)
        dispatch(removeRole(key))
    };

    const handleUpdate = (role) => {
        log('handleUpdate role', role)
        setVisible(true)
        dispatch(current_item(role))
        setRole(role);
    };

    const columns = [
        {
            title: "Name*",
            dataIndex: "name",
            key: "name",
            width: 120,
        },
        {
            title: "Permanent*",
            dataIndex: "default",
            key: "default",
            width: 120,
            render: (text) => <span className="gx-link">{(text == true) ? "Yes" : "No"}</span>,
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
            width: 80,
            render: (text, record) => (
                <>
                    <Button size="large" icon={<EditOutlined />} onClick={() => handleUpdate(record)} />
                    <Popconfirm title="Are you sure delete this Role?" okText="Yes" cancelText="No" onConfirm={() => handleDelete(record.id)}>
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
        dispatch(getRolesList())
        dispatch(getPermissionEntities())
    }, [])

    return (
        <>
            <UpdateRoleModal onShow={visible} record={role} title={'Update User'} off />
            <Table className="gx-table-responsive" {...tableSetting} columns={columns} dataSource={records} />
        </>
    );
});

Role.displayName = Role;
export default Role;
