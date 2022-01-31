import React, { memo, useState, useEffect } from "react";
import { Col, Row } from "antd";
import SEO from "../../../components/seo";
import withLayout from "../../../layouts/app-layout";
import Incidents from "../../../components/cards/Card";
import CategoryCard from "../../../components/cards/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import {
    getCategoryList,
    removeUser,
    current_item,
} from "../../../store/slices/resources/category";
import ActionBar from "../../../components/dashboard/incidents/action-bar";
import { sNO_RESULT_FOUND_BY } from "../../../constants/messages";
import NotFound from "../../../components/helpers/errors";
import AddCategory from "../../../components/resources/categories/modal";


const category = memo(() => {
    const dispatch = useDispatch();
    const categoryList = useSelector(({ resources }) => resources.Category.list);
    const [isLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        dispatch(getCategoryList());
    }, []);

    return (
        <>
            <AddCategory
                title={"Add category"}
                visible={visible}
                setVisible={setVisible}
            />

            <Row>
                {!isLoading &&
                    categoryList &&
                    categoryList.length > 0 &&
                    categoryList.map((category) => {
                        return (
                            <Col xl={6} lg={8} md={12} sm={12} xs={24} key={category.id}>
                                <CategoryCard
                                    title={category.title}
                                    createdAt={category.createdAt}
                                    category={category}
                                />
                            </Col>
                        );
                    })}
                {!isLoading && !categoryList.length && (
                    <>
                        <Col span={24} align="middle">
                            <NotFound message={<h1>{sNO_RESULT_FOUND_BY}</h1>} />
                        </Col>
                    </>
                )}
            </Row>
        </>
    );
});

category.displayName = category;

export default category;

