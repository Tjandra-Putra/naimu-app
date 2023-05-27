import { Chart as ChartJS, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";

import { themeColors } from "./ThemeColors";

ChartJS.register(PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

const BarChart = ({ dataApi, text }) => {
  const labelArray = [];
  const datasetArray = [];

  // get random color from themeColors object
  const getRandomColor = () => {
    const randomColor = themeColors[Math.floor(Math.random() * themeColors.length)];
    console.log(randomColor);
    return randomColor;
  };

  const label = ["brand1", "brand2", "brand3", "brand4", "brand5", "brand6", "brand7", "brand8", "brand9", "brand10"];

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
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

  // Function to generate a random color
  //   function getRandomColor() {
  //     const letters = "0123456789ABCDEF";
  //     let color = "#";
  //     for (let i = 0; i < 6; i++) {
  //       color += letters[Math.floor(Math.random() * 16)];
  //     }
  //     return color;
  //   }

  return (
    <div className="bar-chart-wrapper">
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
