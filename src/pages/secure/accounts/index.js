import React, { memo, useEffect, useState } from "react";
import withLayout from "../../../layouts/app-layout";
import Dynamic from "../../../components/table/Dynamic";
import { useDispatch } from "react-redux";

import { getAccountsList } from '../../../store/entities/resources/account'

import { Card, Form, Table, Button } from "antd";

const Accounts = memo((props) => {
  console.log('->>>>>>>>>>>>>>>..wowow', props)
  const dispatch = useDispatch();
  const FormItem = Form.Item;

  const columns = [
    {
      title: "Name*",
      dataIndex: "name",
      key: "name",
      width: 120,
      render: (text) => <span className="gx-link">{text}</span>,
    },
    {
      title: "Accout Name*",
      dataIndex: "accountName",
      key: "accountName",
      width: 120,
    },
    {
      title: "Status*",
      dataIndex: "status",
      key: "status",
      width: 40,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 350,
    },
  ];

  const data = [];
  for (let i = 1; i <= 10; i++) {
    data.push({
      key: i,
      name: "John Brown",
      accountName: `Bluey ${i}`,
      status: `Active`,
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
  }

  const expandedRowRender = (record) => <p>{record.description}</p>;
  const title = () => "Here is title";
  const showHeader = true;
  const footer = () => "Here is footer";
  const scroll = { y: 240 };
  const pagination = { position: "bottom" };
  const [state, setState] = useState({
    bordered: "small", // false if instead
    loading: false,
    pagination,
    size: "default",
    expandedRowRender: false,
    title: undefined,
    showHeader,
    footer: false,
    rowSelection: false, //{}
    scroll: undefined,
  });

  useEffect(() => {
    console.log("asdf accounts")
    dispatch(getAccountsList())
  }, [])

  return (
    <>
      {/* <Dynamic /> */}
      <Card title="Accounts">
        <Button type="primary">Creact Account</Button>
        <Table className="gx-table-responsive" {...state} columns={columns} dataSource={data} />
      </Card>
    </>
  );
});

Accounts.displayName = Accounts;
export default withLayout(Accounts);
