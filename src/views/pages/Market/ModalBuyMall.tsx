import { useState } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";

const ModalBuyMall = ({ item = {}, visible, setVisible }: any) => {
  const marketPrices = [
    [20, 2],
    [22.5, 1],
    [25, 3],
    [26, 2],
    [27, 1],
    [28, 2],
  ];

  if (!item) return null;

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
          <p className="text-lg font-bold py-4">BUY {item.name}</p>
        </div>

        <div className="flex flex-col py-6 gap-8 text-center whitespace-nowrap">
          Are you sure you want to buy the following item?
        </div>

        {/* Item Detail */}
        <div className="flex flex-col items-center pb-6 px-9 justify-center">
          <div className="flex flex-col gap-4 w-full max-w-[430px]">
            <div className="w-full flex flex-col justify-center items-center gap-[20px] px-4 bg-gradient-to-b from-[#307499] to-[#010C13] border-[3px] border-solid border-[#6BB8E7]">
              <img
                className="w-full h-[140px] object-contain"
                src={item.img}
                alt="item"
              />
            </div>

            <div className="flex flex-col gap-2 p-4 bg-[#0E1A21] text-left">
              <p className="font-bold text-[#58AFE6]">Item Description</p>
              <p className="text-white">{item.description}</p>
              <p className="text-[#95BE4C]">
                Right-click to use the item in your profile inventory.
              </p>
            </div>
          </div>

          <div className="flex gap-[52px] mt-[40px] w-full">
            <button
              className="w-full px-10 h-[60px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
              onClick={() => setVisible(false)}
            >
              BUY
            </button>

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

export default ModalBuyMall;
