import React, { useEffect, useReducer, useState } from "react";
import { Modal } from "antd";
import "./styles.css";
import "antd/dist/antd.css";
import clsx from "clsx";
import ModalLinkGame from "./Link/LinkGameModal";
import _ from "lodash";
import UserAPI from "@api/UserAPI";
import Unlink from "@Image/Unlink.png";
import UnLink from "@Components/Modal/LinkGame/UnLink";

// const { Panel } = Collapse;
// const { Option } = Select;

interface Props {
  ActivePop: (value: any) => void;
}

const Setting = ({ ActivePop }: Props) => {
  const [isLinksteam, setLinksteam] = useState(false);
  const [linkGame, setLinkGame] = useState({});
  const [position, setPosition] = useState(0);
  const [unlink, setUnLink] = useState(false);
  const [title, setTitle] = useState("");
  const [gameData, setGameData] = useState({});
  const [elementIndex, setElementIndex] = useState(0);

  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      linkGames: [],
    }
  );

  useEffect(() => {
    getUserLinkGames();
  }, []);

  const getUserLinkGames = () => {
    UserAPI.getUserLinkGames()
      .then((res) => {
        if (res.data.success) {
          let data = res.data.linkGames;
          data.map((row: any) => {
            row?.UserLinkGame && row?.UserLinkGame?.linked
              ? (row.linked = true)
              : (row.linked = false);
          });
          setState({
            linkGames: data,
          });
        } else {
          setState({
            linkGames: [],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const linkGameHandler = (data: any, position: number) => {
    UserAPI.linkGameAPI(data)
      .then((res) => {
        if (res.data.success) {
          const tempLinkGame: any = _.cloneDeep(state.linkGames);
          const editLinkGame: any = tempLinkGame[position];
          editLinkGame.linked = !editLinkGame.linked;
          tempLinkGame.splice(position, 1, editLinkGame);
          setState({
            linkGames: tempLinkGame,
          });
          // setLinksteam(false);
        } else {
          setLinksteam(false);
        }
      })
      .catch(function (error) {
        console.log("error ", error);
      });
  };

  const onUnlinkHandler = (data: any, position: number) => {
    const payload = {
      type: data.type,
      link_game_id: data.id,
      linked_game_username: "",
      linked: false,
    };

    UserAPI.linkGameAPI(payload)
      .then((res) => {
        if (res.data.success) {
          const tempLinkGame: any = _.cloneDeep(state.linkGames);
          const editLinkGame: any = tempLinkGame[position];
          editLinkGame.linked = !editLinkGame.linked;
          tempLinkGame.splice(position, 1, editLinkGame);
          setState({
            linkGames: tempLinkGame,
          });
          setUnLink(false);
        } else {
          setLinksteam(false);
        }
      })
      .catch(function (error) {
        console.log("error ", error);
      });
  };

  const unlinkHandler = (linkGame: any, index: number, title: string) => {
    setGameData(linkGame);
    setTitle(title);
    setElementIndex(index);
    setUnLink(true);
  };

  const onClickGameHanlder = (data: any, index: number) => {
    setPosition(index);
    setLinkGame(data);
    setLinksteam(true);
  };

  return (
    <div className="w-full h-full">
      <div
        className="w-full py-6 border-l-4 border-[#94bd4b] flex items-center justify-items-center text-center
                bg-gradient-to-r from-[#11323f] to-[#0d212a]"
      >
        <p className="pl-6 text-[#fff] text-base font-semibold">LINK ID</p>
      </div>

      <div className="w-full px-12">
        <p className=" my-12 text-[#fff] text-base font-light">
          Your Battlelab ID need to be connected to these platforms in order to
          play their games.
        </p>

        {state.linkGames.length > 0 &&
          state.linkGames.map((linkGame: any, index: number) => (
            <div>
              <div
                className={clsx(
                  "my-8 w-full wide:w-[380px] h-[56px] border-2 flex justify-center rounded-md relative",
                  linkGame?.linked
                    ? "border-[#244b5b] bg-[#15242a]"
                    : "border-[#6bb8e7] bg-[#253d4c] cursor-pointer"
                )}
                onClick={() =>
                  !linkGame?.linked
                    ? onClickGameHanlder(linkGame, index)
                    : setLinksteam(false)
                }
              >
                <img
                  src={linkGame.logo}
                  alt="lingamepicture"
                  className="h-12 w-12 absolute inset-x-2 inset-y-1 "
                />
                <p
                  className={clsx(
                    "flex items-center text-center text-xl font-bold",
                    linkGame?.linked ? "text-[#4a5557]" : "text-[#fff]"
                  )}
                  style={{ textTransform: "uppercase" }}
                >
                  {linkGame?.linked ? `LINKED` : `LINK TO ${linkGame.title}`}
                </p>
                <div
                  className="cursor-pointer"
                  title="Unlink"
                  onClick={() => unlinkHandler(linkGame, index, linkGame.title)}
                >
                  {linkGame?.linked && (
                    <img
                      src={Unlink}
                      alt="unlinklogo"
                      className="h-11 w-11 absolute inset-y-1 "
                      style={{ right: "0.5rem" }}
                    />
                  )}
                </div>
              </div>
            </div>
            // onUnlinkHandler(linkGame, index)
          ))}
        <ModalLinkGame
          visible={isLinksteam}
          setVisible={setLinksteam}
          linkGame={linkGame}
          position={position}
          onSubmit={linkGameHandler}
        />
        <Modal
          visible={unlink}
          footer={null}
          title={null}
          centered
          closable={false}
          bodyStyle={{ padding: "0px" }}
          className="p-0 w-full h-auto flex items-center justify-center"
        >
          <UnLink
            setUnLink={setUnLink}
            title={title}
            gameData={gameData}
            elementIndex={elementIndex}
            unlinkHandler={onUnlinkHandler}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Setting;
