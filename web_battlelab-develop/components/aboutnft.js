import { useContext, useState, useEffect, useReducer } from 'react'
import BannerStats from './bannerstats'
import Button from './button'
import BorderButton from './borderbutton'
import { withTranslation } from "react-i18next";

import api from '../pages/api/web'
const AboutNFT = (props) => {

    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            totalUsers: 0,
            totalGames: 0,
            totalMatches: 0,
        }
    );

    useEffect(() => {
        getUserGameMatchCount();
      }, [])

    const getUserGameMatchCount = () => {
        api.getUserGameMatchCount()
          .then(res => {
            if (res.data.success) {
            setState({
                totalUsers: res.data.totalUsers,
                totalGames: res.data.totalGames,
                totalMatches: res.data.totalMatches,
                })
            }
          }).catch(err => {
            console.log(err)
          })
      }

    return (
        <div className='bg-black overflow-hidden'>
            <div className="bg-[url('/images/home/img_main_bg_fix.png')] bg-cover bg-no-repeat bg-center">
                <div className="mx-auto max-w-screen-2xl">
                    <div className='grid grid-cols-2 items-center py-36'>
                        <div className='space-y-14 ml-6'>
                            <img src="/images/nfts/Photo_1 extra(slide3).png" alt="" className='w-full pr-10'/>
                            <p className='text-2xl text-white'>{props.t('A new E-sports platform with smart chain technology will launch a New NFT collection "Battlelab CEO Suit" with the concept "Collect to earn..')}</p>
                            <div className='flex flex-col gap-8'>
                                {/* <button className='bg-bl-primary px-10 py-5 rounded-lg text-xl font-bold text-white'>INSTALL NOW</button> */}
                                {/* <button className='bg-bl-hilight border-2 border-bl-primary px-10 py-5 rounded-lg text-xl font-bold text-white'>GET STARTED</button> */}
                                <button className='flex w-40 justify-between bg-bl-primary hover:bg-bl-primary-dark px-10 py-5 rounded-lg text-xl font-bold text-white transition duration-300'>
                                    Buy Now
                                    {/* <img src="/images/aboutus/ic_window.svg" alt="" /> */}
                                    {/* <img src="/images/aboutus/ic_mac.svg" alt="" /> */}
                                </button>
                                {/* <div className='flex w-96 justify-between'>
                                    <p className='text-white'>Also available on</p>
                                    <div className='flex gap-3'>
                                        <img src="/images/aboutus/ic_window.svg" alt="" />
                                        <img src="/images/aboutus/ic_android.svg" alt="" />
                                    </div>
                                </div> */}
                            </div>
                            {/* <BannerStats users={state.totalUsers} games={state.totalGames} matches={state.totalMatches} /> */}
                        </div>
                        <div className='relative'>
                            <div className=''>
                                <img src="/images/nfts/AnimationB(slide3).gif" height="500" width="500" alt="" className='object-contain' />
                            </div>
                            {/* <div className='h-[940px] w-[732px] absolute top-[52px] ml-[265px]'>
                                <img src="/images/home/bl1.png" alt="" className='object-contain' />
                            </div>
                            <div className='h-[320px] w-[367px] top-[430px] -ml-28 absolute rotate-12'>
                                <img src="/images/home/bl2.png" alt="" className='object-contain' />
                            </div> */}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default (withTranslation()(AboutNFT))