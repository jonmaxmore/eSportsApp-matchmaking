import React, { useEffect, useReducer, useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd"
import { XIcon } from "@heroicons/react/outline";
import { useSearchMatchContext, useSearchMatchDispatch } from "@Context/SearchMatch";
import GameAPI from "@api/MatchmakingAPI";
import { socket } from "@Utils/socket";
import { useWalletDispatch } from "@Context/Wallet/Wallet";
import { WalletBalanceAlert } from "../WalletAlert/WalletAlert";
// import { useSearchTimerContext } from "@Context/SearchTimer";
import ModalLinkGame from "./Linksteam";
type Price = {
    dollar: string;
    blc: string;
};

const CreateTeam = (props: any) => {

    const navigate = useNavigate();
    const { searchMatch, SetSearch }: any = useSearchMatchContext();
    // const { searchTimer, SetSearchTimer }: any =  useSearchTimerContext();

    const context = useSearchMatchDispatch();
    const walletContext = useWalletDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const [walletAlert, setWalletAlert] = useState(false);
    const [selected, setSelected] = useState<number>(-1);
    const [amount, setAmount] = useState("");
    const [dollarToBLC, setDollarToBLC] = useState(0);
    const [showPopupSteamw, setShowPopupSteamw] = useState(false);
    const gameId1 = props.gameId;


    

    const [state, setState] = useReducer(
        (state: any, newState: any) => ({ ...state, ...newState }),
        {
            game_id: 0,
            gameName: "",
            betAmounts: [],
            numberOfParticipantPerTeam: 0
        }
    );

    useEffect(() => {
        getGameDetailAndBetAmount(props.gameId)
    }, [])

    useEffect(() => {
        socket.on("get_myteam", (data) => {
            if(data.is_team_fulfilled){
                SetSearch.CancelSearch();
                // SetSearchTimer.setSearchTimerFalse();
                navigate("/matchmaking/singleteam", { state: { team_id: data.team_id, team_room_id: data.team_room_id } })
            }
        });

        socket.on("search_team_after_leaved", (data) => {
            // SetSearchTimer.setSearchTimerTrue();
            SetSearch.setSearchMatchTrue()
            navigate("/home");
        });
        
    }, [socket]);

    const getGameDetailAndBetAmount = (id: number) => {
        GameAPI.getGameDetailsAndBetAmountByID(id)
            .then(res => {

                if (res.data.success) {

                    setState({
                        game_id: res.data.game.id,
                        gameName: res.data.game.name_en,
                        betAmounts: res.data.betAmounts,
                        numberOfParticipantPerTeam: res.data.game.number_of_participant_per_team,
                        gameImageURL: res.data.game.game_image_url
                    })
                } else {
                    console.log(res.data.message);

                }
            }).catch(err => {
                console.log(err);
            })
    }

    const searchTeam = (team_room_id: any) => {
        if (team_room_id != "") {
            socket.emit("search_team", team_room_id);
        }
      };
    
    const onCreatTeam = () => {
        
        const postData = {
            game_id: state.game_id,
            type: "CreateTeam",
            mmr_level: 14,
            bet_amount: amount
        }

        GameAPI.createTeam(postData)
            .then(res => {
            if (res.data.success) {
                socket.connect();
                const team_room_id = "team_room_"+res.data.teamParticipant.team_id;
                searchTeam(team_room_id);
                const data = {
                team_id: res.data.teamParticipant.team_id,
                team_room_id: team_room_id, 
                is_team_fulfilled: false,
                betAmount: amount,
                amountToBlc: dollarToBLC,
                game_id: state.game_id,
                gameName: state.name,
                imageUrl: state.gameImageURL,
                numberOfPlayerPerTeam: state.player
                }
                // add data to context
                context._addSearchMatchDetails(data);
                // end
                navigate("/matchmaking/lobbymyteam",{ state: { team_id: res.data.teamParticipant.team_id, team_room_id: team_room_id } })
            } else {
                console.log(res.data.message);
            }
            }).catch(err => {
            console.log(err)
            })
    }

    const onClickSetAmountAndIndex = (amount: any, index: any, blc: any) => {
        setSelected(index);
        setAmount(amount);
        setDollarToBLC(blc);
    }

    const CardPriceBronze = (data: Price, index: number) => {

        const select = selected == index ?
            "bg-gradient-to-b from-primary-sky border-primary-sky shadow-[0px_0px_7px_2px] shadow-border-primary-sky/50"
            : " border-[#b46f1f] shadow-[0px_0px_7px_2px] shadow-[#b46f1f]/50";
        const blc = Number(data.dollar) ;
        return (
            <div key={index} className={clsx(select, " h-14 border-2  px-12 cursor-pointer ")}
                onClick={() => { onClickSetAmountAndIndex(data.dollar, index, blc) }}
            >
                <p className="text-center text-xl text-white font-bold uppercase">{data.dollar} </p>
                <p className="text-center text-primary-green uppercase font-semibold">
                    ={blc} BLC
                </p>
            </div>
        );
    };

    const CardPriceSliver = (data: Price, index: number) => {
        const select = selected == index ?
            "bg-gradient-to-b from-primary-sky border-primary-sky shadow-[0px_0px_7px_2px] shadow-border-primary-sky/50"
            : " border-[#acacac] shadow-[0px_0px_7px_2px] shadow-[#acacac]/50";

        const blc = Number(data.dollar) ;

        return (
            <div key={index} className={clsx(select, " h-14 border-2  px-12 cursor-pointer")}
                onClick={() => { onClickSetAmountAndIndex(data.dollar, index, blc) }}
            >
                <p className="text-center text-xl text-white font-bold uppercase">{data.dollar} </p>
                <p className="text-center text-primary-green uppercase font-semibold">
                    ={blc} BLC
                </p>
            </div>
        );
    };


    const CardPriceGold = (data: Price, index: number) => {
        const select = selected == index ?
            "bg-gradient-to-b from-primary-sky border-primary-sky shadow-[0px_0px_7px_2px] shadow-border-primary-sky/50"
            : " border-[#edab04] shadow-[0px_0px_7px_2px] shadow-[#edab04]/50";

        const blc = Number(data.dollar) ;

        return ( 
            <div key={index} className={clsx(select, " h-14 border-2  px-12 cursor-pointer")}
                onClick={() => { onClickSetAmountAndIndex(data.dollar, index, blc) }}
            >
                <p className="text-center text-xl text-white font-bold uppercase">{data.dollar} </p>
                <p className="text-center text-primary-green uppercase font-semibold">
                    ={blc} BLC
                </p>
            </div>
        );
    }


    const checkWalletamountHandler = () => {
          
        // if(gameId1 == 4) {
        //     setShowPopupSteamw(true)
        // }

        if(walletContext.items.walletBLCAmount > dollarToBLC){

            onCreatTeam()
        }else{
            setWalletAlert(true)
        }
    }

   

    return (
        <div>
            <div className="grid grid-cols-3 grid-rows-3 gap-12 mb-12">
                {state.betAmounts.map((data: any, index: number) => {
                    if (index < 3) {
                        return <div key = {`amount`+index}>{CardPriceBronze(data, index)}</div>
                    } else if (index < 6) {
                        return <div key = {`amount`+index}>{CardPriceSliver(data, index)}</div>
                    } else {
                        return <div key = {`amount`+index}>{CardPriceGold(data, index)}</div>
                    }
                })}
            </div>
            <div className="flex justify-center px-16 py-6">
                <button
                    disabled={selected == -1}
                    className={clsx("bg-primary-sky/30 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg",
                        selected == -1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer")}
                    onClick={() => checkWalletamountHandler()  }
                >
                    confirm
                </button>
                <ModalLinkGame
          visible={showPopupSteamw}
          setVisible={setShowPopupSteamw}
          linkGame={null}
          position={null}
          onSubmit={null}
        />
                <Modal visible={walletAlert} footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
                    <WalletBalanceAlert walletAlert={walletAlert} setWalletAlert={setWalletAlert}/>
                </Modal>
            </div>
        </div>

    )
}

export default CreateTeam;