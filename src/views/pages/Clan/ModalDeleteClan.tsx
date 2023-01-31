import React, { useState } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";

const ModalDeleteClan = ({
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
        <div className="flex flex-col h-[84px] justify-center items-center text-center min-w-[600px] bg-gradient-to-r from-[#122e3a] to-[#0e1719]">
          <p className="text-lg font-bold py-4">DELETE CLAN</p>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-[24px] overflow-auto px-[76px] py-[30px] w-full">
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between items-center">
              <p className="text-center">
                Are you sure you want to delete this clan? All your clan members
                wlil be disbanded from the clan
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full items-center">
            <button
              className="w-1/2 px-10 h-14 bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
              onClick={() => setVisible(false)}
            >
              CONFIRM
            </button>
            <button
              className="w-1/2 px-10 h-14 rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
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

export default ModalDeleteClan;
