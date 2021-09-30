import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Checkbox } from "antd";
import { log } from "../../../../utils/console-log";
// import { removeRole, current_item } from '../../../../store/slices/resources/role'

const PermissionTable = memo(({ permissions, setPermissions }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { entities, operations } = useSelector(({ resources }) => resources.Role);

  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);

  const initializePermissions = () => {
    let permissionObj = {};
    operations.forEach((operation) => {
      entities.forEach((entity) => {
        permissionObj[entity] ||= {};
        permissionObj[entity][operation] ||= false;
      });
    });
    setPermissions(permissionObj);
  };

  const generateColumns = () => {
    const enteries = [];

    enteries.push({
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      width: 100,
      fixed: "left",
      render: (text) => <span className="gx-link">{text}</span>,
    });

    entities.forEach((element) => {
      enteries.push({
        title: element,
        dataIndex: element,
        key: element,
        width: 500 / entities.length,
        render: (text, record, _index) => (permissions[element] ? (
          <Checkbox
            onChange={() => onChange(event, element, record.key)}
            checked={permissions[element][record.key]}
            disabled={false}
          ></Checkbox>
        ) : (
          text
        )),
      });
    });

    setColumns(enteries);
  };

  const generateRecords = () => {
    const enteries = [];
    let entry = {};

    operations.forEach((operation) => {
      entry = {};
      entry.key = operation;
      entry.permissions = operation === "*" ? "All" : operation;
      entry.model = operation === "*" ? "All" : operation;
      // entities.forEach(entity => {
      // if (permissions[entity] && permissions[entity][operation]) {
      //     permissionObj[entity][operation] = permissions[entity][operation]
      // }

      // entry[entity] = <Checkbox onChange={() => onChange(event, entity, operation)} checked={wow} disabled={false} >{(wow) ? 'Y' : 'N'}</Checkbox>
      // });
      enteries.push(entry);
    });

    setRecords(enteries);
  };

  const onChange = (e, entity, operation) => {
    if (permissions && permissions[entity]) {
      permissions[entity][operation] = e.target.checked;
      setPermissions({
        ...permissions,
        [entity]: { ...permissions[entity], [operation]: e.target.checked },
      });
    }
  };

  const handleDelete = (key) => {
    log("handleDelete User", key);
    dispatch(removeRole(key));
  };

  const handleUpdate = (role, index) => {
    log("handleUpdate role", index);
    setVisible(true);
    dispatch(current_item(index));
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
  // const pagination = { position: "bottom" };
  const [tableSetting, setTableSetting] = useState({
    bordered: true,
    loading: false,
    pagination: false,
    size: "small",
    expandedRowRender: false,
    title: undefined,
    showHeader,
    footer: false,
    scroll: undefined,
    rowKey: "id",
  });

  useEffect(() => {
    initializePermissions();
  }, [entities]);

  useEffect(() => {
    generateRecords();
    generateColumns();
  }, [permissions]);

  return (
    <>
      <Table
        className="gx-table-responsive"
        scroll={{ x: 1500, y: 300 }}
        {...tableSetting}
        columns={[...columns]}
        dataSource={[...records]}
      />
    </>
  );
});

PermissionTable.displayName = PermissionTable;
export default PermissionTable;
