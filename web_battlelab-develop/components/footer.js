import Link from 'next/link'
import ButtonSmall from './buttonsmall'

const Footer = () => {
    return (
        <div className='bg-bl-dark'>
            <div className='mx-auto max-w-screen-2xl py-8 md:py-16 px-6'>
                <div className="grid grid-cols-1 md:grid-cols-4 border-b gap-4">
                    <div className='flex flex-col md:hidden space-y-10'>
                        <div className='flex items-center justify-center'>
                            <img src="/images/home/LOGO-01.png" alt="BattleLab Logo" className='w-[240px] md:px-0' />
                        </div>
                        <p className='text-sm md:text-base text-white md:pl-[50px]'>Motto here is very important than the knowledge truely absolutely</p>
                    </div>
                    <div className='hidden md:block space-y-10'>
                        <img src="/images/home/LOGO-01.png" alt="BattleLab Logo" className='' />
                        <p className='text-sm md:text-base text-white md:pl-[50px]'>Motto here is very important than the knowledge truely absolutely</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-rows-3 md:grid-flow-col md:col-span-2 gap-8 md:gap-4 md:px-12 mt-2 md:mt-0'>
                        <Link href='/'>
                            <a className='text-white'>Help</a>
                        </Link>
                    </div>
                    <div className='flex flex-col space-y-10'>
                    <Link href='/contact' passHref>
                            <a className='text-white'>FAQs</a>
                        </Link>
                        <Link href='/contact' passHref>
                            <a className='text-white'>Contact Support</a>
                        </Link>
                        <Link href='/' passHref>
                            <a className='text-white'>About Us</a>
                        </Link>
                        {/* <Link href='/' passHref>
                            <a className='text-white'>Terms & Conditions</a>
                        </Link>
                        <Link href='/' passHref>
                            <a className='text-white'>Privacy Policy</a>
                        </Link> */}
                    </div>
                    <div className='space-y-6 pb-12 mt-12 md:mt-0'>
                        <p className='text-white font-bold text-lg text-center md:text-left'>Join our community</p>
                        <div className='flex justify-between'>
                            {/* <Link href=''>
                            <img src="/images/home/ic_ig.svg" alt="" />
                            </Link> */}
                            <a href='https://twitter.com/Battlelabgg?s=20&t=SnXgZjIzs1WADhQEcbUpjA' target={"_blank"} rel="noreferrer">
                            <img src="/images/home/ic_twitter_media.svg" alt="" className='w-10 pt-[3px]' />
                            </a>
                                {/* <Link href=''>
                                <img src="/images/home/ic_linkedin.svg" alt="" />
                                </Link> */}
                            <Link href='https://www.facebook.com/Battlelab.gg' passHref>
                                <img src="/images/home/ic_fb.svg" alt="" />
                            </Link>
                            <Link href='https://youtube.com/channel/UCa9cTNMaXZSMBX2K3M58UiQ' passHref>
                                <img src="/images/home/ic_youtube.svg" alt="" />
                            </Link>
                            {/* <Link href='https://discord.gg/DMPaa2HHKp'>
                                <img src="/images/home/ic_discord.svg" alt="" />
                            </Link> */}
                            <Link href='https://t.me/battlelabgg' passHref>
                                <img src="/images/home/ic_telegram.svg" alt="" />
                            </Link>
                        </div>
                        <p className='md:hidden text-white font-bold text-lg text-center md:text-left'>Subscribe to our newsletter</p>
                        <form className="border-2 border-bl-primary-alt flex justify-between items-center rounded-r-lg">
                            <input type="email" name="subscribe" className='bg-transparent pl-6 w-full' placeholder="Your e-mail address" />
                            <ButtonSmall label={"SUBSCRIBE"} />
                        </form>
                    </div>
                </div>
                <p className='text-white text-sm text-center py-6'>©2022 Battlelab. All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer