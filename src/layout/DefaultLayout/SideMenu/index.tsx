import React, { useState } from "react";
import News from "@Image/sidemenu/ic-new_inactive.png"
import Ranking from "@Image/sidemenu/ic-ranking_inactive.png"
import Clan from "@Image/sidemenu/ic-clan_inactive.png"
import Setting from "@Image/sidemenu/ic-setting_inactive.png"
import Fqa from "@Image/sidemenu/ic-faq_Inactive.png"
import Contact from "@Image/sidemenu/ic-contact_inactive.png"
import About from "@Image/sidemenu/ic-about_inactive.png"
import Update from "@Image/sidemenu/ic-update_inactive.png"
import { ChevronDownIcon } from "@heroicons/react/solid"
import clsx from "clsx";
import style from "../Navbar/style.module.css";

import { ReactComponent as Rank } from "@Image/sidemenu/ic_rank_inactive.svg"
import { ReactComponent as Faq } from "@Image/sidemenu/ic_faq_inactive.svg"
import { ReactComponent as Set } from "@Image/sidemenu/ic_setting_inactive.svg"
import { ReactComponent as Con } from "@Image/sidemenu/ic_contact_inactive.svg"
import { ReactComponent as New } from "@Image/sidemenu/ic_news_inactive.svg"
import { ReactComponent as Abouts } from "@Image/sidemenu/ic_about_inactive.svg"
import { ReactComponent as Up } from "@Image/sidemenu/ic_update_inactive.svg"
import { ReactComponent as Clans } from "@Image/sidemenu/ic_clan_inactive.svg"

interface Props {
    ActivePop: (value: any) => void
    Pop: string
    ActiveSub: boolean
}

const Sidebar = ({ ActivePop, Pop, ActiveSub }: Props) => {

    const [Moremenu, setMoremenu] = useState(false)


    const Avtive = (value: string) => {
        if (value === Pop) {
            return "bg-[#28afe7]/[0.25] w-full h-28 rounded-l-2xl text-primary-sky text-sm maillogo"
        } else {
            return " w-full h-28 rounded-l-2xl text-white text-sm"
        }
    }

    const ActiveSubSetting = (value: string) => {
        if (value === Pop) {

            return " w-full h-28 text-primary-sky text-sm maillogo"
        } else {

            return " w-full h-28 text-white text-sm "
        }
    }



    const iconform = "w-full h-12 flex flex-col justify-center items-center"
    const icon = "w-6 h-6 mb-2.5 mt-5 fill-primary-sky"
    const iconformActive = " bg-[#28afe7]/[0.25] w-full h-20 pt-2 rounded-l-2xl text-primary-sky"
    return (
        <div className="h-[calc(100vh-90px)] overflow-y-auto">
            <div className=" text-white w-full h-full flex flex-col justify-start items-center gap-1  text-xs">

                <div className={clsx(Avtive('news'), "duration-500 cursor-pointer flex flex-col justify-center items-center tall:scale-100 scale-75")} onClick={() => { ActivePop('news') }}>
                    <New className="w-10 fill-primary-sky text-primary-sky " />
                    <p className="pt-2">NEWS</p>
                </div>
                <div className={clsx(Avtive('ranking'), "duration-500 cursor-pointer flex flex-col justify-center items-center tall:scale-100 scale-75")} onClick={() => { ActivePop('ranking') }}>
                    <Rank className="w-10 fill-primary-sky text-primary-sky " />
                    <p className="pt-2">RANKING</p>

                </div>

                {/* <div className={clsx(Avtive('clan'), "duration-500 cursor-pointer flex flex-col justify-center items-center tall:scale-100 scale-75")} onClick={() => { ActivePop('clan') }}>
                    <Clans className="w-10 fill-primary-sky text-primary-sky " />
                    <p className="pt-2">CLAN</p>

                </div> */}

                <div className={clsx(Avtive('setting'), ActiveSub ? " bg-[#28afe7]/[0.25] w-full pt-2 rounded-l-2xl text-primary-sky maillogo" : "", "duration-500 cursor-pointer flex flex-col justify-center items-center tall:scale-100 scale-75")} onClick={() => { ActivePop('setting') }}>
                    <Set className="w-10 fill-primary-sky text-primary-sky " />
                    <p className="pt-2">SETTINGS</p>
                </div>


                <ChevronDownIcon className={clsx("w-6 h-6 duration-500 cursor-pointer", Moremenu ? "rotate-0" : "rotate-180")} onClick={() => { setMoremenu(!Moremenu) }} />

                <div className="overflow-y-hidden ">
                    <div className={clsx("flex w-full h-full flex-col justify-start items-center gap-1 duration-500 ", Moremenu ? "translate-y-0 opacity-100" : "-translate-y-96 opacity-0")}>
                        <div className={clsx(ActiveSubSetting('faq'), "duration-500 cursor-pointer flex flex-col justify-center items-center tall:scale-100 scale-75 ")} onClick={() => { ActivePop('faq') }}>
                            <Faq className="w-10 fill-primary-sky text-primary-sky " />
                            <p className="pt-2">FAQ</p>
                        </div>


                        <div className={clsx(ActiveSubSetting('contact'), "duration-500 cursor-pointer flex flex-col justify-center items-center tall:scale-100 scale-75")} onClick={() => { ActivePop('contact') }}>
                            <Con className="w-10 fill-primary-sky text-primary-sky " />
                            <p className="pt-2">CONTACT</p>
                        </div>


                        <div className={clsx(ActiveSubSetting('about'), "duration-500 cursor-pointer flex flex-col justify-center items-center tall:scale-100 scale-75")} onClick={() => { ActivePop('about') }}>
                            <Abouts className="w-10 fill-primary-sky text-primary-sky " />
                            <p className="pt-2">ABOUT</p>

                        </div>


                        <div className={clsx(ActiveSubSetting('update'), "duration-500 cursor-pointer flex flex-col justify-center items-center tall:scale-100 scale-75")} onClick={() => { ActivePop('update') }}>
                            <Up className="w-10 fill-primary-sky text-primary-sky " />
                            <p className="pt-2">UPDATE</p>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default Sidebar;