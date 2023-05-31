import React, { useContext, useEffect } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const IS = ({ details }) => {
  const { darkMode } = useContext(ThemeContext);

  const detailsList = {
    "Gross Profit": "Gross Profit",
    "Net Income": "Net Income",
    "Operating Income": "Operating Income",
    "Revenue": "Revenue",
  };


  const formattedData = Object.values(details).map((item) => ({
    label: item.year,
    data: [
      item["Gross Profit"],
      item["Net Income"],
      item["Operating Income"],
      item["Revenue"],
    ],
  }));

  const data = {
    labels: Object.values(details).map((item) => item.year),
    datasets: Object.keys(detailsList).map((item, index) => ({
      label: detailsList[item],
      data: formattedData.map((item) => item.data[index]),
      backgroundColor: `rgba(75, 192, 192, 0.6)`,
      borderColor: `rgba(75, 192, 192, 1)`,
      borderWidth: 1,
    })),
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        maxTicksLimit: 5,
        precision: 0,
      },
    },
  };

  return (
    <Card>
      <div>
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
};

export default IS;
