import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { Input } from "antd";
import clsx from "clsx";
import style from "./style.module.css";
import GameAPI from "@api/MatchmakingAPI";
import demo from "@Image/Matchmaking/demo.png";
import { useNavigate } from "react-router-dom";
// type DataProps = {
//   id: string;
//   img: string,
//   // game_image_url: string;
//   // is_available: boolean
// };

const SelectGame = () => {

  const [activeData, setActiveData] = useState(
    { activePage: 1,
       totalPage: 1,
        limit: 9, search: "" });
  const [games, setGames] = useState([]);
  const [selected, setSelected] = useState<number>(-1);
  const navigate = useNavigate()

  useEffect(() => {
    getGames(activeData)
  }, [])

  const getGames = (data: any) => {

    GameAPI.getAllGames(data)
      .then(res => {
        setActiveData({ activePage: activeData.activePage, totalPage: res.data.totalCounts, limit: activeData.limit, search: activeData.search });
          
        if (res.data.success) {
          setGames(res.data.games);
        } else {
          setGames([])
        }
      }).catch(err => {
        console.log(err)
      })
  }

  //http://localhost:8000/storage/games/demo.png

  const StatusGame = ({ status }: any) => {
    if (selected === status) {
      return (
        <div className="  shadow-2xl flex items-end shadow-cyan-500/50 bg-primary-sky/30 absolute top-0 right-0 left-0 buttom-0 border-[5px] border-primary-sky w-full h-full">
          <div className="w-full h-10 flex justify-center ">
            {/* trapezoid */}
            <div
              className={clsx(
                "w-2/4 h-9 flex justify-center text-center border-b-3 ",
                style.trapezoid
              )}
            >
              <p className="uppercase text-sm xl:text-xl font-bold translate-y-2">
                selected
              </p>
            </div>
          </div>
        </div>
      );
    } else if (status === "disable") {
      return (
        <div className="   flex items-center justify-center bg-black/60 absolute top-0 right-0 left-0 buttom-0  w-full h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
          >
            <path
              className="fill-white w-24 h-24"
              d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z"
            />
          </svg>
        </div>
      );
    } else {
      return null;
    }
  };

  const GameCard = (data: any) => {

    if (data.is_available) {
      return (
        <div
          key={data.id}
          className="w-full aspect-[16/11] bg-green-300 relative"
          style={{
            backgroundImage: `url(${data.game_image_url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          onClick={() => setSelected(data.id)}
        >
          <StatusGame status={data.id} />
        </div>
      );
    } else {
      return (
        <div
          className="w-full aspect-[16/11] border-2  grayscale relative"
          key={data.id}
          style={{
            backgroundImage: `url(${data.game_image_url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="   flex items-center justify-center bg-black/60 absolute top-0 right-0 left-0 buttom-0  w-full h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
            >
              <path
                className="fill-white w-24 h-24"
                d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z"
              />
            </svg>
          </div>
        </div>
      );
    }
  };

  const handleSearch = (value: any) => {
    let searchValue = value.target.value;
    setActiveData({ activePage: activeData.activePage, totalPage: activeData.totalPage, search: searchValue, limit: activeData.limit });
    const data = { activePage: activeData.activePage, totalPage: activeData.totalPage, search: searchValue, limit: activeData.limit }
    getGames(data)
  }

  return (
    <div>
      <div className="bg-[#0e1619] w-full h-full relative pt-6 mb-6">
        <h1 className="uppercase text-white font-bold text-[25px] text-center">
          Select game
        </h1>
        <p className="text-center mt-5">
          select the game you want to play so we can find you a suitable match to
          join the battle
        </p>

        <Input
          bordered={false}
          prefix={<SearchIcon className="w-7 h-7" />}
          placeholder="Search"
          onChange={value => handleSearch(value)}
          className={clsx(
            style.search,
            "absolute top-6 right-16 text-white w-60 xl:w-80 h-14 px-4  rounded-lg border-0 bg-gradient-to-r from-[#1c323f] to-[#121e26]"
          )}
        />
      </div>
      <div
        className="grid grid-cols-3 w-full bg-[#0e1619] gap-6 pl-16 pr-16  overflow-y-auto"
        style={{
          height: "calc(100vh - 320px)",
        }}
      >
        {/* selected */}
        {games.length > 0 && games.map((values: any, index: number) => {
          return (
            <div key={index} className="w-full h-full relative">
              <GameCard {...values} />
            </div>
          );
        })}

        {/* disabled */}
        {/* {data.map((data: DataProps,index) => {
          return (
            <div className="w-full h-full relative" key={index + data.id}>
              <CardDisable {...data} />
            </div>
          );
        })} */}
        {/* {games.length == 0 && <h2 style={{ color: "white" }}>
          Game Not Found
        </h2>} */}
      </div>
      <div className="flex justify-end px-16 py-6">
        {games.length > 0 && <button disabled={selected == -1}
          className={clsx("bg-primary-sky/30 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg",
          selected == -1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer")}
          onClick={() => navigate(`/matchmaking/selectamount`, { state: { id: selected } })}>
          confirm
        </button>}
      </div>
    </div>
  );
};

export default SelectGame;
