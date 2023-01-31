import { useState, useEffect, useReducer, forwardRef } from 'react'
import Link from 'next/link'
import LanguageDropdown from "./CommonForBoth/TopbarDropdown/LanguageDropdown";
import { withTranslation } from "react-i18next"
import { Menu } from '@headlessui/react'

import UserAPI from '../pages/api/UserAPI';
import { useRouter } from "next/router"
import { Token } from '../Token';

const Header = (props) => {
    const router = useRouter();

    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            isLogin: false,
            name: "",
            avtarName: "",
            img_url: "",
            level: 0
        }
    );

    useEffect(() => {
        getUserDetail();
    }, []);

    const getUserDetail = () => {
        UserAPI.getUserDetail()
            .then(res => {
                if (res.data.success) {
                    setState({
                        isLogin: true,
                        name: res.data.user.name,
                        avtarName: res.data.user.avatar_unique_name,
                        img_url: res.data.user.avatar_image,
                        level: res.data.user.level
                    })
                }
            }).catch(err => {
                // console.log(err)
            })
    }

    const logouthandler = () => {
        Token.clearStorage();
        router.push("/loginpage")
    }


    return (
        <div className='bg-bl-dark'>
            <div className='flex h-28 items-center justify-between mx-auto max-w-screen-2xl px-4 sm:px-4 lg:px-6 '>
                <Link href='/' passHref>
                    <a><img src="/images/home/battlelab_logo.svg" alt="BattleLab Logo" className='w-64 ml-4' /></a>
                </Link>
                {/* <Link href="" passHref>
                    <a>
                        <h1 className="text-lg font-bold text-white hover:text-bl-primary p-1 rounded-lg transition duration-300">{props.t("Game")}</h1>
                    </a>
                </Link>
                <Link href="" passHref>
                    <a>
                        <h1 className="text-lg font-bold text-white hover:text-bl-primary p-1 rounded-lg">{props.t("Social")}</h1>
                    </a>
                </Link>
                <Link href="" passHref>
                    <a>
                        <h1 className="text-lg font-bold text-white hover:text-bl-primary p-1 rounded-lg transition duration-300">{props.t("Chat")}</h1>
                    </a>
                </Link>
                <Link href="" passHref>
                    <a>
                        <h1 className="text-lg font-bold text-white hover:text-bl-primary p-1 rounded-lg transition duration-300">{props.t("Market")}</h1>
                    </a>
                </Link> */}
                <Link href="/aboutus" passHref>
                    <a>
                        <h1 className="text-lg font-bold text-white hover:text-bl-primary p-1 rounded-lg transition duration-300">{props.t("About us")}</h1>
                    </a>
                </Link>
                <Link href="/nfts" passHref>
                    <a>
                        <h1 className="text-lg font-bold text-white hover:text-bl-primary p-1 rounded-lg transition duration-300">{props.t("NFT's")}</h1>
                    </a>
                </Link>
                <Link href="/contact" passHref>
                    <a>
                        <h1 className="text-lg font-bold text-white hover:text-bl-primary p-1 rounded-lg transition duration-300">{props.t("Contact")}</h1>
                    </a>
                </Link>

                <Link href="/aboutus" passHref>
                    <a className="flex items-center gap-5 border-2 border-bl-primary text-white hover:text-bl-primary bg-bl-hilight hover:border-bl-primary-dark hover:bg-bl-hilight-dark px-4 py-1 rounded-md transition duration-300">
                        <img src="/images/home/ic_install.svg" alt="install" />
                        <p className='text-md font-bold'>INSTALL</p>
                    </a>
                </Link>
                <div className="border-l border-white h-20"></div>
                <div className='flex items-center gap-5'>
                   
                    {state.isLogin ? 
                        <div className='flex items-center p-1 rounded-lg gap-4 text-white hover:text-bl-primary transition duration-300'>
                        <img src="/images/home/ic_login.svg" alt="login" />
                        <button onClick={() => { logouthandler() }} className='text-white text-lg font-bold'>{state.avtarName}</button>
                        </div> :  
                        <Link href="/loginpage">
                        <a className="flex items-center p-1 rounded-lg gap-4 text-white hover:text-bl-primary transition duration-300">
                            <img src="/images/home/ic_login.svg" alt="login" />
                            <p className='text-lg font-bold'>Login</p>
                        </a>
                        </Link>}


                            {/* <Notification /> */}

                    {/* <Menu as="div" className="relative inline-block text-left z-50">
                        <div>
                            <Menu.Button className={"flex items-center px-2 py-1 gap-2 rounded-md bg-bl-dark hover:bg-bl-hilight-dark border border-bl-primary text-white hover:text-bl-primary transition duration-300"}>
                                <img src="/images/home/ic_flag_english.svg" alt="English Flag" />
                                <p className='text-md font-bold '>ENG</p>
                                <img src="/images/home/ic_dropdown.png" alt="drop down icon" className='w-3' />
                            </Menu.Button>
                        </div>
                        <Menu.Items className={"absolute bg-bl-hilight w-44 rounded-md top-0 right-0 mt-9 flex flex-col overflow-hidden divide-y divide-bl-hilight-dark"}>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        className={`${active ? 'bg-bl-primary text-black' : 'text-white'
                                            } flex py-2 px-4 items-center gap-2`}
                                        href="#"
                                    >
                                        <img src="/images/home/ic_flag_english.svg" alt="English Flag" />
                                        English
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        className={`${active ? 'bg-bl-primary text-black' : 'text-white'
                                            } flex py-2 px-4 items-center gap-2`}
                                        href="#"
                                    >
                                        <img src="/images/home/thailand.png" alt="Thailand Flag" style={{ width:'14%'}} />
                                        Thailand
                                    </a>
                                )}
                            </Menu.Item>

                        </Menu.Items>
                    </Menu> */}
                    {/* <LanguageDropdown /> */}
                </div>

                {/* </div> */}
                {/* <div className='flex items-center gap-2'>
                    {
                        !account && (
                            <button className='flex items-center bg-orange-500 hover:bg-orange-600 rounded-xl px-3 h-10 text-white transition duration-300' onClick={connectWallet}><FontAwesomeIcon icon='fa fa-wallet' className='pr-2' /><p className='flex'>Connect Wallet</p></button>
                        )
                    }
                    {
                        account && (
                            <>
                                <p>{balance} BNB</p>
                                <button className='flex items-center gap-2 bg-slate-700 hover:bg-slate-800 rounded-xl px-3 py-2 transition duration-300'>
                                    <p className='text-base text-white'>{shortenHex(account, 4)}</p>
                                    <Jazzicon diameter={24} seed={jsNumberForAddress(account)} />
                                </button>
                            </>

                        )
                    }
                </div> */}
            </div>
            <div className="flex md:hidden h-14 items-center justify-between px-4">
                <Menu>
                    <Menu.Button>
                        <div>
                            <img src="/images/home/ic_hamburger.svg" alt="hamburger menu" className='' />
                        </div>
                    </Menu.Button>
                    <Menu.Items className={'absolute flex flex-col justify-between w-full h-full bg-bl-dark text-white text-right text-xl font-bold left-0 top-0 z-50'}>
                        <div className='flex flex-col'>
                            <Menu.Item>
                                <div className='h-14 bg-bl-dark flex items-center justify-between px-4'>
                                    <img src="/images/home/ic_close_hamburger_menu.svg" alt="" className='h-6' />
                                    <img src="/images/home/battlelab_logo.svg" alt="BattleLab Logo" className='h-6' />
                                    <div className='h-6 w-6'></div>
                                </div>
                            </Menu.Item>
                            {state.isLogin &&
                                <Menu.Item>
                                    <div className='flex gap-4 px-5 py-2'>
                                        <div className="w-16 h-24 bg-bl-dark border-3 border-bl-hilight rounded-xl flex items-center justify-center">
                                            <img src="/images/home/female_cha.png" alt="" className='h-20' />
                                        </div>
                                        <div className='flex flex-col justify-between'>
                                            {/* <div className='flex items-center gap-2'> */}
                                            {/* <p className='text-white font-bold text-left'>username</p> */}
                                            {/* </div> */}
                                            <div className='border-b'></div>
                                            <div className='flex items-center gap-5'>
                                                <div className='bg-bl-hilight-dark h-11 px-4 rounded-md flex items-center gap-2'>
                                                    <p className='text-bl-primary text-xs font-bold'>9,999,999 BLC</p>
                                                    <p className='bg-bl-primary text-white text-lg w-6 h-6 flex item-center justify-center rounded-sm'>
                                                        <img src="images/home/ic_plus.svg" alt="" className='p-1.5' />
                                                    </p>
                                                </div>

                                                <button className='relative text-white w-11 h-11 bg-gradient-to-b from-slate-700 to-slate-800 rounded-md'>
                                                    <img src="/images/header/ic_mail.svg" alt="" />
                                                    <div className='absolute top-1 right-1 text-xs text-white bg-red-600 w-4 h-4 rounded-full font-bold flex items-center justify-center'>3</div>
                                                </button>
                                                <button className='relative text-white w-11 h-11 bg-gradient-to-b from-slate-700 to-slate-800 rounded-md'>
                                                    <img src="/images/header/ic_notification.svg" alt="" />
                                                    <div className='absolute top-1 right-1 text-xs text-white bg-red-600 w-4 h-4 rounded-full font-bold flex items-center justify-center'>3</div>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </Menu.Item>
                            }
                            {state.isLogin &&
                                <Menu.Item>
                                    {({ active }) => (
                                        <MyLink href="#">
                                            <div
                                                className={`${active && 'bg-bl-primary'} py-4 px-5 border-b border-gray-600`}
                                            >
                                                <div className='flex items-center gap-3 justify-end'>
                                                    Manage Profile
                                                    <img src="/images/home/ic_dropdown_name.svg" alt="" />
                                                </div>
                                            </div>
                                        </MyLink>
                                    )}
                                </Menu.Item>
                            }
                            <Menu.Item>
                                {({ active }) => (
                                    <MyLink href="/">
                                        <div
                                            className={`${active && 'bg-bl-primary'} py-4 px-5 border-b border-gray-600`}
                                        >
                                            Home
                                        </div>
                                    </MyLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <MyLink href="#">
                                        <div
                                            className={`${active && 'bg-bl-primary'} py-4 px-5 border-b border-gray-600`}
                                        >
                                            Game
                                        </div>
                                    </MyLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <MyLink href="#">
                                        <div
                                            className={`${active && 'bg-bl-primary'} py-4 px-5 border-b border-gray-600`}
                                        >
                                            Social
                                        </div>
                                    </MyLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <MyLink href="/">
                                        <div
                                            className={`${active && 'bg-bl-primary'} py-3 px-5 border-b border-gray-600`}
                                        >
                                            Chat
                                        </div>
                                    </MyLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <MyLink href="/market">
                                        <div
                                            className={`${active && 'bg-bl-primary'} py-4 px-5 border-b border-gray-600`}
                                        >
                                            <div className='flex items-center gap-3 justify-end'>
                                                Market
                                                <img src="/images/home/ic_dropdown_name.svg" alt="" />
                                            </div>
                                        </div>
                                    </MyLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <MyLink href="/aboutus">
                                        <div
                                            className={`${active && 'bg-bl-primary'} py-4 px-5 border-b border-gray-600`}
                                        >
                                            About Us
                                        </div>
                                    </MyLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <MyLink href="/contact">
                                        <div
                                            className={`${active && 'bg-bl-primary'} py-4 px-5 border-b border-gray-600`}
                                        >
                                            Contact
                                        </div>
                                    </MyLink>
                                )}
                            </Menu.Item>
                        </div>
                        <Menu.Item>
                            <div className='flex flex-col space-y-6 mb-8 bg-bl-dark'>
                                <MyLink href="/installation">
                                    <div className='border-3 border-bl-primary rounded-lg py-3 mx-6'>
                                        <div className='flex gap-4 items-center justify-center'>
                                            <img src="/images/home/ic_install.svg" alt="" className='w-7' />
                                            <p className='text-base'>
                                                INSTALL
                                            </p>
                                        </div>
                                    </div>
                                </MyLink>
                                <MyLink href="/loginpage">
                                    <div className='border-3 border-bl-primary bg-bl-primary text-center rounded-lg py-3 mx-6'>
                                        <div className='flex gap-4 items-center justify-center'>
                                            <img src="/images/home/ic_login.svg" alt="" className='w-7' />
                                            <p className='text-base'>
                                                LOGIN
                                            </p>
                                        </div>
                                    </div>
                                </MyLink>
                            </div>
                        </Menu.Item>
                    </Menu.Items>
                </Menu>

                <Link href='/'>
                    <a><img src="/images/home/battlelab_logo.svg" alt="BattleLab Logo" className='w-[150px]' /></a>
                </Link>
                <div className='border border-bl-primary p-1 rounded-sm flex items-center gap-3'>
                    <img src="/images/home/ic_flag_english.svg" alt="flag" className='h-[16px]' />
                    <img src="/images/home/ic_dropdown.svg" alt="dropdown" className='h-[6px]' />
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(Header)

const MyLink = forwardRef((props, ref) => {
    let { href, children, ...rest } = props
    return (
        <Link href={href}>
            <a ref={ref} {...rest}>
                {children}
            </a>
        </Link>
    )
})

MyLink.displayName = 'MyLink';


const LoginSection = (props) => {
    return (
        <div className='flex items-center gap-5'>
            <Link href="/loginpage">
                <a className="flex items-center p-1 rounded-lg gap-4 text-white hover:text-bl-primary transition duration-300">
                    <img src="/images/home/ic_login.svg" alt="login" />
                    <p className='text-lg font-bold'>Login</p>
                </a>
            </Link>
            <Menu as="div" className="relative inline-block text-left z-10">
                <div>
                    <Menu.Button className={"flex items-center px-2 py-1 gap-2 rounded-md bg-bl-dark hover:bg-bl-hilight-dark border border-bl-primary text-white hover:text-bl-primary transition duration-300"}>
                        <img src="/images/home/ic_flag_english.svg" alt="English Flag" />
                        <p className='text-md font-bold '>ENG</p>
                        <img src="/images/home/ic_dropdown.png" alt="drop down icon" className='w-3' />
                    </Menu.Button>
                </div>
                <Menu.Items className={"absolute bg-bl-hilight w-44 rounded-md top-0 right-0 mt-9 flex flex-col overflow-hidden divide-y divide-bl-hilight-dark"}>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active ? 'bg-bl-primary text-black' : 'text-white'
                                    } flex py-2 px-4 items-center gap-2`}
                                href="#"
                            >
                                <img src="/images/home/ic_flag_english.svg" alt="English Flag" />
                                English
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active ? 'bg-bl-primary text-black' : 'text-white'
                                    } flex py-2 px-4 items-center gap-2`}
                                href="#"
                            >
                                <img src="/images/home/thailand.png" alt="English Flag" style={{ width: '14%' }} />
                                Thai
                            </a>
                        )}
                    </Menu.Item>

                </Menu.Items>
            </Menu>
        </div>
    )
}

const Notification = (props) => {
    return (
        <Menu>
            <Menu.Button className={'text-white w-11 h-11 bg-gradient-to-b from-slate-700 to-slate-800 rounded-md'}>
                <img src="/images/header/ic_notification.svg" alt="" />
                <div className='absolute top-1 right-1 text-xs text-white bg-red-600 w-4 h-4 rounded-full font-bold flex items-center justify-center'>3</div>
            </Menu.Button>
            <Menu.Items className={'absolute right-0 top-[54px] w-[611px] z-50'}>
                <Menu.Item>
                    <div className='bg-gradient-to-b from-bl-hilight-dark to-bl-dark text-white font-bold h-[85px] border-l-6 border-bl-secondary flex items-center justify-start gap-6 pl-6'>
                        <img src="/images/home/ic_notification_header.svg" alt="" />
                        <p>NOTIFICATION</p>
                        <Menu.Button className={'w-[50px] h-[50px] bg-bl-hilight rounded-md absolute right-2 flex items-center justify-center'}>
                            {/* <button className='w-[50px] h-[50px] bg-bl-hilight rounded-md absolute right-2 flex items-center justify-center'> */}
                            <img src="/images/mail/close.svg" alt="" className='w-4 h-4' />
                            {/* </button> */}
                        </Menu.Button>
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <NotificationCell />
                </Menu.Item>
                <Menu.Item>
                    <NotificationCell />
                </Menu.Item>
                <Menu.Item>
                    <NotificationCell />
                </Menu.Item>
                <Menu.Item>
                    <NotificationCell />
                </Menu.Item>
                <Menu.Item>
                    <div className='bg-bl-primary-bg hover:bg-bl-hilight text-bl-secondary py-6 text-center text-sm font-bold transition duration-300'>
                        CLEAR ALL NOTIFICATIONS
                    </div>
                </Menu.Item>
                {/* <Menu.Item>
                    {({ active }) => (
                        <a
                            className={`${active && 'bg-blue-500'}`}
                            href="/account-settings"
                        >
                            Account settings
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            className={`${active && 'bg-blue-500'}`}
                            href="/account-settings"
                        >
                            Documentation
                        </a>
                    )}
                </Menu.Item> */}
            </Menu.Items>
        </Menu>
    )
}

const NotificationCell = (props) => {
    return (
        <div className='bg-bl-primary-bg pb-6 border-b border-b-gray-600'>
            <div className='flex items-baseline gap-6 p-6'>
                <div className=''>
                    <img src="/images/mail/close.svg" alt="" className='w-4 h-4' />
                </div>
                <p className='text-white font-bold'>
                    SolidXSnake invited you for a 5vs5 Leauge of legend match for 5 $. Respond now!
                </p>
                <p className='text-gray-500 w-24'>Just now</p>
            </div>
            <div className='flex gap-6 justify-center'>
                <AcceptButton />
                <DeclineButton />
            </div>
        </div>
    )
}

const AcceptButton = (props) => {
    return (
        <div className='w-56 py-2 bg-bl-hilight hover:bg-bl-primary-darker border-3 border-bl-primary rounded-sm text-white text-md text-center transition duration-300'>
            ACCEPT
        </div>
    )
}

const DeclineButton = (props) => {
    return (
        <div className='w-56 py-2 bg-bl-dark hover:bg-bl-primary-darker border-3 border-bl-primary rounded-sm text-white text-md text-center transition duration-300'>
            DECLINE
        </div>
    )
}
// const NotificationDialog = (props) => {
//     return (
//         <Dialog
//             open={props.showNotification}
//             onClose={() => props.setShowNotification(false)}
//             className={''}
//         >
//             {/* The backdrop, rendered as a fixed sibling to the panel container */}
//             {/* <div class="fixed inset-0 bg-black/80 z-10" aria-hidden="true" /> */}

//             {/* Full-screen container to center the panel */}
//             <div class="absolute top-0 right-0 border items-center justify-center z-50">
//                 <Dialog.Panel className="relative max-w-md pb-8 rounded bg-black">
//                     <Dialog.Title className={'bg-gradient-to-b from-bl-hilight-dark to-bl-dark text-white font-bold h-14 border-l-6 border-bl-secondary flex items-center justify-center'}>
//                         <p>DELETE MAILS</p>
//                         <button onClick={() => props.setShowNotification(false)} className='w-8 h-8 bg-gradient-to-b from-bl-hilight to-bl-darker rounded-md absolute right-2 flex items-center justify-center'>
//                             <img src="/images/mail/close.svg" alt="" className='w-4 h-4' />
//                         </button>
//                     </Dialog.Title>
//                     <Dialog.Description className={'text-white p-10 text-center'}>
//                         Are you sure you want to remove 18 mails from your inbox? Once confirm, this cannot be undo.
//                     </Dialog.Description>


//                     <div className='flex flex-col items-center gap-5 justify-center'>
//                         <button onClick={() => props.setShowNotification(false)} className='border-bl-primary border-3 h-10 w-36 bg-bl-hilight text-white rounded-md hover:bg-bl-hilight-dark transition duration-300'>REMOVE ALL</button>
//                         <button onClick={() => props.setShowNotification(false)} className='border-bl-primary border-3 h-10 w-36 bg-bl-dark text-white rounded-md hover:bg-bl-darker transition duration-300'>CANCEL</button>
//                     </div>
//                 </Dialog.Panel>
//             </div>
//         </Dialog>
//     )
// }