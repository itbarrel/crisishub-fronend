import { memo, useState, useEffect } from "react";
import withLayout from "../../../layouts/app-layout";
import { Row, Col } from "antd";
import SEO from "../../../components/seo";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

import Navigation from "../../../components/navigation/information-dashboard/MainNav";
import Category from "../../../components/dashboard/category";
import IncomingMessage from "../../../components/dashboard/incomingMessage";
import { updateCategoryMessageIndex } from "../../../store/slices/resources/categoryMessage";
import { updateIncomingMessageIndex } from "../../../store/slices/resources/incomingMessage";

import Widget from "../../../components/Widget";

const Dashboard = memo(() => {
  const router = useRouter();
  const dispatch = useDispatch();
  const incidentList = useSelector(({ resources }) => resources.Incidents.list);

  const categoryList = useSelector(({ resources }) => resources.Category.list);
  const [catagories, setCategories] = useState(categoryList);
  useEffect(() => {
    setCategories(categoryList);
  }, [categoryList]);

  const IncomingMessageList = useSelector(
    ({ resources }) => resources.IncomingMessage.list
  );
  const [IncomingMessages, setIncomingMessages] = useState(IncomingMessageList);

  useEffect(() => {
    setIncomingMessages(IncomingMessageList);
  }, [IncomingMessageList]);

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
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // Drag from category and drop in category
    if (
      destination.droppableId !== "IncomingMessage" &&
      source.droppableId !== "IncomingMessage" &&
      destination.droppableId !== "ActionListMessage" &&
      source.droppableId !== "ActionListMessage"
    ) {
      const dragCategories = [...catagories];
      const destinationCategoryIndex = dragCategories.findIndex(
        (element) => element.id === destination.droppableId
      );

      const destinationCategory = dragCategories[destinationCategoryIndex];

      const { CategoryMessages: destinationMessages } = destinationCategory;

      let prevSortOrder;
      if (
        destination.index > source.index &&
        destination.droppableId === source.droppableId
      ) {
        prevSortOrder =
          destination.index > 0
            ? destinationMessages[destination.index].sortOrder
            : -1;
      } else {
        prevSortOrder =
          destination.index > 0
            ? destinationMessages[destination.index - 1].sortOrder
            : -1;
      }

      const data = {
        destinationCategoryId: destination.droppableId,
        sourceCategoryId: source.droppableId,
        sortOrder: prevSortOrder,
      };

      dispatch(updateCategoryMessageIndex(draggableId, data));
    }
    // Drag from IncomingMessage and drop in IncomingMessage
    else if (
      destination.droppableId === "IncomingMessage" &&
      source.droppableId === "IncomingMessage" &&
      destination.droppableId !== "ActionListMessage" &&
      source.droppableId !== "ActionListMessage"
    ) {
      const incomingMessage = [...IncomingMessages];
      let prevSortOrder;
      if (destination.index > source.index) {
        prevSortOrder =
          destination.index > 0
            ? incomingMessage[destination.index].sortOrder
            : -1;
      } else {
        prevSortOrder =
          destination.index > 0
            ? incomingMessage[destination.index - 1].sortOrder
            : -1;
      }

      console.log("prevSortOrder", prevSortOrder);

      const data = {
        destinationIncomingMessageId: destination.droppableId,
        sourceIncomingMessageId: source.droppableId,
        sortOrder: prevSortOrder,
      };
      dispatch(updateIncomingMessageIndex(draggableId, data));
    }
    // Drag from IncomingMessage and drop in Category
    else if (
      source.droppableId === "IncomingMessage" &&
      destination.droppableId &&
      source.droppableId !== "ActionListMessage" &&
      destination.droppableId !== "ActionListMessage" &&
      destination.droppableId !== "IncomingMessage"
    ) {
      const dragCategories = [...catagories];
      const destinationCategoryIndex = dragCategories.findIndex(
        (element) => element.id === destination.droppableId
      );

      const destinationCategory = dragCategories[destinationCategoryIndex];

      const { CategoryMessages: destinationMessages } = destinationCategory;

      let prevSortOrder =
        destination.index > 0
          ? destinationMessages[destination.index - 1].sortOrder
          : -1;

      const data = {
        destinationCategoryId: destination.droppableId,
        sourceCategoryId: source.droppableId,
        sortOrder: prevSortOrder,
      };

      dispatch(updateCategoryMessageIndex(draggableId, data));
    }
    // Drag from Category and drop in IncomingMessage
    else if (
      destination.droppableId === "IncomingMessage" &&
      source.droppableId &&
      destination.droppableId !== "ActionListMessage" &&
      source.droppableId !== "ActionListMessage" &&
      source.droppableId !== "IncomingMessage"
    ) {
      const incomingMessage = [...IncomingMessages];

      let prevSortOrder =
        destination.index > 0
          ? incomingMessage[destination.index - 1].sortOrder
          : -1;

      const data = {
        destinationIncomingMessageId: destination.droppableId,
        sourceIncomingMessageId: source.droppableId,
        sortOrder: prevSortOrder,
      };
      dispatch(updateIncomingMessageIndex(draggableId, data));
    }
  };

  return (
    <>
      <SEO title={"Information Dashboard"} />
      <Navigation incidentId={incidentId} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Row gutter={[24, 24]}>
         
          <Col
            xxl={20}
            xl={18}
            lg={18}
            md={18}
            sm={12}
            xs={24}
            className="gx-pr-0 gx-mt-0 "
          >
            <Widget>
              <Category incidentId={incidentId} />
            </Widget>
          </Col>

          <Col
            xxl={4}
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={24}
            className="gx-pl-0 gx-h-100"
          >
            <Widget >
              <IncomingMessage incidentId={incidentId} />
            </Widget>
          </Col>
        </Row>
      </DragDropContext>
    </>
  );
});

Dashboard.displayName = Dashboard;

export default withLayout(Dashboard);
