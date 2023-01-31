import { useState } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.round(Math.random() * 1000)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const ModalConfirm = ({
  message,
  visible,
  setVisible,
  onConfirm = () => {},
}: any) => {
  const handleConfirm = async () => {
    await setVisible(false);
    onConfirm();
  };
  return (
    <Modal
      visible={visible}
      footer={null}
      title={null}
      closable={false}
      bodyStyle={{ padding: "0px" }}
      className="p-0 w-full h-auto flex items-center justify-center"
    >
      <div className="relative bg-[#0E1518] text-white">
        {/* Close */}
        <div
          className="absolute top-0 right-0 mt-5 mr-5 cursor-pointer flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-r from-[#122e3a] to-[#0e1719] rounded-lg shadow-lg"
          onClick={() => setVisible(false)}
        >
          <XIcon className="text-bold w-[18px] h-[18px] font-bold text-white" />
        </div>
        {/* Title */}
        <div className="flex flex-col h-[84px] justify-center items-center text-center min-w-[600px] bg-gradient-to-r from-[#122e3a] to-[#0e1719]">
          <p className="text-lg font-bold py-4">SELL ITEM</p>
        </div>

        <div className="flex flex-col gap-4 pt-[44px] pb-[60px] px-[160px]">
          <div className="flex flex-col py-6 text-center whitespace-nowrap">
            {message}
          </div>
          {/* Buttons */}
          <div className="flex flex-col self-center gap-4">
            <button
              className="w-[300px] px-10 h-[60px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
              onClick={handleConfirm}
            >
              SELL
            </button>

            <button
              className="w-[300px] px-10 h-[60px] bg-[#0D1619] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
              onClick={() => setVisible(false)}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const ModalSell = ({ item = {}, visible, setVisible }: any) => {
  const [isOpenConfirm, setOpenConfirm] = useState(false);

  const [sellPrice, setSellPrice] = useState(item.price);

  const handleSell = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      footer={null}
      title={null}
      closable={false}
      bodyStyle={{ padding: "0px" }}
      className="p-0 w-full h-auto flex items-center justify-center"
    >
      <div className="relative bg-[#0E1518] text-white">
        {/* Close */}
        <div
          className="absolute top-0 right-0 mt-5 mr-5 cursor-pointer flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-r from-[#122e3a] to-[#0e1719] rounded-lg shadow-lg"
          onClick={() => setVisible(false)}
        >
          <XIcon className="text-bold w-[18px] h-[18px] font-bold text-white" />
        </div>
        {/* Title */}
        <div className="flex flex-col h-[84px] justify-center items-center text-center min-w-[600px] bg-gradient-to-r from-[#122e3a] to-[#0e1719]">
          <p className="text-lg font-bold py-4">SELL ITEM</p>
        </div>

        {/* Item Detail */}
        <div className="flex flex-col py-6 px-9 text-center">
          <p className="font-bold text-lg">{item.name}</p>
          <p className="">
            Are you sure you want to sell this item from your inventory?
          </p>
          <div className="flex gap-4 justify-center py-4">
            <img
              src={item.img}
              alt="item"
              className="w-auto h-[110px] object-contain"
            />
            <div className="flex flex-col pl-8 items-center justify-center">
              <div className="flex items-center">
                <p className="w-[120px]">You'll recieve:</p>
                <input
                  type="text"
                  className="h-[45px] w-[136px] border-l-[5px] border-solid border-[#95BE4C] pl-3 text-white bg-[#2E2E2E]"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <p className="w-[120px]">Player but for:</p>
                <p className="h-[45px] leading-[45px] w-[136px] border-l-[5px] border-solid border-transparent pl-3 text-left">
                  {item.price} $
                </p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div>
            <Line options={options} data={data} />
          </div>

          {/* Buttons */}
          <div className="flex gap-[52px] mt-4">
            <button
              className="w-full px-10 h-[60px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
              onClick={() => setOpenConfirm(true)}
            >
              PUT ON SELL
            </button>
            <ModalConfirm
              message={
                <p className="text-lg">
                  Are you sure you want to sell{" "}
                  <span className="font-bold text-[#6BB8E7]">{item.name}</span>{" "}
                  for{" "}
                  <span className="font-bold text-[#6BB8E7]">
                    {sellPrice} $
                  </span>{" "}
                  ?
                </p>
              }
              visible={isOpenConfirm}
              setVisible={setOpenConfirm}
              onConfirm={handleSell}
            />

            <button
              className="w-full px-10 h-[60px] bg-[#0D1619] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
              onClick={() => setVisible(false)}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSell;
