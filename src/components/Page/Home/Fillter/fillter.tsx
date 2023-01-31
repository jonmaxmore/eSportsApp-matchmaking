import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import "./style.css"

const Fillter = ( {onSetFilter}: any) => {
  const [fillter, setFillter] = useState("World");

  const active = (value: string) => {
    if (fillter === value) {
      return "bg-[#95be4c]";
    } else {
      return "bg-[#13252e]";
    }
  };

  return (
    <div className="noselect  flex justify-start items-center gap-[10px] wide:gap-[15px] backdrop-blur-[5px] w-full h-[60px] bg-primary-sky/20 px-[20px] font-bold scrollbar">
      <p>FILTER BY:</p>
      <p className={clsx("p-[2px_25px] wide:p-[2px_35px] rounded-[25px] cursor-pointer duration-500", active("World"))} 
      onClick = {() => { onSetFilter("World") 
          setFillter("World")}}>
        World
      </p>
      <p className={clsx("p-[2px_25px] wide:p-[2px_35px] rounded-[25px] cursor-pointer duration-500", active("Following"))} onClick = {() => {onSetFilter("Following"); setFillter("Following")}}>
        Following
      </p>
      {/* <p className={clsx("p-[2px_25px] wide:p-[2px_35px] rounded-[25px] cursor-pointer duration-500", active("Clan"))} onClick = {() => setFillter("Clan")}>
        Clan
      </p> */}
      <p className={clsx("p-[2px_25px] wide:p-[2px_35px] rounded-[25px] cursor-pointer duration-500", active("Friend"))} 
      onClick = {() => { onSetFilter("Friend") 
      setFillter("Friend")}}>
        Friend
      </p>
    </div>
  );
};

export default Fillter;
