import React, { useReducer, useState, useEffect } from "react";
import clsx from "clsx";
import { Select } from "antd";
import "./style.css";
import { XIcon } from "@heroicons/react/solid";
import { CaretDownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import All from "./Games/All";
import UserAPI from "@api/UserAPI";

interface Props {
  ActivePop: (value: any) => void;
}

const Ranking = ({ ActivePop }: Props) => {
  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      gameList: [],
    }
  );

  useEffect(() => {
    getAllGameList();
  }, []);

  const getAllGameList = () => {
    UserAPI.getAllGameList()
      .then((res) => {
        //console.log('game',res.data.success);
        if (res.data.success) {
          setState({
            gameList: res.data.games,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

//   const active = (value: string) => {
//     if (activeSelect === value) {
//       return "bg-[#94bd4b] ";
//     } else {
//       return "bg-[#0c1c24]";
//     }
//   };

  const [activeSelect, setActiveSelect] = useState("All");

  const SubContent = () => {
    // if (activeSelect === 'All games') {
    //     return <All ActivePop={activeSelect} />
    // }
    // if (activeSelect === 'Leauge of legends') {
    //     return <Lol ActivePop={value => setActiveSelect(value)} />
    // }
    // else {
    //     return <div>404</div>
    // }
    return <All ActivePop={activeSelect} />;
  };

  const ArrowDown = () => {
    return (
      <CaretDownOutlined className=" text-white text-lg -translate-y-2 " />
    );
  };

  return (
    <div className="flex justify-center animated bounceInLeftrank revers-rounded">
      <div className="w-full h-full bg-transparent">
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 150px)",
          }}
          className="bg-transparent relative "
        >
          <XIcon
            className="absolute top-3 w-9 h-9 right-3 cursor-pointer z-50"
            onClick={() => ActivePop("")}
          />

          <div className="bg-primary-dark drop-shadow-[0px_0px_15px_rgba(0,0,0,0.7)] h-full rounded-xl revers-rounded ">
            <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))] grid-rows-1 bg-primary-dark revers-rounded ">
              <div className="flex items-center pl-16 py-6 mt-6 w-[450px] SelecterRounded animated3 bounceInLeftrank">
                <p className="pr-6 text-[#fff] text-base font-medium">
                  {" "}
                  FILTER BY:
                </p>
                <Select
                  style={{ color: "#fff", borderRadius: "0px", height: "40px" }}
                  className="SelecterRounded w-[150px] wide:w-2/3 rounded-xl"
                  suffixIcon={<ArrowDown />}
                  placeholder="All games"
                  onChange={(item) => {
                    setActiveSelect(item);
                  }}
                  dropdownClassName="rounded-none bg-[#2e2e2e] text-white"
                >
                  <Select.Option
                    value="All"
                    className={clsx("text-white hover:text-black ")}
                    onClick={() => setActiveSelect("All")}
                  >
                    All games
                  </Select.Option>
                  {state.gameList.map((games: any, i: any) => (
                    <Select.Option
                      value={games.id}
                      className={clsx("text-white hover:text-black ")}
                      onClick={() => setActiveSelect(games.id)}
                    >
                      {games.name_en}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div className="flex justify-center items-center text-2xl font-black animated2 bounceInLeftrank">
                RANKING
              </div>
            </div>
            <div className="flex justify-center">
              <div className="block box-border w-full px-12">
                <div className="bg-primary-dark shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] border border-black ">
                  <div
                    className={clsx(
                      activeSelect === "" ? "hidden" : "",
                      " duration-500 animated2 bounceInLeftrank"
                    )}
                  >
                    <SubContent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Ranking;
