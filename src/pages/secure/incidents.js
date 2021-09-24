import React, { memo } from "react";
import withLayout from "../../layouts/app-layout";
import { Card, Row, Col } from "antd";
import IncidentList from "../../components/resources/incident/table";
import AddIncident from "../../components/resources/incident/form-model";
import SEO from "../../components/seo";
import Widget from "../../components/Widget";


const Incidents = memo(() => {
  return (
    <>
      <SEO title={"Incidents"} />
      <Widget title="Incidents">
        <Row justify="end">
          <Col span={4}>
            <AddIncident title={"Add Incident"} />
          </Col>
        </Row>
        <IncidentList />
      </Widget>
    </>
  );
});

Incidents.displayName = Incidents;
export default withLayout(Incidents);
