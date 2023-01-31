import React, { useEffect, useState, useReducer } from "react";
import clsx from "clsx";
import { Menu } from "antd";
import shield1st from "@Image/Ranking/ic-ranking_Gold.png";
import shield2nd from "@Image/Ranking/ic-ranking_Silver.png";
import shield3rd from "@Image/Ranking/ic-ranking_Copper.png";
import trophy3rd from "@Image/Ranking/ic-trophy_coppermember.png";
import trophy2nd from "@Image/Ranking/ic-trophy_silvermember.png";
import trophy1st from "@Image/Ranking/ic-trophy_goldmember.png";
import { CaretDownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import UserAPI from "@api/UserAPI";
import config from "../../../../config/app.config";
import { getUserID } from "../../../../Token";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  ActivePop: any;
}

const Ranking = ({ ActivePop }: Props) => {
  const [activeData, setActiveData] = useState({
    activePage: 1,
    totalPage: 1,
    limit: config.paginationPerPage,
    type: "All",
    game_id: ActivePop,
  });
  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      gameList: [],
      mypersonalranklist: [],
      gamerankinglist: [],
    }
  );

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [myRank, setMyRank] = useState();
  const [hasMorePost, setHaseMorePost] = useState(true);

  useEffect(() => {
    getRanking(activeData);
  }, []);

  //   const onClikProfilePaginate = (pageNo: any) => {
  //     activeData.activePage = pageNo;
  //     setActiveData({
  //       activePage: pageNo,
  //       totalPage: 1,
  //       limit: config.paginationPerPage,
  //       type: activeData.type,
  //       game_id: activeData.game_id,
  //     });
  //     getRanking(activeData);
  //   };

  const searchFilter = (value: string) => {
    activeData.type = value;
    setActiveData({
      activePage: activeData.activePage,
      totalPage: activeData.totalPage,
      limit: config.paginationPerPage,
      type: activeData.type,
      game_id: activeData.game_id,
    });
    getRanking(activeData);
  };
  const [filter, setFillter] = useState("All");
  const active = (value: string) => {
    if (filter === value) {
      return "bg-[#94bd4b] text-[#000]";
    } else {
      return "bg-[#0c1c24]";
    }
  };

  const getRanking = (data: any) => {
    UserAPI.getRanking(data)
      .then((res) => {
        if (res.data.success) {
          activeData.totalPage = Math.ceil(
            res.data.gamerankinglist.count.length / activeData.limit
          );
          setActiveData({
            activePage: data.activePage,
            totalPage: activeData.totalPage,
            limit: config.paginationPerPage,
            type: activeData.type,
            game_id: activeData.game_id,
          });
          setPage(data.activePage);
          setState({
            gameList: res.data.gameList,
            mypersonalranklist: res.data.mypersonalranklist,
            gamerankinglist: [
              ...state.gamerankinglist,
              ...res.data.gamerankinglist.rows,
            ],
            //gamerankinglist:[...state.gamerankinglist, ...res.data.gamerankinglist.rows]
          });
          setLoading(false);
        } else {
          setHaseMorePost(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ShieldRank = ({ data }: any) => {
    return (
      <div className={"relative"}>
        <img src={data?.shield} alt="shield1" />
        <span>{data.rank}</span>
      </div>
    );
  };

  //   const Menuse = (
  //     <Menu>
  //       <Menu.Item key="0">
  //         <a>Leauge of Legend</a>
  //       </Menu.Item>
  //       <Menu.Item key="1">
  //         <a>Dota2</a>
  //       </Menu.Item>
  //     </Menu>
  //   );

  const ArrowDown = () => {
    return <CaretDownOutlined className=" text-white text-lg" />;
  };

  let rank = 1;
  const CardRank = ({ data, rankno }: any) => {
    const Ranker = () => {
      if (rankno > 3) {
        return (
          <div className="text-center flex justify-center items-center text-[#fff] text-4xl font-extrabold">
            <img src={shield1st} alt="shield1st" />
            <span>{rankno}</span>
          </div>
        );
      } else {
        return (
          <div
            className={
              "relative h-14 w-14 text-center flex justify-center items-center text-[#fff] text-4xl font-extrabold"
            }
          >
            <img src={shield1st} alt="shield1st" />
            <div className="absolute">
              <span>{rankno}</span>
            </div>
          </div>
        );
      }
    };

    if (data.UserDetail.id === getUserID()) {
      setMyRank(rankno);
    }

    return (
      <div className="h-24 col-span-2 grid grid-cols-[repeat(16,_minmax(0,_1fr))]  bg-primary-dark shadow-[0_0_15px_5px_rgba(0,0,0,0.5)]   ">
        <div className="col-span-2 text-center flex justify-center items-center">
          <Ranker />
        </div>

        <div className="col-span-2 text-center  flex justify-center items-center bg-primary-dark ">
          <img
            src={data.GameDetail.game_icon}
            alt="game_icon"
            className="w-[65px] h-[65px] p-1 object-cover rounded bg-black border-2 border-[#418AB8] border-solid"
          />
        </div>
        <div className="col-span-2 text-center flex justify-center items-center  ">
          <div
            className={
              "relative h-50 w-20 text-center flex justify-center items-center text-[#fff] text-base font-light"
            }
          >
            <img
              src={data.UserDetail.avatar_image}
              alt="avatar_image"
              className="object-contain relative"
            />
            <p className="absolute bottom-[-10px] left-[-10px] w-[20px] h-[20px] bg-[#222C36] rounded-[5px]">
              {data.UserDetail.level}
            </p>
          </div>
        </div>
        <div className="col-span-2 text-center flex justify-center items-center text-[#fff] text-sm wide:text-lg font-extrabold">
          {data.UserDetail.name}
        </div>
        <div className="col-span-2 text-center flex justify-center items-center text-blue-300 text-base wide:text-2xl font-extrabold">
          {data.totalwinCount}
        </div>
        <div className="col-span-2 text-center flex justify-center items-center text-blue-300 text-base wide:text-2xl font-extrabold">
          {data.totalloseCount}
        </div>
        <div className="col-span-2 text-center flex justify-center items-center">
          <div className="flex-end justify-center flex-col">
            <div className="text-center text-lg wide:text-3xl font-extrabold text-[#fff]">
              {data.total_earning ? data.total_earning : 0} USD
            </div>
            <div className="text-right text-sm wide:text-base font-extrabold text-[#94bd4b]">
              = {data.total_earning ? data.total_earning  : 0} BLC
            </div>
          </div>
        </div>
        <div className="col-span-2 text-center flex justify-center items-center">
          {/* <img src={data.member} className="h-10 w-10 wide:h-14 wide:w-14 object-contain" /> */}
        </div>
      </div>
    );
  };

  const fetchMoreData = () => {
    const data = {
      activePage: activeData.activePage + 1,
      totalPage: activeData.totalPage,
      limit: config.paginationPerPage,
      type: activeData.type,
      game_id: activeData.game_id,
    };
    setActiveData(data);
    getRanking(data);
  };

  return (
    <div className="flex justify-center">
      <div className="h-full w-full ">
        <div
          className="p-6 w-full h-18 border-l-4 border-[#94bd4b] flex space-x-4 items-center justify-items-center text-center
                                bg-gradient-to-r from-[#142835] to-[#0d212a]"
        >
          <p className="text-[#fff] text-lg font-bold">
            MY POSITION IN THE RANKING
          </p>
        </div>

        {/* my personal ranking code start */}
        {state.mypersonalranklist.map((personalrank: any, i: any) => {
          if (personalrank.user_id === getUserID()) {
            return (
              <div className="h-24 col-span-2 grid grid-cols-[repeat(16,_minmax(0,_1fr))] grid-rows-1 shadow-[0_0_15px_5px_rgba(0,0,0,0.5)] ">
                <div className="col-span-2 text-center flex justify-center items-center ">
                  <div
                    className={
                      "relative h-14 w-14 text-center flex justify-center items-center text-[#fff] text-4xl font-extrabold"
                    }
                  >
                    <img src={shield1st} alt="shield1st" />
                    <div className="absolute ">
                      {/* <span>{i+1}</span> */}
                      <span>{parseInt(i + 1)}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-center  flex justify-center items-center">
                  <img
                    src={personalrank.GameDetail.game_icon}
                    alt="game_icon"
                    className="w-[65px] h-[65px] p-1 object-cover rounded bg-black border-2 border-[#418AB8] border-solid"
                  />
                </div>
                <div className="col-span-2 text-center flex justify-center items-center  ">
                  <div
                    className={
                      "relative h-50 w-20 text-center flex justify-center items-center text-[#fff] text-base font-light"
                    }
                  >
                    <img
                      src={personalrank.UserDetail.avatar_image}
                      alt="avatar_image"
                      className="object-contain relative"
                    />
                    <p className="absolute bottom-[-10px] left-[-10px] w-[20px] h-[20px] bg-[#222C36] rounded-[5px]">
                      {" "}
                      {personalrank.UserDetail.level}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 text-center flex justify-center items-center text-[#fff] text-sm wide:text-lg font-extrabold">
                  {personalrank.UserDetail.name}
                </div>
                <div className="col-span-2 text-center flex justify-center items-center text-blue-300 text-base wide:text-2xl font-extrabold">
                  {personalrank.totalwinCount}
                </div>
                <div className="col-span-2 text-center flex justify-center items-center text-blue-300 text-base wide:text-2xl font-extrabold">
                  {personalrank.totalloseCount}
                </div>
                <div className="col-span-2 text-center flex justify-center items-center">
                  <div className="flex-end justify-center flex-col">
                    <div className="text-center text-lg wide:text-3xl font-extrabold text-[#fff]">
                      {personalrank.total_earning
                        ? personalrank.total_earning
                        : 0}{" "}
                      USD
                    </div>
                    <div className="text-right text-sm wide:text-base font-extrabold text-[#94bd4b]">
                      ={" "}
                      {personalrank.total_earning
                        ? personalrank.total_earning 
                        : 0}{" "}
                      BLC
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-center flex justify-center items-center">
                  {/* <img src={trophy1st} className="h-10 w-10 wide:h-14 wide:w-14 object-contain" /> */}
                </div>
              </div>
            );
          }
        })}
        {/* my personal ranking code end */}
        {state.mypersonalranklist.length === 0 && (
          <div className="text-center font-bold">
            <p>No data found</p>
          </div>
        )}

        <div className="relative">
          <div
            className="p-6 w-full h-18 border-l-4 border-[#94bd4b] flex space-x-4 items-center text-center 
                                bg-gradient-to-r from-[#142835] to-[#0d212a] justify-between"
          >
            <p className="text-[#fff] text-lg font-bold ">Top 100</p>

            <div className="flex justify-end items-center space-x-3">
              <p
                className={clsx(
                  "p-[2px_30px] rounded-[20px] cursor-pointer text-[#fff] font-bold text-lg",
                  active("All")
                )}
                onClick={() => {
                  setFillter("All");
                  searchFilter("All");
                }}
              >
                All times
              </p>
              <p
                className={clsx(
                  "p-[2px_30px] rounded-[20px] cursor-pointer text-[#fff] font-bold text-lg",
                  active("Monthly")
                )}
                onClick={() => {
                  setFillter("Monthly");
                  searchFilter("Monthly");
                }}
              >
                Monthly
              </p>
              <p
                className={clsx(
                  "p-[2px_30px] rounded-[20px] cursor-pointer text-[#fff] font-bold text-lg",
                  active("Weekly")
                )}
                onClick={() => {
                  setFillter("Weekly");
                  searchFilter("Weekly");
                }}
              >
                Weekly
              </p>
              <p
                className={clsx(
                  "p-[2px_30px] rounded-[20px] cursor-pointer text-[#fff] font-bold text-lg",
                  active("Daily")
                )}
                onClick={() => {
                  setFillter("Daily");
                  searchFilter("Daily");
                }}
              >
                Daily
              </p>
            </div>
          </div>
        </div>

        <div className="h-10 grid grid-cols-[repeat(16,_minmax(0,_1fr))] bg-[#242424] shadow-[0_0_15px_5px_rgba(0,0,0,0.5)] ">
          <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
            Rank
          </div>
          <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
            Game
          </div>
          <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
            Avatar
          </div>
          <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
            Username
          </div>
          <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
            Wins
          </div>
          <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
            Losses
          </div>
          <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
            Total earnings
          </div>
          <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
            Member
          </div>
        </div>

        <div
          style={{
            height: "calc(100vh - 555px)",
          }}
          className=" w-full overflow-y-auto space-y-1 bg-primary-dark shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] "
        >
          <InfiniteScroll
            className="setting-scroll"
            dataLength={state.gamerankinglist.length}
            next={fetchMoreData}
            hasMore={hasMorePost}
            loader={<h4 className="w-50 h-40 text-[18px]">Loading...</h4>}
            height={170}
            endMessage={
              <p
                className="text-[16px]"
                style={{ textAlign: "center", marginTop: "10px" }}
              >
                <b>No more records</b>
              </p>
            }
          >
            {state.gamerankinglist.length > 0 &&
              state.gamerankinglist.map((item: any, i: any) => (
                <CardRank data={item} rankno={i + 1} />
              ))}
          </InfiniteScroll>

          {state.gamerankinglist.length === 0 && (
            <div className="text-center font-bold">
              <p>No data found</p>
            </div>
          )}
          {/* {state.gamerankinglist.length !== 0 && activeData.totalPage !== page && 
                    <div  className="flex flex-col items-center">
                    <button className="mt-5 mb-5 bg-primary-sky/30 w-40 h-10 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg" 
                    onClick={() => onClikProfilePaginate(page + 1)}>
                    {loading ? 'Loading...' : 'Load More'}
                    </button>
                    </div>
                    } */}
        </div>
      </div>
    </div>
  );
};
export default Ranking;
