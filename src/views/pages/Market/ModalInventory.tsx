import { useState } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";

import ICShieldWood from "../../../assets/images/Market/ic-shied_wood.png";
import ICBow from "../../../assets/images/Market/ic-bow.png";
import ModalSell from "./ModalSell";

type InventoryType =
  | "ALL"
  | "Head"
  | "Eyes"
  | "Mouth"
  | "Shirt"
  | "Hand"
  | "Shoe"
  | "Aura"
  | "Pant";

const ModalInventory = ({ visible, setVisible }: any) => {
  const items = [
    {
      img: ICShieldWood,
      name: "Perfect Shield",
      description:
        "A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.",
      price: 1.5,
      volumn: 3124,
    },
    {
      img: ICBow,
      name: "Perfect Bow",
      description:
        "A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.",
      price: 1.5,
      volumn: 3000,
    },
    {
      img: ICBow,
      name: "Perfect Bow",
      description:
        "A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.",
      price: 1.5,
      volumn: 3000,
    },
    {
      img: ICBow,
      name: "Perfect Bow",
      description:
        "A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.",
      price: 1.5,
      volumn: 3000,
    },
    {
      img: ICBow,
      name: "Perfect Bow",
      description:
        "A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.",
      price: 1.5,
      volumn: 3000,
    },
    {
      img: ICBow,
      name: "Perfect Bow",
      description:
        "A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.",
      price: 1.5,
      volumn: 3000,
    },
    {
      img: ICBow,
      name: "Perfect Bow",
      description:
        "A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.",
      price: 1.5,
      volumn: 3000,
    },
  ];

  const [activeInventory, setActiveInventory] = useState<InventoryType>("ALL");

  const [isOpenSell, setOpenSell] = useState(false);
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
        <div className="flex flex-col text-center w-[960px] bg-gradient-to-r from-[#122e3a] to-[#0e1719]">
          {/* Title */}
          <div className="flex flex-col h-[84px] justify-center items-center text-center min-w-[600px] bg-gradient-to-r from-[#122e3a] to-[#0e1719]">
            <p className="text-lg font-bold py-4">
              CHOOSE AM ITEM FROM YOUR INVENTORY
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-row items-center gap-4 pl-4 pr-16 h-[55px] text-[#D8D8D8] border-l-[5px] border-[#95BE4C] overflow-hidden">
            {[
              "ALL",
              "Head",
              "Eyes",
              "Mouth",
              "Shirt",
              "Hand",
              "Shoe",
              "Aura",
              "Pant",
            ].map((inventory: any) => (
              <p
                className={`flex flex-1 items-center justify-center rounded-full h-[40px] bg-[#00000030] px-8 cursor-pointer transition ${
                  activeInventory === inventory &&
                  "!bg-[#95BE4C] !text-black !font-black"
                }`}
                onClick={() => setActiveInventory(inventory)}
              >
                {inventory}
              </p>
            ))}
          </div>
        </div>
        {/* Items */}
        <div className="flex gap-8 px-10 py-14">
          {/* Item List */}
          <div className="w-[530px]">
            <div className="w-full grid grid-cols-12 gap-3">
              {Array(16)
                .fill(0)
                .map((v, i) => {
                  const item = items[i];
                  if (!item)
                    return (
                      <div className="col-span-4 xl:col-span-3 w-auto h-28 rounded bg-gradient-to-b from-[#122e3a] to-[#0e1719]"></div>
                    );
                  return (
                    <div
                      className="col-span-4 xl:col-span-3 flex items-center w-auto h-28 border-2 border-[#6BB8E7] rounded bg-gradient-to-b from-[#122e3a] to-[#0e1719] cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <img
                        src={item.img}
                        alt="item"
                        className="w-full object-contain"
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Preview Item */}
          <div className="w-[340px]">
            {!!selectedItem && (
              <div className="flex flex-col gap-3 h-full rounded-lg">
                {/* Item name */}
                <div className="h-[48px] text-center bg-gradient-to-b from-[#122e3a] to-[#0e1719] rounded-t-lg">
                  <p className="text-white font-bold text-lg leading-[48px]">
                    {selectedItem.name}
                  </p>
                </div>
                {/* Item detail */}
                <div className="flex flex-col justify-center px-[26px] bg-gradient-to-b from-[#122e3a] to-[#0e1719]">
                  <img
                    src={selectedItem.img}
                    alt="item"
                    className="max-w-1/2 h-[110px] object-contain"
                  />
                  <div className="flex flex-col gap-2 p-4 bg-[#0E1A21]">
                    <p className="font-bold text-[#58AFE6]">Item Description</p>
                    <p className="text-white">{selectedItem.description}</p>
                    <hr className="border-t-1 border-solid border-white" />

                    <p className="font-bold text-[#95BE4C]">View in market</p>
                    <p className="text-sm text-white">
                      Starting at {selectedItem.price} $
                    </p>
                    <p className="text-sm text-white">
                      Volumn: {selectedItem.volumn} in the last 24 hours.
                    </p>
                  </div>
                  <button
                    className="w-full px-10 h-[60px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
                    onClick={() => setOpenSell(true)}
                  >
                    SELL ITEM
                  </button>
                  <ModalSell
                    item={selectedItem}
                    visible={isOpenSell}
                    setVisible={setOpenSell}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalInventory;
