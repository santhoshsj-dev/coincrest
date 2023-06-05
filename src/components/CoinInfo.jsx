import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { chartDays } from "../config/data";

import '../styles/CoinInfo.css';

const CoinInfo = ({ coin }) => {
  const { currency, symbol } = CryptoState();
  const [days, setDays] = useState(1);
  const [chartData, setChartData] = useState({});
  const chartRef = useRef();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        HistoricalChart(coin.id, days, currency, symbol)
      );
      setFlag(true);
      const data = response.data.prices.map((price) => {
        return { x: new Date(price[0]), y: price[1] };
      });
      let labels;
      if (days === 1) {
        labels = data.map((d, index, array) => {
          const options = { hour: "numeric", minute: "numeric", hour12: true };
          const date = new Date(d.x);
          const isDifferentYear =
            index > 0 && date.getFullYear() !== new Date(array[index - 1].x).getFullYear();
          return isDifferentYear
            ? `${date.toLocaleString("en-US", {
                ...options,
                year: "numeric",
              })}`
            : `${date.toLocaleString("en-US", options)}`;
        });
      } else {
        labels = data.map((d) => {
          const options = { month: "short", day: "numeric", year: "numeric" };
          return d.x.toLocaleDateString("en-US", options);
        });
      }

      setChartData({
        labels: labels,
        datasets: [
          {
            label: `Price ( ${
              days === 1 ? "Past 24 Hours" : `Past ${days} days`
            } ) in ( ${symbol} ) ${currency}`,
            data: data,
            borderColor: "#EEBC1D",
            fill: false,
          },
        ],
      });
    };
    fetchData();
  }, [currency, symbol, days]);

  useEffect(() => {
    if (
      chartRef.current &&
      chartData.labels &&
      chartData.datasets &&
      chartData.datasets.length > 0 &&
      chartData.datasets[0].data.length > 0
    ) {
      const myChart = new Chart(chartRef.current, {
        type: "line",
        data: chartData,
        options: {
          animation: {
            easing: "easeInOutQuad",
            duration: 1500,
          },
        },
      });
      return () => {
        myChart.destroy();
      };
    }
  }, [chartData, chartRef]);

  const handleDaySelect = (selectedDay) => {
    setDays(selectedDay);
    setFlag(false);
  };

  const chartDayButtonStyle = {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#eee",
    cursor: "pointer",
  };

  const selectedChartDayButtonStyle = {
    ...chartDayButtonStyle,
    backgroundColor: "#ccc",
  };

  return (
    <>
      <div className="coin_chart">
        <canvas style={{}} ref={chartRef}></canvas>

        <div className="duartion_btns">
          {chartDays.map((day) => (
            <button
              key={day.value}
              onClick={() => handleDaySelect(day.value)}
              style={
                day.value === days
                  ? selectedChartDayButtonStyle
                  : chartDayButtonStyle
              }
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CoinInfo;
