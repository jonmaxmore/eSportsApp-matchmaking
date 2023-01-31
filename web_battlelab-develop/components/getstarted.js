import Button from './button'

const GetStarted = () => {
    return (
        <div className="bg-black">
            <div className="mx-auto md:max-w-screen-2xl pt-8">
                <p className="text-2xl font-bold text-white md:hidden px-6">Connect your wallet and start matchmaking</p>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center px-6'>

                    {/* <div className='relative'> */}
                    {/* <div className='h-[320px] w-[367px] top-[430px] -ml-28 absolute rotate-12'> */}
                    <img src="/images/home/img_mascot.png" alt="" className='object-cover min-w-full min-h-full h-full' />
                    {/* </div> */}
                    {/* </div> */}
                    <div className='flex flex-col space-y-14 items-end'>
                        <p className="hidden md:block text-6xl font-bold text-white text-right">Connect your wallet and start matchmaking</p>
                        <p className='text-base md:text-2xl text-white text-left md:text-right'>Bet the amount you want to play your favorite game and let us do the work to find a team for you. Currency will be updated in real-time. If you win, you will get double the amount you bet!</p>
                        <div className='flex md:justify-end w-full'>
                            {/* <button className='bg-bl-primary px-10 py-5 rounded-lg text-xl font-bold text-white'>INSTALL NOW</button> */}
                            {/* <button className='bg-bl-hilight border-2 border-bl-primary px-10 py-5 rounded-lg text-xl font-bold text-white'>GET STARTED</button> */}
                            <Button label={"LEARN MORE ABOUT BATTLELAB"} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GetStarted