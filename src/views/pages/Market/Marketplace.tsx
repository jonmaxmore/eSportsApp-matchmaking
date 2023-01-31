import { useState } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";

import ICShieldWood from "../../../assets/images/Market/ic-shied_wood.png";
import ICSwordIron from "../../../assets/images/Market/ic-sword_iron.png";
import ICBin from "../../../assets/images/Market/ic-bin.png";
import ICSearch from "../../../assets/images/Profile/ic-search.png";
import ModalBuy from "./ModalBuy";
import ModalInventory from "./ModalInventory";
import { useLocation, useNavigate } from "react-router-dom";

type Tabs = "activelisting" | "history";
type MarketTabs = "popular" | "newly" | "sold";

const ModalRemove = ({
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
          <p className="text-lg font-bold py-4">REMOVE SELL ITEM</p>
        </div>

        <div className="flex flex-col gap-4 pt-[44px] pb-[60px] px-[160px]">
          <div className="flex flex-col py-6 text-center whitespace-nowrap">
            {message}
          </div>
          {/* Buttons */}
          <div className="flex flex-col self-center gap-4">
            <button
              className="w-[300px] px-10 h-[60px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
              onClick={handleConfirm}
            >
              REMOVE
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

const MyItems = ({ items }: { items: object[] }) => {
  const [isOpenRemove, setOpenRemove] = useState(false);

  const handleRemove = () => {
    setOpenRemove(false);
  };

  return (
    <div className="relative w-full h-[196px] shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] overflow-auto setting-scroll">
      <table className="w-full">
        <thead className="sticky top-0 bg-[#262626]">
          <tr className="font-bold">
            <th className="p-1 whitespace-nowrap text-center">Item/Type</th>
            <th className="p-1 whitespace-nowrap text-center">
              Available in the market
            </th>
            <th className="p-1 whitespace-nowrap text-center">Price</th>
            <th className="p-1 whitespace-nowrap w-[220px]"></th>
          </tr>
        </thead>
        <tbody className="bg-[#28282825] shadow-[0_2px_17px_0px_rgba(0,0,0,1)]">
          {items.map((item: any) => (
            <tr className="shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] ">
              <td className="p-[8px]  ">
                <div className="flex">
                  <img
                    alt="item"
                    src={item.img}
                    className="h-18 w-20 rounded object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="pb-4 text-lg font-normal">{item.name}</p>
                    <p className="text-base font-light">{item.slot}</p>
                  </div>
                </div>
              </td>
              <td className="p-[16px] text-center">
                <p className="text-xl font-bold ">{item.available}</p>
              </td>
              <td className="p-[16px] text-center">
                <p className="text-xl font-bold text-[#58AFE6]">{item.price} $</p>
              </td>
              <td className="p-[16px] text-right">
                <button
                  className="flex justify-center items-center w-[214px] h-[54px] leading-[54px] border-[3px] border-solid border-[#6BB8E7] rounded"
                  onClick={() => setOpenRemove(true)}
                >
                  <img alt="bin" src={ICBin} className="mr-4" />
                  <p>REMOVE</p>
                </button>
                <ModalRemove
                  message={
                    <p className="text-lg">
                      Are you sure you want to remove this item from your sell
                      item listing?
                    </p>
                  }
                  visible={isOpenRemove}
                  setVisible={setOpenRemove}
                  onConfirm={handleRemove}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MerketItems = ({ items }: { items: object[] }) => {
  const [selectedItem, setSelectedItem] = useState({});
  const [isOpenBuy, setOpenBuy] = useState(false);

  return (
    <div className="relative w-full h-[calc(100vh-567px)] shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] overflow-auto">
      <table className="w-full">
        <thead className="sticky top-0 bg-[#262626]">
          <tr className="font-bold">
            <th className="p-1 pl-4 whitespace-nowrap text-center">
              Item/Type
            </th>
            <th className="p-1 whitespace-nowrap text-center">
              Available in the market
            </th>
            <th className="p-1 whitespace-nowrap text-center">Price</th>
          </tr>
        </thead>
        <tbody className="bg-[#28282825] shadow-[0_2px_17px_0px_rgba(0,0,0,1)]">
          {items.map((item: any) => (
            <tr
              className="cursor-pointer shadow-[0_0_15px_5px_rgba(0,0,0,0.7)]  "
              onClick={() => {
                setSelectedItem(item);
                setOpenBuy(true);
              }}
            >
              <td className="p-[16px] ">
                <div className="flex">
                  <img
                    alt="item"
                    src={item.img}
                    className="h-18 w-20 rounded object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-normal">{item.name}</p>
                    <p className="text-base font-loght">{item.slot}</p>
                  </div>
                </div>
              </td>
              <td className="p-[16px] text-center">
                <p className="text-xl font-bold">{item.available}</p>
              </td>
              <td className="p-[16px] text-center">
                <p className="text-xl font-bold text-[#58AFE6]">{item.price} $</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalBuy
        item={selectedItem}
        visible={isOpenBuy}
        setVisible={setOpenBuy}
      />
    </div>
  );
};

const Marketplace = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpenInventory, setOpenInventory] = useState(false);
  const [activeTab, setActiveTab] = useState<Tabs>("activelisting");
  const [marketTab, setMarketTab] = useState<MarketTabs>("popular");
  const [filter, setFilter] = useState<{ [k: string]: boolean }>({
    Head: false,
    Eye: false,
    Neck: false,
    Shirt: false,
    Bottom: false,
    Sock: false,
    Shoes: false,
    "Weapon Left": false,
    "Weapon Right": false,
    Aura: false,
  });

  const activeItems = [
    {
      name: "Perfect shield",
      img: ICShieldWood,
      description:
        "A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.",
      slot: "Weapon left",
      available: 12,
      price: 20,
    },
    {
      name: "Perfect sword",
      img: ICSwordIron,
      description:
        "A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.",
      slot: "Weapon right",
      available: 2,
      price: 20,
    },
    {
      name: "Perfect shield",
      img: ICShieldWood,
      description:
        "A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.",
      slot: "Weapon left",
      available: 12,
      price: 20,
    },
    {
      name: "Perfect shield",
      img: ICShieldWood,
      description:
        "A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.",
      slot: "Weapon left",
      available: 12,
      price: 20,
    },
    {
      name: "Perfect shield",
      img: ICShieldWood,
      description:
        "A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.",
      slot: "Weapon left",
      available: 12,
      price: 20,
    },
  ];

  const popularItems = activeItems;
  const newlyItems = activeItems;
  const soldItems = activeItems;

  return (
    <div className="bg-[#0e1619] h-full">
      <div className="flex flex-col bg-[#0e1619] w-full h-full relative px-16 py-6 shadow-lg">
        {/* Tools */}
        <div className="flex justify-between">
          {/* Tabs */}
          <div className="flex rounded-full bg-[#253D4C]">
            <div
              className={`text-lg text-white w-[180px] h-[60px] leading-[60px] text-center cursor-pointer rounded-full ${
                location.pathname === "/market" && "!bg-[#58AFE6] font-bold"
              }`}
              onClick={() => navigate("/market")}
            >
              MARKETPLACE
            </div>
            <div
              className={`text-lg text-white w-[180px] h-[60px] leading-[60px] text-center cursor-pointer rounded-full ${
                location.pathname === "/market-itemmall" &&
                "!bg-[#58AFE6] font-bold"
              }`}
              onClick={() => navigate("/market-itemmall")}
            >
              ITEM MALL
            </div>
            <ModalInventory
              visible={isOpenInventory}
              setVisible={setOpenInventory}
            />
          </div>
          {/* Sell Item */}
          <button className="flex" onClick={() => setOpenInventory(true)}>
            <div className="h-[54px] leading-[46px] w-[54px] text-center text-4xl border-[3px] border-solid border-[#6BB8E7] border-r-0 rounded-l cursor-pointer">
              +
            </div>
            <div className="h-[54px] leading-[46px] w-[194px] text-center text-lg border-[3px] border-solid border-[#6BB8E7] rounded-r cursor-pointer">
              SELL AN ITEM
            </div>
          </button>
        </div>

        {/* Contents */}
        <div className="mt-5">
          {/* My market */}
          <div className="flex flex-col">
            {/* Tabs */}
            <div className="flex h-[56px] bg-black w-full">
              <button
                className={`flex-1 h-[56px] leading-[56px] text-center font-bold ${
                  activeTab === "activelisting" && "!bg-[#253D4C]"
                }`}
                onClick={() => setActiveTab("activelisting")}
              >
                My active listing ({activeItems.length})
              </button>
              <button
                className={`flex-1 h-[56px] leading-[56px] text-center font-bold ${
                  activeTab === "history" && "!bg-[#253D4C]"
                }`}
                onClick={() => setActiveTab("history")}
              >
                My market history
              </button>
            </div>
            {/* Lists */}
            {activeTab === "activelisting" && <MyItems items={activeItems} />}
            {activeTab === "history" && <MyItems items={activeItems} />}
          </div>

          {/* Overview Market */}
          <div className="w-full grid grid-cols-12 gap-4 mt-4">
            {/* Market */}
            <div className="col-span-8 flex flex-col">
              {/* Tabs */}
              <div className="flex h-[56px] bg-black w-full">
                <button
                  className={`flex-1 h-[56px] leading-[56px] text-center font-bold ${
                    marketTab === "popular" && "!bg-[#253D4C]"
                  }`}
                  onClick={() => setMarketTab("popular")}
                >
                  Popular
                </button>
                <button
                  className={`flex-1 h-[56px] leading-[56px] text-center font-bold ${
                    marketTab === "newly" && "!bg-[#253D4C]"
                  }`}
                  onClick={() => setMarketTab("newly")}
                >
                  Newly listed
                </button>
                <button
                  className={`flex-1 h-[56px] leading-[56px] text-center font-bold ${
                    marketTab === "sold" && "!bg-[#253D4C]"
                  }`}
                  onClick={() => setMarketTab("sold")}
                >
                  Recent sold
                </button>
              </div>
              {/* Tables */}
              {marketTab === "popular" && <MerketItems items={popularItems} />}
              {marketTab === "newly" && <MerketItems items={newlyItems} />}
              {marketTab === "sold" && <MerketItems items={soldItems} />}
            </div>
            {/* Filter */}
            <div className="col-span-4 flex flex-col bg-[#28282825]">
              <div className="relative h-[60px]">
                <img
                  src={ICSearch}
                  alt="Search"
                  className="absolute left-4 w-6 h-full object-contain"
                />
                <input
                  className="w-full h-full p-4 pl-12 from-[#122e3a] bg-gradient-to-r to-[#0e1719]"
                  placeholder="Search profile..."
                />
              </div>
              {/* Checkbox */}
              <div className="flex flex-col p-6 gap-[4px] h-[calc(100vh-572px)] shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] overflow-auto">
                {Object.keys(filter).map((option) => (
                  <div
                    className="flex gap-6 h-[32px] leading-none"
                    onClick={() =>
                      setFilter({ ...filter, [option]: !filter[option] })
                    }
                  >
                    <input
                      name="option-checkbox"
                      type="checkbox"
                      className="cursor-pointer hidden"
                      value={option}
                      checked={filter[option]}
                    />
                    <label
                      htmlFor="option-checkbox"
                      className="flex cursor-pointer"
                    >
                      <div
                        className={`block w-[12px] h-[12px] leading-[12px] text-center ${
                          filter[option]
                            ? "bg-[#95BE4C] text-black"
                            : "border border-shite text-transparent"
                        }`}
                      >
                        x
                      </div>
                      <p className="ml-6 h-[28px]">{option}</p>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Marketplace;
