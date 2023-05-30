import { themeColors } from "../ThemeColors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ text, dataApi, selectedYear }) => {
  const dataset = [];
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

  // get random color from themeColors object
  const getRandomColor = () => {
    const randomColor = themeColors[Math.floor(Math.random() * themeColors.length)];
    return randomColor;
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

  const data = {
    labels: labels,
    datasets: dataset,
  };

  // single dataset
  const formatData = (dataApi) => {
    if (dataApi) {
      const salesByMonth = Array.from({ length: 12 }, () => 0); // Initialize the array with null values
      dataApi.forEach((item) => {
        const monthIndex = item._id.month - 1; // Adjust the month index
        const totalSales = item.totalSales;

        if (item._id.year === selectedYear) {
          salesByMonth[monthIndex] = totalSales;
        }
      });

      dataset.push({
        label: selectedYear,
        data: salesByMonth,
        borderColor: getRandomColor().borderColor,
        backgroundColor: getRandomColor().backgroundColor,
        lineTension: 0.2, // Adjust the line tension value for smoother curves
      });
    }
  };

  formatData(dataApi);

  return (
    <div className="line-chart-wrapper">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
