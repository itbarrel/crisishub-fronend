import React, { memo, useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import withLayout from "../../../layouts/app-layout";
import SEO from "../../../components/seo";
import Incidents from "../../../components/cards/Card";
import { getIncidentList } from "../../../store/slices/resources/incidents";

const IncidentDashboard = memo(() => {
  const [loading, setLoading] = useState(false);
  const incidentList = useSelector(({ resources }) => resources.Incidents.list);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("object incident page", incidentList);
    dispatch(getIncidentList());
  }, []);

  return (
    <>
      <SEO title={"Incidents Dashboard"} />
      <Row>
        {!loading &&
          incidentList &&
          incidentList.length &&
          incidentList.map((incident, index) => {
            return (
              <Col xl={6} lg={8} md={12} sm={12} xs={24} key={incident.id}>
                <Incidents
                  title={incident.name}
                  createdAt={incident.createdAt}
                  incident={incident}
                />
              </Col>
            );
          })}
      </Row>
    </>
  );
});

IncidentDashboard.displayName = IncidentDashboard;

export default withLayout(IncidentDashboard);
