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
import { useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ text, dataApi }) => {
  const [selectedYear, setSelectedYear] = useState(2023); // 2023 is the default value
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

  // multiple datasets
  // const formatData = (dataApi) => {
  //   if (dataApi) {
  //     dataApi.forEach((item, index) => {
  //       const monthIndex = item._id - 1; // _id represents the month (1 for January, 2 for February, etc.)
  //       const totalSales = item.totalSales;

  //       dataset.push({
  //         label: `Dataset ${index + 1}`,
  //         data: Array.from({ length: 12 }, (_, i) => (i === monthIndex ? totalSales : null)),
  //         borderColor: getRandomColor().borderColor,
  //         backgroundColor: getRandomColor().backgroundColor,
  //       });
  //     });
  //   }
  // };

  // single dataset
  const formatData = (dataApi) => {
    if (dataApi) {
      const salesByMonth = Array.from({ length: 12 }, () => null); // Initialize the array with null values
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

  console.log("dataset: ", dataset);

  return (
    <div className="line-chart-wrapper">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
