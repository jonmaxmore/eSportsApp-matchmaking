import React, { useState ,useEffect} from "react";
import Logo from "./battle-lab-logo.png"
import Bonus from "./Bonus.png"
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import style from "./style.module.css";
import { Modal } from "antd";
import ComingSoon from "@Views/DummyPage/ComingSoonModal";
import { getUserID } from "../../../Token";
import UserAPI from "@api/UserAPI";

interface Props {
    ActivePop: (value: any) => void
}


const Navbar = ( { ActivePop }: Props ) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [MatchPopup, SetMatchPopup] = useState(false);
    const [dataplay, setDataplay] = useState("");
    // useEffect(() => {
    //     const id = setInterval(() => {
    //       getAllusers_s();
    //     }, 5000);
    //     return () => clearInterval(id);
    //   }, []);
    // console.log(dataplay);
    const getAllusers_s = () => {
        UserAPI.getAllusers()
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
                if(res.data.teamParticipant2){

                //     let datatest = res.data.teamParticipant;
                //    navigate("/matchmaking/lobbymyteam",{ state: { team_id: res.data.teamParticipant2.team_id, team_room_id: res.data.teamParticipant2.id } })
                }else{
                   // setDataplay(false)
                }
              
              //  console.log(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };

    // const { searchMatch, SetSearch }: any = useSearchMatchContext();
    // const [Countdown, SetCountdown] = useState(false);
    
    const ActiveTab = (path: string) => {

        const Realpath = location.pathname.split("/")[1]
        if (Realpath === path) {
            return "text-primary-sky"
        }
        else {
            return "text-white"
        }
    }
    return (
        <nav style={{
            display: "grid",
            gridTemplateColumns: "auto fit-content(250px)",
            height: "100%",
            backgroundColor: "#15181a",
        }} className = {style.noselect}>
            <div className = "border-r-2 border-[#5a6062] mr-4 ">
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    backgroundColor: "#15181a",
                    gridTemplateColumns: "fit-content(100px) auto ",
                }}>

                    <div style={{
                        width: "100px",
                        height: "100%",
                        backgroundColor: "#15181a",
                        padding: "10px 10px 10px 10px",
                    }}>
                        <div style={{
                            backgroundColor: "#15181a",
                            backgroundImage: `url(${Logo})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",

                        }} className="w-full h-full" >

                        </div>



                    </div>
                    <ul className={clsx(style.UL,"xl:pl-8")} >
                        <li className={clsx(style.LI, ActiveTab("home"),"duration-500")} onClick={() => { navigate(`/home`) ; ActivePop('')} }>
                            HOME
                        </li>
                        <li className={clsx(style.LI, ActiveTab("matchmaking"),"duration-500")} onClick={() => {navigate(`/matchmaking`) ;   }}>
                            MATCHMAKING
                        </li>

                        {/* {dataplay ? SetMatchPopup(true)  :ActivePop('');} */}
                        {/* <li className={clsx(style.LI, ActiveTab("customgame"),"duration-500")} onClick={() => { ActivePop(''); SetMatchPopup(true)}}>
                            CUSTOM GAME
                        </li > */}
                        <li className={clsx(style.LI, ActiveTab("customgame"))} onClick={() => {navigate(`/customgame`) ; ActivePop('');}}>
                            CUSTOM GAME
                        </li >
                        <li className={clsx(style.LI, ActiveTab("profile"),"duration-500")} onClick={() => { navigate(`/profile`, { state: { id: getUserID() } }) ; ActivePop('')}}>
                            PROFILE
                        </li>
                        <li className={clsx(style.LI, ActiveTab("market"),"duration-500")} onClick={() => {ActivePop(''); SetMatchPopup(true)}}>
                            MARKET
                        </li>
                        {/* <li className={clsx(style.LI, ActiveTab("market"))} onClick={() => {navigate(`/market`) ; ActivePop('')}}>
                            MARKET
                        </li> */}
                    </ul>


                </div>

            </div>


            <div style={{
                width: "350px",
                height: "100%",
                backgroundColor: "#15181a",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",




            }}>
                <div style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#0f181a",
                    backgroundImage: `url(${Bonus})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    transform: "translateY(-15px) translateX(-5px)",
                    position: "relative",

                }} className = {clsx(style.glowing,style.box)}>
                    <img src={Bonus} className = {clsx("absolute w-full object-cover flex justify-center items-center -translate-y-[25px]")} />
                    <div className={style.NeonText}>
                        0
                    </div>

                </div>

            </div>

            <Modal
                visible={MatchPopup}
                footer={null}
                title={null}
                closable={false}
                bodyStyle={{ padding: "0px" }}
                className="p-0 w-full h-auto flex items-center justify-center"
            >
            <ComingSoon
                MatchPopup={MatchPopup}
               // datagame={dataplay}
                SetMatchPopup={SetMatchPopup}
                />
            </Modal>
        </nav>
    )
}

export default Navbar;