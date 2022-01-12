import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { colors } from "../../theme/colors";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

function LineChart() {
  const options: ApexOptions = {
    colors: [colors.primary["500"]],
    chart: {
      height: 160,
      width: "100%",
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: false
      }
    },
    stroke: {
      width: 2,
      colors: [colors.primary["700"]]
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      min: 0,
      max: (max) => max * 1.1,
      show: false
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2021-03-18T00:00:00.000Z",
        "2021-03-19T00:00:00.000Z",
        "2021-03-20T00:00:00.000Z",
        "2021-03-21T00:00:00.000Z",
        "2021-03-22T00:00:00.000Z"
      ]
    },
    fill: {
      colors: [colors.primary["500"]],
      opacity: 1,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityTo: 1,
        opacityFrom: 0.6
      }
    },
    title: {
      text: '150 KWH',
      offsetX: 30,
      style: {
        fontSize: '24px',
        color: colors.primary["600"]
      },
    },
    subtitle: {
      text: '1200 KW nas últimas 24 horas',
      offsetX: 30,
      style: {
        fontSize: '14px',
        color: colors.primary["700"]
      }
    }
  }; 

  return (
    <Chart
      h="160"
      series={[
        { name: "Series", data: [31, 120, 10, 28, 64] }
      ]}
      type="area"
      options={options}
    />
  );
};

export { LineChart };