import React, { useEffect, useState, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ICArrowBack from "../../../assets/images/Profile/ic-arrow-back.png";
import ICSearch from "../../../assets/images/Profile/ic-search.png";
import ICBadge1 from "../../../assets/images/Profile-badge/ic-badge1.png";
import ICBadge2 from "../../../assets/images/Profile-badge/ic-badge2.png";
import ICBadge3 from "../../../assets/images/Profile-badge/ic-badge3.png";
import ICBadge4 from "../../../assets/images/Profile-badge/ic-badge4.png";
import ICBadge5 from "../../../assets/images/Profile-badge/ic-badge5.png";
import ICBadge6 from "../../../assets/images/Profile-badge/ic-badge6.png";
import ICBadge7 from "../../../assets/images/Profile-badge/ic-badge7.png";
import UserAPI from "@api/UserAPI";

const ProfileBadge = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData: any = location.state;
  const userID = userData.id;
  const [activeData, setActiveData] = useState({
    activePage: 1,
    totalPage: 1,
    limit: 3,
    user_id: userID,
  });
  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      badges: [],
      totalCount: 0,
      activebadgesCount: 0,
    }
  );

  const [pageBadge, setBadgePage] = useState(1);
  const [loadingBadge, setBadgeLoading] = useState(false);

  const onClikBadgePaginate = (pageNo: any) => {
    activeData.activePage = pageNo;
    setActiveData({
      activePage: pageNo,
      totalPage: 1,
      limit: 3,
      user_id: activeData.user_id,
    });
    getUserBadges(activeData);
  };

  useEffect(() => {
    getUserBadges(activeData);
  }, [userID]);

  const getUserBadges = (data: any) => {
    activeData.user_id = userID;
    UserAPI.getUserBadges(data)
      .then((res) => {
        //console.log(res);
        if (res.data.success) {
          activeData.totalPage = Math.ceil(
            res.data.badges.count / activeData.limit
          );
          setActiveData({
            activePage: data.activePage,
            totalPage: activeData.totalPage,
            limit: 3,
            user_id: activeData.user_id,
          });
          setBadgePage(data.activePage);
          setState({
            badges: [...state.badges, ...res.data.badges.rows],
            activebadgesCount: res.data.badges.count,
            totalCount: res.data.totalCount,
          });
          setBadgeLoading(false);
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
            <p className="text-center text-xl font-bold uppercase">Badges</p>
          </div>
          {/* Search */}
          <div className="col-span-4 relative h-[60px]">
            <img
              src={ICSearch}
              className="absolute left-4 w-6 h-full object-contain"
            />
            <input
              className="w-full h-full p-4 pl-12 rounded-xl from-[#122e3a] bg-gradient-to-r to-[#0e1719]"
              placeholder="Search profile..."
            />
          </div>
        </div>

        {/* Badges */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 shadow-[0_2px_17px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-row items-center gap-4 pl-4 pr-16 h-[55px] text-[#D8D8D8] from-[#122e3a] bg-gradient-to-r to-[#0e1719] border-l-[5px] border-[#95BE4C] overflow-hidden">
              <p className="font-bold uppercase">
                All Badges{" "}
                <span className="font-thin">
                  ({state.activebadgesCount}/{state.totalCount})
                </span>
              </p>
            </div>

            <div className="grid grid-cols-12 gap-6 px-11 py-8 bg-[#0e1619] overflow-auto">
              {state.badges.map((badgesdata: any, i: any) => {
                return (
                  <div
                    className={`col-span-3 flex items-center justify-center`}
                  >
                    <div
                      className={`relative w-[209px] h-[176px] rounded p-6 shadow-[0_2px_17px_0px_rgba(0,0,0,1)] ${
                        badgesdata.UserBadge &&
                        "border-2 border-[#6BB8E7] from-[#000B11] bg-gradient-to-t to-[#30759A]"
                      }`}
                    >
                      {!badgesdata.UserBadge && (
                        <p className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
                          LOCKED
                        </p>
                      )}
                      <img
                        src={badgesdata.img_url}
                        alt={badgesdata.name_en}
                        className={`w-full h-full object-contain ${
                          !badgesdata.UserBadge &&
                          "grayscale contrast-200 brightness-50"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {state.badges.length !== 0 && activeData.totalPage !== pageBadge && (
              <div className="flex flex-col items-center">
                <button
                  className="mt-5 mb-5 bg-primary-sky/30 w-40 h-10 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                  onClick={() => {
                    onClikBadgePaginate(pageBadge + 1);
                  }}
                >
                  {loadingBadge ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBadge;
