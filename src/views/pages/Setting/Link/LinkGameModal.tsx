import React, { useState, useRef } from "react";
import { Modal } from "antd";
import { Input } from "antd";

const Linksteam = ({
  visible,
  setVisible,
  linkGame,
  position,
  onSubmit,
}: any) => {
  const [validation, setValidation] = useState("");
  const InputGameUniqueId: any = useRef();
  const onSubmitHandler = () => {
    if (InputGameUniqueId.current.input.value === "") {
      setValidation("This field is required.");
    } else {
      const payload: any = {
        type: linkGame.type,
        link_game_id: linkGame.id,
        linked_game_username: InputGameUniqueId.current.input.value,
        linked: true,
      };
      onSubmit(payload, position);
      (document.getElementById("uniqueGameID") as HTMLInputElement).value = "";
      InputGameUniqueId.current.value = "";
      setVisible(false);
    }
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
      <div className="relative bg-[#0E1518] text-white w-[700px] px-24">
        {/* Content */}
        <div className="flex flex-col gap-[24px] px-[30px] py-[30px] w-full">
          <div className="flex items-center justify-center w-full gap-2 ">
            <img
              src={linkGame?.logo}
              alt="linkgamelogo"
              className="h-52 w-52 object-contain"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-2 px-6 py-3">
            <p className="text-base font-light">
              Please connect to your {linkGame?.title} ID game
            </p>
          </div>
          <p className="text-[#fff] text-base font-semibold">USERNAME</p>
          <div className="w-full h-12 border-l-4 border-[#94bd4b] bg-[#2e2e2e] relative">
            <Input
              className="text-[#fff] text-base font-semibold bg-[#2e2e2e] absolute left-0 top-2"
              id="uniqueGameID"
              bordered={false}
              placeholder={`${linkGame?.title} game username`}
              ref={(ref) => {
                InputGameUniqueId.current = ref as Input;
              }}
            />
          </div>
          <span style={{ color: "red" }}>{validation}</span>
          <div className="flex flex-col items-center justify-center w-full ">
            <button
              className="mt-6 w-full h-16 bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-xl font-bold tracking-widest"
              onClick={() => {
                onSubmitHandler();
              }}
            >
              LINK GAME ID
            </button>
            <button
              className="mt-6 w-full h-16 bg-[#000] rounded border-2 border-[#6BB8E7] text-xl font-bold tracking-widest"
              onClick={async () => {
                await setVisible(false);
              }}
            >
              NOT NOW
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Linksteam;
