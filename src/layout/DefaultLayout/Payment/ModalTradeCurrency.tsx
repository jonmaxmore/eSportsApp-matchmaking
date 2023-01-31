import React, { useState, useEffect, useRef } from "react";
import { Modal } from "antd";
import { XIcon, ChevronDownIcon } from "@heroicons/react/solid";
import ICBUSD from "../../../assets/images/Market/ic-busd.png";
import ICBLC from "../../../assets/images/Market/ic-blc.png";
import ICSwap from "../../../assets/images/Market/ic-swap.png";
import ModalConfirm from "./ModalConfirm";
import Select from "react-select";

import "chart.js/auto";
import type { ChartData, ChartArea } from "chart.js";
import { Chart as ChartJS } from "chart.js";
import { Chart } from "react-chartjs-2";

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  chartArea: {
    backgroundColor: "#0F1525",
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const colourStyles: any = {
  container: (styles: any) => ({
    ...styles,
    width: "100%",
    outlineColor: "transparent",
  }),
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    width: "100%",
  }),
  option: (styles: any) => ({
    ...styles,
    backgroundColor: "transparent",
  }),
  menu: (styles: any) => ({
    ...styles,
    backgroundColor: "#121B1F",
  }),
  indicatorSeparator: (styles: any) => ({
    ...styles,
    display: "none",
  }),
  input: (styles: any) => ({ ...styles, backgroundColor: "transparent" }),
};

const coins = [
  { name: "BUSD", img: ICBUSD, balance: 24.4168 },
  { name: "BLC", img: ICBLC, balance: 24.4168 },
  { name: "BTC", img: ICBUSD, balance: 1 },
  { name: "ETH", img: ICBUSD, balance: 10 },
];

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const gradient = ctx.createLinearGradient(0, area.bottom, 100, area.top);

  gradient.addColorStop(1, "#1C7EAA");
  gradient.addColorStop(0, "transparent");
  return gradient;
}

const ModalTradeCurrency = ({ visible, setVisible }: any) => {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<"line">>({
    datasets: [],
  });

  const [isOpenConfirm, setOpenConfirm] = useState(false);

  const [activeTab, setActiveTab] = useState("24H");

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const chartData = {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: labels.map(() => Math.round(Math.random() * 1000)),
          borderColor: "#62B6EC",
          backgroundColor: createGradient(chart.ctx, chart.chartArea),
          fill: "start",
        },
      ],
    };

    setChartData(chartData);
  }, [visible, activeTab]);

  const selectOptions = coins.map((coin) => ({
    value: coin,
    label: (
      <div className="flex justify-between items-center" key = {coin.name}>
        <div className="flex gap-2 items-center text-white">
          <img
            alt="coin"
            src={coin.img}
            className="w-[35px] h-[35px] object-contain"
          />
          <p>{coin.name}</p>
        </div>
        <p className="text-white">Balance {coin.balance}</p>
      </div>
    ),
  }));

  return (
    <Modal
      visible={visible}
      footer={null}
      title={null}
      closable={false}
      bodyStyle={{ padding: "0px" }}
      className="p-0 w-full h-auto flex items-center justify-center scale-75 tall:scale-100 wide:scale-100"
    >
      <div className="relative bg-[#0E1518] text-white">
        {/* Close */}
        <div
          className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-r from-[#122e3a] to-[#0e1719] rounded-lg shadow-lg"
          onClick={() => setVisible(false)}
        >
          <XIcon className="text-bold w-[18px] h-[18px] font-bold text-white" />
        </div>
        {/* Title */}
        <div className="flex flex-col h-[64px] justify-center px-8 text-left min-w-[600px] bg-gradient-to-r from-[#122e3a] to-[#0e1719] border-l-[6px] border-l-[#95be4c]">
          <p className="text-lg font-bold py-4">TRADE CURRENCY</p>
        </div>

        {/* Content */}
        <div
          className="grid grid-cols-12 gap-[40px] overflow-auto px-[60px] py-[40px] w-[1500px]"
          // style={{ maxHeight: "calc(100vh - 300px)" }}
        >
          {/* Chart */}
          <div className="col-span-8">
            <div className="flex flex-col bg-[#142128] shadow px-[34px] py-[22px]">
              {/* Coin Price */}
              <div className="flex flex-row justify-between">
                {/* Coin Price */}
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3 items-center">
                    <img
                      alt="coin"
                      src={ICBUSD}
                      className="w-[35px] h-[35px] object-contain"
                    />
                    <img
                      alt="swap"
                      src={ICSwap}
                      className="w-[35px] h-[35px] object-contain"
                    />
                    <img
                      alt="coin"
                      src={ICBLC}
                      className="w-[35px] h-[35px] object-contain"
                    />
                    <p className="font-bold">BUSD/BLC</p>
                  </div>
                  <div className="flex flex-col gap-2 whitespace-nowrap">
                    <p className="text-lg font-bold text-[#95be4c]">
                      0.623
                      <span className="text-white text-base ml-2">
                        BUSD/BLC
                      </span>
                      <span className="text-[#62B6EC] text-base ml-2">
                        -0.030 (-4.64%)
                      </span>
                    </p>
                    <p>Feb 15, 2022, 13:48</p>
                  </div>
                </div>
                {/* Tabs */}
                <div className="flex flex-row flex-wrap items-center gap-8 h-[55px] text-[#D8D8D8] overflow-hidden">
                  {["24H", "1W", "1M", "1Y"].map((marketTab: any, index:number) => (
                    <p
                    key={index}
                      className={`flex items-center justify-center rounded-full w-[72px] px-8 h-[30px] bg-[#00000030] cursor-pointer transition ${
                        activeTab === marketTab &&
                        "!bg-[#95BE4C] !text-black !font-black"
                      }`}
                      onClick={() => setActiveTab(marketTab)}
                    >
                      {marketTab}
                    </p>
                  ))}
                </div>
              </div>
              <br />
              <Chart
                ref={chartRef}
                type="line"
                options={options}
                data={chartData}
              />
            </div>
          </div>
          {/* Swap */}
          <div className="col-span-4 shadow">
            <div className="flex flex-col h-[64px] justify-center items-center px-8 text-left bg-gradient-to-r from-[#122e3a] to-[#0e1719] border-l-[6px] border-l-[#95be4c]">
              SWAP
            </div>
            <div className="flex flex-col items-center p-10 bg-gradient-to-tl from-[#142128] to-[#14212A] gap-5">
              {/* From coin */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-2 items-center w-full">
                  <Select
                    defaultValue={selectOptions[0]}
                    options={selectOptions}
                    styles={colourStyles}
                  />
                </div>
                <input
                  type="number"
                  className="h-[45px] w-full border-l-[5px] border-solid border-[#95BE4C] pl-3 text-white bg-[#2E2E2E]"
                  placeholder="Enter amount"
                />
              </div>

              <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#0F191F]">
                <ChevronDownIcon className="text-bold w-[22px] h-[22px] font-bold text-[#62B6EC]" />
              </div>

              {/* To coin */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-2 items-center w-full">
                  <Select
                    defaultValue={selectOptions[1]}
                    options={selectOptions}
                    styles={colourStyles}
                  />
                </div>
                <input
                  type="number"
                  className="h-[45px] w-full border-l-[5px] border-solid border-[#95BE4C] pl-3 text-white bg-[#2E2E2E]"
                  placeholder="Enter amount"
                />
              </div>

              <div className="flex flex-col w-full gap-2">
                <div className="flex justify-between">
                  <p className="">Price</p>
                  <p className="font-bold">0.0 BUSD per BLC</p>
                </div>
                <div className="flex justify-between">
                  <p className="">Slippage Tolerance</p>
                  <p className="font-bold text-[#95BE4C]">0.5%</p>
                </div>
              </div>

              {/* Exchange */}
              <button
                className="w-full px-10 h-[60px] mt-[60px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
                onClick={() => setOpenConfirm(true)}
              >
                EXCHANGE
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalConfirm visible={isOpenConfirm} setVisible={setOpenConfirm} />
    </Modal>
  );
};

export default ModalTradeCurrency;
