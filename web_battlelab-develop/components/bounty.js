import Link from 'next/link'
import Button from './button'
import BorderButton from './borderbutton'
import { Link as SmoothLink, animateScroll as scroll } from "react-scroll"

const Bounty = (props) => {
    return (
        <div className='bg-black'>
            <div className="mx-auto max-w-screen-2xl relative">
                <img src="/images/home/bl0.png" alt="" className='absolute top-0 -ml-16 h-[690px] z-10' />
                <img src="/images/home/bl1.png" alt="" className='absolute top-10 right-0 -mr-32 h-[680px] z-20' />
                <div className='flex justify-center space-y-8 pt-10 pb-20'>
                    <div className="w-1/2 space-y-8">
                        <h1 className='text-6xl text-white font-bold text-center'>Found any bugs?<br /> Become a Bounty Hunter!</h1>
                        <p className='text-xl text-white text-center'>It’s your chance to become our bounty hunter. Inform us about this problem with evidences. You help us solve this, go ahead and get plenty of rewards in your mailbox from us!</p>
                        <form className='flex flex-col z-50'>
                            <label htmlFor="username" className='text-white font-bold pb-3'>USERNAME</label>
                            <input type="text" name="username" className='bg-neutral-800 border-l-4 border-t-0 border-b-0 border-r-0 border-bl-secondary p-3' placeholder="Username" />
                            <label htmlFor="codeid" className='text-white font-bold pb-3 mt-6'>CODE ID</label>
                            <input type="text" name="codeid" className='bg-neutral-800 border-l-4 border-t-0 border-b-0 border-r-0 border-bl-secondary p-3' placeholder="Code ID" />
                            <label htmlFor="problem" className='text-white font-bold pb-3 mt-6 uppercase'>describe this BUG/Problem</label>
                            <input type="text" name="problem" className='bg-neutral-800 border-l-4 border-t-0 border-b-0 border-r-0 border-bl-secondary h-28 p-3' placeholder="What problems did you find on our platform?" />
                            <p className='text-white text-right mt-2'>We accpet only images (.png, .jpeg, .gif) and videos (.mp4, .mov)</p>
                            <div className='flex justify-end mt-4'>
                                <button className='text-white border-2 border-bl-primary rounded-md px-10 uppercase'>Attach a file…</button>
                            </div>
                        </form>
                        <div className='flex gap-6 justify-center'>
                            <Link href="/">
                                <a>
                                    <Button label={"SUBMIT THIS BOUNTY"} size={"large"} />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Bounty