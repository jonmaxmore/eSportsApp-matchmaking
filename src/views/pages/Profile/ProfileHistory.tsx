import React, { useEffect, useState, useReducer } from 'react';
import ICLol from "../../../assets/images/Profile/ic-lol.png";
import UserAPI from '@api/UserAPI';
import config from "../../../config/app.config";
import moment from 'moment';


const ProfileHistory = ({userID}: any) => {


  const [activeData, setActiveData] = useState({ activePage: 1, totalPage: 1, limit: config.paginationPerPage, game_id:"All", user_id:userID });
  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      matcheshistory: [],
      gamelist: []
    }
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const onClikProfilePaginate = (pageNo:any) => {
    activeData.activePage = pageNo;
    setActiveData({activePage:pageNo, totalPage: 1,  limit: config.paginationPerPage, game_id:activeData.game_id, user_id:activeData.user_id});
    getMatchHistory(activeData);
 }

   useEffect(() => {
      getMatchHistory(activeData)
    }, [userID])

    const getMatchHistory = (data: any) => {
      activeData.activePage = page;
      activeData.user_id = userID;
      UserAPI.getMatchHistory(data)
        .then(res => {
          console.log(res.data.matcheshistory);
          if(res.data.success){
              activeData.totalPage = Math.ceil(res.data.matcheshistory.length / activeData.limit);
              setActiveData({activePage:data.activePage, totalPage: activeData.totalPage,  limit: config.paginationPerPage, game_id:activeData.game_id, user_id:activeData.user_id});
              setPage(data.activePage);
              setState(
                {
                matcheshistory: res.data.matcheshistory,
                gamelist: res.data.gamelist
               })
               setLoading(false);
          }
        }).catch(err => {
          console.log(err)
        })
    }

    const getGamesFliterData = (activeData: any, game_id: any) => {
      state.matcheshistory = [];
      activeData.game_id = game_id;
      activeData.activePage = 1;
      setPage(1);
      UserAPI.getMatchHistory(activeData)
        .then(res => {
          if(res.data.success){
              activeData.totalPage = Math.ceil(res.data.matcheshistory.length / activeData.limit);
              setState(
                {
                  matcheshistory:res.data.matcheshistory
                })
          }
        }).catch(err => {
          console.log(err)
        })
    }


  return (
    <div className="bg-[#0e1619] h-full">
      <div className="flex flex-col bg-[#0e1619] w-full h-full relative py-6 shadow-lg">
        {/* History */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 shadow-[0_2px_17px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-row justify-between items-center gap-4 pl-4 pr-16 h-[55px] text-[#D8D8D8] from-[#122e3a] bg-gradient-to-r to-[#0e1719] border-l-[5px] border-[#95BE4C] overflow-hidden">
              <p className="font-bold uppercase">Match history</p>
              <div className="flex flex-row gap-2">
                <p className="uppercase">Filter By:</p>
                <select className="rounded-full bg-[#00000030] px-4 cursor-pointer" 
                onChange={e => getGamesFliterData(activeData,e.target.value)}>
                  <option value="All">All games</option>
                  {state.gamelist.map((games:any,i:any) => (
                        <option value={games.id}>{games.name_en}</option>
                  )
                  )}
                </select>
              </div>
            </div>
            <div
              className="bg-[#0e1619] overflow-auto"  
            >
            {/* style={{ height: "calc(100% - 240px)" }} */}
              <table className="w-full">
                <thead className="h-7 leading-[28px] bg-[#262626] py-8">
                  <tr className="text-left">
                    <th className="pl-11">Game</th>
                    <th className="">Result</th>
                    <th className="">Game Mode</th>
                    <th className="">K/D/A</th>
                    <th className="">VS</th>
                    <th className="">Earn</th>
                    <th className="pr-11">Date</th>
                  </tr>
                </thead>
                 <tbody className="">
                    {state.matcheshistory.map((matcheshistory:any,i:any) => (
                        <tr className="shadow-[0_2px_17px_0px_rgba(0,0,0,1)]" key={i}>
                          <td className="pl-11 py-4">
                            <img
                              src={matcheshistory.GameDetail.game_icon}
                              className="w-[65px] h-[65px] p-1 object-cover rounded bg-black border-2 border-[#418AB8] border-solid "
                            />
                          </td>
                          <td
                            className={`font-bold capitalize ${
                              matcheshistory.is_win === true
                                ? "text-[#418AB8]"
                                : "text-[#8F8F8F]"
                            }`}
                          >

                          {matcheshistory.is_win  && (
                              <p className="font-bold">win</p>
                          )}

                          {!matcheshistory.is_win && (
                              <p className="font-bold">lose</p>
                          )}

                          </td>
                          <td className="">{`Summoner Rift ${matcheshistory.GameDetail.number_of_participant_per_team}vs${matcheshistory.GameDetail.number_of_participant_per_team}`}</td>
                          <td className="font-bold">{matcheshistory.kda ? matcheshistory.kda : '-' }</td>
                          <td className="text-[#95BE4C]">{matcheshistory.vs ? matcheshistory.vs : '-' }</td>
                          <td className="">
                            <p className="font-bold text-xl">{matcheshistory.is_win ? matcheshistory.bet_amount : 0} USD</p>
                            <p className="font-bold text-sm text-[#95BE4C]">
                              = {matcheshistory.is_win ? matcheshistory.bet_amount : 0} BLC
                            </p>
                          </td>
                          <td className="pr-11">{ moment(matcheshistory.created_at).format('MM/DD/YYYY') }</td>
                        </tr>
                      )
                    )}
                  </tbody>
              </table>
              {state.matcheshistory.length !== 0 && activeData.totalPage !== page && 
               <div  className="flex flex-col items-center">
              <button className="mt-5 mb-5 bg-primary-sky/30 w-40 h-10 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg" 
              onClick={() => onClikProfilePaginate(page + 1)}>
                {loading ? 'Loading...' : 'Load More'}
              </button>
              </div>
              }
              {state.matcheshistory.length === 0 && (
                <div  className="shadow-[0_2px_17px_0px_rgba(0,0,0,1)]">
                <p className="text-center h-7  h-[15px]"></p>
                <p className="text-center h-7  h-[35px]">No data found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHistory;
