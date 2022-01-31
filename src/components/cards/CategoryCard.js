import React, { memo, useState } from "react";
import { Button, Form, Input, Popconfirm } from "antd";
const { TextArea } = Input;

import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    getCategoryList,
    removeCategory,
    current_item,
} from "../../store/slices/resources/category";
import {
    EditOutlined,
    DeleteOutlined,
    SendOutlined,
} from "@ant-design/icons";
import Widget from "../Widget";
import PropTypes from "prop-types";
import UpdateCategory from "../resources/categories/modal";



const CategoryCard = memo(({ title, createdAt, category }) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});



    const handleDelete = (Current_category) => {
        console.log("handleDelete category", Current_category.id);
        dispatch(removeCategory(Current_category.id));
        dispatch(current_item(Current_category));
    };

    const handleUpdate = (Current_category) => {
        // log("handleUpdate Department", Current_category);
        setVisible(true);
        setSelectedCategory(Current_category);
    };
    return (
        <>
            <UpdateCategory
                title={"Add category"}
                visible={visible}
                setVisible={setVisible}
                selected={selectedCategory}
            />
            <Widget styleName={"gx-card-widget background-color "}>
                <Row >
                    <Col xl={18} className="gx-pb-0">
                    <h4 className="gx-text-black gx-text-capitalize gx-ml-3  ">{title}</h4>
                    </Col>
                    <Col xl={6} align="center">
                    <h1  >
                            <Button type="text"
                                icon={<EditOutlined style={{ color: 'black' }} />}
                                onClick={() => handleUpdate(category)}
                                className=" gx-mr-0 " 
                                size="small"/>


                            <Popconfirm
                                placement="bottomRight"
                                title="Are you sure delete this Category?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => handleDelete(category)}
                            >
                                <Button type="text"
                                    icon={<DeleteOutlined style={{ color: 'black' }} />}
                                    className="gx-mr-0 "
                                    size="small" />

                            </Popconfirm>
                        </h1>

                    </Col>
                </Row>

                <Row className="gx-mt-o ">
                    <Col xl={22}>
                        <TextArea rows={2} />
                    </Col>
                    <Col xl={2} align="center" className="gx-ml-0">
                        <Button
                            type="text"
                            icon={<SendOutlined rotate='320' />}
                            className="gx-m-0 gx-text-primary"
                        />
                    </Col>
                </Row>
                <Row>
                    <p className="gx-text-grey gx-fs-sm gx-mb-0 gx-mt-1 ">{createdAt}</p>
                </Row>

            </Widget >
        </>
    );
});

CategoryCard.displayName = CategoryCard;

CategoryCard.propTypes = {
    title: PropTypes.string,
    createdAt: PropTypes.string,
    // incident: PropTypes.object,
};

export default CategoryCard;


