import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ICShieldWood from "../../../assets/images/Market/ic-shied_wood.png";
import ICSwordIron from "../../../assets/images/Market/ic-sword_iron.png";
import ICSearch from "../../../assets/images/Profile/ic-search.png";

import mockup1 from "../../../assets/images/Market/mockup1.png";
import mockup2 from "../../../assets/images/Market/mockup2.png";
import mockup3 from "../../../assets/images/Market/mockup3.png";
import mockup4 from "../../../assets/images/Market/mockup4.png";
import mockup5 from "../../../assets/images/Market/mockup5.png";
import mockup6 from "../../../assets/images/Market/mockup6.png";
import mockup7 from "../../../assets/images/Market/mockup7.png";
import mockup8 from "../../../assets/images/Market/mockup8.png";

import ModalBuyMall from "./ModalBuyMall";

type MarketTab =
  | "HOT"
  | "Item"
  | "Head"
  | "Top"
  | "Bottom"
  | "Shoes"
  | "Weapon";

const ItemMall = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpenBuy, setOpenBuy] = useState(false);
  const [selectedItem, setSelectedItem] = useState<object | null>(null);
  const [activeTab, setActiveTab] = useState<MarketTab>("HOT");

  const items = [
    {
      img: mockup1,
      name: "Gacha pack x10 (+1)",
      price: 1.5,
      description:
        "This is a Gacha Box especially designed to celebrate the 1-year anniversary of Battlelab.",
    },
    {
      img: mockup2,
      name: "Gacha pack x1",
      price: 1.5,
      description:
        "This is a Gacha Box especially designed to celebrate the 1-year anniversary of Battlelab.",
    },
    {
      img: mockup3,
      name: "Sapphire Gems x 10",
      price: 1.5,
      description:
        "This is a Gacha Box especially designed to celebrate the 1-year anniversary of Battlelab.",
    },
    {
      img: mockup4,
      name: "Boost Potions x 5",
      price: 1.5,
      description:
        "This is a Gacha Box especially designed to celebrate the 1-year anniversary of Battlelab.",
    },
    {
      img: mockup5,
      name: "Perfect Shield",
      price: 1.5,
      description:
        "This is a Gacha Box especially designed to celebrate the 1-year anniversary of Battlelab.",
    },
    {
      img: mockup6,
      name: "Percious Ring",
      price: 1.5,
      description:
        "This is a Gacha Box especially designed to celebrate the 1-year anniversary of Battlelab.",
    },
    {
      img: mockup7,
      name: "Lv. Boost Mushroom",
      price: 1.5,
      description:
        "This is a Gacha Box especially designed to celebrate the 1-year anniversary of Battlelab.",
    },
    {
      img: mockup8,
      name: "Viking Helmet",
      price: 1.5,
      description:
        "This is a Gacha Box especially designed to celebrate the 1-year anniversary of Battlelab.",
    },
  ];

  return (
    <div className="bg-[#0e1619] h-full">
      <div className="flex flex-col bg-[#0e1619] w-full h-full relative px-16 py-6 shadow-lg">
        {/* Tools */}
        <div className="flex justify-between ">
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
          </div>
          {/* Search */}
          <div className="col-span-4 relative h-[60px]">
            <img
              src={ICSearch}
              alt="Search"
              className="absolute left-4 w-6 h-full object-contain"
            />
            <input
              className="w-full h-full p-4 pl-12 rounded-xl  bg-gradient-to-r from-[#203642] to-[#121E26] shadow-lg"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Contents */}
        <div className="mt-5">
          <div className="w-full">
            {/* Tabs */}
            <div className="flex flex-row flex-wrap items-center gap-[40px] w-full h-[55px] text-[#D8D8D8] overflow-hidden">
              {["HOT", "Item", "Head", "Top", "Bottom", "Shoes", "Weapon"].map(
                (marketTab: any) => (
                  <p
                    className={`flex items-center justify-center rounded-full w-[130px] px-8 h-[30px] bg-[#00000030] cursor-pointer transition ${
                      activeTab === marketTab &&
                      "!bg-[#95BE4C] !text-black !font-black"
                    }`}
                    onClick={() => setActiveTab(marketTab)}
                  >
                    {marketTab}
                  </p>
                )
              )}
            </div>

            {/* Market Items */}
            <div
              className="grid grid-cols-12 gap-[40px] overflow-auto"
              style={{ height: "calc(100vh - 300px)" }}
            >
              {items.map((item) => (
                <div className="col-span-3 flex flex-col border-[3px] border-solid border-[#6BB8E7]">
                  <div className="w-full h-[50px] leading-[50px] bg-gradient-to-b from-[#307499] to-[#010C13] text-white text-center text-lg">
                    {item.name}
                  </div>
                  <div className="flex flex-col justify-center items-center gap-[20px] px-4 bg-gradient-to-b from-[#307499] to-[#010C13]">
                    <img
                      className="w-full h-[140px] object-contain"
                      src={item.img}
                      alt="item"
                    />
                    <p className="w-[118px] h-[33px] leading-[33px] bg-[#00000030] rounded text-white text-center text-2xl">
                      {item.price} $
                    </p>
                    <button
                      className="w-[140px] h-[50px] -mb-[12px] bg-gradient-to-b from-[#CEF984] to-[#449522] text-black text-2xl rounded-full"
                      onClick={() => {
                        setOpenBuy(true);
                        setSelectedItem(item);
                      }}
                    >
                      BUY
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <ModalBuyMall
              item={selectedItem}
              visible={isOpenBuy}
              setVisible={setOpenBuy}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemMall;
