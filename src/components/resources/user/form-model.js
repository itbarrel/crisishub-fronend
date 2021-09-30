import React, { memo, useEffect, useRef, useState } from "react";
import {
    Button,
    Form,
    Input,
    Modal,
    Select
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../../../store/slices/resources/user";
import { isClient } from "../../../utils/is-client";
import Draggable from "react-draggable";
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import { PlusCircleOutlined } from '@ant-design/icons';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const Model = memo(({ visible, setVisible, selectedUser, title, off }) => {
    const draggleRef = useRef(null);
    const dispatch = useDispatch();
    const loader = useSelector(({ resources }) => resources.Account.loading)
    const { records: roles } = useSelector(({ resources }) => resources.Role)
    const [loading, setLoading] = useState(loader);
    const [modelTitle, setModelTitle] = useState(title);
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const [form] = Form.useForm();
    const { Option } = Select;

    const onShowModal = () => {
        setVisible(true);
    };
    const onCloseModal = () => {
        setVisible(false);
        form.resetFields();
    };
    const onSubmit = async () => {
        setLoading(true);
        const formData = await form.validateFields();
        let data = {
            userName: formData.username,
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            mobilePhone: formData.mobilePhone,
        };
        if (visible) {
            dispatch(updateUser(selectedUser.id, data));
        } else {
            dispatch(addUser(data));
        }
        form.resetFields();
    };

    const ModalHeader = () => {
        return (
            <>
                <div
                    style={{
                        width: "100%",
                        cursor: "move",
                    }}
                    onMouseOver={() => {
                        if (disabled) {
                            setDisabled(false);
                        }
                    }}
                    onMouseOut={() => {
                        setDisabled(true);
                    }}
                    // fix eslintjsx-a11y/mouse-events-have-key-events
                    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
                    onFocus={() => { }}
                    onBlur={() => { }}
                // end
                >
                    {modelTitle}
                </div>
            </>
        );
    };

    const ModalFooter = () => {
        return (
            <>
                <Button key="back" onClick={onCloseModal}>
                    Return
                </Button>
                <Button key="submit" type="primary" loading={loading} onClick={onSubmit}>
                    Submit
                </Button>
            </>
        );
    };

    useEffect(() => {
        if (visible) { onShowModal() }
        form.setFieldsValue(selectedUser)
    }, [visible, selectedUser])

    useEffect(() => {
        if (loading) {
            setVisible(false);
            setLoading(false);
        }
    }, [loading])

    const Drag = () => (model) => {
        if (isClient) {
            const { clientWidth, clientHeight } = window?.document?.documentElement;
            const targetRect = draggleRef?.current?.getBoundingClientRect();

            const onStart = (event, uiData) => {
                setBounds({
                    left: -targetRect?.left + uiData?.x,
                    right: clientWidth - (targetRect?.right - uiData?.x),
                    top: -targetRect?.top + uiData?.y,
                    bottom: clientHeight - (targetRect?.bottom - uiData?.y),
                });
            };
            return (
                <>
                    <Draggable
                        disabled={disabled}
                        bounds={bounds}
                        onStart={(event, uiData) => onStart(event, uiData)}
                    >
                        <div ref={draggleRef}>{model}</div>
                    </Draggable>
                </>
            );
        }
    };

    return (
        <>
            {off ? '' : <Button type="primary" onClick={onShowModal} icon={<PlusCircleOutlined />}>
                Create User
            </Button>}
            <Modal
                title={<ModalHeader />}
                visible={visible}
                onOk={onSubmit}
                onCancel={onCloseModal}
                footer={<ModalFooter />}
                width={800}
                modalRender={Drag()}
                forceRender
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    name={title}
                    scrollToFirstError
                >

                    <Form.Item
                        name="firstName"
                        label={<LabelAndTooltip title={"First.Name"} tooltip={"Enter your First Name"} />}
                        rules={[{ required: true, message: "Please input your First Name!", whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label={<LabelAndTooltip title={"Last.Name"} tooltip={"Enter your Last Name"} />}
                        rules={[{ required: true, message: "Please input your Last Name!", whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="userName"
                        label={<LabelAndTooltip title={"User.Name"} tooltip={"Enter your User Name"} />}
                        rules={[{ required: true, message: "Please input your User Name!", whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label={<LabelAndTooltip title={"Email"} />}
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="mobilePhone"
                        label={<LabelAndTooltip title={"Mobile.Phone"} tooltip={"Enter your Mobile Number"} />}
                        rules={[{ required: true, message: "Please input your Mobile Number!", whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Role" hasFeedback name="RoleId">
                        <Select allowClear showSearch={true}>
                            {(roles.map((role) => <Option key={role.id} value={role.id}>{role.name}</Option>))}
                        </Select>
                    </Form.Item>

                    {off ? '' : <>
                        <Form.Item
                            name="password"
                            label={<LabelAndTooltip title={"Password"} />}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label={<LabelAndTooltip title={"Confirm.Password"} />}
                            dependencies={["password"]}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("The two passwords that you entered do not match!");
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </>}
                </Form>
            </Modal>
        </>
    );
});

Modal.displayName = Modal;

export default Model;
