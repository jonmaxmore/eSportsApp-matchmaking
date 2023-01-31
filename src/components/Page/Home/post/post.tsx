import React, { useState, useEffect, useReducer } from "react";
import avatar from "@Image/Home/avatar.png"
import Feel from "@Image/Home/ic-feel_event.png"
import Pic from "@Image/Home/ic-pic_video.png"
import BG_Post from "@Image/Home/input-chat.png"
import {ReactComponent as Tagfriend } from "@Image/Home/ic_tag_friend.svg"
import Popup from "./PostPopup";
import {Modal} from 'antd';
import UserAPI from "../../../../api/UserAPI";


const Post = (props:any) => {

    const [showPopup, setShowPopup] = useState(false);
    const [img, setImg] = useState("" as any);

    const [state, setState] = useReducer(
        (state: any, newState: any) => ({ ...state, ...newState }),
        {
            name: "",
            avtarName: "",
            img_url: "",
            level: 0
        }
    );

    useEffect(() => { 
        getUserDetails();
      }, []) 

    const getUserDetails = () => {
    
    UserAPI.getUserDetail()
        .then(res => {
        if(res.data.success){
            setState({
                name: res.data.user.name,
                avtarName: res.data.user.avatar_unique_name,
                img_url: res.data.user.avatar_image,
                level: res.data.user.level
            })
        }
        }).catch(err => {
        console.log(err)
        })
    }

    return (
        <div className = "w-full  h-[180px]  m-[30px_0px] bg-[#141e21] border-l-[5px] border-l-[#95be4c] flex">

            <Modal visible={showPopup} footer ={null} title={null} closable={false} bodyStyle={{padding:"0px"}} className = "p-0 w-full h-auto flex items-center justify-center">
                <Popup addElementToPost={props.addElementToPost} ActivePop = {(value:any) => setShowPopup(value)}/>
            </Modal>


            <div className = "h-full w-[170px] row-span-2 rounded-[10px] relative flex justify-center items-center">
                <img src={state.img_url}   className = "w-[100px] object-contain "/>
                <div className = "h-[25px] w-[25px] bg-[#222C36] rounded-[5px] bottom-[5px]  left-[20px] text-center pt-[2px] font-bold text-[16px] absolute"
                >{state.level}</div>
            </div>
            <div className = "w-full p-[10px_10px_0px_10px]">
                <div className = "h-[80px] w-full relative" onClick = {() => setShowPopup(true)}>
                    <img src={BG_Post}  className = "h-[100px] w-[370px] wide:w-[570px] absolute top-0 wide:-top-2 left-[-20px]"/>
                    <input disabled = {true} placeholder="What's on your mind?" className = "focus:outline-0 w-[220px] h-[60px] rounded-[5px] text-[16px] font-semibold  p-[20px] bg-[#2e2e2e] text-white absolute top-[7px] wide:top-0 left-0 border-0" />
                </div>

                <div className = "mt-[20px]   flex justify-start items-center gap-[10px] wide:gap-[30px] text-[12px] pr-0 wide:pr-12">
                    <div className = "flex items-center uppercase p-[0px_10px_0px_46px]  wide:px-20 h-[50px] border-[2px] border-primary-sky wide:p-[5px] font-semibold relative cursor-pointer justify-center"  onClick = {() => setShowPopup(true)}>
                        <img src={Pic}  className = " absolute top-2 left-2 wide:left-6 h-[30px] object-contain " />
                        PUCTURE/VIDEO

                    </div>
                    <div className = "flex items-center uppercase p-[0px_10px_0px_66px] wide:px-[90px] h-[50px] relative border-[2px] border-primary-sky wide:p-[5px] font-semibold cursor-pointer justify-center"
                    onClick = {() => setShowPopup(true)}>
                        <Tagfriend className = "h-[30px] absolute top-2 left-6 object-contain" />
                        <span className = "mr-1">tag </span> friend
                    </div>
                </div>


            </div>


        </div>
    );
}

export default Post;