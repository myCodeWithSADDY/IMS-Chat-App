import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { darkPurple, Purple } from "../../constants/color";
import { getLast7Days } from "../lib/features";
import { purple } from "@mui/material/colors";

// Register necessary chart components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);
const label = getLast7Days();
const LineChart = ({ value = [] }) => {
  const data = {
    label,
    datasets: [
      {
        label: "Users",
        data: value,
        borderColor: darkPurple,
        tension: 0.3,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis from zero
      },
    },
  };

  return <Line data={data} options={options} />;
};

const DoughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  title: {
    display: false,
  },
  cutout: 120,
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        borderColor: [Purple, darkPurple],
        backgroundColor: [Purple, darkPurple],
        offset: 20,
      },
    ],
  };

  return (
    <Doughnut style={{ zIndex: 10 }} data={data} options={DoughnutOptions} />
  );
};

export { LineChart, DoughnutChart };
