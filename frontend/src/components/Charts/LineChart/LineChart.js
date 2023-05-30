import { themeColors } from "../ThemeColors";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChart = ({ text }) => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const datasetArray = [];

  // get random color from themeColors object
  const getRandomColor = () => {
    const randomColor = themeColors[Math.floor(Math.random() * themeColors.length)];
    console.log(randomColor);
    return randomColor;
  };

  // iterate over dataApi object and push data to datasetArray
  const formatData = (dataApi) => {};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: text,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 5],
        borderColor: "rgb(0, 0, 132)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
    ],
  };

  return (
    <div className="line-chart-wrapper">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
