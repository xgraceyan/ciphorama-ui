import { Pie } from "@ant-design/plots";
import React from "react";

function PieGraph(props) {
  const { data } = props;

  var graphData = [];

  for (const category in data)
    if (data.hasOwnProperty(category)) {
      graphData.push({
        label: category[0].toUpperCase() + category.slice(1),
        value: data[category],
      });
    }

  const config = {
    data: graphData,
    angleField: "value",
    colorField: "label",
    radius: 0.75,
    legend: false,
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{name}\n{percentage}",
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };

  return <Pie {...config} style={{ height: "250px" }} />;
}

export default PieGraph;
