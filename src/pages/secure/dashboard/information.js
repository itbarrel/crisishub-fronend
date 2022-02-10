import { memo } from "react";
import withLayout from "../../../layouts/app-layout";
import { Row, Button, Col, Space, Dropdown, Menu } from "antd";
import SEO from "../../../components/seo";
import InfoActionBar from "../../../components/dashboard/information-dashboard/info-dashboard-bar";
// import InforDashboard from "../../../components/dashboard/incidents/InformationDashboard";
import Category from "../../../components/dashboard/category";
import Widget from "../../../components/Widget";

const Dashboard = memo(() => {
  return (
    <>
      <SEO title={"Information Dashboard"} />
      <InfoActionBar />
      {/* <InforDashboard /> */}
      <Widget styleName={"gx-card-widgetgx-order-history "} align="middle">
        <Row gutter={[16, 16]}>
          {/* <Col
            xl={0}
            lg={12}
            md={16}
            sm={20}
            xs={24}
            style={{ height: "600px" }}
          /> */}

          <Col
            xl={24}
            lg={12}
            md={16}
            sm={20}
            xs={24}
            style={{ height: "600px" }}
          >
            <Category />
          </Col>

          {/* <Col
            xl={0}
            lg={12}
            md={16}
            sm={20}
            xs={24}
            style={{ border: "2px solid", height: "600px" }}
          /> */}
        </Row>
      </Widget>
    </>
  );
});

Dashboard.displayName = Dashboard;

export default withLayout(Dashboard);
