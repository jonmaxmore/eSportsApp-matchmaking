import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'
import Layout from '../components/layout'
import Button from '../components/button'

const friendsdata = [
    {
        'username': 'II_Harold_II(David)',
        'status': 'Online',
        'level': 12
    },
    {
        'username': 'II_Harold_II(David)',
        'status': 'Leauge of Legends',
        'level': 11
    },
    {
        'username': 'II_Harold_II(David)',
        'status': 'Online',
        'level': 12
    },
    {
        'username': 'II_Harold_II(David)',
        'status': 'Online',
        'level': 12
    },
    {
        'username': 'II_Harold_II(David)',
        'status': 'Leauge of Legends',
        'level': 12
    },
    {
        'username': 'II_Harold_II(David)',
        'status': 'Online',
        'level': 12
    },
    {
        'username': 'II_Harold_II(David)',
        'status': 'Online',
        'level': 12
    },
    {
        'username': 'II_Harold_II(David)',
        'status': 'Leauge of Legends',
        'level': 12
    },
    {
        'username': 'II_Harold_II(David)',
        'status': 'Online',
        'level': 12
    },
    {
        'username': 'II_Harold_II(David)',
        'status': 'Online',
        'level': 12
    },
]

const historydata = [
    {
        'username': 'II_Harold_II(David)',
        'time': '1 hour ago',
        'message': 'OMG! I won so much today! Who would like to win the game? Invite me to join your game, then I will bring luck for ya all ^——^',
        'level': 12
    },
    {
        'username': 'II_Harold_II(David)',
        'time': '1 hour ago',
        'message': 'OMG! I won so much today! Who would like to win the game? Invite me to join your game, then I will bring luck for ya all ^——^',
        'level': 12
    },
    {
        'username': 'II_Harold_II(David)',
        'time': '1 hour ago',
        'message': 'OMG! I won so much today! Who would like to win the game? Invite me to join your game, then I will bring luck for ya all ^——^',
        'level': 12
    },
    {
        'username': 'II_Harold_II(David)',
        'time': '1 hour ago',
        'message': 'OMG! I won so much today! Who would like to win the game? Invite me to join your game, then I will bring luck for ya all ^——^',
        'level': 12
    },

]

const ProfileDetails = (props) => {
    const [username, setUsername] = useState('Kumachan')
    const [history, setHistory] = useState(18)
    const [isHistoryEmpty, setIsHistoryEmpty] = useState(true)
    const [isFollowersEmpty, setIsFollowersEmpty] = useState(true)

    return (
        <Layout>
            <ProfileLayout username={username}>
                <div>
                    <div className='flex items-center gap-1 py-6 bg-gradient-to-b from-bl-hilight-dark to-bl-dark pl-6 h-16 border-l-6 border-bl-secondary'>
                        <p className='text-white font-bold text-sm'>POST HISTORY</p><p className='text-white font-normal'>({history})</p>
                    </div>
                    <div className='bg-bl-darker h-[855px] overflow-hidden overflow-y-scroll'>
                        {isHistoryEmpty ?
                            <EmptyPage title="No post history" subtitle="Your posts from your feed timeline will be shown here." />
                            :
                            <>
                                {historydata.map((data, index) => (
                                    <HistoryCell {...data} key={index} />
                                ))}
                            </>
                        }
                    </div>
                </div>
                <div className=''>
                    <div className='flex items-center gap-1 py-6 bg-gradient-to-b from-bl-hilight-dark to-bl-dark pl-6 h-16 border-l-6 border-bl-secondary'>
                        <p className='text-white text-sm font-bold'>SOCIAL</p>
                    </div>
                    <Tab.Group>
                        <Tab.List as="div" className="flex justify-between">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={
                                            `${selected ? 'text-bl-secondary border-b-5 border-b-bl-secondary' : 'text-white border-b'} bg-bl-darker w-full h-14 text-lg font-bold`
                                        }
                                    >
                                        Followers
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={
                                            `${selected ? 'text-bl-secondary border-b-5 border-b-bl-secondary' : 'text-white border-b'} bg-bl-darker w-full h-14  text-lg font-bold`
                                        }
                                    >
                                        Following
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                {isFollowersEmpty ?
                                    <div className='bg-bl-darker h-[800px] overflow-hidden overflow-y-scroll'>
                                        <EmptyPage title="No followers" subtitle="People that followed you will be shown here." />
                                    </div>
                                    :
                                    <div className='bg-bl-darker h-[800px] overflow-hidden overflow-y-scroll'>
                                        {friendsdata.map((data, index) => (
                                            <FriendCell {...data} key={index} />
                                        ))}
                                    </div>
                                }
                            </Tab.Panel>
                            <Tab.Panel>
                                {isFollowersEmpty ?
                                    <div className='bg-bl-darker h-[800px] overflow-hidden overflow-y-scroll'>
                                        <EmptyPage title="No followers" subtitle="People that followed you will be shown here." />
                                    </div>
                                    :
                                    <div className='bg-bl-darker h-[800px] overflow-hidden overflow-y-scroll'>
                                        {friendsdata.map((data, index) => (
                                            <FriendCell {...data} key={index} />
                                        ))}
                                    </div>
                                }
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
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
                        <h1 className='text-4xl text-white font-bold mb-8'>Profile Details</h1>
                        <form>
                            <div className='relative'>
                                <div className='from-bl-hilight bg-gradient-to-b to-bl-dark w-80 h-10 top-0 left-0 z-10 opacity-50'></div>
                                <img src="/images/profile/ic_search.svg" alt="" className='absolute text-white top-0 left-0 h-10 w-10 p-3 z-10' />
                                <input type="text" placeholder='Search profile...' className='absolute bg-transparent top-0 left-0 pl-10 w-80 h-10 text-white z-20' />
                            </div>
                        </form>
                    </div>
                    <div className="grid grid-cols-2 md:gap-6 lg:gap-12">

                        {props.children}

                    </div>
                </div>
            </div>
        </>
    )
}

const EmptyPage = (props) => {
    return (
        <div className='pt-12 space-y-12'>
            <p className='text-xl text-white font-bold text-center'>{props.title}</p>
            <p className='text-white text-center'>{props.subtitle}</p>
        </div>
    )
}

const HistoryCell = (props) => {
    return (
        <div className='bg-bl-primary-bg flex m-4 pl-6 py-4 border-b-5 border-b-bl-secondary'>
            <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                    <p className='text-gray-500 text-sm'>{props.time}</p>
                    <p className="text-lg text-white font-bold">{props.username}</p>
                </div>
                <div className='flex flex-col items-end'>
                    <div className='bg-neutral-900 px-6 py-8'>
                        <p className='text-white text-sm'>{props.message}</p>
                    </div>
                    <div className='border-neutral-900 w-[22px] h-[22px] border-l-[11px] border-r-[11px] border-t-[11px] border-b-[11px] border-b-transparent border-l-transparent'></div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <img src="/images/profile/like_icon.svg" alt="" />
                        <p className='text-white text-sm font-bold'>Like</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img src="/images/profile/comments_icon.svg" alt="" />
                        <p className='text-white text-sm font-bold'>Comment</p>
                    </div>
                    <p className='text-bl-primary text-sm font-bold pr-6'>View 3 comments</p>
                </div>
            </div>
            <div className='flex-none w-36 h-50 relative'>
                <img src="/images/profile/female_cha_mock.png" alt="" className='w-[58px] ml-auto mr-auto mt-auto mb-auto' />
                <p className='text- font-bold text-white w-7 h-7 bg-gradient-to-tr from-bl-dark to-bl-hilight rounded-md absolute bottom-0 left-1 flex items-center justify-center'>{props.level}</p>
            </div>
        </div>
    )
}

const FriendCell = (props) => {
    return (
        <div className='flex items-center justify-between px-6 py-6'>
            <div className='flex items-center'>
                <div className='relative'>
                    <img src="/images/home/mock_cha_avatar.png" alt="" className='w-20' />
                    <p className='text-xs font-bold text-white w-5 h-5 bg-gradient-to-tr from-bl-dark to-bl-hilight rounded-md absolute -bottom-1 left-1 flex items-center justify-center'>{props.level}</p>
                </div>
                <div>
                    <p className='text-white font-bold'>{props.username}</p>
                    <p className='text-bl-primary text-sm font-light'>{props.status}</p>
                </div>
            </div>
            <button className='border-3 border-bl-primary rounded-lg text-white font-bold px-8 py-2'>REMOVE</button>
        </div>
    )
}

export default ProfileDetails