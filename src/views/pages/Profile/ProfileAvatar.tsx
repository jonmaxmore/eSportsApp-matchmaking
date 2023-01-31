import React, { useEffect, useState, useReducer } from "react";
import ICHead from "../../../assets/images/Profile/ic-head.png";
import ICEye from "../../../assets/images/Profile/ic-eye.png";
import ICMouth from "../../../assets/images/Profile/ic-mouth.png";
import ICHandLeft from "../../../assets/images/Profile/ic-hand-left.png";
import ICHandRight from "../../../assets/images/Profile/ic-hand-right.png";
import ICShoe from "../../../assets/images/Profile/ic-shoe.png";
import ICAura from "../../../assets/images/Profile/ic-aura.png";
import ICPant from "../../../assets/images/Profile/ic-pant.png";
import Avatar from "../../../assets/images/Profile/avatar.png";
import ICShirt from "../../../assets/images/Profile/ic-shirt.png";
import ICArrowR from "../../../assets/images/Profile/ic-arrow2-R.png";
import { useNavigate } from "react-router-dom";
import UserAPI from "@api/UserAPI";
import clsx from "clsx";
// const sharp = require('sharp');

import config from "../../../config/app.config";
import { getUserID } from "../../../Token";

const mergeImages = require("merge-images").default;
const { Canvas, Image } = require("canvas");

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

const ProfileAvatar = ({ userID }: any) => {
  const [activeInventory, setActiveInventory] = useState<InventoryType>("ALL");

  const items = [
    { icon: ICHead },
    { icon: ICEye },
    { icon: ICMouth },
    { icon: ICHandLeft },
    { icon: ICHandRight },
    { icon: ICShoe },
    { icon: ICAura },
    { icon: ICPant },
    { icon: ICShirt },
  ];

  const navigate = useNavigate();
  const [activeData, setActiveData] = useState({
    activePage: 1,
    totalPage: 1,
    limit: 10,
  });
  const [activeNftData, setActiveNftData] = useState({
    activePage: 1,
    totalPage: 1,
    limit: 10,
    nft_category_id: "All",
    user_id: 0
  });
  const [activeTempItems, setActiveTempItemsData] = useState({
    spriteImageWidth: config.spriteImageWidth,
    spriteImageHeight: config.spriteImageHeight,
    nft_items_id: {},
  });

  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      user: {},
      userAvatar: "",
      postCount: 0,
      followersCount: 0,
      followingCount: 0,
      friendCount: 0,
      myClan: {},
      clanMemberCount: 0,
      nftcategories: [],
      nftuserpurchaseitems: [],
      nftuserpurchaseitemsdata: [],
      nftuserpurchaseblankitemsdata: 30,
      nftuseravatar: [],
      item_head: {
        item_id: 0,
        item_image: "",
      },
      item_eye: {
        item_id: 0,
        item_image: "",
      },
      item_mouth: {
        item_id: 0,
        item_image: "",
      },
      item_shirt: {
        item_id: 0,
        item_image: "",
      },
      item_lefthand: {
        item_id: 0,
        item_image: "",
      },
      item_righthand: {
        item_id: 0,
        item_image: "",
      },
      item_shoe: {
        item_id: 0,
        item_image: "",
      },
      item_aura: {
        item_id: 0,
        item_image: "",
      },
      item_pant: {
        item_id: 0,
        item_image: "",
      },
    }
  );

  // const [statenftcategory, setNftCategoryState] = useReducer(
  //   (state: any, newState: any) => ({ ...state, ...newState }),
  //   {
  //     nftcategories: [],
  //   }
  // );

  // const [state, setNftItemState] = useReducer(
  //   (state: any, newState: any) => ({ ...state, ...newState }),
  //   {
  //     nftuserpurchaseitems: [],
  //     nftuseravatar: []
  //   }
  // );

  useEffect(() => {
    getProfile();
    getNftCategories(activeData);
    getNftItems(activeNftData, "All");
  }, [userID]);

  const getProfile = () => {
    UserAPI.getProfile(userID)
      .then((res) => {
        if (res.data.success) {
          setState({
            user: res.data.user,
            userAvatar: res.data.user.sprite_avatar_image,
            postCount: res.data.postCount,
            followersCount: res.data.followersCount,
            followingCount: res.data.followingCount,
            friendCount: res.data.friendCount,
            myClan: res.data.myClan,
            clanMemberCount: res.data.clanMemberCount,
            matchesPlayed: res.data.matchesPlayed,
            totalWins: res.data.totalWins,
            totalLosses: res.data.totalLosses,
            userTrophies: res.data.userTrophies,
            userBadges: res.data.userBadges,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getNftCategories = (data: any) => {
    UserAPI.getNftCategories(data)
      .then((res) => {
        if (res.data.success) {
          setState({
            nftcategories: res.data.nftcategories.rows,
          });
          // console.log('statenft',statenft.nftcategories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getNftItemsFliter = (activeNftData: any, nftItemId: any) => {
    const arr = state.nftuserpurchaseitems;
    if (nftItemId != "All") {
      var filteredArray = arr.filter(function (itm: any) {
        return itm.NftCategory.item_type == nftItemId;
      });
    } else {
      var filteredArray = state.nftuserpurchaseitems;
    }
    setState({
      nftuserpurchaseitemsdata: filteredArray,
      nftuserpurchaseblankitemsdata: 30 - filteredArray.length,
    });
  };

  const getNftItems = (activeNftData: any, nftItemId: any) => {
    activeNftData.nft_category_id = nftItemId;
    activeNftData.user_id = userID;
    //console.log('activeNftData',activeNftData);
    UserAPI.getNftItems(activeNftData)
      .then((res) => {
        if (res.data.success) {
          setState({
            nftuserpurchaseitems: res.data.nftuserpurchaseitems.rows,
            nftuserpurchaseitemsdata: res.data.nftuserpurchaseitems.rows,
            nftuserpurchaseblankitemsdata:
              30 - res.data.nftuserpurchaseitems.rows.length,
            nftuseravatar: res.data.userspriteavatar.rows,
            item_head: {
              item_id: res.data.userspriteavatar.rows[0]
                ? res.data.userspriteavatar.rows[0].nft_item_id
                : 0,
              item_image: res.data.userspriteavatar.rows[0]
                ? res.data.userspriteavatar.rows[0].NftItem.image_url
                : "",
            },
            item_eye: {
              item_id: res.data.userspriteavatar.rows[1]
                ? res.data.userspriteavatar.rows[1].nft_item_id
                : 0,
              item_image: res.data.userspriteavatar.rows[1]
                ? res.data.userspriteavatar.rows[1].NftItem.image_url
                : "",
            },
            item_mouth: {
              item_id: res.data.userspriteavatar.rows[2]
                ? res.data.userspriteavatar.rows[2].nft_item_id
                : 0,
              item_image: res.data.userspriteavatar.rows[2]
                ? res.data.userspriteavatar.rows[2].NftItem.image_url
                : "",
            },
            item_shirt: {
              item_id: res.data.userspriteavatar.rows[3]
                ? res.data.userspriteavatar.rows[3].nft_item_id
                : 0,
              item_image: res.data.userspriteavatar.rows[3]
                ? res.data.userspriteavatar.rows[3].NftItem.image_url
                : "",
            },
            item_lefthand: {
              item_id: res.data.userspriteavatar.rows[4]
                ? res.data.userspriteavatar.rows[4].nft_item_id
                : 0,
              item_image: res.data.userspriteavatar.rows[4]
                ? res.data.userspriteavatar.rows[4].NftItem.image_url
                : "",
            },
            item_righthand: {
              item_id: res.data.userspriteavatar.rows[5]
                ? res.data.userspriteavatar.rows[5].nft_item_id
                : 0,
              item_image: res.data.userspriteavatar.rows[5]
                ? res.data.userspriteavatar.rows[5].NftItem.image_url
                : "",
            },
            item_shoe: {
              item_id: res.data.userspriteavatar.rows[6]
                ? res.data.userspriteavatar.rows[6].nft_item_id
                : 0,
              item_image: res.data.userspriteavatar.rows[6]
                ? res.data.userspriteavatar.rows[6].NftItem.image_url
                : "",
            },
            item_aura: {
              item_id: res.data.userspriteavatar.rows[7]
                ? res.data.userspriteavatar.rows[7].nft_item_id
                : 0,
              item_image: res.data.userspriteavatar.rows[7]
                ? res.data.userspriteavatar.rows[7].NftItem.image_url
                : "",
            },
            item_pant: {
              item_id: res.data.userspriteavatar.rows[8]
                ? res.data.userspriteavatar.rows[8].nft_item_id
                : "",
              item_image: res.data.userspriteavatar.rows[8]
                ? res.data.userspriteavatar.rows[8].NftItem.image_url
                : "",
            },
          });
          // console.log('statenft',state.nftuseritems);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const [activeStyleData, setActiveStyleData] = useState({ width: config.spriteImageWidth  / config.totalSpriteColoumn,
  // height: config.spriteImageHeight,
  // backgroundImage: 'url("' + state.userAvatar + '")',
  // animation:'playX 1s steps(8) infinite' });

  const generateSpriteImage = async (data: any) => {
    setState({
      [`item_${data.NftCategory.item_type}`]: {
        item_id: data.id,
        item_image: data.image_url,
      },
    });

    activeTempItems.nft_items_id = [
      data.NftCategory.item_type == "head" ? data.id : state.item_head.item_id,
      data.NftCategory.item_type == "eye" ? data.id : state.item_eye.item_id,
      data.NftCategory.item_type == "mouth"
        ? data.id
        : state.item_mouth.item_id,
      data.NftCategory.item_type == "shirt"
        ? data.id
        : state.item_shirt.item_id,
      data.NftCategory.item_type == "lefthand"
        ? data.id
        : state.item_lefthand.item_id,
      data.NftCategory.item_type == "righthand"
        ? data.id
        : state.item_righthand.item_id,
      data.NftCategory.item_type == "shoe" ? data.id : state.item_shoe.item_id,
      data.NftCategory.item_type == "aura" ? data.id : state.item_aura.item_id,
      data.NftCategory.item_type == "pant" ? data.id : state.item_pant.item_id,
    ];

    UserAPI.generateSpriteImage(activeTempItems)
      .then((res) => {
        if (res.data.success) {
          setState({
            userAvatar: res.data.spriteImage,
          });

          // setActiveStyleData({
          //       width: config.spriteImageWidth  / config.totalSpriteColoumn,
          //       height: config.spriteImageHeight,
          //       backgroundImage: 'url("' + res.data.spriteImage + '")',
          //       animation:'playX 1s steps(8) infinite'
          // });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const keyframes = `
  //       @keyframes playX {
  //         from {background-position-x: 0px;}
  //         to {background-position-x: -1370px;}
  //       }`;

  // const pulse = keyframes`
  // playX {
  //          from {background-position-x: 0px;}
  //           to {background-position-x: -1370px;}
  //         }`;
  const myComponentStyle = {
    width: config.spriteImageWidth / config.totalSpriteColoumn,
    height: config.spriteImageHeight,
    backgroundImage: "url(" + state.userAvatar + ")",
    animation: "playX 1s steps(8) infinite",
    backgroundBlendMode: "multiply",
    backgroundSize: "cover",
  };

  return (
    <div className="grid grid-cols-12 gap-9">
      {/* Avatar */}
      <div className={clsx("relative col-span-5 rounded-xl w-full h-full p-4 from-[#122e3a] bg-gradient-to-br to-[#0e1719]",
      userID !== getUserID() ? "ml-75" : "")}>
        {/* Level */}
        <div className="absolute top-0 left-0 w-12 h-12 rounded-xl cursor-pointer from-[#131B24] bg-gradient-to-tr to-[#2E363F]">
          <p className="font-bold text-xl text-center leading-[44px]">
            {state.user.level}
          </p>
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-2">
          {/* Profile Name */}
          <p className="font-bold text-2xl">{state.user.avatar_unique_name}</p>
          {/* EXP */}
          <div className="flex flex-col justify-center w-1/2 gap-2">
            <div className="flex flex-row justify-between">
              <p className="font-bold">EXP:</p>
              <p className="text-sm"> 0/0 </p>
            </div>
            {/* EXP Progress */}
            <div className="w-full h-1.5 rounded-full overflow-hidden bg-black">
              <div
                className={`h-1.5 rounded-full from-[#96D6FF] bg-gradient-to-r to-[#448FF3] w-[0%]`}
              ></div>
            </div>
          </div>
        </div>

        {/* Avatar */}
        {/* <div style={myComponentStyle}  className="absolute flex justify-center  ">
        </div> */}
        <div className="absolute flex justify-center h-[300px] transition top-[140px] left-1/2 -translate-x-1/2">
          <div
            style={myComponentStyle}
            className="w-auto h-full object-contain"
          ></div>
        </div>
        {/* <div className="absolute flex justify-center h-[300px] transition top-[140px] left-1/2 -translate-x-1/2">
          <img
            src={state.userAvatar} 
            key={state.userAvatar}
            alt="avatar"
            className="w-auto h-full object-contain"
          />
        </div> */}

        {/* Slot */}
        <div className="flex flex-col gap-8 mt-[60px]">
          <div className="flex justify-between">
            {state.item_head && (
              <div className="w-24 h-24 bg-[#00000050]">
                <img
                  src={state.item_head.item_image}
                  alt="head"
                  className="w-full h-full p-4 object-contain cursor-pointer"
                />
              </div>
            )}
            {state.item_eye && (
              <div className="w-24 h-24 bg-[#00000050]">
                <img
                  src={state.item_eye.item_image}
                  alt="eye"
                  className="w-full h-full p-4 object-contain cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            {state.item_mouth && (
              <div className="w-24 h-24 bg-[#00000050]">
                <img
                  src={state.item_mouth.item_image}
                  alt="mouth"
                  className="w-full h-full p-4 object-contain cursor-pointer"
                />
              </div>
            )}

            {state.item_shirt && (
              <div className="w-24 h-24 bg-[#00000050]">
                <img
                  src={state.item_shirt.item_image}
                  alt="shirt"
                  className="w-full h-full p-4 object-contain cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            {state.item_lefthand && (
              <div className="w-24 h-24 bg-[#00000050]">
                <img
                  src={state.item_lefthand.item_image}
                  alt="hand-left"
                  className="w-full h-full p-4 object-contain cursor-pointer"
                />
              </div>
            )}

            {state.item_righthand && (
              <div className="w-24 h-24 bg-[#00000050]">
                <img
                  src={state.item_righthand.item_image}
                  alt="head-right"
                  className="w-full h-full p-4 object-contain cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            {state.item_shoe && (
              <div className="w-24 h-24 bg-[#00000050]">
                <img
                  src={state.item_shoe.item_image}
                  alt="shoe"
                  className="w-full h-full p-4 object-contain cursor-pointer"
                />
              </div>
            )}

            {state.item_aura && (
              <div className="w-24 h-24 bg-[#00000050]">
                <img
                  src={state.item_aura.item_image}
                  alt="aura"
                  className="w-full h-full p-4 object-contain cursor-pointer"
                />
              </div>
            )}

            {state.item_pant && (
              <div className="w-24 h-24 bg-[#00000050]">
                <img
                  src={state.item_pant.item_image}
                  alt="pant"
                  className="w-full h-full p-4 object-contain cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Inventory */}
      {userID === getUserID() && <div className="col-span-7">
        {/* Tab */}
        <div className="relative">
          <div className="flex flex-row items-center gap-4 pl-4 pr-16 h-[55px] text-[#D8D8D8] from-[#122e3a] bg-gradient-to-r to-[#0e1719] border-l-[5px] border-[#95BE4C] overflow-hidden">
            <p
              className={`flex flex-1 items-center justify-center rounded-full h-[40px] bg-[#00000030] px-8 cursor-pointer transition
                `}
              onClick={() => getNftItemsFliter(activeNftData, "All")}
            >
              All
            </p>

            {state.nftcategories.map((inventory: any, i: any) => (
              <p
                className={`flex flex-1 items-center justify-center rounded-full h-[40px] bg-[#00000030] px-8 cursor-pointer transition
                    ${
                      activeInventory === inventory.name_en &&
                      "!bg-[#95BE4C] !text-black !font-black"
                    }
                `}
                onClick={() =>
                  getNftItemsFliter(activeNftData, inventory.item_type)
                }
                key={i}
              >
                {inventory.name_en}
              </p>
            ))}
          </div>
          <div className="absolute top-2 right-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg from-[#122e3a] bg-gradient-to-r to-[#0e1719] shadow-lg cursor-pointer">
              <img src={ICArrowR} alt="left" />
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="grid grid-cols-12 gap-3 xl:gap-7 w-full py-14 px-10 shadow-[0_2px_17px_0px_rgba(0,0,0,1)] h-[520px] overflow-auto">
          {state.nftuserpurchaseitemsdata.map((value: any, i: any) => {
            // if (!items[i]) {
            //   return (
            //     <div
            //       className={`col-span-4 xl:col-span-3 w-auto h-28 from-[#122e3a] bg-gradient-to-b to-[#0e1719] rounded shadow-md cursor-pointer`}
            //     ></div>
            //   );
            // }

            return (
              <div
                className={`col-span-4 xl:col-span-3 w-auto h-28 from-[#122e3a] bg-gradient-to-b to-[#0e1719] rounded shadow-md cursor-pointer border-2 border-[#418AB8]`}
                key={value.id}
                onClick={() => generateSpriteImage(value)}
              >
                <img
                  src={value.image_url}
                  alt=""
                  className="w-full h-full p-4 object-contain"
                />
              </div>
            );
          })}

          {[...Array(state.nftuserpurchaseblankitemsdata)].map((e, i) => {
            return (
              <div
                className={`col-span-4 xl:col-span-3 w-auto h-28 from-[#122e3a] bg-gradient-to-b to-[#0e1719] rounded shadow-md cursor-pointer`}
              ></div>
            );
          })}
        </div>
      </div>}
    </div>
  );
};

export default ProfileAvatar;
