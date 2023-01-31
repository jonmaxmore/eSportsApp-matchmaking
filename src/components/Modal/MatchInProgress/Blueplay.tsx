import React from "react";
import Avatar from "@Image/Home/avatar.png";
import clanlogo from "@Image/clanlogo_demo.jpg";
import lock from "@Image/Matchmaking/ic_lock.png";
import pinggood from "@Image/Matchmaking/ic_connection_good.png";
import pingmed from "@Image/Matchmaking/ic_connection_medium.png";
import pingweak from "@Image/Matchmaking/ic_connection_weak.png";
import { ReactComponent as Loading } from "@Image/loaderNew.svg"

const Blueplay = ({ team }: any) => {
 

  return (
    <div className="grid grid-cols-3 xl:grid-cols-5 gap-4 h-full pl-6 2xl:pl-12 pr-5 w-full">
     
        return (
          <div>
            <div className="w-[650px] h-[250px] bg-primary-sky/30 border-2 border-primary-sky rounded-2xl relative">
              <div className="absolute w-full h-full flex justify-center items-center z-0">
                <p className="font-bold text-[20px] text-white TextShadow">
                  conneting...ดดดดดดดดดดดดดด
                  <Loading className="w-20 h-20 fill-success-sky TextShadow" />
                </p>
              </div>
            </div>
          </div>
        );
      
      
    </div>
  );
};

export default Blueplay;
