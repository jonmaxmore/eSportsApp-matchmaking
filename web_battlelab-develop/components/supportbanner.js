import Link from 'next/link'
import Button from './button'
import BorderButton from './borderbutton'
import { Link as SmoothLink, animateScroll as scroll } from "react-scroll"
import ScrollIntoView from 'react-scroll-into-view'

const SupportBanner = (props) => {
    return (
        <div className='bg-black overflow-hidden'>
            <div className="bg-[url('/images/contact/contact_bg.png')] bg-cover bg-no-repeat bg-center">
                <div className="mx-auto max-w-screen-2xl px-6">
                    <div className='space-y-8 mt-20 mb-14 md:pt-40 md:pb-40'>
                        <h1 className='text-2xl md:text-6xl text-white font-bold text-center'>Battlelab Support</h1>
                        <p className='text-sm md:text-xl text-white md:px-40 md:text-center leading-loose md:leading-normal'>Make sure to check the FAQs for a quick solution for your issue because many common problems can already be resolved on your own. If you still have problems with your issue and couldn't find your solutions in the FAQ, please contact Battlelab support so we can help you fix your issues.</p>
                        <div className='hidden md:flex gap-6 justify-center'>
                            <ScrollIntoView selector="#faq_section">
                                <Button label={"CHECK FAQS"} size={"large"} />
                            </ScrollIntoView>
                            <Link href="/" passHref>
                                <a>
                                    <BorderButton label={"CONTACT SUPPORT"} size={"large"} />
                                </a>
                            </Link>
                        </div>
                        <div className='md:hidden space-y-8'>
                            <div>
                                <ScrollIntoView selector="#faq_section">
                                    <Button label={"CHECK FAQS"} />
                                </ScrollIntoView>
                            </div>
                            <div>
                                <Link href="/">
                                    <a>
                                        <BorderButton label={"CONTACT SUPPORT"} />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
} 

export default SupportBanner