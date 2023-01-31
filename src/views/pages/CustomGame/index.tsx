import React from "react";
import {  Outlet  } from "react-router-dom";

const CustomGame = () => {

  return ( 
     <div className="bg-[#0e1619] h-full">
        <Outlet/>
    </div>
  )
};

export default CustomGame;
