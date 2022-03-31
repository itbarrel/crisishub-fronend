import React, { memo, useState, useEffect,} from "react";
import { Col, Row, Button, Input, Form } from "antd";
import { Droppable } from "react-beautiful-dnd";
import { io } from "socket.io-client";

import {
  SendOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredIncomingMessageList,
  setIncomingMessageList,
  addIncomingMessage,
} from "../../../store/slices/resources/incomingMessage";
import { setCategoryList } from "../../../store/slices/resources/category";

import { sNO_RESULT_FOUND_BY } from "../../../constants/messages";
import NotFound from "../../../components/helpers/errors";

import Widget from "../../Widget";
import IncomingMessageCard from "../../cards/incomingMessage";
import CustomScrollbars from "../../CustomScrollbars";

import styles from "../../componentCss/category.module.css";

const IncomingMessage = memo(({ incidentId }) => {
  const dispatch = useDispatch();
  const IncomingMessageList = useSelector(
    ({ resources }) => resources.IncomingMessage.list
  );
  const [form] = Form.useForm();

  const [isLoading] = useState(false);

  useEffect(() => {
    dispatch(getFilteredIncomingMessageList(incidentId));
    //socket
    const socket = io("ws://localhost:8000");
    socket.on("IncomingmessagePlacement", (message) => {
      dispatch(setIncomingMessageList(message));
    });
    socket.on("insertIncomingmessagePlacement", (message) => {
      dispatch(setIncomingMessageList(message));

      dispatch(setCategoryList(message));
    });
  }, []);

  const onSubmit = async () => {
    const formData = await form.validateFields();
    let data = {
      IncidentId: incidentId,
      title: formData.incomingMessage,
      ColorPaletteId: "53560acf-ad80-4fc2-bdad-3d2ea0e8d51a",
      parentType: "incomingMessage",
    };
    dispatch(addIncomingMessage(data));

    form.resetFields();
  };

  return (
    <>
        <Row>
          <Widget styleName={"gx-card-widget gx-bg-light gx-m-1 gx-pr-xs-5   "}>
            <Row>
              <Col xxl={4} lg={2} md={0} align="center">
                <h4 className="  icon icon-listing-dbrd " />
                <br/>
              </Col>
              <Col
                xxl={20} lg={12} md={12} align='start' justify='top'
                className="gx-text-black gx-text-capitalize gx-fs-md gx-ml-0"
              >
                IncomingMessage
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form form={form} name="register" scrollToFirstError>
                  <Form.Item name="incomingMessage">
                    <Input
                      placeholder="Message"
                      suffix={
                        <Button
                          type="text"
                          size="small"
                          icon={<SendOutlined rotate="320" />}
                          className=" gx-text-primary gx-mr-2"
                          onClick={onSubmit}
                        />
                      }
                      className=" gx-border-light gx-mb-1"
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>

            <CustomScrollbars className={styles.scrollbar}>
              <Row>
                <Droppable droppableId={"IncomingMessage"}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      {...provided.dragHandleProps}
                    >
                      {IncomingMessageList &&
                        IncomingMessageList.length > 0 &&
                        IncomingMessageList.map((incomingMessage, index) => {
                          return (
                            <Col
                              xl={24}
                              lg={24}
                              md={24}
                              sm={24}
                              xs={24}
                              key={incomingMessage.id}
                              className="gx-pr-sm-4"
                            >
                              <IncomingMessageCard
                                incomingMessage={incomingMessage}
                                title={incomingMessage.title}
                                index={index}
                              ></IncomingMessageCard>
                            </Col>
                          );
                        })}

                      {(!isLoading && !IncomingMessageList) ||
                        (!isLoading && !IncomingMessageList.length && (
                          <>
                            <Col span={24} align="center">
                              <NotFound
                                message={<h1>{sNO_RESULT_FOUND_BY}</h1>}
                              />
                            </Col>
                          </>
                        ))}
                    </div>
                  )}
                </Droppable>
              </Row>
            </CustomScrollbars>
          </Widget>
        </Row>
      
    </>
  );
});

IncomingMessage.displayName = IncomingMessage;

export default IncomingMessage;
