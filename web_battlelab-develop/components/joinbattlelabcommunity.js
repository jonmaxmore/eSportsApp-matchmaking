import BorderButton from './borderbutton'

const JoinBattleLabCommunity = (props) => {
    return (
        <div className="bg-bl-darker">
            <div className="mx-auto max-w-screen-2xl pb-14 md:pb-0">
                <div className="grid grid-cols-1 md:grid-cols-5 items-center px-6 md:px-0">
                    <div className='md:col-span-2 space-y-10 md:pl-12'>
                        <p className='text-2xl md:text-5xl text-white font-bold text-center md:text-left'>
                            Join Battlelab Community
                        </p>
                        <div className='block md:hidden'>
                            <img src="/images/aboutus/feature1.svg" alt="" />
                        </div>
                        <p className='text-white text-center md:text-left'>
                            Making new friends, join clan that play the same games, chat with people around the world and invite your friend to play the match with you!
                        </p>
                        {/* <BorderButton label={"GO TO MY FEED"} /> */}
                    </div>
                    <div className='hidden md:block col-span-3'>
                        <img src="/images/aboutus/feature1.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JoinBattleLabCommunity