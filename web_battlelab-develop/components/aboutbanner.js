import { useContext, useState, useEffect, useReducer } from 'react'
import BannerStats from './bannerstats'
import Button from './button'
import BorderButton from './borderbutton'
import { withTranslation } from "react-i18next";

import api from '../pages/api/web'
import WebApi from '../pages/api/web';
const AboutBanner = (props) => {
    const [ executableFileURL, setExecutableFileURL ] = useState("");
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
        getLatestExecutableFile();
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

    const getLatestExecutableFile = () =>{
        WebApi.getLatestExecutableAPI()
            .then(res => {
                if (res.data.success) {
                    setExecutableFileURL(Buffer.from(res.data.update.release_file, 'base64').toString('ascii'))
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const addDownloadCountHanlder = () => {
        var navigator_info = window.navigator
        var screen_info = window.screen
        var uid = navigator_info.mimeTypes.length
        uid += navigator_info.userAgent.replace(/\D+/g, '')
        uid += navigator_info.plugins.length
        uid += screen_info.height || ''
        uid += screen_info.width || ''
        uid += screen_info.pixelDepth || ''
        const payload = {
            address: uid
        }
        WebApi.saveDownloadCountAPI(payload)
        .then(res => {
            if (res.data.success) {
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='bg-black overflow-hidden'>
            <div className="bg-[url('/images/home/img_main_bg_fix.png')] bg-cover bg-no-repeat bg-center">
                <div className="mx-auto max-w-screen-2xl">
                    <div className='grid grid-cols-1 md:grid-cols-2 items-center md:py-36'>
                        <div className='md:hidden px-10 pt-10 mb-20'>
                            <img src="/images/aboutus/mockup_computer_with_mockupArt.png" alt="" className='object-contain' />
                        </div>
                        <div className='space-y-10 md:space-y-14 ml-6 mr-6 md:ml-6 md:mr-0'>
                            <div className='flex md:block justify-center'>
                                <img src="/images/home/battlelab_logo.svg" alt="" className='w-4/5 md:w-full md:pr-10' />
                            </div>
                            <p className='text-base md:text-2xl text-white'>{props.t("A platform for gamers to bet and earn from cryptocurrency by playing versus matches with opponent.")}</p>
                            <div className='flex flex-col space-y-8'>
                                {/* <button className='bg-bl-primary px-10 py-5 rounded-lg text-xl font-bold text-white'>INSTALL NOW</button> */}
                                {/* <button className='bg-bl-hilight border-2 border-bl-primary px-10 py-5 rounded-lg text-xl font-bold text-white'>GET STARTED</button> */}
                                <a href={executableFileURL} download>
                                <button id='downloadEXE' onClick={() => addDownloadCountHanlder()} className='flex w-96 justify-between bg-bl-primary hover:bg-bl-primary-dark px-10 py-5 rounded-lg text-xl font-bold text-white transition duration-300'>
                                    INSTALL NOW
                                    <img src="/images/aboutus/ic_window.svg" alt="" />
                                </button>
                                </a>
                                {/* <div className='flex w-96 justify-between'>
                                    <p className='text-white'>Also available on</p>
                                    <div className='flex gap-3'>
                                        <img src="/images/aboutus/ic_window.svg" alt="" />
                                        <img src="/images/aboutus/ic_android.svg" alt="" className='pr-2 md:pr-0'/>
                                    </div>
                                </div> */}
                            </div>
                            <div className='hidden md:block'>
                                <BannerStats users={state.totalUsers} games={state.totalGames} matches={state.totalMatches} />
                            </div>
                        </div>
                        <div className='hidden md:block relative'>
                            <div className=''>
                                <img src="/images/aboutus/mockup_computer_with_mockupArt.png" alt="" className='object-contain' />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default (withTranslation()(AboutBanner))