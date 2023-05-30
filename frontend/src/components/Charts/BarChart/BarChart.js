import { Chart as ChartJS, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";

import { themeColors } from "../ThemeColors";
import { useEffect } from "react";

ChartJS.register(PointElement, BarElement, Title, Tooltip, Legend, Filler);

const BarChart = ({ dataApi, text }) => {
  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  // get random color from themeColors object
  const getRandomColor = () => {
    const randomColor = themeColors[Math.floor(Math.random() * themeColors.length)];
    console.log(randomColor);
    return randomColor;
  };

  const formatData = (dataApi) => {};

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Brand1",
        data: [34, 56, 30, 4, 5, 6, 7, 8, 9, 10],
        borderColor: getRandomColor().borderColor,
        backgroundColor: getRandomColor().backgroundColor,
        stack: "Stack 0",
      },
      {
        label: "Brand2",
        data: [73, 45, 23, 4, 5, 6, 7, 8, 9, 10],
        borderColor: getRandomColor().borderColor,
        backgroundColor: getRandomColor().backgroundColor,
        stack: "Stack 0",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: text,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="bar-chart-wrapper">
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
