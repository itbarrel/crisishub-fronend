import React, { memo, useState } from "react";
import { Button } from "antd";
import {
  CheckSquareOutlined,
  MessageOutlined,
  PlusOutlined,
  AntDesignOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import Addcategory from "../../resources/categories/modal";

const SubInfoBar = memo(({ visible, incidentId }) => {
  const [value, setvalue] = useState(0);
  const [modelvisible, setmodelvisible] = useState(false);

  const onShowModal = () => {
    setmodelvisible(true);
  };

  return (
    <>
      {visible && (
        <>
          <Button
            type="text"
            icon={<PlusOutlined />}
            className="gx-m-0"
            onClick={onShowModal}
          />
          <Addcategory
            title={"Add Category"}
            visible={modelvisible}
            setVisible={setmodelvisible}
            incidentId={incidentId}
          />

          <Button type="text" icon={<MessageOutlined />} className="gx-m-0">
            {value}
          </Button>
          <Button
            type="text"
            icon={<CheckSquareOutlined />}
            className="gx-m-0"
          />
          <Button type="text" icon={<AntDesignOutlined />} className="gx-m-0" />
          <Button type="text" icon={<SearchOutlined />} className="gx-m-0" />
        </>
      )}
    </>
  );
});

SubInfoBar.displayName = SubInfoBar;

export default SubInfoBar;
