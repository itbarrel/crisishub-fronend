import React, { memo, useState } from "react";
import { Row, Button, Col, Dropdown, Menu, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Widget from "../../Widget";
import {
  ArrowDownOutlined,
  MoreOutlined,
  SelectOutlined,
  CheckCircleOutlined,
  UnorderedListOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { getFilteredCategoryList } from "../../../store/slices/resources/category";
import { getFilteredIncomingMessageList } from "../../../store/slices/resources/incomingMessage";
import SubNav from "./SubNav";
import { useRouter } from "next/router";

const MainNav = memo(({ incidentId }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);

  const incidentList = useSelector(({ resources }) => resources.Incidents.list);
  const router = useRouter();

  function handleMenuClick(e) {
    message.info("Incident Is Selected.");
    router.push("/secure/dashboard/information", undefined, {
      shallow: true,
    });
    dispatch(getFilteredCategoryList(e.key));
    dispatch(getFilteredIncomingMessageList(e.key));

    localStorage.setItem("incidentId", e.key);
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      {incidentList &&
        incidentList.length > 0 &&
        incidentList.map((incident) => {
          return <Menu.Item key={incident.id}>{incident.name}</Menu.Item>;
        })}
    </Menu>
  );
  return (
    <>
      <Widget styleName={"gx-card-widget"} align="middle">
        <Row>
          <Col xxl={10} xl={14} lg={18} md={18} sm={18} xs={24}>
            <Button
              type="text"
              icon={<ArrowDownOutlined />}
              className="gx-m-0"
            />

            <Dropdown overlay={menu} className="gx-mb-0">
              <span className="gx-d-inline-flex">
                <Button>
                  Incident <DownOutlined className="gx-fs-xs" />
                </Button>
              </span>
            </Dropdown>
            <Button
              type="text"
              icon={<MoreOutlined />}
              onClick={() => {
                setVisible(!visible);
              }}
              className="gx-m-0"
            />
            <SubNav visible={visible} incidentId={incidentId} />
          </Col>

          <Col xxl={4} xl={4} lg={4} md={4} sm={6} xs={24} align="center">
            <Button
              type="text"
              icon={<CheckCircleOutlined />}
              className="gx-m-0"
            ></Button>
            <Button
              type="text"
              icon={<UnorderedListOutlined />}
              onClick={() => {
                setVisible(!visible);
              }}
              className="gx-m-0"
            />
          </Col>
        </Row>
      </Widget>
    </>
  );
});

MainNav.displayName = MainNav;

export default MainNav;
