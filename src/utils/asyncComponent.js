import React, { memo } from "react";
import dynamic from "next/dynamic";
import CircularProgress from "../components/CircularProgress";

const AsyncComponent = (importComponent) => {
    return dynamic(importComponent, {
        loding: () => {
            <CircularProgress />;
            // <CircularProgress />;
        },
    });
};

AsyncComponent.displayName = AsyncComponent;
export default AsyncComponent;
