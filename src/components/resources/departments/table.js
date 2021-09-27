import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsList, removeDepartment, current_item } from '../../../store/slices/resources/departments'
import { Table, Button, Popconfirm } from "antd";
import { log } from '../../../utils/console-log'
import UpdateDepartment from './form-model'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';



const Accounts = memo((props) => {

    const dispatch = useDispatch();
    const departmentList = useSelector(({ resources }) => resources.Departments.list);
    const loader = useSelector(({ resources }) => resources.Departments.loading)
    const [loading, setLoading] = useState(loader)
    const [selectedDepartment, setSelectedDepartment] = useState({})
    const [visible, setVisible] = useState(false);

    const handleDelete = (Current_user) => {
        log('handleDelete department', Current_user.id)
        dispatch(removeDepartment(Current_user.id))
        dispatch(current_item(Current_user))
    };

    const handleUpdate = (Current_user) => {
        log('handleUpdate Department', Current_user)
        setVisible(true)
        setSelectedDepartment(Current_user);
    };

    const columns = [
        {
            title: "Name*",
            dataIndex: "name",
            key: "name",
            width: 120,
        },
        {
            title: "Status",
            dataIndex: "active",
            key: "active",
            width: 120,
            render: (text) => <span className="gx-link">{(text) ? 'Yes' : 'No'}</span>,
        }, {
            title: 'Action',
            dataIndex: "Action",
            key: 'Action',
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
        dispatch(getDepartmentsList())
    }, [])

    return (
        <>
            <UpdateDepartment onShow={visible} selected={selectedDepartment} title={'Update Department'} off />
            <Table className="gx-table-responsive" {...tableSetting} columns={columns} dataSource={departmentList} />
        </>
    );
});

Accounts.displayName = Accounts;
export default Accounts;
