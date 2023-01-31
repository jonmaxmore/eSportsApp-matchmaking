import React, { useEffect, useReducer, useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/outline";
import {
  useSearchMatchContext,
  useSearchMatchDispatch,
} from "@Context/SearchMatch";
import GameAPI from "@api/MatchmakingAPI";
import { socket } from "@Utils/socket";
import { useWalletDispatch } from "@Context/Wallet/Wallet";
import { WalletBalanceAlert } from "../WalletAlert/WalletAlert";
import MaxAPI from "@api/MaxAPI";
import "./index.css";
import UserAPI from "@api/UserAPI";
import { ReactComponent as Loading } from "@Image/loaderNew.svg";
// import { useSearchTimerContext } from "@Context/SearchTimer";

type Price = {
  dollar: string;
  blc: string;
};

const Single = (props: any) => {
  const navigate = useNavigate();
  const { searchMatch, SetSearch }: any = useSearchMatchContext();
  const context = useSearchMatchDispatch();
  const walletContext = useWalletDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [walletAlert, setWalletAlert] = useState(false);

  const [selected, setSelected] = useState<number>(-1);
  const [amount, setAmount] = useState("");
  const [dollarToBLC, setDollarToBLC] = useState(0);
  const [userid, setUserid] = useState("");
  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      game_id: 0,
      gameName: "",
      betAmounts: [],
      numberOfParticipantPerTeam: 0,
    }
  );
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);

  const gameId1 = props.gameId;
  const omkicks1 = () => {
    setStep1(true);
    // setStep2(false);
  };
  const omkicks2 = () => {
    setStep2(true);
  };
  const [datastate, setDatastate] = useReducer(
    (datastate: any, newState: any) => ({ ...datastate, ...newState }),
    {
      dataloginsteam: "",
      gameName: "",
      img: "",
      idsteam: "",
    }
  );
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    UserAPI.getUserDetail()
      .then((res) => {
        if (res.data.success) {
          //  console.log(res.data);
          setUserid(res.data.user.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const [userid, setUserid] = useState("");
  //console.log(datastate)
  useEffect(() => {
    getGameDetailAndBetAmount(props.gameId);
  }, []);

  // useEffect(() => {
  //     socket.on("get_myteam", (data) => {
  //         if(data.is_team_fulfilled){
  //             SetSearch.CancelSearch();
  //             // SetSearchTimer.setSearchTimerFalse();
  //             navigate("/matchmaking/singleteam", { state: { team_id: data.team_id, team_room_id: data.team_room_id } })
  //         }
  //     });

  //     socket.on("search_team_after_leaved", (data) => {
  //         // SetSearchTimer.setSearchTimerTrue();
  //         SetSearch.setSearchMatchTrue()
  //         navigate("/home");
  //     });

  // }, [socket]);

  const getGameDetailAndBetAmount = (id: number) => {
    GameAPI.getGameDetailsAndBetAmountByID(id)
      .then((res) => {
        if (res.data.success) {
          setState({
            game_id: res.data.game.id,
            gameName: res.data.game.name_en,
            betAmounts: res.data.betAmounts,
            numberOfParticipantPerTeam:
              res.data.game.number_of_participant_per_team,
            gameImageURL: res.data.game.game_image_url,
            gameIcon: res.data.game.game_icon,
          });
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchTeam = (team_room_id: any) => {
    if (team_room_id != "") {
      socket.emit("search_team", team_room_id);
    }
  };

  const onPay = async () => {
    const postData = {
      game_id: state.game_id,
      bet_amount: amount,
      mmr_level: 15,
      type: "SingleSearch",
    };

    GameAPI.searchTeam(postData)
      .then((res) => {
        if (res.data.success) {
          const team_room_id = "team_room_" + res.data.teamParticipant.team_id;
          searchTeam(team_room_id);
          const data = {
            team_id: res.data.teamParticipant.team_id,
            team_room_id: team_room_id,
            is_team_fulfilled: res.data.is_team_fulfilled,
            betAmount: amount,
            amountToBlc: dollarToBLC,
            game_id: state.game_id,
            gameName: state.gameName,
            imageUrl: state.gameImageURL,
            gameIcon: state.gameIcon,
            numberOfPlayerPerTeam: state.numberOfParticipantPerTeam,
          };
          setShowPopup(false);
          // SetSearchTimer.setSearchTimerTrue();
          SetSearch.setSearchMatchTrue();
          context._addSearchMatchDetails(data);
          socket.emit("is_found_team", data);
          if (res.data.is_team_fulfilled) {
            setTimeout(() => {
              SetSearch.CancelSearch();
              navigate("/matchmaking/singleteam", {
                state: {
                  team_id: res.data.teamParticipant.team_id,
                  team_room_id: team_room_id,
                },
              });
            }, 1000);
          }
          navigate(`/home`);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
      MaxAPI.chackLoginStram()
        .then((res) => {
          if (res.data.success && res.data.steam !== null) {
            //  console.log(res.data);

            const data_st = res.data.steam;
            //  console.log(data_st)
            setDatastate({
              dataloginsteam: data_st,
              gameName: data_st.namesteam,
              img: data_st.img,
              idsteam: data_st.steamkey,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, [userid]);

  const onClickSetAmountAndIndex = (amount: any, index: any, blc: any) => {
    setSelected(index);
    setAmount(amount);
    setDollarToBLC(blc);
  };

  const CardPriceBronze = (data: Price, index: number) => {
    const select =
      selected == index
        ? "bg-gradient-to-b from-primary-sky border-primary-sky shadow-[0px_0px_7px_2px] shadow-border-primary-sky/50"
        : " border-[#b46f1f] shadow-[0px_0px_7px_2px] shadow-[#b46f1f]/50";
    const blc = Number(data.dollar) ;
    return (
      <div
        key={index}
        className={clsx(select, " h-14 border-2  px-12 cursor-pointer ")}
        onClick={() => {
          onClickSetAmountAndIndex(data.dollar, index, blc);
        }}
      >
        <p className="text-center text-xl text-white font-bold uppercase">
          {data.dollar}{" "}
        </p>
        <p className="text-center text-primary-green uppercase font-semibold">
          ={blc} swordz
        </p>
      </div>
    );
  };

  const CardPriceSliver = (data: Price, index: number) => {
    const select =
      selected == index
        ? "bg-gradient-to-b from-primary-sky border-primary-sky shadow-[0px_0px_7px_2px] shadow-border-primary-sky/50"
        : " border-[#acacac] shadow-[0px_0px_7px_2px] shadow-[#acacac]/50";

    const blc = Number(data.dollar) ;

    return (
      <div
        key={index}
        className={clsx(select, " h-14 border-2  px-12 cursor-pointer")}
        onClick={() => {
          onClickSetAmountAndIndex(data.dollar, index, blc);
        }}
      >
        <p className="text-center text-xl text-white font-bold uppercase">
          {data.dollar}{" "}
        </p>
        <p className="text-center text-primary-green uppercase font-semibold">
          ={blc} swordz
        </p>
      </div>
    );
  };

  const CardPriceGold = (data: Price, index: number) => {
    const select =
      selected == index
        ? "bg-gradient-to-b from-primary-sky border-primary-sky shadow-[0px_0px_7px_2px] shadow-border-primary-sky/50"
        : " border-[#edab04] shadow-[0px_0px_7px_2px] shadow-[#edab04]/50";

    const blc = Number(data.dollar) ;

    return (
      <div
        key={index}
        className={clsx(select, " h-14 border-2  px-12 cursor-pointer")}
        onClick={() => {
          onClickSetAmountAndIndex(data.dollar, index, blc);
        }}
      >
        <p className="text-center text-xl text-white font-bold uppercase">
          {data.dollar}{" "}
        </p>
        <p className="text-center text-primary-green uppercase font-semibold">
          ={blc} swordz
        </p>
      </div>
    );
  };

  const CardConfirm = (props: any) => {
    return (
      <div className="w-[600px] h-[full] bg-primary-dark text-black">
        {/* 1 */}

        {step1 && (
          <>
            <div className="h-[55px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5">
              <p className="text-white text-center uppercase font-bold text-base">
                confirm with this amount?
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-primary-light rounded-md p-1 absolute top-3 right-4"
              >
                <XIcon className="text-white w-8" />
              </button>
            </div>
            <div className="flex flex-col items-center pt-12 gap-2">
              <div>
                <span className="text-white font-medium">
                  Are you sure you want to spend{" "}
                </span>
                <span className="text-primary-sky font-medium">
                  {props.amount}{" "}
                </span>
                <span className="text-primary-green font-medium">
                  ({props.dollarToBLC} swordz){" "}
                </span>
                <span className="text-white font-medium">
                  to {state.gameName} match ?
                </span>
              </div>
              <div className="">
                <span className="text-white font-medium ">
                  You will lost this match to the from that will win.
                </span>
              </div>
              <button
                className="bg-primary-sky/30 mt-8 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                onClick={() => {
                  onPay();
                }}
              >
                PAY {props.amount}
                <p className="text-primary-green text-sm">
                  {" "}
                  = {props.dollarToBLC} swordz
                </p>
              </button>
              <button
                className="mt-8 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                onClick={() => setShowPopup(false)}
              >
                CANCEL
              </button>
            </div>
          </>
        )}

        {/* 2 */}
        {gameId1 == "4" && (
          <div className="max">
            {!step1 && (
              <>
                {" "}
                <div className="h-[55px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5">
                  <p className="text-white text-center uppercase font-bold text-base">
                    {!step1 ? (
                      <>connect Steam</>
                    ) : (
                      <> confirm with this amount?</>
                    )}
                  </p>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="bg-primary-light rounded-md p-1 absolute top-3 right-4"
                  >
                    <XIcon className="text-white w-8" />
                  </button>
                </div>
                <div className="flex flex-col items-center pt-12 gap-2">
                  <div>
                    <div className="items-center ">
                      {datastate.dataloginsteam ? (
                        <>
                          {" "}
                          <img
                            src={datastate.img}
                            className="items-center maxcss w-50"
                          />
                          <h1 className="text-[#fafafa] text-center uppercase font-bold text-base mt-3">
                            NAME :{" "}
                            <span className="text-[#52c41a]">
                              {datastate.gameName}
                            </span>{" "}
                          </h1>
                          <h1 className="text-[#fafafa] text-center uppercase font-bold text-base mt-3">
                            ID :{" "}
                            <span className="text-[#52c41a]">
                              {datastate.idsteam}
                            </span>{" "}
                          </h1>
                          <h1 className="text-[#0979d5] text-center   mt-5">
                            {" "}
                            <a
                              href={`https://steam.battlelab.site/loginsteam?user_id=${userid}`}
                              className=""
                              target={"_blank"}
                            >
                              change usersteam
                            </a>
                          </h1>
                          <button
                            className="mt-8 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                            onClick={omkicks1}
                          >
                            confirm
                          </button>
                        </>
                      ) : (
                        <>
                          <Loading className="w-52 h-full fill-primary-sky " />
                          <button
                            className="mt-8 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                            // onClick={()=>(`http://steam.queueline11.com/loginsteam?user_id=${userid}`)}
                          >
                            <a
                              href={`https://steam.battlelab.site/loginsteam?user_id=${userid}`}
                              className=""
                              target={"_blank"}
                            >
                              LOGIN STEAM
                            </a>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className=""></div>

                  <button
                    className="mt-8 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => setShowPopup(false)}
                  >
                    CANCEL
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        {gameId1 != "4" && (
          <div className="max">
            <>
              <div className="h-[55px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5">
                <p className="text-white text-center uppercase font-bold text-base">
                  confirm with this amount?
                </p>
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-primary-light rounded-md p-1 absolute top-3 right-4"
                >
                  <XIcon className="text-white w-8" />
                </button>
              </div>
              <div className="flex flex-col items-center pt-12 gap-2">
                <div>
                  <span className="text-white font-medium">
                    Are you sure you want to spend{" "}
                  </span>
                  <span className="text-primary-sky font-medium">
                    {props.amount}{" "}
                  </span>
                  <span className="text-primary-green font-medium">
                    ({props.dollarToBLC} swordz){" "}
                  </span>
                  <span className="text-white font-medium">
                    to {state.gameName} match ?
                  </span>
                </div>
                <div className="">
                  <span className="text-white font-medium ">
                    You will lost this match to the from that will win.
                  </span>
                </div>
                <button
                  className="bg-primary-sky/30 mt-8 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                  onClick={() => {
                    onPay();
                  }}
                >
                  PAY {props.amount}
                  <p className="text-primary-green text-sm">
                    {" "}
                    = {props.dollarToBLC} swordz
                  </p>
                </button>
                <button
                  className="mt-8 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                  onClick={() => setShowPopup(false)}
                >
                  CANCEL
                </button>
              </div>
            </>
          </div>
        )}
      </div>
    );
  };

  // const WalletBalanceAlert = () => {
  //     return (
  //         <div className="w-[600px] h-[350px] bg-primary-dark text-black">
  //             <div className="h-[55px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5">
  //                 <p className="text-white text-center uppercase font-bold text-base">
  //                     Wallet Alert?
  //                 </p>
  //                 <button onClick={() => setWalletAlert(false)} className="bg-primary-light rounded-md p-1 absolute top-3 right-4">
  //                     <XIcon className="text-white w-8" />
  //                 </button>
  //             </div>
  //             <div className="flex flex-col items-center pt-12 gap-2">
  //                 <div>
  //                     <p className="text-white text-center font-medium">Sorry, the amount of BLC that you selected for wagering has exceeded the amount that you currently have in your wallet.
  //                     Please refill your wallet with BLC first and then try again after. Thank you. </p>
  //                 </div>
  //                 {/* <div className="">
  //                     <span className="text-white font-medium ">Sorry, the amount of BLC that you selected for wagering has exceeded the amount that you currently have in your wallet.
  //                     Please refill your wallet with BLC first and then try again after. Thank you. </span>
  //                 </div> */}
  //                 <button
  //                     className="mt-8 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
  //                     onClick={() => setWalletAlert(false)}
  //                 >
  //                     Okay
  //                 </button>
  //             </div>

  //         </div>
  //     )
  // }

  const checkWalletamountHandler = () => {
    // console.log(walletContext.items.walletBLCAmount);
    // console.log(dollarToBLC);
    if (walletContext.items.walletBLCAmount > dollarToBLC) {
      setShowPopup(true);
    } else {
      setWalletAlert(true);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 grid-rows-3 gap-12 mb-12">
        {state.betAmounts.map((data: any, index: number) => {
          if (index < 3) {
            return (
              <div key={`amount` + index}>{CardPriceBronze(data, index)}</div>
            );
          } else if (index < 6) {
            return (
              <div key={`amount` + index}>{CardPriceSliver(data, index)}</div>
            );
          } else {
            return (
              <div key={`amount` + index}>{CardPriceGold(data, index)}</div>
            );
          }
        })}
      </div>
      <div className="flex justify-center px-16 py-6">
        <button
          disabled={selected == -1}
          className={clsx(
            "bg-primary-sky/30 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg",
            selected == -1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          )}
          onClick={() => checkWalletamountHandler()}
        >
          confirm
        </button>
        <Modal
          visible={showPopup}
          footer={null}
          title={null}
          closable={false}
          bodyStyle={{ padding: "0px" }}
          className="p-0 w-full h-auto flex items-center justify-center"
        >
          <CardConfirm amount={amount} dollarToBLC={dollarToBLC} />
        </Modal>
        <Modal
          visible={walletAlert}
          footer={null}
          title={null}
          closable={false}
          bodyStyle={{ padding: "0px" }}
          className="p-0 w-full h-auto flex items-center justify-center"
        >
          <WalletBalanceAlert
            walletAlert={walletAlert}
            setWalletAlert={setWalletAlert}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Single;
