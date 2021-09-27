import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRolesList, getPermissionEntities } from '../../../../store/slices/resources/role'
import { Table, Button, Popconfirm } from "antd";
import { log } from '../../../../utils/console-log'
// import { removeRole, current_item } from '../../../../store/slices/resources/role'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';

const PermissionTable = memo((props) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const { entities, operations } = useSelector(({ resources }) => resources.Role)
    // const records = [{ id: 123, Role: '123' }]

    const [columns, setColumns] = useState([])
    const [records, setRecords] = useState([])
    const [permissions, setPermissions] = useState({})
    const [userPermissions, setUserPermissions] = useState({})
    const [wow, setWow] = useState(false)

    const generateColumns = () => {
        const enteries = []
        let permissionObj = {}

        enteries.push({
            title: 'Permissions',
            dataIndex: 'permissions',
            key: 'permissions',
            width: 100,
            fixed: 'left',
            render: (text) => <span className="gx-link">{text}</span>,
        })

        entities.forEach(element => {
            permissions[element] ||= {}
            enteries.push({
                title: element,
                dataIndex: element,
                key: element,
                width: 500 / entities.length,
                render: (text, record, index) => <Checkbox onChange={() => onChange(event, element, record.key)} checked={wow} disabled={false} >{(wow) ? 'Y' : 'N'}</Checkbox>
            })
        });

        setColumns(enteries)
        return permissionObj
    };

    const generateRecords = (permissionObj) => {
        const enteries = []
        let entry = {}
        console.log('>>>>>>>>>>wtf>>>>>...', permissionObj)

        operations.forEach(operation => {
            entry = {}
            entry['key'] = operation
            entry['permissions'] = (operation === '*') ? 'All' : operation
            entities.forEach(entity => {
                permissions[entity][operation] ||= false
                // setPermissions(prevState => ({
                //     ...prevState, [entity]: {
                //         ...permissions[entity], [operation]: false
                //     }
                // }))

                // setPermissions({ ...permissions, [entity]: { ...permissions[entity], [operation]: false } })

                // permissions[entity][operation] ||= false
                // entry[entity] = <Checkbox onChange={() => onChange(event, entity, operation)} checked={wow} disabled={false} >{(wow) ? 'Y' : 'N'}</Checkbox>
            });
            enteries.push(entry)
        });
        setPermissions(permissionObj)
        setRecords(enteries)
    };

    const onXChange = (e) => {
        setWow(e.target.checked)
    }
    const onChange = (e, entity, operation) => {
        setWow(e.target.checked)

        console.log('>WOW', e.target.checked, wow)
        console.log(permissions, permissions[entity], permissions[entity][operation])
        if (permissions && permissions[entity]) {
            permissions[entity][operation] = e.target.checked
            setPermissions({ ...permissions, [entity]: { ...permissions[entity], [operation]: e.target.checked } })
            // permissions[entity] = { [operation]: e.target.checked, ...permissions[entity] }

            // console.log('>>>>>>>>>>>>>>>...', permissions)
            // setPermissions(prevState => ({
            //     ...prevState, [entity]: {
            //         ...permissions[entity], [operation]: e.target.checked
            //     }
            // }))


            // setInfoData((prevState) => ({
            //     ...prevState,
            //     major: {
            //         ...prevState.major,
            //         name: "Tan Long",
            //     }
            // }));
        }
    }


    const handleDelete = (key) => {
        log('handleDelete User', key)
        dispatch(removeRole(key))
    };

    const handleUpdate = (role, index) => {
        log('handleUpdate role', index)
        setVisible(true)
        dispatch(current_item(index))
        setRole(role);
    };

    // const columns = [
    //     {
    //         title: "Name*",
    //         dataIndex: "name",
    //         key: "name",
    //         width: 120,
    //     },
    //     {
    //         title: "Permanent*",
    //         dataIndex: "default",
    //         key: "default",
    //         width: 120,
    //         render: (text) => <span className="gx-link">{(text == true) ? "Yes" : "No"}</span>,
    //     },
    //     {
    //         title: "Status",
    //         dataIndex: "active",
    //         key: "active",
    //         width: 120,
    //         render: (text) => <span className="gx-link">{(text) ? 'Yes' : 'No'}</span>,
    //     }, {
    //         title: 'Action',
    //         key: 'action',
    //         width: 80,
    //         render: (text, record, index) => (
    //             <>
    //                 <Button size="large" icon={<EditOutlined />} onClick={() => handleUpdate(record, index)} />
    //                 {!record.default &&
    //                     <Popconfirm title="Are you sure delete this Role?" okText="Yes" cancelText="No" onConfirm={() => handleDelete(record.id)}>
    //                         <Button size="default" icon={<DeleteOutlined />} />
    //                     </Popconfirm>
    //                 }
    //             </>
    //         ),
    //     }

    // ];

    const showHeader = true;
    const pagination = { position: "bottom" };
    const [tableSetting, setTableSetting] = useState({
        bordered: true,
        loading: loading,
        pagination: false,
        size: "small",
        expandedRowRender: false,
        title: undefined,
        showHeader,
        footer: false,
        scroll: undefined,
        rowKey: 'id'
    });

    useEffect(() => {
    }, [])

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>many')
    useEffect(() => {
        generateColumns()
        generateRecords()

    }, [entities])

    useEffect(() => {
        if (permissions && permissions['Roles']) {
            console.log('>>>>>>>>>pPERMISSIONS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>many', permissions['Roles']['*'])
        }
        // setPermissions({ ...permissions, 'Roles': { ...permissions['Roles'], 'some': false } })
    }, [permissions])

    useEffect(() => {
        console.log('>>>>>>>>>WWOW>>>>>>>>>>>>>>>>>>>many', wow)
    }, [wow])

    return (
        <>
            <Checkbox onChange={() => onXChange(event)} checked={wow} disabled={false} >{(wow) ? 'Y' : 'N'}</Checkbox>
            <Table className="gx-table-responsive" scroll={{ x: 1500, y: 300 }} {...tableSetting} columns={columns} dataSource={records} />
        </>
    );
});

PermissionTable.displayName = PermissionTable;
export default PermissionTable;
