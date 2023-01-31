import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowSmLeftIcon } from "@heroicons/react/outline";
import DemoWallpaper from "@Image/Matchmaking/wallpaperLoL.jpg";
import { Input, Select } from "antd"
import clsx from "clsx";
import { CaretDownOutlined } from "@ant-design/icons";
import {InformationCircleIcon } from "@heroicons/react/solid";
import "./style.css"
import GameAPI from "@api/MatchmakingAPI";
import { useFormik } from "formik";
import * as Yup from 'yup'
import CustomGameAPI from "@api/CustomGameAPI";
import { socket } from "@Utils/socket";
import { getUserAvatarName } from "../../../../Token";

const SelectAmount = () => {
    const navigate = useNavigate();

    const [state, setState] = useReducer(
        (state: any, newState: any) => ({ ...state, ...newState }),
        {
          name: "",
          player: "",
          coverImageUrl: "",
          gameImageURL: ""
        }
      );
    
      const location = useLocation()
      const game: any = location.state
      const gameId = game.id;
    
      
      useEffect(() => {
        getGameDetails(gameId)
      }, [])
    
      const getGameDetails = (id: number) => {
        GameAPI.getGameDetailsAndBetAmountByID(id)
          .then(res => {
            if (res.data.success) {
              setState({
                name: res.data.game.name_en,
                player: res.data.game.number_of_participant_per_team,
                coverImageUrl: res.data.game.cover_image_url,
                gameImageURL: res.data.game.game_image_url
              })
            } else {
              console.log(res.data.message);
            }
          }).catch(err => {
            console.log(err)
          })
      }

    const searchMatchLobby = (room_id: any) => {
        if (room_id != "") {
            socket.emit("search_match", room_id);
        }
    };
    
      // Form validation
    const validationForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            game_id: gameId,
            room_name: "",
            bet_amount: "",
            room_password: ""
        },
        validationSchema: Yup.object({
            bet_amount: Yup.string().required('Amount is required'),
        }),
        onSubmit: (values) => {
            CustomGameAPI.createCustomGameRoomAPI(values)
                .then((res) => {
                    if(res.data.success){
                        const room_id = `match_lobby_${res.data.match.id}` ;
                        searchMatchLobby(room_id);
                        socket.emit("create_room", {custom_room_id: "custom_game"});
                        navigate(`/customgame/roomhost`, { state: { id: res.data.match.id, teamID: res.data.teamID, lobbyRoom: room_id } })
                    }else{

                    }
                })
                .catch(function (error) {
                    console.log("error ", error);
                });
        },
    });


    const ArrowDown = () => {
        return (
            <CaretDownOutlined className=" text-white text-lg" />
        )
    }


    return (
        <div className="bg-[#0e1619] h-full">
            <div>
                <div className="bg-[#0e1619] w-full h-full relative pt-8 mb-6 px-14">
                    <h1 className="uppercase text-white font-bold text-[25px] text-center">
                        custom game
                    </h1>
                    <p className="text-center mt-5">
                        Adjust your match information
                    </p>
                    <div
                        className="flex items-center justify-center cursor-pointer top-8 left-14 w-36 h-14 border-2 absolute border-primary-sky"
                        onClick={() => navigate(`/customgame/selectgame`)}
                    >
                        <ArrowSmLeftIcon className="w-10" />
                        <p className="uppercase font-bold ">back</p>
                    </div>
                </div>


                <div className="h-[calc(100vh-230px)] flex flex-col items-center justify-start w-full py-8 px-14 overflow-y-auto">
                    <img src={state.coverImageUrl} className="w-full h-[200px] tall:h-[300px] object-cover" />
                    
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        validationForm.handleSubmit();
                        return false;
                    }}>
                    <div className="grid grid-cols-2 w-full mt-12 ">
                        <div className="border-r-[2px] border-[#2a3234] w-full pr-44">
                            <p className="text-primary-sky text-2xl font-bold mb-2 tracking-wider pt-12">{state.name}</p>
                            <p className="text-white text-2xl  tracking-wider">{state.player}vs{state.player} Matchmaking</p>
                            <div className="w-full flex justify-between mt-8 items-center">
                                <p className="text-white uppercase  text-lg font-bold ">Room name</p>
                                <p className="text-[#bfc1c2] ">Not mandatary</p>
                            </div>
                            <Input
                                className="w-full h-14 mt-4 text-lg  text-white Enterpass bg-[#2e2e2e] border-l-4 rounded-none border-y-0 border-r-0 border-primary-green"
                                placeholder={`${getUserAvatarName()}'s room`}
                                name="room_name"
                                onChange={validationForm.handleChange}
                                onBlur={validationForm.handleChange}
                                value={validationForm.values.room_name}
                            />
                            <button className=" bg-primary-sky/30 h-14 mt-20 text-white font-bold px-24 rounded-sm border-2 border-primary-sky uppercase text-lg"
                             type="submit"
                            >
                                create room
                            </button>
                        </div>
                        <div className=" w-full pl-44 pr-6 ">
                            <div className="w-full flex justify-between mt-8 items-center">
                                <p className="text-white uppercase  text-lg font-bold ">Enter Password</p>
                                <p className="text-[#bfc1c2] ">Not mandatary</p>
                            </div>
                            <Input
                                className="w-full h-14 mt-4 text-lg  text-white Enterpass bg-[#2e2e2e] border-l-4 rounded-none border-y-0 border-r-0 border-primary-green"
                                placeholder="Enter password (4-6 numbers) "
                                name="room_password"
                                onChange={validationForm.handleChange}
                                onBlur={validationForm.handleChange}
                                value={validationForm.values.room_password}
                            />
                            <div className="flex justify-between w-full items-center mt-12">
                                <p className="text-white uppercase text-lg font-bold ">Enter the amount($)</p>
                                <p className="text-[#bfc1c2] ">In total/person</p>
                            </div>
                            <Input
                                className="w-full h-14 mt-4 text-lg  text-white Enterpass bg-[#2e2e2e] border-l-4 rounded-none border-y-0 border-r-0 border-primary-green"
                                placeholder="Enter Amount (USD)"
                                type="number"
                                name="bet_amount"
                                min={1}
                                onChange={validationForm.handleChange}
                                onBlur={validationForm.handleChange}
                                value={validationForm.values.bet_amount}
                            />
                            {validationForm.touched.bet_amount && validationForm.errors.bet_amount && (
                                <div style={{ marginLeft: '0%', color: 'red' }}>{validationForm.errors.bet_amount}</div>
                            )}
                            {/* Selectercustom */}
                            {/* <div className = "Selectercustom">
                            <Select defaultValue="25" style={{ width: "100%", color: "#fff", borderRadius: "0px", height: "50px" }}
                                className="  mt-4 w-full border-y-0 border-r-0 border-l-4 border-primary-green Selectercustom"
                                suffixIcon={<ArrowDown />}
                                dropdownClassName = "rounded-none bg-[#2e2e2e] text-white"
                            >
                                <Select.Option value="25" className = "text-white hover:text-black">25$</Select.Option>
                                <Select.Option value="50" className = "text-white hover:text-black">50$</Select.Option>
                                <Select.Option value="75" className = "text-white hover:text-black">75$</Select.Option>
                                <Select.Option value="100" className = "text-white hover:text-black" >100$</Select.Option>
                            </Select>
                            </div> */}
                            <div className="mt-3 flex items-start">
                                <InformationCircleIcon className=" mt-1 w-5  text-white" />
                                <span className="ml-2 text-[#bfc1c2] w-full">
                                    This amount of bet is not mandatory per person but it is a total amount that all player have to reach in order to play the match.
                                </span>
                            </div>

                        </div>
                    </div>
                    </form>

                </div>

            </div>
        </div>
    );
};
export default SelectAmount;
