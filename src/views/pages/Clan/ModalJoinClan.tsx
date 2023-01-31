import React, { useState } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";

const ModalConfirm = ({ visible, setVisible, onSubmit = () => {} }: any) => {
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
          <p className="text-lg font-bold py-4">
            YOUR CLAN APPLICATION IS SENT
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-[24px] overflow-auto px-[76px] py-[30px] w-full">
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between items-center">
              <p className="text-center">
                Your clan application has been sent to the clan leader. Please
                wait for their response before you can join their clan.
              </p>
            </div>
          </div>

          <button
            className="w-1/2 px-10 h-14 bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
            onClick={onSubmit}
          >
            GOT IT
          </button>
        </div>
      </div>
    </Modal>
  );
};

const ModalCannotSent = ({ visible, setVisible, onSubmit = () => {} }: any) => {
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
          <p className="text-lg font-bold py-4">YOUR CAN'T JOIN THIS CLAN</p>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-[24px] overflow-auto px-[76px] py-[30px] w-full">
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between items-center">
              <p className="text-center">
                Sorry, you can't join this clan because you don't have enough
                trophy in your profle. Try other clans or create your own.
              </p>
            </div>
          </div>

          <button
            className="w-1/2 px-10 h-14 bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
            onClick={onSubmit}
          >
            GOT IT
          </button>
        </div>
      </div>
    </Modal>
  );
};

const ModalJoinClan = ({
  item,
  visible,
  setVisible,
  onSubmit = () => {},
}: any) => {
  const [isOpenConfirm, setOpenConfirm] = useState(false);
  const [isOpenCannotSent, setOpenCannotSent] = useState(false);

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
          <p className="text-lg font-bold py-4">CLAN APPLICATION LETTER</p>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-[28px] overflow-auto px-9 py-[30px] w-full">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex justify-between">
              <p className="font-bold">
                APPLICATION LETTER{" "}
                <span className="text-primary-green">(SCPN)</span>
              </p>
              <p>0/200</p>
            </div>
            <textarea
              className="h-[135px] w-full border-l-[5px] border-solid border-[#95BE4C] p-3 text-white bg-[#2E2E2E]"
              placeholder="Write something about yourself and why do you want to join our clan..."
            />
          </div>

          <div className="flex gap-4">
            <button
              className="w-1/2 px-10 h-14 bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest whitespace-nowrap"
              onClick={() => setOpenConfirm(true)}
            >
              SEND
            </button>
            <button
              className="w-1/2 px-10 h-14 bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest whitespace-nowrap"
              onClick={() => setOpenCannotSent(true)}
            >
              CANCEL
            </button>
          </div>
          <ModalConfirm
            visible={isOpenConfirm}
            setVisible={setOpenConfirm}
            onSubmit={async () => {
              await setOpenConfirm(false);
              await setVisible(false);
            }}
          />
          <ModalCannotSent
            visible={isOpenCannotSent}
            setVisible={setOpenCannotSent}
            onSubmit={async () => {
              await setOpenCannotSent(false);
              await setVisible(false);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalJoinClan;
