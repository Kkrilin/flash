import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function MyChart({ data }) {
  const options1 = {
    title: {
      text: "Activity Stats",
    },
    chart: {
      type: "column",
    },
    xAxis: {
      categories: data.map((d) => d.name),
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Values",
      },
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Count",
        data: data.map((d) => +d.count),
      },
      {
        name: "Distance (km)",
        data: data.map((d) => +d.total_distance / 1000),
      },
      {
        name: "Time (min)",
        data: data.map((d) => +d.total_time / 60),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options1} />;
}
