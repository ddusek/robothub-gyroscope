import React from "react";

export const Metric = (props) => {
  return (
    <span className="gyroscope__metric">
        {props.item.key}: {props.item.value}
    </span>
  );
};