import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRolesList, getPermissionEntities, removeRole, setId, setRecord } from "../../../store/slices/resources/role";
import { Table, Button, Popconfirm } from "antd";
import { log } from "../../../utils/console-log";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Role = memo(({ setVisible, setTitle }) => {
    const dispatch = useDispatch();
    const { records, loading: loader, record: loginRole } = useSelector(({ resources }) => resources.Role);
    const [loading, setLoading] = useState(loader);
    const [sort, setSort] = useState({});

    const handleSortChange = (pagination, filters, sorter) => {
        console.log("Various parameters", pagination, filters, sorter);
        setSort(sorter);
    };

    const handleDelete = (id) => {
        log("handleDelete Role", id);
        dispatch(setId(id));
        dispatch(removeRole(id));
    };

    const handleEdit = (roleObj) => {
        log("handleUpdate role", roleObj);
        if (!roleObj.id) { return; }
        setTitle("Update Role");
        dispatch(setId(roleObj.id));
        dispatch(setRecord(roleObj));
        setVisible(true);
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
            render: (text) => <span className="gx-link">{text == true ? "Yes" : "No"}</span>,
        },
        {
            title: "Status",
            dataIndex: "active",
            key: "active",
            width: 120,
            render: (text) => <span className="gx-link">{text ? "Yes" : "No"}</span>,
        },
        {
            title: "Action",
            key: "action",
            width: 80,
            render: (text, record, index) => (
                <>
                    {loginRole.id !== record.id && <Button size="large" icon={<EditOutlined />} onClick={() => handleEdit(record)} />}
                    {!record.default && (
                        <Popconfirm
                            title="Are you sure delete this Role?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleDelete(record.id)}
                        >
                            <Button size="default" icon={<DeleteOutlined />} />
                        </Popconfirm>
                    )}
                </>
            ),
        },
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
        rowKey: "id",
    });

    useEffect(() => {
        dispatch(getRolesList());
        dispatch(getPermissionEntities());
    }, []);

    return (
        <>
            <Table
                className="gx-table-responsive"
                {...tableSetting}
                onChange={handleSortChange}
                columns={columns}
                dataSource={records}
            />
        </>
    );
});

Role.displayName = Role;
export default Role;
