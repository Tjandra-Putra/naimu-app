import React from "react";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { PolarArea } from "react-chartjs-2";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const RadarChart = ({ dataApi, text }) => {
  //   const data = {
  //     labels: [],
  //     datasets: [],
  //   };

  const countries = dataApi && dataApi.map((item) => item._id.country);
  const totalUsers = dataApi && dataApi.map((item) => item.totalUsers);

  const data = {
    labels: countries,
    datasets: [
      {
        label: "# of Votes",
        data: totalUsers,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 2,
      },
    ],
  };

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

  return (
    <div className="line-chart-wrapper">
      <PolarArea data={data} options={options} style={{ width: "25rem" }} />
    </div>
  );
};

export default RadarChart;
