import React, { useState, useEffect } from "react";

import ICSearch from "../../../assets/images/Profile/ic-search.png";

import ICArrowBack from "../../../assets/images/Profile/ic-arrow-back.png";
import ProfileAvatar from "./ProfileAvatar";
import ProfileTotal from "./ProfileTotal";
import ProfileHistory from "./ProfileHistory";
import ProfileRank from "./ProfileRank";
import { XIcon } from "@heroicons/react/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserID } from "../../../Token";

type TabType = "total" | "avatar" | "recent" | "rank";

type Props = {};

const Profile = (props: Props) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>("total");
  const location = useLocation();
  const userData: any = location.state;
  const userID = userData.id;
  const classActiveTab = "!bg-[#95BE4C] !text-[#112026] font-bold";

  useEffect(() => {
    setActiveTab("total");
  }, [userID]);

  return (
    <div className="bg-[#0e1619] h-full w-full ">
      <div className="flex flex-col bg-[#0e1619] w-full h-[560px] wide:h-[859px] relative px-16 py-6 shadow-lg overflow-y-auto">
        {/* Tab & Search */}
        <div className="grid grid-cols-12 gap-6 mb-7">
          <div className="col-span-4 relative">
            <button
              className={`absolute h-[60px] px-6 border-2 border-[#6BB8E7] text-lg font-bold tracking-widest
                ${activeTab === "total" && "hidden"}
              `}
              onClick={() => setActiveTab("total")}
            >
              <img src={ICArrowBack} className="inline mr-2" /> BACK
            </button>
          </div>
          {userID !== getUserID() && (
            <XIcon
              className="absolute top-3 w-9 h-9 right-3 cursor-pointer z-50"
              onClick={() => {
                navigate(`/home`);
              }}
            />
          )}
          {/* Tab */}
          <div className="col-span-4">
            <div className="flex flex-row flex-wrap justify-around gap-5 mt-7">
              <p
                className={`px-6 rounded-full text-center bg-[#00000030] text-[white] cursor-pointer transition
                  ${["total", "avatar"].includes(activeTab) && classActiveTab}
                `}
                onClick={() => setActiveTab("total")}
              >
                Total
              </p>
              <p
                className={`px-6 rounded-full text-center bg-[#00000030] text-[white] cursor-pointer transition
                  ${activeTab === "recent" && classActiveTab}
                `}
                onClick={() => setActiveTab("recent")}
              >
                Recent
              </p>
              <p
                className={`px-6 rounded-full text-center bg-[#00000030] text-[white] cursor-pointer transition
                  ${activeTab === "rank" && classActiveTab}
                `}
                onClick={() => setActiveTab("rank")}
              >
                Rank
              </p>
            </div>
          </div>
          {/* Search */}
          {/* <div className="col-span-4 relative h-[60px]">
            <img
              src={ICSearch}
              className="absolute left-4 w-6 h-full object-contain"
            />
            <input
              className="w-full h-full p-4 pl-12 rounded-xl from-[#122e3a] bg-gradient-to-r to-[#0e1719]"
              placeholder="Search profile..."
            />
          </div> */}
        </div>

        {/* Total */}
        <div className={`${activeTab !== "total" && "hidden"}`}>
          <ProfileTotal setActiveTab={setActiveTab} userID={userID} />
        </div>

        {/* Avatar Profile */}
        <div className={`${activeTab !== "avatar" && "hidden"}`}>
          <ProfileAvatar userID={userID} />
        </div>

        {/* Recent */}
        <div className={`${activeTab !== "recent" && "hidden"}`}>
          <ProfileHistory userID={userID} />
        </div>

        {/* Rank */}
        <div className={`${activeTab !== "rank" && "hidden"}`}>
          <ProfileRank userID={userID}/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
