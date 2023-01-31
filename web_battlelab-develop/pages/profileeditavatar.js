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
                <div className='bg-bl-darker'>
                    <div className='flex items-center bg-gradient-to-b from-bl-hilight-dark to-bl-dark pl-6 h-20 border-l-6 border-bl-secondary space-x-2 overflow-x-auto'>
                        <FilterButton label='All' selected={true} />
                        <FilterButton label='Head' />
                        <FilterButton label='Eyes' />
                        <FilterButton label='Mouth' />
                        <FilterButton label='Top' />
                        <FilterButton label='Left Hand' />
                        <FilterButton label='Right Hand' />
                        <FilterButton label='Shoes' />
                        <FilterButton label='Auro' />
                        <FilterButton label='Bottom' />
                    </div>
                    <div className="grid grid-cols-4 justify-items-center gap-8 p-12">
                        {[...Array(20)].map((e, index) => (
                            <PartBox key={index} />
                        ))}
                    </div>
                </div>
                <div className='bg-bl-primary-bg border border-bl-hilight rounded-lg'>
                    <div className='relative'>
                        <div className='pt-6 mb-12'>
                            <p className='text-white font-bold text-center text-2xl'>{username}</p>
                            <div className='w-80 ml-auto mr-auto'>
                                <div className='flex justify-between mb-1'>
                                    <p className='text-white'>EXP:</p>
                                    <p className='text-white'>300/1000</p>
                                </div>
                                <ProgressBar progress={"45%"} />
                            </div>
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-b from-neutral-700 to-neutral-900 rounded-lg absolute top-0 left-0 flex items-center justify-center text-white font-bold text-2xl">12</div>
                        <div className="flex absolute top-4 right-4">
                            <div className='w-12 h-8 rounded-l-xl bg-gradient-to-t from-bl-dark to-bl-primary-darker flex items-center justify-center'>
                                <img src="/images/profile/male_icon.svg" alt="" />
                            </div>
                            <div className='w-12 h-8 rounded-r-xl bg-bl-primary-darker flex items-center justify-center'>
                                <img src="/images/profile/female_icon.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 justify-items-center gap-y-24 pb-8 relative'>
                        <PartBoxDark icon="ic_head" />
                        <div></div>
                        <PartBoxDark icon="ic_eye" />
                        <PartBoxDark icon="ic_mouth" />
                        <div></div>
                        <PartBoxDark icon="ic_top" />
                        <PartBoxDark icon="ic_hand" />
                        <div></div>
                        <PartBoxDark icon="ic_hand_right" />
                        <PartBoxDark icon="ic_shoes" />
                        <PartBoxDark icon="ic_auro" />
                        <PartBoxDark icon="ic_bottom" />
                        <img src="/images/profile/female_cha_mock.png" alt="" className='absolute h-[600px] ml-auto mr-auto' />
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
                    <div className="grid grid-cols-2 md:gap-6 lg:gap-12 bg-bl-dark p-8">

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

const FilterButton = (props) => {
    return (
        <button className={props.selected ?
            'font-bold flex-none text-black bg-bl-secondary py-3 w-24 rounded-2xl text-sm'
            :
            'text-white bg-bl-dark flex-none py-3 w-24 rounded-2xl text-sm'}>
            {props.label}
        </button>
    )
}

const PartBox = (props) => {
    return (
        <div className="w-32 h-32 bg-bl-hilight from-bl-hilight bg-gradient-to-b to-bl-hilight-dark rounded-sm">

        </div>
    )
}

const PartBoxDark = (props) => {
    return (
        <div className="w-36 h-36 bg-bl-dark rounded-sm flex items-center justify-center">
            <img src={`/images/profile/${props.icon}.svg`} alt="" />
        </div>
    )
}
export default Profile