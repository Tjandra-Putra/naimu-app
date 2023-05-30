import { Chart as ChartJS, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";

import { themeColors } from "../ThemeColors";

ChartJS.register(PointElement, BarElement, Title, Tooltip, Legend, Filler);

const BarChart = ({ dataApi, text, selectedYear }) => {
  const labels = ["January", "February", "March", "April", "May", "June", "July"];
  let dataset = [];

  // get random color from themeColors object
  const getRandomColor = () => {
    const randomColor = themeColors[Math.floor(Math.random() * themeColors.length)];
    return randomColor;
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

  const data = {
    labels: labels,
    datasets: [],
  };

  const formatData = (dataApi) => {
    const brands = {};

    // iterate over dataApi
    if (dataApi) {
      dataApi.forEach((item) => {
        const brand = item._id.brand;
        const monthIndex = item._id.month - 1; // Adjust the month index
        const totalQuantity = item.totalQuantity;

        if (item._id.year === selectedYear) {
          if (!brands[brand]) {
            const color = getRandomColor();

            brands[brand] = {
              label: brand,
              data: Array.from({ length: 12 }, () => 0),
              backgroundColor: color.backgroundColor,
              borderColor: color.borderColor,
              borderWidth: 1,
            };
          }

          brands[brand].data[monthIndex] = totalQuantity;
        }
      });

      // Push the datasets to the data object
      Object.values(brands).forEach((brandData) => {
        data.datasets.push(brandData);
      });
    }
  };

  formatData(dataApi);

  return (
    <div className="bar-chart-wrapper">
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
