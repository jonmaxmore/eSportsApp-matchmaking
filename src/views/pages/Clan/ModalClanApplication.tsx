import React, { useState } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";

const ModalClanApplication = ({
  item,
  visible,
  setVisible,
  onSubmit = () => {},
}: any) => {
  const messages = [
    {
      message:
        "Hi clan leader, I would like to join your clan for socializing and finding new friends. I'm online almost everyday in the evening. Thank you for your time ~-^ I'm looking forwards to be part of the Lawbreaker!!!",
      date: "27-01-22",
      user: "Dayvee13",
    },
    {
      message:
        "Hey, I would like to join your clan because the name is so cooooool! and I love to play Leauge of Legends. Cheers!",
      date: "27-01-22",
      user: "Hakuta",
    },
    {
      message: null,
      date: "27-01-22",
      user: "GGEZ",
    },
  ];

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
          className="absolute top-0 right-0 mt-2 mr-5 cursor-pointer flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-r from-[#122e3a] to-[#0e1719] rounded-lg shadow-lg"
          onClick={() => setVisible(false)}
        >
          <XIcon className="text-bold w-[18px] h-[18px] font-bold text-white" />
        </div>
        {/* Title */}
        <div className="flex flex-col h-[65px] pl-12 justify-center items-start text-center min-w-[900px] bg-gradient-to-r from-[#122e3a] to-[#0e1719] border-l-[5px] border-solid border-primary-green">
          <p className="text-lg font-bold py-4">CLAN APPLICATION</p>
        </div>

        {/* Content */}
        <div
          className="flex flex-col items-center gap-16 overflow-auto px-12 py-8 w-full"
          style={{ height: "calc(100vh - 280px)" }}
        >
          {/* Items */}
          {messages.map((message) => (
            <div className="relative flex flex-col w-full py-5 px-8 pb-12 gap-2 bg-[#0F181B] shadow-2xl shadow-black">
              <div className="flex justify-between items-center">
                <p className="text-primary-gray">{message.date}</p>
                <p>
                  from <span className="font-extrabold">{message.user}</span>{" "}
                  <span className="px-1 h-[28px] text-sm rounded font-bold bg-[#222B34]">
                    12
                  </span>
                </p>
                <p className="text-primary-green">3 trophies earned</p>
              </div>
              <div
                className={`px-6 py-6 bg-[#1A1F20] ${
                  !message.message && "text-primary-gray"
                }`}
              >
                {message.message || "No application letter"}
              </div>

              <div className="flex gap-2 absolute bottom-0 right-0 -mb-6 mr-8">
                <button
                  className="w-[160px] px-10 h-14 bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
                  onClick={() => setVisible(false)}
                >
                  ACCEPT
                </button>
                <button
                  className="w-[160px] px-10 h-14 rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
                  onClick={() => setVisible(false)}
                >
                  DECLINE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalClanApplication;
