import { memo, useState } from "react";
import withLayout from "../../../layouts/app-layout";
import { Row, Col } from "antd";
import SEO from "../../../components/seo";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Navigation from "../../../components/navigation/information-dashboard/MainNav";
import Category from "../../../components/dashboard/category";
import Widget from "../../../components/Widget";
import styles from "../../../components/componentCss/category.module.css";
import CustomScrollbars from "../../../components/CustomScrollbars/categoryScrollbar";

const Dashboard = memo(() => {
  const router = useRouter();
  const incidentList = useSelector(({ resources }) => resources.Incidents.list);

  let { incidentId } = router.query;
  if (!incidentId) {
    let localStorageincidentId = localStorage.getItem("incidentId");
    if (localStorageincidentId) {
      const foundIncident = incidentList.find(
        (incident) => incident.id === localStorageincidentId
      );
      if (foundIncident) {
        incidentId = foundIncident.id;
      } else {
        incidentId = incidentList[0].id;
      }
    }

    // console.log("foundIncident", foundIncident);
  }

  const [categoryIncidentId, setcategoryIncidentId] = useState(incidentId);

  // console.log("incidentId", incidentId);
  return (
    <>
      <SEO title={"Information Dashboard"} />
      <Navigation incidentId={incidentId} />
      <Widget styleName={"gx-card-widgetgx-order-history "} align="middle">
        <Row gutter={[24, 24]}>
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
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{ height: "100%" }}
          >
            <Category incidentId={incidentId} />
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
