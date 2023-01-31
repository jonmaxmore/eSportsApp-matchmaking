import React, { useState } from "react";
import { Input } from "antd";
import { SearchIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import style from "./style.module.css";
import Lock from "./lock.svg";
import SelectAmount from "@Components/Page/MatchMaking/SelectAmountAndmode";
import LookingMatch from "@Components/Page/MatchMaking/LookingMatch";
import Selectgame from "@Components/Page/MatchMaking/Selectgame";
import {  Outlet,useNavigate,useLocation  } from "react-router-dom";

const Matchmaking = () => {
   const navigate = useNavigate();
    const location = useLocation();

   const [page , setPage] = useState("");

  return ( 
     <div className="bg-[#0e1619] h-full">
        <Outlet/>
    </div>
  )
};

export default Matchmaking;
