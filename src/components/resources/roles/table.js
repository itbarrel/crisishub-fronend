import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRolesList, getPermissionEntities } from '../../../store/slices/resources/role'
import { Table, Button, Popconfirm } from "antd";
import { log } from '../../../utils/console-log'
import { removeRole, setId, setRecord } from '../../../store/slices/resources/role'
import UpdateRoleModal from './modal'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Role = memo(({ setVisible, setTitle }) => {
    const dispatch = useDispatch();
    const { records, loading: loader } = useSelector(({ resources }) => resources.Role)
    const [loading, setLoading] = useState(loader)
    const [role, setRole] = useState({})
    const [visible, setVisible] = useState(false);
    const [sort, setSort] = useState({});
    sort ||= {};

	const handleSortChange = (pagination, filters, sorter) => {
		console.log("Various parameters", pagination, filters, sorter);
		setSort(sorter);
	};

    const handleDelete = (id) => {
        log('handleDelete Role', id)
        dispatch(setId(id))
        dispatch(removeRole(id))
    };

    const handleEdit = (roleObj) => {
        log('handleUpdate role', roleObj)
        if (!roleObj.id) return
        setTitle('Update Role')
        dispatch(setId(roleObj.id))
        dispatch(setRecord(roleObj))
        setVisible(true)
    };

    const columns = [
        {
            title: "Name*",
            dataIndex: "name",
            key: "name",
            width: 120,
            sorter: (a, b) => a.name.localeCompare(b.name),
			sortOrder: sort.columnKey === "name" && sort.order,
			ellipsis: true,
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
            render: (text, record, index) => (
                <>
                    <Button size="large" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    {!record.default &&
                        <Popconfirm title="Are you sure delete this Role?" okText="Yes" cancelText="No" onConfirm={() => handleDelete(record.id)}>
                            <Button size="default" icon={<DeleteOutlined />} />
                        </Popconfirm>
                    }
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
<<<<<<< HEAD
            <UpdateRoleModal onShow={visible} record={role} title={'Update User'} off />
            <Table className="gx-table-responsive" {...tableSetting} onChange={handleSortChange} columns={columns} dataSource={records} />
=======
            <Table className="gx-table-responsive" {...tableSetting} columns={columns} dataSource={records} />
>>>>>>> b7eddf4571270f6fa11816583ef434a6327dcc4b
        </>
    );
});

Role.displayName = Role;
export default Role;
