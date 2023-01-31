import React, { useState } from "react";
import { Modal } from "antd";
import { XIcon, ChevronDownIcon } from "@heroicons/react/solid";
import ICBUSD from "../../../../assets/images/Market/ic-busd.png";
import ICBLC from "../../../../assets/images/Market/ic-blc.png";
import ModalConfirmPayment from "./ModalConfirmPayment";

const ModalPayWith = ({ item, visible, setVisible }: any) => {
  const balance = 24.4168;
  const [payAmount, setPayAmount] = useState("0");
  const [isOpenConfirm, setOpenConfirm] = useState(false);

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
          <p className="text-lg font-bold py-4">PAY WITH</p>
        </div>

        {/* Content Items */}
        <div className="flex flex-col items-center gap-[24px] overflow-auto px-[76px] py-[30px] w-full">
          {/* Pay with */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between items-center">
              <p className="flex items-center font-bold gap-2">
                <span>
                  <img src={ICBUSD} alt="" className="w-[34px] h-[34px]" />
                </span>{" "}
                BUSD
              </p>
              <p>Balance {balance}</p>
            </div>
            <input
              type="number"
              className="h-[45px] w-full border-l-[5px] border-solid border-[#95BE4C] pl-3 text-white bg-[#2E2E2E]"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
            />
          </div>

          <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#0F191F]">
            <ChevronDownIcon className="text-bold w-[22px] h-[22px] font-bold text-[#62B6EC]" />
          </div>

          {/* To BLC */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between items-center">
              <p className="flex items-center font-bold gap-2">
                <span>
                  <img src={ICBLC} alt="" className="w-[34px] h-[34px]" />
                </span>{" "}
                BLC PACK
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold text-[#6BB8E7]">{item.name}</p>
              <p className="font-bold text-[#95BE4C]">{item.price} $</p>
            </div>
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

          {/* Proceed */}
          <button
            className="w-full px-10 h-[60px] mt-[60px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
            onClick={() => setOpenConfirm(true)}
          >
            PROCEED
          </button>
          <ModalConfirmPayment
            item={item}
            visible={isOpenConfirm}
            setVisible={setOpenConfirm}
            onSubmit={async () => {
              await setVisible(false);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalPayWith;
