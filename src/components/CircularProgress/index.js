import React from "react";
import loader from "../../assets/images/loader.svg"

const CircularProgress = ({ className }) => <div className={`loader ${className}`}>
  <img src={loader} alt="loader-svg" />
</div>;
export default CircularProgress;
