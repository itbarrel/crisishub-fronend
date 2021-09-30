import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAccountsList } from "../../../store/slices/resources/account";

import { Table } from "antd";

const Accounts = memo((props) => {
  const { list } = useSelector(({ resources }) => resources.Account);
  const dispatch = useDispatch();
  const [sort, setSort] = useState({});
  sort ||= {};
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setSort(sorter);
  };

  const columns = [
    {
      title: "Name*",
      dataIndex: "name",
      key: "name",
      width: 120,
      render: (text) => <span className="gx-link">{text}</span>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sort.columnKey === "name" && sort.order,
      ellipsis: true,
    },
    {
      title: "Domain Name*",
      dataIndex: "tenant_name",
      key: "tenant_name",
      width: 120,
      sorter: (a, b) => a.tenant_name.localeCompare(b.tenant_name),
      sortOrder: sort.columnKey === "tenant_name" && sort.order,
      ellipsis: true,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      width: 120,
      render: (text) => <span className="gx-link">{text ? "Yes" : "No"}</span>,
      sorter: (a, b) => a.active > b.active,
      sortOrder: sort.columnKey === "active" && sort.order,
      ellipsis: true,
    },
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
    rowKey: "id",
  });

  useEffect(() => {
    dispatch(getAccountsList());
  }, []);

  return (
    <>
      <Table
        className="gx-table-responsive"
        {...tableSetting}
        columns={columns}
        dataSource={list}
        onChange={handleChange}
      />
    </>
  );
});

Accounts.displayName = Accounts;
export default Accounts;
