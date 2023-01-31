import React, { useState } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";

const ModalEditIntroduction = ({
  item,
  visible,
  setVisible,
  onSubmit = () => {},
}: any) => {
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
        <div className="flex flex-col h-[84px] justify-center items-center text-center min-w-[700px] bg-gradient-to-r from-[#122e3a] to-[#0e1719]">
          <p className="text-lg font-bold py-4">MY INTRODUCTION</p>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-[28px] overflow-auto px-9 py-[30px] w-full">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex justify-between">
              <p className="font-bold">SOMETHING ABOUT YOURSELF</p>
            </div>
            <textarea
              className="h-[135px] w-full border-l-[5px] border-solid border-[#95BE4C] p-3 text-white bg-[#2E2E2E]"
              placeholder="Introduce yourself to your clan here..."
            />
          </div>

          <div className="flex gap-4">
            <button
              className="px-10 h-14 bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest whitespace-nowrap"
              onClick={() => setVisible(false)}
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditIntroduction;
