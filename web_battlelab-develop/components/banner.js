import { useContext, useState, useEffect, useReducer } from 'react'
import Link from 'next/link'
import BannerStats from './bannerstats'
import Button from './button'
import BorderButton from './borderbutton'
import api from '../pages/api/web'

const Banner = (props) => {


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
        <div className='pb-8 md:pb-20 bg-black overflow-hidden'>
            <div className="bg-[url('/images/home/img_main_bg_fix.png')] bg-cover bg-no-repeat bg-center">
                <div className="mx-auto max-w-screen-2xl md:h-[57rem]">
                    <div className='hidden md:grid grid-cols-2 items-center'>
                        <div className='space-y-14 ml-6'>
                            <p className="text-6xl font-bold text-white">
                                Play your favorite game and start earning</p>
                            <p className='text-2xl text-white'>A platform for gamers to bet and earn from 
                            cryptocurrency by playing versus matches with opponent.
                            </p>
                            <div className='flex gap-8'>
                                {/* <button className='bg-bl-primary px-10 py-5 rounded-lg text-xl font-bold text-white'>INSTALL NOW</button> */}
                                {/* <button className='bg-bl-hilight border-2 border-bl-primary px-10 py-5 rounded-lg text-xl font-bold text-white'>GET STARTED</button> */}
                               {/* <Link href="/aboutus" passHref><Button label={"INSTALL NOW"} /></Link> */}
                               <Link href="/aboutus" passHref>
                               <button className='bg-bl-primary border-2 border-bl-primary hover:bg-bl-primary-dark w-full md:w-80 md:px-10 py-4 md:py-5 rounded-lg transition duration-300'>
                                    <p className='text-md md:text-xl font-medium md:font-bold text-white'>INSTALL NOW</p>
                                </button>
                                </Link>
                                <BorderButton  label={"Contact Us"} />
                            </div>
                            {/* <BannerStats users={state.totalUsers} games={state.totalGames} matches={state.totalMatches} /> */}
                        </div>
                        <div className='relative'>
                            <div className='h-[995px] w-[562px]'>
                                <img src="/images/home/bl0.png" alt="" className='object-contain' />
                            </div>
                            <div className='h-[940px] w-[732px] absolute top-[52px] ml-[265px]'>
                                <img src="/images/home/bl1.png" alt="" className='object-contain' />
                            </div>
                            <div className='h-[320px] w-[367px] top-[430px] -ml-28 absolute rotate-12'>
                                <img src="/images/home/bl2.png" alt="" className='object-contain' />
                            </div>

                        </div>
                    </div>
                </div>
                <div className='hidden md:block space-y-12 absolute top-[420px] right-0 mr-8'>
                    <img src="/images/home/ic_facebook_media.svg" alt="facebook icon" />
                    <img src="/images/home/ic_twitter_media.svg" alt="facebook icon" />
                    <img src="/images/home/ic_instagram_media.svg" alt="facebook icon" />
                </div>

                <div className='md:hidden p-6 space-y-10'>
                    <div className='relative'>
                        <div className='w-[55%] ml-10'>
                            <img src="/images/home/bl0.png" alt="" className='object-contain' />
                        </div>
                        <div className='w-[71%] absolute bottom-0 -right-5'>
                            <img src="/images/home/bl1.png" alt="" className='object-contain' />
                        </div>
                        <div className='w-[35%] absolute rotate-12 left-2 bottom-20'>
                                <img src="/images/home/bl2.png" alt="" className='object-contain' />
                            </div>
                    </div>
                    <p className="text-2xl font-bold text-white">Play your favorite game and start earning</p>
                    <p className='text-lg text-white'>A platform for gamers to bet and earn from cryptocurrency by playing versus matches with opponent.</p>
                    <BannerStats users={state.totalUsers} games={state.totalGames} matches={state.totalMatches} />
                    <div className='flex gap-6'>
                        <Button label={"INSTALL NOW"} />
                        <BorderButton label={"GET STARTED"} />
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default Banner