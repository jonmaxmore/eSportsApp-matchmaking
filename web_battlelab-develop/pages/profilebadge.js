import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'
import Layout from '../components/layout'
import Button from '../components/button'

const trophydata = [
    {
        'image': '/images/profile/mockup_badge1.svg',
        'own': true
    },
    {
        'image': '/images/profile/mockup_badge2.svg',
        'own': true
    },
    {
        'image': '/images/profile/mockup_badge3.svg',
        'own': true
    },
    {
        'image': '/images/profile/mockup_badge4.svg',
        'own': true
    },
    {
        'image': '/images/profile/mockup_badge5.svg',
        'own': true
    },
    {
        'image': '/images/profile/mockup_badge5.svg',
        'own': true
    },
    {
        'image': '/images/profile/mockup_badge7.svg',
        'own': true
    },
    {
        'image': '/images/profile/mockup_badge8.svg',
        'own': true
    },
    {
        'image': '/images/profile/mockup_lock1.svg',
        'own': false
    },
    {
        'image': '/images/profile/mockup_lock2.svg',
        'own': false
    },
    {
        'image': '/images/profile/mockup_lock3.svg',
        'own': false
    },
    {
        'image': '/images/profile/mockup_lock4.svg',
        'own': false
    },
    {
        'image': '/images/profile/mockup_lock4.svg',
        'own': false
    },
    {
        'image': '/images/profile/mockup_lock6.svg',
        'own': false
    },
    {
        'image': '/images/profile/mockup_lock7.svg',
        'own': false
    },
    

]

const ProfileTrophy = (props) => {
    const [username, setUsername] = useState('Kumachan')
    const [trophyPage, setTrophyPage] = useState('7/40')

    return (
        <Layout>
            <ProfileLayout username={username}>
                <div>
                    <div className='flex items-center gap-1 py-6 bg-gradient-to-b from-bl-hilight-dark to-bl-dark pl-6 h-16 border-l-6 border-bl-secondary'>
                        <p className='text-white font-bold text-sm'>ALL BADGES</p><p className='text-white font-normal'>({trophyPage})</p>
                    </div>
                    <div className="grid grid-cols-5 gap-6 bg-black p-12">
                        {trophydata.map((data, index) => (
                            <BadgeCell  {...data} key={index} />
                        ))}
                    </div>
                </div>
            </ProfileLayout>
        </Layout>
    )
}

export default ProfileTrophy

const BadgeCell = (props) => {
    return (
        <div className={ `${ props.own ? 'bg-gradient-to-b to-bl-dark from-bl-primary-darker border-3 border-bl-primary' : 'bg-neutral-800' } flex items-center justify-center w-52 h-48`}>
            <img src={props.image} alt="" className=''/>
        </div>
    )
}

const ProfileLayout = (props) => {
    return (
        <>
            <div className="bg-[url('/images/home/img_main_bg_fix.png')] bg-cover bg-black bg-no-repeat bg-top">
                <div className="mx-auto max-w-screen-2xl pt-20 pb-20 px-12">
                    <div className="flex items-center justify-between">
                        <h1 className='text-4xl text-white font-bold mb-8'>{props.username}'s Badge</h1>
                        <form>
                            <div className='relative'>
                                <div className='from-bl-hilight bg-gradient-to-b to-bl-dark w-80 h-10 top-0 left-0 z-10 opacity-50'></div>
                                <img src="/images/profile/ic_search.svg" alt="" className='absolute text-white top-0 left-0 h-10 w-10 p-3 z-10' />
                                <input type="text" placeholder='Search profile...' className='absolute bg-transparent top-0 left-0 pl-10 w-80 h-10 text-white z-20' />
                            </div>
                        </form>
                    </div>
                    <div className="">

                        {props.children}

                    </div>
                </div>
            </div>
        </>
    )
}
