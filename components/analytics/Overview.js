import { useEffect } from "react";
import Grid from "@mui/material/Grid";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import TotalsCard from "./TotalsCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Overview({ analytics }) {
  const overview = analytics.monthlyOverview;

  useEffect(() => {
    console.log(overview);
  }, [analytics]);

  const mapMonthToName = (monthOfYear) => {
    if (monthOfYear === 1) {
      return "Jan";
    }
    if (monthOfYear === 2) {
      return "Feb";
    }
    if (monthOfYear === 3) {
      return "Mar";
    }
    if (monthOfYear === 4) {
      return "Apr";
    }
    if (monthOfYear === 5) {
      return "May";
    }
    if (monthOfYear === 6) {
      return "Jun";
    }
    if (monthOfYear === 7) {
      return "Jul";
    }
    if (monthOfYear === 8) {
      return "Aug";
    }
    if (monthOfYear === 9) {
      return "Sep";
    }
    if (monthOfYear === 10) {
      return "Oct";
    }
    if (monthOfYear === 11) {
      return "Nov";
    }
    if (monthOfYear === 12) {
      return "Dec";
    }
  };

  const labels =
    overview &&
    overview.map(
      (values) => `${mapMonthToName(values._id.month)} ${values._id.year}`
    );

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Overiew",
      },
    },
    responsive: true,
  };

  const data = {
    labels,
    datasets: [
      {
        label: "People",
        data: overview && overview.map((values) => values.monthly_registrants),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(75, 192, 192)",
        stack: "Stack 0",
      },
    ],
  };
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}
