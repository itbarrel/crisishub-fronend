import { memo } from "react";
import { useDispatch } from "react-redux";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import PropTypes from "prop-types";
import IntlMessages from "../../../utils/IntlMessages";
import Widget from "../../../components/Widget";
import { remove } from '../../../store/slices/resources/dynamicForm'
import Link from 'next/link'

const DynamicFormCard = memo(({ name, description, type, id, form }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(remove(id))
  }
  const handleEditForm = () => {
    console.log('object', form)
  }

  return (
    <Widget
      styleName={"gx-card-widget"}
      extra={
        <>
          <ul className="gx-list-inline gx-ml-auto gx-mb-0 gx-text-grey">
            <li>
              <Link href={`/secure/dynamicForm/${id}`} passHref>
                <EyeOutlined style={{ fontSize: '18px' }} />
              </Link>
            </li>
            <li onClick={handleEditForm}>
              <EditOutlined style={{ fontSize: '18px' }} />
            </li>
            <li>
              <Popconfirm
                title={<IntlMessages id="sure.for.delete" />}
                okText={<IntlMessages id="Yes" />}
                cancelText={<IntlMessages id="No" />}
                onConfirm={() => handleDelete(id)}
              >
                <DeleteOutlined />
              </Popconfirm>
            </li>
          </ul >
        </>
      }
      text={'Form Detail'}
    >
      <>
        <h2 className="gx-mb-1">{name}</h2>
        <p className="gx-text-grey gx-fs-sm "> <strong>Description: </strong> {description}</p>
        <p className="gx-text-grey gx-fs-sm gx-mb-4"> <strong>Type :</strong> {type}</p>
      </>
    </Widget >
  );
});

DynamicFormCard.displayName = DynamicFormCard;

DynamicFormCard.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.string,
  incident: PropTypes.object,
  form: PropTypes.object,
};

export default DynamicFormCard;
