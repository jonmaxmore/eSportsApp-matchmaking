import { useState } from 'react'
import Layout from '../components/layout'
import Button from '../components/button'

const communitydata = [
    {
        'name': 'Posts',
        'value': 18
    },
    {
        'name': 'Followers',
        'value': 120
    },
    {
        'name': 'Following',
        'value': 1200
    },
    {
        'name': 'Friends',
        'value': 19
    },
    {
        'name': 'My sell orders',
        'value': 3
    },
]

const Profile = (props) => {
    const [username, setUsername] = useState('Kumachan')
    return (
        <Layout>
            <ProfileLayout username={username}>
                <div className='flex flex-col p-6 space-y-8 bg-[url("/images/profile/banner_profile.svg")] bg-contain bg-center bg-no-repeat'>
                    <div className='flex flex-col items-center space-y-3'>
                        <p className='text-bl-secondary text-2xl font-bold'>Level.12</p>
                        <p className='text-bl-primary'>Online</p>
                    </div>
                    <div>
                        <div className='flex justify-between mb-1'>
                            <p className='text-white'>EXP:</p>
                            <p className='text-white'>300/1000</p>
                        </div>
                        <ProgressBar progress={"45%"} />
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-white'>Total earnings:</p>
                        <div className='text-right'>
                            <p className='text-bl-secondary font-bold'>79.75 BLC</p>
                            <p className='text-white'>=1,595 $</p>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-white'>Marches played:</p>
                        <p className='text-white font-bold'>143</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-white'>Total wins:</p>
                        <p className='text-white font-bold'>100</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-white'>Total losses:</p>
                        <p className='text-white font-bold'>43</p>
                    </div>
                </div>
                <div className='space-y-6 p-6 bg-bl-darker drop-shadow-lg'>
                    <p className='text-white text-2xl font-bold flex gap-4'>
                        {username}
                        <img src="/images/contact/ic_dropdown.svg" alt="" />
                    </p>
                    <p className='text-white font-bold'>Jintara Poonlarb</p>
                    <p className='text-white'>Code ID: PT9158xxxx3</p>
                    <div className='bg-neutral-800 p-6 rounded-lg relative'>
                        <p className='text-white text-sm'>“Hey, thank you for visiting my profile, feel free to add me as a friend, invite to your clan or invite me to your match. Thanks~~~~ ^——^”</p>
                        <div className='absolute top-0 right-0 w-8 h-8 rounded-md flex bg-bl-hilight from-bl-hilight bg-gradient-to-b to-bl-dark'>
                            <img src="/images/profile/edit.svg" alt="" className='px-1 pt-1' />
                        </div>
                    </div>
                    <button className='bg-bl-primary hover:bg-bl-primary-dark w-full py-3 rounded-lg text-md font-bold text-white transition duration-300'>
                        CUSTOMIZE AVATAR
                    </button>
                    <div className='text-white text-xs flex justify-between py-2 px-4 bg-bl-hilight-dark'>
                        <p>Clan</p>
                        <div className='flex gap-2'>
                            <p>MMR</p>
                            <div className='text-black bg-white w-4 h-4 rounded-full text-center'>?</div>
                        </div>
                        <p>Ranking</p>
                    </div>

                    <div className='flex items-end justify-between'>
                        <div className='flex flex-col items-center'>
                            <img src="/images/profile/trophy_silver.png" alt="" className='w-16 h-26' />
                            <p className='text-white font-bold'>LBKR</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className='text-bl-secondary text-xl font-bold p-4'>1756</p>
                            <p className='text-white font-bold'>as LoL</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <img src="/images/profile/trophy_silver.png" alt="" className='w-16 h-26' />
                            <p className='text-white font-bold'>Silver</p>
                        </div>
                    </div>


                </div>
                <div className='bg-bl-primary-bg border border-bl-hilight rounded-lg'>
                    <div className='flex flex-col items-center'>
                        <img src="/images/profile/female_cha_mock.png" alt="" className='h-[600px] p-8' />
                    </div>
                </div>

                <div>
                    <div className='bg-bl-darker p-8 drop-shadow-lg'>
                        <h1 className='text-white text-center text-2xl font-bold'>Community</h1>
                        <table className="table-auto w-full ">
                            <tbody>
                                {communitydata.map((data, index) => (
                                    <tr className='text-white text-xs text-center h-14' key={index}>
                                        <td className='text-left'>{data.name}</td>
                                        <td className='text-right'>{data.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className='bg-bl-hilight hover:bg-bl-primary-dark border-2 border-bl-primary w-full py-3 rounded-lg text-md font-bold text-white transition duration-300'>
                            PROFILE DETAILS
                        </button>
                    </div>
                    <div className='bg-bl-darker drop-shadow-lg'>
                        {/* <div className='text-white p-4 mt-12 flex justify-between bg-bl-hilight-dark'>
                            <p>Trophy</p>
                            <p>Badge</p>
                        </div> */}
                        <div></div>
                        <table className="table-auto text-white w-full bg-bl-darker">
                            <thead>
                                <tr className='bg-bl-hilight-dark'>
                                    <th className='py-4'>Trophy</th>
                                    <th>Badge</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="/images/profile/ic_trophy.png" alt="" className='ml-auto mr-auto pt-5'/>
                                        <p className='text-center font-bold pt-5 pb-8'>31</p>
                                    </td>
                                    <td>
                                        <img src="/images/profile/ic_badge.svg" alt="" className='ml-auto mr-auto pt-5'/>
                                        <p className='text-center font-bold pt-5 pb-8'>10</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-span-2 drop-shadow-lg'>
                    <div>
                        <h1 className='bg-bl-hilight from-bl-hilight bg-gradient-to-b to-bl-dark border-l-4 border-bl-secondary py-4 px-6'>
                            <div className="flex items-center justify-between">
                                <p className='font-bold text-sm text-white'>MATCH HISTORY</p>
                                <div className='flex items-center gap-4'>
                                    <p className='text-white text-xs'>FILTER BY:</p>
                                    <select className="form-select block bg-bl-dark text-white text-sm px-6 py-1 w-60 rounded-full">
                                        <option selected>All games</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                        </h1>
                        <table className="table-auto text-white w-full bg-bl-darker">
                            <thead>
                                <tr className='bg-neutral-800'>
                                    <th>Game</th>
                                    <th>Result</th>
                                    <th>Game Mode</th>
                                    <th>K/D/A</th>
                                    <th>VS</th>
                                    <th>EARN</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <HistoryCell image={"/images/profile/game_icon1.png"} />
                                <HistoryCell image={"/images/profile/game_icon2.png"} />
                                <HistoryCell image={"/images/profile/game_icon1.png"} />
                                <HistoryCell image={"/images/profile/game_icon1.png"} />
                                <HistoryCell image={"/images/profile/game_icon2.png"} />
                                <HistoryCell image={"/images/profile/game_icon1.png"} />
                                <HistoryCell image={"/images/profile/game_icon1.png"} />
                            </tbody>
                        </table>
                    </div>
                    <div className='bg-bl-darker'>
                        <h1 className='bg-bl-hilight from-bl-hilight bg-gradient-to-b to-bl-dark border-l-4 border-bl-secondary py-4 px-6'>
                            <p className='font-bold text-sm text-white'>Rank and Matchmaking rating (MMR)</p>
                        </h1>
                        <div className='grid grid-cols-3 gap-4 pt-8 px-12'>
                            <RankBox medal="gold" mmr={1756} image="/images/profile/game_preview1.png" />
                            <RankBox medal="silver" mmr={1560} image="/images/profile/game_preview2.png" />
                            <RankBox medal="bronze" mmr={1210} image="/images/profile/game_preview3.png" />
                        </div>
                        <div className='grid grid-cols-4 gap-4 pt-12 pb-8 px-12'>
                            <RankSmallBox mmr={1104} image="/images/profile/game_preview4.png" />
                            <RankSmallBox mmr={1090} image="/images/profile/game_preview5.png" />
                            <RankSmallBox mmr={1022} image="/images/profile/game_preview6.png" />
                            <RankSmallBox mmr={988} image="/images/profile/game_preview7.png" />
                        </div>
                    </div>
                </div>
            </ProfileLayout>
        </Layout>
    )
}

const ProfileLayout = (props) => {
    return (
        <>
            <div className="bg-[url('/images/home/img_main_bg_fix.png')] bg-cover bg-black bg-no-repeat bg-top">
                <div className="mx-auto max-w-screen-2xl pt-20 pb-40 px-12">
                    <div className="flex items-center justify-between">
                        <h1 className='text-4xl text-white font-bold mb-8'>{props.username}'s Profile</h1>
                        <form>
                            <div className='relative'>
                                <div className='bg-bl-hilight from-bl-hilight bg-gradient-to-b to-bl-dark w-80 h-10 top-0 left-0 z-10 opacity-50'></div>
                                <img src="/images/profile/ic_search.svg" alt="" className='absolute text-white top-0 left-0 h-10 w-10 p-3 z-10' />
                                <input type="text" placeholder='Search profile...' className='absolute bg-transparent top-0 left-0 pl-10 w-80 h-10 text-white z-20' />
                            </div>
                        </form>
                    </div>
                    <div className="grid grid-cols-3 md:gap-6 lg:gap-12 bg-bl-dark p-8">

                        {props.children}

                    </div>
                </div>
            </div>
        </>
    )
}

const ProgressBar = (props) => {
    return (
        <div className="w-full bg-black rounded-full h-1.5 dark:bg-black">
            <div className="bg-gray-600 h-1.5 rounded-full dark:bg-bl-primary" style={{ width: props.progress }}></div>
        </div>
    )
}

const HistoryCell = (props) => {
    return (
        <tr className='text-center'>
            <td>
                <img src={props.image} alt="" className='w-14 h-14 m-auto' />
            </td>
            <td className='text-2xl font-bold text-bl-primary'>Win</td>
            <td>Summoner Rift 5vs5</td>
            <td className='font-bold'>12/3/8</td>
            <td className='text-bl-secondary font-bold'>28:16</td>
            <td className='py-4'>
                <p className='text-2xl font-bold'>55 $</p>
                <p className='text-bl-secondary font-bold text-sm'>=2.75 BLC</p>
            </td>
            <td>01/02/2022</td>
        </tr>
    )
}

const RankBox = (props) => {
    return (
        <div className='relative mt-6'>
            {/* { props.medal == "gold" ? `border-bl-gold` : props.medal == "silver" ? border-bl-silver : border-bl-bronze } */}
            <div className={`${props.medal == "gold" ? `border-bl-gold` : props.medal == "silver" ? "border-bl-silver" : "border-bl-bronze"} border-bl-gold border-5`}>
                <img src={props.image} alt="" className='w-full bg-cover bg-center' />
            </div>
            <p className='text-white text-xl font-bold text-center mt-4'>{props.mmr} MMR</p>

            <img src={props.medal == "gold" ?
                `/images/profile/trophy_gold.svg`
                :
                props.medal == "silver" ?
                    `/images/profile/trophy_silver.svg`
                    :
                    `/images/profile/trophy_bronze.svg`}
                alt="" className='absolute w-20 h-20 -top-11 left-0 right-0 ml-auto mr-auto' />
        </div>
    )
}

const RankSmallBox = (props) => {
    return (
        <div>
            <img src={props.image} alt="" className='w-full bg-cover bg-center' />
            <p className='text-white text-xl font-bold text-center mt-4'>{props.mmr} MMR</p>
        </div>
    )
}
export default Profile