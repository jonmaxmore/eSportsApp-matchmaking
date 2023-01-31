import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'
import Layout from '../components/layout'
import Button from '../components/button'

const trophydata = [
    {
        'name': 'Welcome to Battlelab',
        'description': 'Login to Battlelab for the first time',
        'image': '/images/profile/mock_trophy1.svg',
        'own': true
    },
    {
        'name': 'My first BFF',
        'description': 'Login to Battlelab for the first time',
        'image': '/images/profile/mock_trophy2.svg',
        'own': true
    },
    {
        'name': 'My first BFF',
        'description': 'Login to Battlelab for the first time',
        'image': '/images/profile/mock_trophy2.svg',
        'own': true
    },
    {
        'name': 'First Blood!',
        'description': 'Lose for the first time',
        'image': '/images/profile/mock_trophy3.svg',
        'own': true
    },
    {
        'name': 'Ace!',
        'description': 'Win for the first time',
        'image': '/images/profile/mock_trophy4.svg',
        'own': true
    },
    {
        'name': 'Ace!',
        'description': 'Win for the first time',
        'image': '/images/profile/mock_trophy4.svg',
        'own': true
    },
    {
        'name': 'Level 5',
        'description': 'Reach level 5',
        'image': '/images/profile/mock_trophy1.svg',
        'own': true
    },
    {
        'name': 'Level 10',
        'description': 'Reach level 10',
        'image': '/images/profile/mock_trophy1.svg',
        'own': true
    },
    {
        'name': 'My bloodline',
        'description': 'Create your own clan',
        'image': '/images/profile/mockup_trophy_lock2.svg',
        'own': false
    },
    {
        'name': 'This is my pack',
        'description': 'Join someone else clan',
        'image': '/images/profile/mockup_trophy_lock2.svg',
        'own': false
    },
    {
        'name': 'My bloodline',
        'description': 'Create your own clan',
        'image': '/images/profile/mockup_trophy_lock2.svg',
        'own': false
    },
    {
        'name': 'My bloodline',
        'description': 'Create your own clan',
        'image': '/images/profile/mockup_trophy_lock2.svg',
        'own': false
    },

]

const ProfileTrophy = (props) => {
    const [username, setUsername] = useState('Kumachan')
    const [trophyPage, setTrophyPage] = useState('6/40')

    return (
        <Layout>
            <ProfileLayout username={username}>
                <div>
                    <div className='flex items-center gap-1 py-6 bg-gradient-to-b from-bl-hilight-dark to-bl-dark pl-6 h-16 border-l-6 border-bl-secondary'>
                        <p className='text-white font-bold text-sm'>ALL TROPHIES</p><p className='text-white font-normal'>({trophyPage})</p>
                    </div>
                    <div className="grid grid-cols-3 gap-6 bg-black p-12">
                        {trophydata.map((data, index) => (
                            <TrophyCell  {...data} key={index} />
                        ))}
                    </div>
                </div>
            </ProfileLayout>
        </Layout>
    )
}

export default ProfileTrophy

const TrophyCell = (props) => {
    return (
        <div className={` ${props.own ? 'bg-bl-darker' : 'bg-neutral-800'} flex items-center gap-10 p-4`}>

            <div className={`${props.own ? 'bg-gradient-to-b to-bl-dark from-bl-primary-darker' : 'bg-neutral-800'} h-28 w-28 border-3 border-bl-primary rounded-md flex items-center justify-center`}>
                <img src={props.image} alt="" />
            </div>
            <div className='space-y-3'>
                <p className='text-white font-bold'>{props.name}</p>
                <p className='text-white'>{props.description}</p>
            </div>
        </div>
    )
}

const ProfileLayout = (props) => {
    return (
        <>
            <div className="bg-[url('/images/home/img_main_bg_fix.png')] bg-cover bg-black bg-no-repeat bg-top">
                <div className="mx-auto max-w-screen-2xl pt-20 pb-20 px-12">
                    <div className="flex items-center justify-between">
                        <h1 className='text-4xl text-white font-bold mb-8'>{props.username}'s Trophy</h1>
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
