import React, { memo, useState } from "react";
import { Row, Button, Dropdown, Menu } from "antd";
import Widget from "../../Widget";
import AddIncident from "../../../components/resources/incident/form-model";
import { TeamOutlined, UsergroupDeleteOutlined, DownOutlined } from "@ant-design/icons";

const ActionBar = memo(() => {
  const [visible, setVisible] = useState(false);
  const [dropDownState, setDropDownState] = useState(false);
  const [filterIncidents, setFilterIncidents] = useState("Active Incidents");

  const handleMenuClick = (e) => {
    setFilterIncidents(e.key);
    setDropDownState(false);
  };
  const handleVisibleChange = (flag) => {
    setDropDownState({ visible: flag });
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Active Incidents">Active Incidents</Menu.Item>
      <Menu.Item key="On Hold Incidents">On Hold Incidents</Menu.Item>
      <Menu.Item key="Closed Incidents">Closed Incidents</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Widget styleName={"gx-card-widget"}>
        <Row justify="space-between ">
          <div>
            <AddIncident
              title={"Create Incident"}
              visible={visible}
              setVisible={setVisible}
              type="text"
              styleName="gx-m-0"
            />
            <Button type="text" icon={<TeamOutlined />} className="gx-m-0">
              Alert Team
            </Button>
            <Button type="text" icon={<UsergroupDeleteOutlined />} className="gx-m-0">
              User Status
            </Button>
            <Button type="text" icon={<UsergroupDeleteOutlined />} className="gx-m-0">
              Action Plan Wizard
            </Button>
          </div>
          <div>
            <Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={dropDownState}>
              <span className="gx-link ant-dropdown-link">
                {filterIncidents} <DownOutlined />
              </span>
            </Dropdown>
          </div>
        </Row>
      </Widget>
    </>
  );
});

ActionBar.displayName = ActionBar;

export default ActionBar;
