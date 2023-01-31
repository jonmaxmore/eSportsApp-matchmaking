import React, { useEffect, useReducer, useRef, useState } from "react";
import styles from "./style.module.css";
import Plus from "./img/ic-plus.png";
import Lineup from "./img/ic-lineup.png";
import Mail from "./img/ic-contact_inactive.png";
import Noti from "./img/ic-noti.png";
import FriendList from "./FriendList";
import clsx from "clsx";
import UserAPI from "@api/UserAPI";
import CardSearch from "@Components/Modal/SearchTeam";
import CardConfirm from "@Components/Modal/SeachMatch";
import AcceptGame from "@Components/Modal/Countdown";
import {
  useSearchMatchContext,
  useSearchMatchDispatch,
} from "@Context/SearchMatch";
import { XIcon, MinusIcon } from "@heroicons/react/outline";
import { Modal, Badge, Drawer } from "antd";
import lollogo from "@Image/Matchmaking/LogoLoL.png";
import ModalTradeCurrency from "../Payment/ModalTradeCurrency";
import "./style.css";
import WalletPrivateKey from "@Components/Modal/WalletPrivateKey";
import MailModal from "@Components/Modal/Mail";
import Notification from "@Components/Drawer/Notification";
import { useSearchOppoMatchContext } from "@Context/SearchOppoMatch";
// import { useSearchTimerContext } from "@Context/SearchTimer";
import { socket } from "@Utils/socket";
import { useNavigate } from "react-router-dom";
import { useWalletDispatch } from "@Context/Wallet/Wallet";
import NotificationsAPI from "@api/NotificationsAPI";

const FriendMenu = (props: any) => {
  const Avatar = {};
  const [MatchPopup, SetMatchPopup] = useState(true);
  const { searchMatch, SetSearch }: any = useSearchMatchContext();
  const { searchOppoMatch, SetSearchOppo }: any = useSearchOppoMatchContext();
  const [activeData, setActiveData] = useState({
    activePage: 1,
    totalPage: 1,
    limit: 10,
  });
  const [notifications, setNotifications] = useState([]);
  const [unReadNotiCount, setUnReadNotiCount] = useState(0);

  const [Countdown, SetCountdown] = useState(false);
  const navigate = useNavigate();
  const context = useSearchMatchDispatch();
  const item = context.items;
  const gameIcon = item.gameIcon;

  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      name: "",
      avtarName: "",
      img_url: "",
      level: 0,
      wallet_balance: 0,
      online: false,
    },
  );
  const [timerClock, setTimerClock] = useState("00:00");
  const walletContext = useWalletDispatch();

  // useEffect(() => {
  //   getUserDetails();
  //   fetchWalletBalance();
  // }, [])
  useEffect(() => {
    // const id = setInterval(() => {
      
    // }, 1000);
    // return () => clearInterval(id);
    getUserDetails();
      fetchWalletBalance();
  }, []);
  useEffect(() => {
    let timerCounter: any = null;
    var initialTime = Date.now();
    if (searchOppoMatch || searchMatch) {
      timerCounter = setInterval(() => {
        checkTime();
      }, 1000);

      var checkTime = () => {
        var timeDifference = Date.now() - initialTime;
        var formatted = convertTime(timeDifference);
        setTimerClock(formatted);
      };

      const convertTime = (miliseconds: any) => {
        var totalSeconds = Math.floor(miliseconds / 1000);
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds - minutes * 60;
        return `${formatTime(minutes)}:${formatTime(seconds)}`;
      };

      const formatTime = (time: any) => {
        return String(time).padStart(2, "0");
      };
    } else {
      clearInterval(timerCounter);
      setTimerClock("00:00");
    }
    return () => clearInterval(timerCounter);
  }, [searchMatch, searchOppoMatch]);

  useEffect(() => {
    socket.on("get_myteam", (data) => {
      if (data.is_team_fulfilled) {
        SetSearch.CancelSearch();
        navigate("/matchmaking/singleteam", {
          state: { team_id: data.team_id, team_room_id: data.team_room_id },
        });
      }
    });

    socket.on("get_game_result", (data) => {
      fetchWalletBalance();
    });

    socket.on("get_notification", (data) => {
      getUserNotifications(activeData);
    });
  }, [socket]);
  useEffect(() => {
    const id = setInterval(() => {
      getUserNotifications(activeData);
    }, 10000);
    return () => clearInterval(id);
  }, [activeData]);
  // useEffect(() => {
  //   getUserNotifications(activeData);
  // },[]);

  const getUserNotifications = (data: any) => {
    NotificationsAPI.getUserNotifications(data)
      .then((res) => {
        if (res.data.success) {
          setActiveData({
            activePage: activeData.activePage,
            totalPage: res.data.totalCounts,
            limit: activeData.limit,
          });
          setNotifications(res.data.notifications);
          setUnReadNotiCount(res.data.notifications.length);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserDetails = () => {
    UserAPI.getUserDetail()
      .then((res) => {
        if (res.data.success) {
          setState({
            name: res.data.user.name,
            avtarName: res.data.user.avatar_unique_name,
            img_url: res.data.user.avatar_image,
            level: res.data.user.level,
            online: res.data.user.is_online,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchWalletBalance = () => {
    UserAPI.fetchWalletBalance()
      .then((res) => {
        if (res.data.success) {
          setState({
            wallet_balance:
              parseFloat(res.data.user.wallet_balance) -
              res.data.user.current_bet_amount,
          });
          const data = {
            walletBLCAmount:
              parseFloat(res.data.user.wallet_balance) -
              res.data.user.current_bet_amount,
          };
          walletContext._addWalletDetails(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let keyframes = `
                @keyframes playX {
                  from {background-position-x: 0px;}
                  to {background-position-x: -270px;}
                },
                
                @keyframes playY {
                  from {background-position-y: 0px;}
                  to {background-position-y: -390px;}
                }
                `;

  var myStyle = {
    width: "90px",
    height: "130px",
    backgroundImage: "url('http://localhost:8000/storage/avtar1.png')",
    animation: "playX 1s steps(3) infinite,  playY 3s steps(3) infinite ",
  };

  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isOpenTradeCurrency, setOpenTradeCurrency] = useState(false);
  const [isOpenWalletPrivateKey, setOpenWalletPrivateKey] = useState(false);
  const [isOpenMail, setOpenMail] = useState(false);

  return (
    <div className="h-screen w-full  relative noselect pt-2">
      <div className="h-[200px] w-full p-[7px_7px_20px_7px] bg-[#0E1719] grid grid-rows-2 grid-cols-3 drop-shadow-[0_0px_25px_15px_rgb(0,0,0/0.9)]">
        <div className="w-full h-full bg-[#101e26] row-span-2 border-[2px] border-[#194155] rounded-lg relative p-2.5">
          <img src={state.img_url} className="h-full w-full object-cover" />
          {/* <div className="h-full w-full" style={myStyle}></div> */}
          <div className="text-white w-6 rounded-md h-6 flex items-center bg-[#222C36] bottom-[-2px] left-[-2px] text-center pt-[2px] font-bold text-[16px] absolute">
            {state.level}
          </div>
        </div>
        <div className=" col-span-2 px-3 py-4">
          <div className="h-full w-full row-span-1 text-sm font-bold flex justify-between items-center">
            <div className="col-span-2">
              <p className="text-white text-[12px]">{state.avtarName}</p>
              <p className="text-primary-sky tracking-wide text-[11px] font-medium">
                {state.online ? "Online" : "Offline"}
              </p>
            </div>
            <div className="flex gap-2">
              <div
                className="rounded-[5px] p-2 bg-gradient-to-b cursor-pointer from-[#122d38] to-[#12242d] flex justify-center items-center"
                onClick={() => {
                  setOpenMail(true);
                }}
              >
                <Badge count={0} color={"#ff3200"}>
                  <img
                    src={Mail}
                    className="h-[20px] w-auto object-contain m-auto "
                  />
                </Badge>
              </div>
              <div
                className="rounded-[5px] p-3 bg-gradient-to-b cursor-pointer from-[#122d38] to-[#12242d] flex justify-center items-center"
                onClick={() => {
                  setIsOpenNotification(true);
                }}
              >
                <Badge count={unReadNotiCount} color={"#ff3200"}>
                  <img src={Noti} className=" object-contain h-[25px] m-auto" />
                </Badge>
              </div>
              <Modal
                visible={isOpenMail}
                footer={null}
                title={null}
                closable={false}
                bodyStyle={{ padding: "0px" }}
                className="p-0 w-full h-auto flex items-center justify-center"
              >
                <MailModal setOpenMail={setOpenMail} />
              </Modal>
              <Drawer
                title={false}
                closable={false}
                placement="right"
                onClose={() => setIsOpenNotification(false)}
                visible={isOpenNotification}
                className="p-0 overflow-hidden noti"
                width={600}
                zIndex={40}
              >
                <Notification
                  setIsOpenNotification={setIsOpenNotification}
                  notifications={notifications}
                  setNotifications={setNotifications}
                  unReadNotiCount={unReadNotiCount}
                  setUnReadNotiCount={setUnReadNotiCount}
                />
              </Drawer>
            </div>
          </div>
        </div>
        <div className="col-span-2 px-3 py-3">
          <div className=" rounded-[12px] w-full h-full px-[5px] py-[10px] from-[#122e3a] bg-gradient-to-r to-[#0f1d25] grid  grid-cols-5 items-center">
            <p className="col-span-3 w-[full] h-full text-[#28AFE7] text-base font-black flex items-center justify-center">
              {state?.wallet_balance > 1000
                ? state?.wallet_balance.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                : state?.wallet_balance}{" "}
              swordz
            </p>

            {/* <div className="grid h-[40px] w-100 rounded-[5px] grid-cols-3 gap-[8px] p-[5px] col-span-4 bg-[#28AFE7]">

            <button className="col-span-3 w-100 h-full pt-[5px] text-[white] font-bold">
              Connect Wallet
            </button>
            
            </div> */}

            <div className="grid h-[40px] w-full rounded-[5px] grid-cols-1 gap-[8px] p-[3px] col-span-2 scale-[0.9] bg-[#28AFE7] cursor-pointer">
              <div
                className="col-span-1 h-full w-full min-w-[30px] bg-[#28AFE7] flex justify-center items-center cursor-pointer"
                onClick={() => setOpenWalletPrivateKey(true)}
              >
                <img src={Plus} className="w-[15px] h-[15px]" />
              </div>

              {/* <div className="col-span-1 w-full h-full min-w-[30px] bg-[#253d4c] flex justify-center items-center cursor-pointer"
                onClick={() => setOpenTradeCurrency(true)}>
                <img src={Lineup} className="w-4 h-4" />
              </div> */}
            </div>
            <Modal
              visible={isOpenWalletPrivateKey}
              footer={null}
              title={null}
              closable={false}
              bodyStyle={{ padding: "0px" }}
              className="p-0 w-full h-auto flex items-center justify-center"
            >
              <WalletPrivateKey
                setOpenWalletPrivateKey={setOpenWalletPrivateKey}
              />
            </Modal>

            <ModalTradeCurrency
              visible={isOpenTradeCurrency}
              setVisible={setOpenTradeCurrency}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          height: "calc(100vh - 150px)",
        }}
        className="w-full"
      >
        <FriendList
          setChatpopup={props.setChatpopup}
          Chatpopup={props.Chatpopup}
        />
      </div>

      <Modal
        visible={MatchPopup && searchMatch}
        footer={null}
        title={null}
        closable={false}
        bodyStyle={{ padding: "0px" }}
        className="p-0 w-full h-auto flex items-center justify-center"
      >
        <CardSearch
          MatchPopup={MatchPopup}
          SetMatchPopup={SetMatchPopup}
          SetCountdown={SetCountdown}
        />
      </Modal>
      <Modal
        visible={MatchPopup && searchOppoMatch}
        footer={null}
        title={null}
        closable={false}
        bodyStyle={{ padding: "0px" }}
        className="p-0 w-full h-auto flex items-center justify-center"
      >
        <CardConfirm
          MatchPopup={MatchPopup}
          SetMatchPopup={SetMatchPopup}
          SetCountdown={SetCountdown}
        />
      </Modal>
      <Modal
        visible={Countdown}
        footer={null}
        title={null}
        closable={false}
        bodyStyle={{ padding: "0px" }}
        className="p-0 w-full h-auto flex items-center justify-center"
      >
        <AcceptGame
          SetCountdown={SetCountdown}
          Countdown={Countdown}
          mID={0}
          lRoomID={""}
        />
      </Modal>
      <div
        className={clsx(
          "absolute p-4 bottom-0 left-0 bg-[#0e1619] w-full h-20 flex justify-between items-center",
          MatchPopup ? "hidden" : "",
        )}
      >
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => {
            SetMatchPopup(true);
          }}
        >
          <div className="w-12 h-12 border-2 border-primary-sky rounded-md">
            <img src={gameIcon} className="w-full h-full object-cover" />
          </div>
          <div className="ml-2">
            <p className="text-white text-md font-semibold">Finding match...</p>
            <p className="text-white text-md font-light mt-2">
              Estimated time:
            </p>
          </div>
          <p className="text-white text-2xl mt-6 font-bold">{timerClock}</p>
        </div>

        <div
          className="w-10 h-10 bg-primary-light rounded-md"
          onClick={() => {
            // SetSearch.CancelSearch();
            SetMatchPopup(true);
          }}
        >
          <XIcon className="w-full h-full text-white" />
        </div>
      </div>
    </div>
  );
};

export default FriendMenu;
