import BorderButton from './borderbutton'

const Archievement = (props) => {
    return (
        <div className="bg-bl-darker">
            <div className="mx-auto max-w-screen-2xl pb-14 md:pb-0">
                <div className="grid grid-cols-1 md:grid-cols-5 items-center">
                    <div className='md:col-span-2 space-y-10 pl-6 pr-6 md:pl-12 md:pr-0'>
                        <p className='text-2xl md:text-5xl text-white font-bold'>
                            Various archievement to unlock!
                        </p>
                        <p className='text-white text-center md:text-left'>
                            Making new friends, join clan that play the same games, chat with people around the world and invite your friend to play the match with you!
                        </p>
                        {/* <BorderButton label={"GO TO MY PROFILE"} /> */}
                    </div>
                    <div className='hidden md:block md:col-span-3'>
                        <img src="/images/aboutus/feature3.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Archievement