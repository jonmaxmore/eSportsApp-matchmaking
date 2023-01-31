import React, { useState } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";
import ICBUSD from "../../../../assets/images/Market/ic-busd.png";
import ICBLC from "../../../../assets/images/Market/ic-blc.png";

const ModalBoughtBLC = ({ visible, setVisible, onSubmit = () => {} }: any) => {
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
          <p className="text-lg font-bold py-4">YOU BOUGHT BLC PACK</p>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-[24px] overflow-auto px-[76px] py-[30px] w-full">
          <div className="flex flex-col items-center justify-center w-full gap-2 px-6 py-10 bg-[#15252D]">
            <div className="flex items-center gap-2">
              <p>You recieve</p>
              <img src={ICBLC} alt="" className="w-[34px] h-[34px]" />
              <p className="font-bold">250 BLC</p>
            </div>
            <div className="flex items-center gap-2">
              <p>Your current balance is now</p>
              <img src={ICBLC} alt="" className="w-[34px] h-[34px]" />
              <p className="font-bold">10,000,249 BLC</p>
            </div>
          </div>

          <button
            className="w-full px-10 h-[60px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
            onClick={async () => {
              await setVisible(false);
              await onSubmit();
            }}
          >
            GOT IT
          </button>
        </div>
      </div>
    </Modal>
  );
};

const ModalConfirmPayment = ({
  item,
  visible,
  setVisible,
  onSubmit = () => {},
}: any) => {
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
          <p className="text-lg font-bold py-4">CONFIRM PAYMENT</p>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-[24px] overflow-auto px-[76px] py-[30px] w-full">
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between items-center">
              <p className="flex items-center gap-4">
                <span>
                  <img src={ICBUSD} alt="" className="w-[34px] h-[34px]" />
                </span>{" "}
                20.000000012
              </p>
              <p className="font-bold">BUSD</p>
            </div>
          </div>

          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between items-center">
              <p className="flex items-center gap-4">
                <span>
                  <img src={ICBLC} alt="" className="w-[34px] h-[34px]" />
                </span>{" "}
                {item.name}
              </p>
            </div>
            <p className="text-sm">
              Output is estimated. You will recieve at least 250 BLC or the
              transaction will revert
            </p>
          </div>

          <div className="flex flex-col w-full gap-2 px-6 py-4 bg-[#15252D]">
            <div className="flex justify-between">
              <p>Price</p>
              <p className="font-bold">1.61074 BUSD/BLC</p>
            </div>
            <div className="flex justify-between">
              <p>Minimum recieved</p>
              <p className="font-bold">0.5%</p>
            </div>
            <div className="flex justify-between">
              <p>Price Impact</p>
              <p className="font-bold">{"<0.01%"}</p>
            </div>
            <div className="flex justify-between">
              <p>Liquidity Provider Fee</p>
              <p className="font-bold">0.1219 BUSD</p>
            </div>
          </div>

          <button
            className="w-full px-10 h-[60px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
            onClick={() => setOpenConfirm(true)}
          >
            CONFIRM
          </button>
          <ModalBoughtBLC
            visible={isOpenConfirm}
            setVisible={setOpenConfirm}
            onSubmit={async () => {
              await setVisible(false);
              await onSubmit();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmPayment;
