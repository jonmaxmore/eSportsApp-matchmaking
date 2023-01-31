import React, { useState, useRef,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { Modal } from "antd";
import { Input } from "antd";
import { ReactComponent as Loading } from "@Image/loaderNew.svg"
import { XIcon } from "@heroicons/react/outline";
import MaxAPI from "@api/MaxAPI";


const Linksteam = ({
  visible,
  setVisible,
  linkGame,
  position,
  onSubmit,
}: any) => {
  


  const [validation, setValidation] = useState("");
  const InputGameUniqueId: any = useRef();
  const navigate = useNavigate();
  



  const onUpdateNowHandler = () => {
    window.open(`https://steam.battlelab.site/loginsteam?user_id=${linkGame}`
            , '_blank', 'width=1024,height=765,center=true');
}



  return (
    <Modal
      visible={visible}
      footer={null}
      title={null}
      closable={false}
      bodyStyle={{ padding: "0px" }}
      className="p-0 w-full h-auto flex items-center justify-center"
    >
      <div className="relative bg-[#0E1518] text-white w-[700px] px-24">
        {/* Content */}
        <div className="flex flex-col gap-[24px] px-[30px] py-[30px] w-full">
          <div className="flex items-center justify-center w-full gap-2 ">
           <button  onClick={() => navigate(`/matchmaking/selectgame`)} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-4">
                    <XIcon className="text-white w-9" />
                </button>
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-2 px-6 py-3">
            <p className="text-base font-light">
              Please connect to your {linkGame?.title} ID game
            </p>
          </div>
          
          <Loading className="w-52 h-full fill-primary-sky " />
          <div className="flex flex-col items-center justify-center w-full ">
      
            <button
              className="mt-16 bg-primary-sky/30 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
              onClick={() => {
                onUpdateNowHandler();
              }}
            >
              LOGIN STEAM
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Linksteam;
