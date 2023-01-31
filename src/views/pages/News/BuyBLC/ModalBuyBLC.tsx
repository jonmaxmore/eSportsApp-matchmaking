import React, { useState } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";
import ICBLC20 from "../../../../assets/images/Market/ic-blc-20.png";
import ModalPayWith from "./ModalPayWith";

const ModalBuyBLC = ({ visible, setVisible }: any) => {
  const items = [
    {
      img: ICBLC20,
      name: "20 BLC",
      price: 2.99,
      description: "20 BLC",
    },
    {
      img: ICBLC20,
      name: "50 BLC",
      price: 4.99,
      description: "50 BLC",
    },
    {
      img: ICBLC20,
      name: "100 BLC + 10 BLC",
      price: 9.99,
      description: "100 BLC + 10 BLC",
    },
    {
      img: ICBLC20,
      name: "200 BLC + 50 BLC",
      price: 19.99,
      description: "200 BLC + 50 BLC",
    },
    {
      img: ICBLC20,
      name: "500 BLC + 100 BLC",
      price: 49.99,
      description: "500 BLC + 100 BLC",
    },
    {
      img: ICBLC20,
      name: "1,000 BLC + 250 BLC",
      price: 99.99,
      description: "1,000 BLC + 250 BLC",
    },
    {
      img: ICBLC20,
      name: "3,500 BLC + 800 BLC",
      price: 349.99,
      description: "3,500 BLC + 800 BLC",
    },
    {
      img: ICBLC20,
      name: "5,000 BLC + 2,000 BLC",
      price: 499.99,
      description: "5,000 BLC + 2,000 BLC",
    },
  ];

  const [isOpenPayWith, setOpenPayWith] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null || items[0]);

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
          <p className="text-lg font-bold py-4">BUY BLC PACK</p>
        </div>

        {/* Market Items */}
        <div
          className="grid grid-cols-12 gap-[40px] overflow-auto px-[76px] py-[30px] w-[1300px]"
          style={{ maxHeight: "calc(100vh - 300px)" }}
        >
          {items.map((item) => (
            <div className="col-span-3 flex flex-col border-[3px] border-solid border-[#6BB8E7]">
              <div className="w-full h-[50px] leading-[50px] bg-gradient-to-b from-[#307499] to-[#010C13] text-white text-center text-lg">
                {item.name}
              </div>
              <div className="flex flex-col justify-center items-center gap-[20px] px-4 bg-gradient-to-b from-[#307499] to-[#010C13]">
                <img
                  className="w-full h-[140px] object-contain"
                  src={item.img}
                  alt="item"
                />
                <p className="w-[118px] h-[33px] leading-[33px] bg-[#00000030] rounded text-white text-center text-2xl font-bold">
                  {item.price} $
                </p>
                <button
                  className="w-[140px] h-[50px] -mb-[12px] bg-gradient-to-b from-[#CEF984] to-[#449522] text-black text-2xl rounded-full font-bold"
                  onClick={() => {
                    setOpenPayWith(true);
                    setSelectedItem(item);
                  }}
                >
                  BUY
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalPayWith
        item={selectedItem}
        visible={isOpenPayWith}
        setVisible={setOpenPayWith}
      />
    </Modal>
  );
};

export default ModalBuyBLC;
