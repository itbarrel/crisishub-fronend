import React, { memo } from "react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const labelAndTooltip = memo(({ title, tooltip }) => {
  return (
    <>
      <span>
        {title}&nbsp;
        {tooltip && (
          <>
            <Tooltip title={tooltip}>
              <QuestionCircleOutlined />
            </Tooltip>
          </>
        )}
      </span>
    </>
  );
});

labelAndTooltip.displayName = labelAndTooltip;

export default labelAndTooltip;
