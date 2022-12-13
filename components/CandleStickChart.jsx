import React, { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
const lightWeightChart = () => {
  const candlestickSeries = [
    { time: "2018-12-22", open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
    { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
    { time: "2018-12-24", open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
    { time: "2018-12-25", open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
    { time: "2018-12-26", open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
    { time: "2018-12-27", open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
    {
      time: "2018-12-28",
      open: 111.51,
      high: 142.83,
      low: 103.34,
      close: 131.25,
    },
    {
      time: "2018-12-29",
      open: 131.33,
      high: 151.17,
      low: 77.68,
      close: 96.43,
    },
    { time: "2018-12-30", open: 106.33, high: 110.2, low: 90.39, close: 98.1 },
    {
      time: "2018-12-31",
      open: 109.87,
      high: 114.69,
      low: 85.66,
      close: 111.26,
    },
  ];
  const backgroundColor = "black";
  const lineColor = "#2962FF";
  const textColor = "white";
  const areaTopColor = "#2962FF";
  const areaBottomColor = "rgba(41, 98, 255, 0.28)";

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        backgroundColor: "#1c1f2d",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "#334158",
        },
        horzLines: {
          color: "#334158",
        },
      },
      priceScale: {
        borderColor: "#485c7b",
      },
      timeScale: {
        borderColor: "#485c7b",
        rightOffset: 2,
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    });
    // newSeries.setData(data);
    newSeries.setData(candlestickSeries);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    // data,
    candlestickSeries,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};

export default lightWeightChart;
