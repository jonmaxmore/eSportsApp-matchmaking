import React from 'react';

import { XIcon } from '@heroicons/react/solid';
import { Collapse, Select } from 'antd';
import { LeftSquareTwoTone, SettingOutlined } from '@ant-design/icons';
import { CaretRightOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import partner1 from './ezify.png';

import Dota2 from '@Image/About/mock_dota2.png'
import Lol from '@Image/About/mock_lol_about.png'
import Ml from '@Image/About/mobile_about.png'
import Over from '@Image/About/overwatch_about.png'
import Fortnite from '@Image/About/fortnite_about.png'
import Logo from '@Image/About/logo.png'
import Bgabout from '@Image/About/about_background.png'
import Mock from '@Image/About/mock_cha_about.png'
import Mock2 from '@Image/About/mock_cha_about2.png'

const { Panel } = Collapse;
const { Option } = Select;






interface Props {
    ActivePop: (value: any) => void
}
const About = ({ ActivePop }: Props) => {


    return (
        <div className="flex justify-center  animated bounceInLeftfaq">
            <div className="w-full h-full bg-transparent"  >
                <div style={{ 
                    width: '100%',
                    height: 'calc(100vh - 150px)',
                }} className="relative overflow-y-auto overflow-x-clip drop-shadow-[0px_0px_15px_rgba(0,0,0,0.7)]">
                    <XIcon className='absolute top-3 w-9 h-9 right-3 cursor-pointer z-50' onClick={() => ActivePop('')} />
                    <div className=" w-full h-auto relative">
                        <img src={Bgabout} alt="" className="w-full h-[329px] object-cover object-right  animated2 bounceInLeftfaq" />
                        <div className="mt-10 absolute flex justify-center items-center flex-col top-4 w-full z-[99]">
                            <img src={Logo} className="h-[122px] w-auto " />
                            <p className="mt-2 mb-6 text-center text-[#fff] text-3xl font-bold tracking-wider">"Battlelab is Decentralized Competitive Esports Platform that allows players around the world to compete for monetary prizes"</p>
                            <p className="text-center text-[#b4b7b8] text-lg font-extralight tracking-wider">Our PVP Elo Matchmaking ensures that each competitive match is paired in accordance to each players skill level. PVP Elo matchmaking ensures equality and fair play amongst players. Battlelab platform offers fully automated integration to a variety of games, allowing quick and seamless user experience to your favorite gaming titles. Furthermore, Battlelab’s payout system allows players to claim their winnings instantly through the systems smart contracts. Smart contracts are executed through the Blockchain. Players can rest assure that contracts are final and no party can violate their smart contract agreement. NFT Avatar Profile, AI Coaching and Decentralized Esports Community Management will revolutionize your gaming experience forever. This is not a game of chance but a game of skill. Wager, Compete, Earn, repeat. Start earning with your skills today. Embark on your new journey with Battlelab.</p>
                        </div>
                    </div>
                    <img src={Mock} alt="" className="w-auto h-[471px] top-5 object-contain object-right absolute z-[20]  animated2 bounceInLeftfaq" />
                    <img src={Mock2} alt="" className="w-auto h-[444px] inset-y-[200px] right-[-125px] object-cover object-left absolute z-[20]  animated2 bounceInLeftfaq " />
                    <div className="absolute top-[450px] z-[30]  transform-[traslatez(10px)]">
                            <p className="pt-10 mb-8 text-center text-[#fff] text-xl font-bold tracking-wider">Mission</p>
                            <p className="mx-16 text-center text-[#fff] text-lg font-extralight tracking-wider">The primary mission of Battlelab is to create a platform that unites all gamers around the world and create opportunities for them to earn from there gaming skills. We aim to abolish the notion that only 1 Percent of gamers can make a living from playing video games. With the focus on creating a safe and secure platform where gamers can earn without fear of being scammed or cheated.  </p>
                            <p className="mt-12 mb-8 text-center text-[#fff] text-xl font-bold tracking-wider">Partner</p>
                            {/* <p className="mx-16 text-center text-[#fff] text-lg font-extralight tracking-wider">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when on unknown printer took a galley. </p> */}

                            <div className="h-20 col-span-2 grid grid-cols-[repeat(10,_minmax(0,_1fr))] grid-rows-1 my-12 mx-10">
                                <div className="col-span-10 flex justify-center items-center ">
                                    <img src={partner1} className="h-[94px] w-auto " />
                                </div>
                                {/* <div className="col-span-2 flex justify-center items-center ">
                                    <img src={Lol} className="h-[94px] w-auto " />
                                </div>
                                <div className="col-span-2 flex justify-center items-center ">
                                    <img src={Ml} className="h-[94px] w-auto " />
                                </div>
                                <div className="col-span-2 flex justify-center items-center ">
                                    <img src={Over} className="h-[94px] w-auto " />
                                </div>
                                <div className="col-span-2 flex justify-center items-center">
                                    <img src={Fortnite} className="h-[94px] w-auto " />
                                </div> */}
                            </div>


                            <div className="flex justify-center ">
                                <div className="w-96 h-16 border-2 border-[#6bb8e7] bg-[#253d4c] rounded-md flex justify-center items-center cursor-pointer">
                                    <a className="text-center text-[#fff] text-xl font-bold" target="_blank" href='https://battlelab.gg/'>
                                    VISIT OUR WEBSITE</a>
                                    {/* http://battlelab.gg/ */}
                                </div>
                            </div>
                    </div>
                    <div className="w-full h-[580px]  wide:h-[510px] bg-primary-dark shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] border border-black  z-[10] animated3 bounceInLeftfaq">
                        
                    </div>

                    

                </div>
            </div>
        </div>


    );
};
export default About;
