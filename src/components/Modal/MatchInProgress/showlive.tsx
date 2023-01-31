import React, { useState, useReducer, useEffect } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";
import MaxAPI from "@api/MaxAPI";
import Redplay from "./Redplay";
import Blueplay from "./Blueplay";
import { getUser, authenticate, getTokenw } from '@Config/authsave';
//import I
//import ModalPayWith from "./ModalPayWith";
//import React from "react";
import MatchBoard from "@rfrenchy/csgo-matchboard-component/lib/Matchboard";
 //let f =UserInfo().avatar_image

const Showlive = ({ visible, setVisible, item }: any) => {
  const [isOpenPayWith, setOpenPayWith] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null || items[0]);
  const match = {
    teamOne: { imageSrc: `https://battlelabprod.s3.ap-southeast-1.amazonaws.com/default/${getUser().avatar_image}` },
    teamTwo: { imageSrc: `./team_two.svg` },
    maps: [
      {
        name: "Mirage",
        mapImage: `./mirage.png`,
        teamOneScore: 12,
        teamTwoScore: 5,
        mapPick: 1,
      },
    ],
  };
  // console.log(item);
  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      datalive: "",
    }
  );
  useEffect(() => {
      const id = setInterval(() => {
          MaxAPI.chackPlayLive()
              .then((res) => {
                  if (res.data.success) {
                      // setState({
                      //     datalive: res.data.live,

                      // })
                      console.log(res.data);
                  } else {
                  }
              })
              .catch((err) => {
                  console.log(err);
              })

      }, 63500);
      return () => clearInterval(id);
  }, []);

  return (
    <Modal
      visible={visible}
      footer={null}
      title={null}
      closable={false}
      bodyStyle={{ padding: "0px" }}
      className="p-0 bg-transparent w-full h-auto flex items-center justify-center"
    >
      <>
        <div className="w-[1100px] h-[600px] flex flex-col items-center relative">
          <div className="absolute top-20 ">
            <div className=" 2xl:scale-[1.3] relative -rotate-[45deg] "></div>
            <Redplay team={state.teamOne} data={state} />
            {/* <MatchBoard match={match} /> */}
          </div>
        </div>
      </>
    </Modal>
  );
};

export default Showlive;
