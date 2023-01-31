import { useState } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";

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
          <p className="text-lg font-bold py-4">BUY ITEM</p>
        </div>

        <div className="flex flex-col gap-4 pt-[44px] pb-[60px] px-[160px]">
          <div className="flex flex-col py-6 gap-8 text-center whitespace-nowrap">
            {message}
            <p>*You can't resell this item in the marketplace for one week</p>
          </div>
          {/* Buttons */}
          <div className="flex flex-col self-center gap-4">
            <button
              className="w-[300px] px-10 h-[60px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
              onClick={handleConfirm}
            >
              BUY
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

const ModalBuy = ({ item = {}, visible, setVisible }: any) => {
  const marketPrices = [
    [20, 2],
    [22.5, 1],
    [25, 3],
    [26, 2],
    [27, 1],
    [28, 2],
  ];

  const [isOpenConfirm, setOpenConfirm] = useState(false);

  const handleBuy = () => {
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
          <p className="text-lg font-bold py-4">BUY ITEM</p>
        </div>

        {/* Item Detail */}
        <div className="flex gap-4 py-6 px-9 text-center">
          {/* Details */}
          <div className="flex flex-col flex-1 gap-4">
            <div className="flex gap-4 justify-center">
              <img
                src={item.img}
                alt="item"
                className="w-auto h-[110px] object-contain bg-[#08455E] rounded-lg"
              />
            </div>

            <p className="font-bold text-lg">{item.name}</p>

            {/* Item detail */}
            <div className="flex flex-col gap-2 p-4 bg-[#0E1A21] text-left">
              <p className="font-bold text-[#58AFE6]">Item Description</p>
              <p className="text-white">{item.description}</p>
              <hr className="border-t-1 border-solid border-white" />

              <p className="font-bold text-[#95BE4C]">View in market</p>
              <p className="text-sm text-white">Starting at {item.price} $</p>
              <p className="text-sm text-white">
                Volumn: {item.volumn} in the last 24 hours.
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-1 flex-col bg-[#090E10]">
            {/* Market price */}
            <div className="flex flex-col p-4">
              <div className="flex h-[45px]">
                <p className="flex flex-1 font-bold text-[#6BB8E7] items-center">
                  Price
                </p>
                <p className="flex flex-1 font-bold text-[#6BB8E7] justify-center">
                  Amount
                </p>
              </div>
              <div className="w-full">
                {marketPrices.map(([price, amount], i) => (
                  <div
                    className={`flex h-[45px] ${i % 2 === 0 && "bg-[#131E23]"}`}
                  >
                    <p className="flex flex-1 font-bold text-white pl-2 items-center">
                      {price} $
                    </p>
                    <p className="flex flex-1 font-bold text-white justify-center items-center">
                      {amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="w-full px-10 h-[60px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
              onClick={() => setOpenConfirm(true)}
            >
              BUY
            </button>
            <ModalConfirm
              message={
                <p className="text-lg">
                  Are you sure you want to buy{" "}
                  <span className="font-bold text-[#6BB8E7]">{item.name}</span>{" "}
                  for{" "}
                  <span className="font-bold text-[#6BB8E7]">
                    {item.price} $
                  </span>{" "}
                  ?
                </p>
              }
              visible={isOpenConfirm}
              setVisible={setOpenConfirm}
              onConfirm={handleBuy}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalBuy;
