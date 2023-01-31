import React, { useEffect, useState, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ICArrowBack from "../../../assets/images/Profile/ic-arrow-back.png";
import ICSearch from "../../../assets/images/Profile/ic-search.png";
import ICTrophyClanleader from "../../../assets/images/Profile-trophy/ic-trophy-clanleader.png";
import ICTrophyFirstfriend from "../../../assets/images/Profile-trophy/ic-trophy-firstfriend.png";
import ICTrophyJionedclan from "../../../assets/images/Profile-trophy/ic-trophy-jionedclan.png";
import ICTrophyLevel from "../../../assets/images/Profile-trophy/ic-trophy-level.png";
import ICTrophyLose from "../../../assets/images/Profile-trophy/ic-trophy-lose.png";
import ICTrophyWelcome from "../../../assets/images/Profile-trophy/ic-trophy-welcome.png";
import ICTrophyWin from "../../../assets/images/Profile-trophy/ic-trophy-win.png";
import UserAPI from "@api/UserAPI";
import config from "../../../config/app.config";

const ProfileTrophy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData: any = location.state;
  const userID = userData.id;
  const [activeData, setActiveData] = useState({
    activePage: 1,
    totalPage: 1,
    limit: config.paginationPerPage,
    user_id: userID,
  });
  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      trophies: [],
      totalCount: 0,
      activetrophiesCount: 0,
    }
  );

  const [pageTrophy, setTrophyPage] = useState(1);
  const [loadingTrophy, setTrophyLoading] = useState(false);

  const onClikTrophyPaginate = (pageNo: any) => {
    activeData.activePage = pageNo;
    setActiveData({
      activePage: pageNo,
      totalPage: 1,
      limit: config.paginationPerPage,
      user_id: activeData.user_id,
    });
    getUserTrophies(activeData);
  };

  useEffect(() => {
    getUserTrophies(activeData);
  }, [userID]);

  const getUserTrophies = (data: any) => {
    activeData.user_id = userID;
    UserAPI.getUserTrophies(data)
      .then((res) => {
        //console.log(res);
        if (res.data.success) {
          activeData.totalPage = Math.ceil(
            res.data.trophies.count / activeData.limit
          );
          setActiveData({
            activePage: data.activePage,
            totalPage: activeData.totalPage,
            limit: config.paginationPerPage,
            user_id: activeData.user_id,
          });
          setTrophyPage(data.activePage);
          setState({
            trophies: [...state.trophies, ...res.data.trophies.rows],
            totalCount: res.data.trophies.count,
            activetrophiesCount: res.data.activetrophiesCount,
          });
          setTrophyLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-[#0e1619] h-full">
      <div className="flex flex-col bg-[#0e1619] w-full h-full relative px-16 py-6 shadow-lg">
        {/* Tab & Search */}
        <div className="grid grid-cols-12 gap-6 mb-7">
          <div className="col-span-4 relative">
            <button
              className={`absolute h-[60px] px-6 border-2 border-[#6BB8E7] text-lg font-bold tracking-widest
              `}
              onClick={() => navigate("/profile", { state: { id: userID } })}
            >
              <img src={ICArrowBack} alt="back" className="inline mr-2" /> BACK
            </button>
          </div>
          {/* Tab */}
          <div className="col-span-4 flex items-center justify-center">
            <p className="text-center text-xl font-bold uppercase">Trophy</p>
          </div>
          {/* Search */}
          <div className="col-span-4 relative h-[60px]">
            <img
              src={ICSearch}
              alt="Search"
              className="absolute left-4 w-6 h-full object-contain"
            />
            <input
              className="w-full h-full p-4 pl-12 rounded-xl from-[#122e3a] bg-gradient-to-r to-[#0e1719]"
              placeholder="Search profile..."
            />
          </div>
        </div>

        {/* Trophy */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 shadow-[0_2px_17px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-row items-center gap-4 pl-4 pr-16 h-[55px] text-[#D8D8D8] from-[#122e3a] bg-gradient-to-r to-[#0e1719] border-l-[5px] border-[#95BE4C] overflow-hidden">
              <p className="font-bold uppercase">
                All Trophies{" "}
                <span className="font-thin">
                  ({state.activetrophiesCount}/{state.totalCount})
                </span>
              </p>
            </div>

            <div className="grid grid-cols-12 gap-6 px-11 py-8 bg-[#0e1619] overflow-auto">
              {state.trophies.map((trophiesdata: any, i: any) => {
                //console.log('usertrophydata',usertrophydata);
                return (
                  <div
                    className={`col-span-6 shadow-[0_2px_17px_0px_rgba(0,0,0,1)]
                      ${!trophiesdata.UserTrophy && "bg-[#2F3334]"}
                    `}
                  >
                    <div className="flex flex-row gap-10 px-5 py-4 h-[135px] items-center">
                      <div
                        className={`w-[104px] h-[104px] rounded p-2
                        ${
                          trophiesdata.UserTrophy
                            ? "border-2 border-[#6BB8E7] from-[#000B11] bg-gradient-to-t to-[#30759A]"
                            : "grayscale bg-[#272A2B]"
                        }
                      `}
                      >
                        <img
                          src={trophiesdata.img_url}
                          alt={trophiesdata.name_en}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="text-base">{trophiesdata.name_en}</p>
                        <p className="text-sm">{trophiesdata.description_en}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {state.trophies.length !== 0 &&
              activeData.totalPage !== pageTrophy && (
                <div className="flex flex-col items-center">
                  <button
                    className="mt-5 mb-5 bg-primary-sky/30 w-40 h-10 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => {
                      onClikTrophyPaginate(pageTrophy + 1);
                    }}
                  >
                    {loadingTrophy ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTrophy;
