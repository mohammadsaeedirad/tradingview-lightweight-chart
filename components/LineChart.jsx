import React, { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
const lightWeightChart = () => {
  const candlestick = [
    {
      time: "2018-12-22",
      open: 75.16,
      high: 82.84,
      low: 36.16,
      close: 45.72,
    },
    {
      time: "2018-12-23",
      open: 45.12,
      high: 53.9,
      low: 45.12,
      close: 48.09,
    },
    {
      time: "2018-12-24",
      open: 60.71,
      high: 60.71,
      low: 53.39,
      close: 59.29,
    },
    {
      time: "2018-12-25",
      open: 68.26,
      high: 68.26,
      low: 59.04,
      close: 60.5,
    },
    {
      time: "2018-12-26",
      open: 67.71,
      high: 105.85,
      low: 66.67,
      close: 91.04,
    },
    {
      time: "2018-12-27",
      open: 91.04,
      high: 121.4,
      low: 82.7,
      close: 111.4,
    },
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
    {
      time: "2018-12-30",
      open: 106.33,
      high: 110.2,
      low: 90.39,
      close: 98.1,
    },
    {
      time: "2018-12-31",
      open: 109.87,
      high: 114.69,
      low: 85.66,
      close: 111.26,
    },
  ];
  const data = [
    { time: "2018-12-1", value: 39.81 },
    { time: "2018-12-7", value: 36.81 },
    { time: "2018-12-14", value: 45.81 },
    { time: "2018-12-4", value: 35.99 },
    { time: "2018-12-5", value: 34.81 },
    { time: "2018-12-6", value: 33.81 },
    { time: "2018-12-7", value: 36.81 },
    { time: "2018-12-8", value: 29.81 },
    { time: "2018-12-9", value: 30.81 },
    { time: "2018-12-10", value: 27.81 },
    { time: "2018-12-11", value: 31.11 },
    { time: "2018-12-12", value: 27.81 },
    { time: "2018-12-13", value: 26.81 },
    { time: "2018-12-14", value: 27.81 },
    { time: "2018-12-15", value: 28.61 },
    { time: "2018-12-16", value: 32.21 },
    { time: "2018-12-17", value: 30.51 },
    { time: "2018-12-18", value: 26.51 },
    { time: "2018-12-19", value: 32.51 },
    { time: "2018-12-20", value: 29.51 },
    { time: "2018-12-21", value: 30.51 },
    { time: "2018-12-22", value: 32.51 },
    { time: "2018-12-23", value: 31.11 },
    { time: "2018-12-24", value: 27.02 },
    { time: "2018-12-25", value: 27.32 },
    { time: "2018-12-26", value: 25.17 },
    { time: "2018-12-27", value: 28.89 },
    { time: "2018-12-28", value: 25.46 },
    { time: "2018-12-29", value: 23.92 },
    { time: "2018-12-30", value: 22.68 },
    { time: "2018-12-31", value: 22.67 },
  ];
  const backgroundColor = "#222328";
  const lineColor = "rgba(0, 172, 59, 0.32)";
  const textColor = "white";
  const areaTopColor = "rgba(0, 172, 59, 0.03)";
  const areaBottomColor = "rgba(0, 172, 59, 0.02)";

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      localization: {
        dateFormat: "yyyy-MM-dd HH:mm",
      },
      priceLineVisible: false,
      lastValueVisible: false,
      overlay: true,
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      grid: {
        vertLines: {
          color: "#222328",
        },
        horzLines: {
          color: "#222328",
        },
      },
      priceScale: {
        borderColor: "#485c7b",
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });
    chart.timeScale().fitContent();

    const areaSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    areaSeries.setData(data);
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    });
    candlestickSeries.setData(candlestick);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    candlestick,
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};

export default lightWeightChart;
