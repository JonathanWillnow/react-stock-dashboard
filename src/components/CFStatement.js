import React, { useContext } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const CF = ({ details }) => {
  console.log(details);
  const { darkMode } = useContext(ThemeContext);

  const detailsList = {
    "FCF": "FCF",
    "Financial CF": "Financial CF",
    "Investing CF": "Investing CF",
    "Operating CF": "Operating CF",
  };

  if (Object.keys(details).length === 0) {
    // Return empty bar chart
    return (
      <Card>
        <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          No data available.
        </div>
      </Card>
    );
  }

  const sortedDetails = [...details].sort((a, b) => {
    // Assuming the date property in the detail object is named "date"
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  const labels = sortedDetails.map((item) => item.label);

  const colors = ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"]; // Add more colors if needed

  const datasets = Object.keys(detailsList).map((item, index) => ({
    label: detailsList[item],
    data: sortedDetails.map((item) => item.data[index]),
    backgroundColor: colors[index % colors.length],
    borderColor: colors[index % colors.length],
    borderWidth: 1,
  }));

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    scales: {
      x: {
        reverse: true, // Display bars in reverse order (most recent on the right)
      },
      y: {
        beginAtZero: true,
        maxTicksLimit: 5,
        precision: 0,
        // Add a callback to format the y-axis labels in millions or billions
        ticks: {
          callback: function (value) {
            if (Math.abs(value) >= 1000000000) {
              return (value / 1000000000).toLocaleString() + "B";
            } else if (Math.abs(value) >= 1000000) {
              return (value / 1000000).toLocaleString() + "M";
            } else {
              return value.toLocaleString();
            }
          },
        },
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

export default CF;
