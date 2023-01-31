import React, { useEffect, useState, useReducer } from "react";
import ICTrophyGold from "../../../assets/images/Profile/ic-trophy_goldmember.png";
import ICTrophySilver from "../../../assets/images/Profile/ic-trophy_silvermember.png";
import ICTrophyCopper from "../../../assets/images/Profile/ic-trophy_coppermember.png";
import GameLOL from "../../../assets/images/Profile/game-lol.jpeg";
import GameDOTA2 from "../../../assets/images/Profile/game-dota2.jpeg";
import GameML from "../../../assets/images/Profile/game-ml.jpeg";
import GameOverwatch from "../../../assets/images/Profile/game-overwatch.jpeg";
import GameFortnite from "../../../assets/images/Profile/game-fortnite.jpeg";
import GameHOTS from "../../../assets/images/Profile/game-hots.jpeg";
import GameFifa4 from "../../../assets/images/Profile/game-fifa4.jpeg";
import UserAPI from "@api/UserAPI";
import config from "../../../config/app.config";

const ProfileRank = ({ userID }: any) => {
  const [activeData, setActiveData] = useState({
    activePage: 1,
    totalPage: 1,
    limit: config.paginationPerPage,
    user_id: 0,
  });
  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      toprankinglist: [],
      rankinglist: [],
    }
  );

  const [pageRanks, setRanksPage] = useState(1);
  const [loadingRanks, setRanksLoading] = useState(false);

  const onClikRankPaginate = (pageNo: any) => {
    activeData.activePage = pageNo;
    setActiveData({
      activePage: pageNo,
      totalPage: 1,
      limit: config.paginationPerPage,
      user_id: activeData.user_id,
    });
    getRakingList(activeData);
  };

  useEffect(() => {
    getRakingList(activeData);
  }, [userID]);

  const getRakingList = (data: any) => {
    activeData.user_id = userID;
    UserAPI.getRakingList(data)
      .then((res) => {
        if (res.data.success) {
          activeData.totalPage = Math.ceil(
            (res.data.rankinglist.count - 3) / activeData.limit
          );
          setActiveData({
            activePage: data.activePage,
            totalPage: activeData.totalPage,
            limit: config.paginationPerPage,
            user_id: activeData.user_id,
          });
          setRanksPage(data.activePage);
          setState({
            rankinglist: [...state.rankinglist, ...res.data.rankinglist.rows],
            toprankinglist: res.data.toprankinglist,
          });
          setRanksLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-[#0e1619] h-full">
      <div className="flex flex-col bg-[#0e1619] w-full h-full relative py-6 shadow-lg">
        {/* Rank */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 shadow-[0_2px_17px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-row justify-between items-center gap-4 pl-4 pr-16 h-[55px] text-[#D8D8D8] from-[#122e3a] bg-gradient-to-r to-[#0e1719] border-l-[5px] border-[#95BE4C] overflow-hidden">
              <p className="font-bold uppercase">
                Rank and matchmaking rating (MMR)
              </p>
            </div>

            <div className="flex flex-col gap-12 justify-center p-10">
              {state.toprankinglist.length === 0 && (
                <p className="text-center h-7  h-[35px]">
                  {" "}
                  No data available for rank and matchmaking
                </p>
              )}
              {/* TOP Rank */}
              <div className="grid grid-cols-12 gap-6 shadow-[0_2px_17px_0px_rgba(0,0,0,1)] pt-4 px-10 pb-8">
                {state.toprankinglist.map((toprank: any, i: any) => (
                  <div className="col-span-4 flex flex-col items-center gap-4">
                    <div className="relative w-full h-[215px]">
                      {i === 0 && (
                        <img
                          src={ICTrophyGold}
                          alt="trophy"
                          className="w-[70px] h-[70px] z-10 absolute -translate-y-1/2 left-1/2 -translate-x-1/2"
                        />
                      )}

                      {i === 1 && (
                        <img
                          src={ICTrophySilver}
                          alt="trophy"
                          className="w-[70px] h-[70px] z-10 absolute -translate-y-1/2 left-1/2 -translate-x-1/2"
                        />
                      )}

                      {i === 2 && (
                        <img
                          src={ICTrophyCopper}
                          alt="trophy"
                          className="w-[70px] h-[70px] z-10 absolute -translate-y-1/2 left-1/2 -translate-x-1/2"
                        />
                      )}

                      <img
                        src={toprank.UserWiseRanking.logo_url}
                        alt="game"
                        className="absolute w-full h-full object-cover border-[5px] border-solid border-[#FFD900]"
                      />
                    </div>
                    <p className="text-center text-xl">
                      {toprank.UserGameHistory.mmr_level} MMR
                    </p>
                  </div>
                ))}
                {/* <div className="col-span-4 flex flex-col items-center gap-4">
                  <div className="relative w-full h-[215px]">
                    <img
                      src={ICTrophySilver}
                      alt="trophy"
                      className="w-[70px] h-[70px] z-10 absolute -translate-y-1/2 left-1/2 -translate-x-1/2"
                    />
                    <img
                      src={GameDOTA2}
                      alt="game"
                      className="absolute w-full h-full object-cover border-[5px] border-solid border-[#D2D2D2]"
                    />
                  </div>
                  <p className="text-center text-xl">1560 MMR</p>
                </div> */}
                {/* <div className="col-span-4 flex flex-col items-center gap-4">
                  <div className="relative w-full h-[215px]">
                    <img
                      src={ICTrophyCopper}
                      alt="trophy"
                      className="w-[70px] h-[70px] z-10 absolute -translate-y-1/2 left-1/2 -translate-x-1/2"
                    />
                    <img
                      src={GameML}
                      alt="game"
                      className="absolute w-full h-full object-cover border-[5px] border-solid border-[#E67400]"
                    />
                  </div>
                  <p className="text-center text-xl">1210 MMR</p>
                </div> */}
              </div>
              {/* Other games */}
              {state.rankinglist.length !== 0 && (
                <div className="grid grid-cols-12 gap-5">
                  {state.rankinglist.map((rank: any, i: any) => (
                    <div className="col-span-3 flex flex-col items-center gap-4">
                      <div className="relative w-full h-[180px]">
                        <img
                          src={rank.UserWiseRanking.logo_url}
                          alt="game"
                          className="absolute w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-center text-xl">
                        {rank.UserGameHistory.mmr_level}MMR
                      </p>
                    </div>
                  ))}

                  {/* <div className="col-span-3 flex flex-col items-center gap-4">
                  <div className="relative w-full h-[180px]">
                    <img 
                      src={GameFortnite}
                      alt="game"
                      className="absolute w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center text-xl">1090 MMR</p>
                </div>
                <div className="col-span-3 flex flex-col items-center gap-4">
                  <div className="relative w-full h-[180px]">
                    <img
                      src={GameHOTS}
                      alt="game"
                      className="absolute w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center text-xl">1022 MMR</p>
                </div>
                <div className="col-span-3 flex flex-col items-center gap-4">
                  <div className="relative w-full h-[180px]">
                    <img
                      src={GameFifa4}
                      alt="game"
                      className="absolute w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center text-xl">988 MMR</p>
                </div> */}
                </div>
              )}
              {state.rankinglist.length !== 0 &&
                activeData.totalPage !== pageRanks && (
                  <div className="flex flex-col items-center">
                    <button
                      className="mt-5 mb-5 bg-primary-sky/30 w-40 h-10 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                      onClick={() => {
                        onClikRankPaginate(pageRanks + 1);
                      }}
                    >
                      {loadingRanks ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileRank;
