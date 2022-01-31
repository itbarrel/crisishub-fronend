import React, { memo, useState } from "react";
import { Row, Button, Col } from "antd";
import Widget from "../../Widget";
import {
    ArrowDownOutlined,
    MoreOutlined,
    SelectOutlined,
    CheckCircleOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import SubInfoBar from "./sub-info-bar";

const InfoBar = memo(() => {
    const [visible, setVisible] = useState(true);

    return (
        <>
            <Widget styleName={"gx-card-widget"} align="middle">
                <Row>
                    <Col xl={10} lg={8} md={12} sm={12} xs={24}>
                        <Button type="text" icon={<ArrowDownOutlined />} className="gx-m-0" />

                        <Button
                            type="text"
                            icon={<SelectOutlined />}
                            className="gx-m-0"
                        >
                            Incident
                        </Button>
                        <Button
                            type="text"
                            icon={<MoreOutlined />}
                            onClick={() => { setVisible(!visible) }}
                            className="gx-m-0"
                        />
                        <SubInfoBar visible={visible} />
                    </Col>

                    <Col xl={4} align="center">
                        <Button
                            type="text"
                            icon={<CheckCircleOutlined />}
                            className="gx-m-0"
                        >

                        </Button>
                        <Button
                            type="text"
                            icon={<UnorderedListOutlined />}
                            // onClick={() => { setVisible(!visible) }}
                            className="gx-m-0"
                        />

                    </Col>
                    <Col xl={10} >


                    </Col>


                </Row>
            </Widget>
        </>
    );
});

InfoBar.displayName = InfoBar;

export default InfoBar;
