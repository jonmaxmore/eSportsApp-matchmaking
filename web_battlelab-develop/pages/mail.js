import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { Dialog } from '@headlessui/react'
import { Fragment } from 'react'
import Layout from '../components/layout'

const maildata = [
    {
        'date': '07-01-2022',
        'id': 'DX3340K',
        'type': 'Account',
        'status': 'Reviewing',
        'description': 'Dear sir/madam Design faster with Eclipse dashboard system for Figma',
    },
    {
        'date': '06-01-2022',
        'id': 'RNK20778',
        'type': 'Reward',
        'status': 'Not yet opened',
        'description': 'You got a reward!',
    },
    {
        'date': '04-01-2022',
        'id': 'RNK14990',
        'type': 'Processed',
        'status': 'Received',
        'description': 'You got a reward!',
    },
    {
        'date': '12-12-2021',
        'id': 'JK4568B',
        'type': 'Transaction',
        'status': 'Processed',
        'description': 'Dear sir/madam Design faster with Eclipse dashboard system for Figma',
    },
    {
        'date': '31-10-2021',
        'id': 'KK76849L',
        'type': 'Match',
        'status': 'Processed',
        'description': 'Dear sir/madam Design faster with Eclipse dashboard system for Figma',
    },
    {
        'date': '26-10-2021',
        'id': 'BNS33587',
        'type': 'Reward',
        'status': 'Received',
        'description': 'Dear sir/madam Design faster with Eclipse dashboard system for Figma',
    },
    {
        'date': '31-10-2021',
        'id': 'BNS33587',
        'type': 'Reward',
        'status': 'Received',
        'description': 'Dear sir/madam Design faster with Eclipse dashboard system for Figma',
    },

]

const Mail = (props) => {
    let [username, setUsername] = useState('Kumachan')
    let [mail, setMail] = useState(124)
    let [isMailEmpty, setIsMailEmpty] = useState(false)
    let [isOpen, setIsOpen] = useState(true)
    let [isMailOpen, setIsMailOpen] = useState(true)
    let [isRewardMailOpen, setIsRewardMailOpen] = useState(true)

    const handleDeleteMail = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className='relative'>
            <DeleteMailDialog isOpen={isOpen} setIsOpen={setIsOpen} />
            <MailDialog isMailOpen={isMailOpen} setIsMailOpen={setIsMailOpen} />
            <RewardMailDialog isMailOpen={isRewardMailOpen} setIsMailOpen={setIsRewardMailOpen} />

            <Layout>
                <ProfileLayout username={username} handleDeleteMail={handleDeleteMail}>
                    <div className='bg-black'>
                        <div className='flex items-center gap-1 py-6 bg-gradient-to-b from-bl-hilight-dark to-bl-dark pl-6 h-16 border-l-6 border-bl-secondary'>
                            <p className='text-white font-bold text-sm'>INBOX</p><p className='text-white font-normal'>({mail})</p>
                        </div>
                        {isMailEmpty ?
                            <EmptyPage title="No Mail" subtitle="No mail." />
                            :
                            <>
                                <table className="table-auto w-full">
                                    <thead>
                                        <tr className='text-white text-sm bg-neutral-800'>
                                            <th></th>
                                            <th>Date</th>
                                            <th>ID</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th>Description</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {maildata.map((data, index) => (
                                            <MailCell {...data} setIsMailOpen={setIsMailOpen} setIsRewardMailOpen={setIsRewardMailOpen} key={index} />
                                        ))}

                                    </tbody>
                                </table>
                                <MailPagination />
                            </>
                        }
                    </div>
                </ProfileLayout>
            </Layout>
        </div>
    )
}

const ProfileLayout = (props) => {
    return (
        <>
            <div className="bg-[url('/images/home/img_main_bg_fix.png')] bg-cover bg-black bg-no-repeat bg-top">
                <div className="mx-auto max-w-screen-2xl pt-20 pb-40 px-12">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className='text-4xl text-white font-bold'>MAIL INBOX</h1>
                        <div className='flex items-center gap-4'>
                            <button className='text-white font-bold bg-bl-hilight h-12 pl-4 pr-10 border-bl-primary border-3 rounded-md flex items-center gap-6'
                                onClick={props.handleDeleteMail}>
                                <img src="/images/mail/ic_remove_mail.svg" alt="" />
                                REMOVE ALL READ MAILS
                            </button>
                            <form>
                                <div className='relative'>
                                    <div className='from-bl-hilight bg-gradient-to-b to-bl-dark w-80 h-12 top-0 left-0 z-10 opacity-50'></div>
                                    <img src="/images/profile/ic_search.svg" alt="" className='absolute text-white top-0 left-0 h-12 w-10 p-3 z-10' />
                                    <input type="text" placeholder='Search mail...' className='absolute bg-transparent top-0 left-0 pl-10 w-80 h-12 text-white z-20' />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="">

                        {props.children}

                    </div>
                </div>
            </div>
        </>
    )
}

const EmptyPage = (props) => {
    return (
        <div className='py-12 space-y-12'>
            <p className='text-xl text-white font-bold text-center'>{props.title}</p>
            <p className='text-white text-center'>{props.subtitle}</p>
        </div>
    )
}

const MailCell = (props) => {
    const [isChecked, setIsChecked] = useState(false)
    const checked = () => {
        setIsChecked(!isChecked)
        console.log('checked');
    }

    const openMailPopup = () => {
        if (props.status == 'Received') {
            props.setIsRewardMailOpen(true)
        } else {
            props.setIsMailOpen(true)
        }
    }
    return (
        <tr className={`${isChecked ? 'bg-bl-primary-alt3' : props.status == 'Reviewing' ? 'bg-black' : props.status == "Processed" ? 'bg-black' : props.status == 'Not yet opened' ? 'bg-bl-primary-alt2' : 'bg-neutral-800'} text-white text-md text-center h-16`} >
            <td className=''>
                <div className='relative flex items-center justify-center'>
                    <button type="checkbox" id='check-box-1' onClick={checked} className={`${isChecked && 'bg-bl-primary'} appearance-none h-7 w-7 border-2 border-bl-primary rounded-sm`}>
                        {isChecked && <img src="/images/mail/check.svg" alt="" className='' />}
                    </button>
                </div>
            </td>
            <td className='font-light'>{props.date}</td>
            <td className='font-bold'>{props.id}</td>
            <td className='font-light'>{props.type}</td>
            <td className='text-bl-secondary'>{props.status}</td>
            <td className='font-light'>{props.description}</td>
            <td>
                <button onClick={openMailPopup} className='p-3'>
                    <img src="/images/mail/ic_click_mail.svg" alt="" />
                </button>
            </td>
        </tr>
    )
}

const MailPagination = (props) => {
    return (
        <ul className='flex list-style-none items-center justify-center py-12 bg-bl-darker gap-1'>
            <PageArrow dir='left' />
            <PageNum selected={true} number={'1'} />
            <PageNum number={'2'} />
            <PageNum number={'3'} />
            <PageNum number={'...'} />
            <PageNum number={'32'} />
            <PageArrow dir='right' />
        </ul>
    )
}

const PageArrow = (props) => {
    return (
        <li>
            <a href="#" className="h-10 w-10 rounded-md bg-gradient-to-t from-bl-dark to-bl-hilight-dark flex items-center justify-center">
                {props.dir == 'left' ?
                    <img src="/images/mail/left_arrow.svg" alt="" />
                    :
                    <img src="/images/mail/right_arrow.svg" alt="" />
                }
            </a>
        </li>
    )
}

const PageNum = (props) => {
    return (
        <>
            {props.selected ?
                <li>
                    <a href="#" className="h10 w-10 text-bl-primary text-2xl font-bold flex items-center justify-center">
                        {props.number}
                    </a>
                </li>
                :
                <li>
                    <a href="#" className="h10 w-10 text-white flex items-center justify-center">
                        {props.number}
                    </a>
                </li>
            }
        </>
    )
}

const DeleteMailDialog = (props) => {
    return (
        <Dialog
            open={props.isOpen}
            onClose={() => props.setIsOpen(false)}
            className={''}
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/80 z-10" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                <Dialog.Panel className="relative max-w-md pb-8 rounded bg-black">
                    <Dialog.Title className={'bg-gradient-to-b from-bl-hilight-dark to-bl-dark text-white font-bold h-12 flex items-center justify-center'}>
                        <p>DELETE MAILS</p>
                        <button onClick={() => props.setIsOpen(false)} className='w-8 h-8 bg-gradient-to-b from-bl-hilight to-bl-darker rounded-md absolute right-2 flex items-center justify-center'>
                            <img src="/images/mail/close.svg" alt="" className='w-4 h-4' />
                        </button>
                    </Dialog.Title>
                    <Dialog.Description className={'text-white p-10 text-center'}>
                        Are you sure you want to remove 18 mails from your inbox? Once confirm, this cannot be undo.
                    </Dialog.Description>


                    <div className='flex flex-col items-center gap-5 justify-center'>
                        <button onClick={() => props.setIsOpen(false)} className='border-bl-primary border-3 h-10 w-36 bg-bl-hilight text-white rounded-md hover:bg-bl-hilight-dark transition duration-300'>REMOVE ALL</button>
                        <button onClick={() => props.setIsOpen(false)} className='border-bl-primary border-3 h-10 w-36 bg-bl-dark text-white rounded-md hover:bg-bl-darker transition duration-300'>CANCEL</button>
                    </div>
                </Dialog.Panel>

            </div>
        </Dialog>
    )
}

const MailDialog = (props) => {
    return (
        <Dialog
            open={props.isMailOpen}
            onClose={() => props.setIsMailOpen(false)}
            className={''}
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/80 z-10" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-y-0 right-40 flex items-center justify-center p-4 z-50">
                <Dialog.Panel className="relative max-w-5xl pb-8 rounded bg-black">

                    {/* <div className='flex items-center gap-1 py-6 bg-gradient-to-b from-bl-hilight-dark to-bl-dark pl-6 h-16 border-l-6 border-bl-secondary'>
                                <p className='text-white font-bold text-sm'>INBOX</p><p className='text-white font-normal'>({mail})</p>
                            </div> */}


                    <Dialog.Title className={'bg-gradient-to-b from-bl-hilight-dark to-bl-dark text-white font-bold h-14 border-l-6 border-bl-secondary flex items-center justify-center'}>
                        <button onClick={() => props.setIsMailOpen(false)} className='w-10 h-10 bg-gradient-to-b from-bl-hilight to-bl-hilight-dark rounded-md absolute left-5 flex items-center justify-center'>
                            <img src="/images/mail/left_arrow.svg" alt="" className='w-4 h-4' />
                        </button>
                        <p>Dear sir/madam Design faster with Eclipse dashboard system for Figma</p>
                        <button onClick={() => props.setIsMailOpen(false)} className='w-8 h-8 bg-gradient-to-b from-bl-hilight to-bl-darker rounded-md absolute right-2 flex items-center justify-center'>
                            <img src="/images/mail/close.svg" alt="" className='w-4 h-4' />
                        </button>
                    </Dialog.Title>
                    <Dialog.Description className={'text-white p-10 space-y-6'}>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-10'>
                                <p className='font-bold'>Kumachan</p>
                                <p>05-01-2022</p>
                                <p>DX3340K</p>
                                <p className='font-light'>Account</p>
                                <p className='text-bl-secondary font-light'>Sent</p>
                            </div>
                            <button onClick={() => props.setIsMailOpen(false)} className='w-8 h-8 bg-gradient-to-b from-bl-hilight to-bl-darker rounded-md flex items-center justify-center'>
                                <img src="/images/mail/ic_remove_mail.svg" alt="" className='w-4 h-4' />
                            </button>
                        </div>
                        <p className='font-light'>If you're working on a team and need to collaborate on more than three files, upgrading to our Professional plan may be for you.</p>
                        <div className="border-b w-full border-neutral-500"></div>
                        <div className='flex items-center gap-10'>
                            <p className='font-bold'>Battlelab support</p>
                            <p>07-01-2022</p>
                            <p>DX3340K</p>
                            <p className='font-light'>Account</p>
                            <p className='text-bl-secondary font-light'>Reviewing</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum saepe perspiciatis unde dolore dicta esse, eius ab temporibus et odio ea exercitationem iusto rem asperiores nulla, voluptatum porro vel repudiandae?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum saepe perspiciatis unde dolore dicta esse, eius ab temporibus et odio ea exercitationem iusto rem asperiores nulla, voluptatum porro vel repudiandae?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum saepe perspiciatis unde dolore dicta esse, eius ab temporibus et odio ea exercitationem iusto rem asperiores nulla, voluptatum porro vel repudiandae?</p>

                    </Dialog.Description>


                    {/* <div className='flex flex-col items-center gap-5 justify-center'>
                        <button onClick={() => props.setIsMailOpen(false)} className='border-bl-primary border-3 h-10 w-36 bg-bl-hilight text-white rounded-md'>REMOVE ALL</button>
                        <button onClick={() => props.setIsMailOpen(false)} className='border-bl-primary border-3 h-10 w-36 bg-bl-dark text-white rounded-md'>CANCEL</button>
                    </div> */}
                </Dialog.Panel>

            </div>
        </Dialog>
    )
}

const RewardMailDialog = (props) => {
    return (
        <Dialog
            open={props.isMailOpen}
            onClose={() => props.setIsMailOpen(false)}
            className={'z-50'}
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/80 z-10" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-y-0 right-40 flex items-center justify-center p-4 z-50">
                <Dialog.Panel className="relative max-w-5xl pb-8 rounded bg-black">

                    {/* <div className='flex items-center gap-1 py-6 bg-gradient-to-b from-bl-hilight-dark to-bl-dark pl-6 h-16 border-l-6 border-bl-secondary'>
                                <p className='text-white font-bold text-sm'>INBOX</p><p className='text-white font-normal'>({mail})</p>
                            </div> */}


                    <Dialog.Title className={'bg-gradient-to-b from-bl-hilight-dark to-bl-dark text-white font-bold h-14 border-l-6 border-bl-secondary flex items-center justify-center'}>
                        <button onClick={() => props.setIsMailOpen(false)} className='w-10 h-10 bg-gradient-to-b from-bl-hilight to-bl-hilight-dark rounded-md absolute left-5 flex items-center justify-center'>
                            <img src="/images/mail/left_arrow.svg" alt="" className='w-4 h-4' />
                        </button>
                        <p>You got a reward!</p>
                        <button onClick={() => props.setIsMailOpen(false)} className='w-8 h-8 bg-gradient-to-b from-bl-hilight to-bl-darker rounded-md absolute right-2 flex items-center justify-center'>
                            <img src="/images/mail/close.svg" alt="" className='w-4 h-4' />
                        </button>
                    </Dialog.Title>
                    <Dialog.Description className={'text-white p-10 space-y-6'}>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-10'>
                                <p className='font-bold'>Battlelab</p>
                                <p>07-01-2022</p>
                                <p>DX3340K</p>
                                <p className='font-light'>Account</p>
                                <p className='text-bl-secondary font-light'>Reviewing</p>
                            </div>
                            <button onClick={() => props.setIsMailOpen(false)} className='w-8 h-8 bg-gradient-to-b from-bl-hilight to-bl-darker rounded-md flex items-center justify-center'>
                                <img src="/images/mail/ic_remove_mail.svg" alt="" className='w-4 h-4' />
                            </button>
                        </div>
                        <p className='text-lg uppercase'>New season starting</p>
                        <p className='font-light'>You reached the following Rank in the Arena's last season.</p>
                        <div className="flex items-center gap-8 justify-center py-8">
                            <div className="w-24 h-24 bg-bl-dark"></div>
                            <div className="w-24 h-24 bg-bl-dark"></div>
                            <div className="w-24 h-24 bg-bl-dark"></div>
                            <div className="w-24 h-24 bg-bl-dark"></div>
                        </div>
                    </Dialog.Description>


                    <div className='flex flex-col items-center gap-5 justify-center'>
                        <button onClick={() => props.setIsMailOpen(false)} className='border-bl-primary border-3 h-10 w-36 bg-bl-hilight hover:bg-bl-hilight-dark text-white rounded-md transition duration-300'>CONFIRM</button>
                    </div>
                </Dialog.Panel>

            </div>
        </Dialog>
    )
}

export default Mail