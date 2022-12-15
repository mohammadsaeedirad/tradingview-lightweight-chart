import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
const LineChart = dynamic(() => import("../components/LineChart"), {
  ssr: false,
});
const CandleStickChart = dynamic(
  () => import("../components/CandleStickChart"),
  {
    ssr: false,
  }
);
const MixCandleLineChart = dynamic(
  () => import("../components/MixCandleLineChart"),
  {
    ssr: false,
  }
);
const CustomLocalFontPriceChart = dynamic(
  () => import("../components/CustomLocalFontPriceChart"),
  {
    ssr: false,
  }
);
const PriceLinesChart = dynamic(() => import("../components/PriceLinesChart"), {
  ssr: false,
});
export const ChartComponent = (props) => {};
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={`container mx-auto my-10 grid grid-cols-3  gap-4`}>
        <div className='w-full p-5 border border-gray-500 rounded-lg '>
          <LineChart />
          <p>Line chart</p>
        </div>
        <div className='w-full p-5 border border-gray-500 rounded-lg '>
          <CandleStickChart />
          <p>CandleStick chart</p>
        </div>
        <div className='w-full p-5 border border-gray-500 rounded-lg '>
          <MixCandleLineChart />
          <p>Mix CandleLine chart</p>
        </div>
        <div className='w-full p-5 border border-gray-500 rounded-lg '>
          <CustomLocalFontPriceChart />
          <p>Custom Local Font Price</p>
        </div>
        <div className='w-full p-5 border border-gray-500 rounded-lg '>
          <PriceLinesChart />
          <p>PriceLine chart</p>
        </div>
      </div>
    </div>
  );
}
