// @mui

// components
import Chart, { useChart } from "@minimal/components/chart"
import StrengthMeteorImage from "data-base64:~assets/strength-meteor.png"

// utils

// ----------------------------------------------------------------------

const CHART_HEIGHT = 300
const CHART_WIDTH = 200

// ----------------------------------------------------------------------

type Props = {
  series: number[]
}

export default function ChartRadialBar({ series }: Props) {
  const chartOptions = useChart({
    chart: {
      height: CHART_HEIGHT,
      width: CHART_WIDTH,
      sparkline: {
        enabled: false
      }
    },
    labels: ["Percent"],
    legend: {
      show: false
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
          margin: 0,
          imageClipped: false
        },
        startAngle: -90,
        endAngle: 90,
        dataLabels: {
          show: false
        }
      }
    },
    fill: {
      type: "image",
      image: {
        src: [StrengthMeteorImage],
        width: 300,
        height: 300
      }
      // type: "gradient",
      // gradient: {
      //   type: "horizontal",
      //   colorStops: [
      //     {
      //       offset: 0,
      //       color: "#FF0900"
      //     },
      //     {
      //       offset: 100,
      //       color: "#14FF00"
      //     }
      //   ]
      // }
    }
  })

  return (
    <Chart
      dir="ltr"
      type="radialBar"
      series={series}
      options={chartOptions}
      height={CHART_HEIGHT}
      width={CHART_WIDTH}
    />
  )
}
