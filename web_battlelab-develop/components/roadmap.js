import BorderButton from './borderbutton'

const RoadMapActivation = (props) => {
    return (
        <div className="bg-bl-darker">
            <div className="mx-auto max-w-screen-2xl">
                <div className="grid grid-cols-5 items-center">
                    <div className='col-span-2 space-y-10 pl-12'>
                        <p className='text-5xl text-white font-bold'>
                            {/* Join Battlelab Community */}ROADMAP ACTIVATIONS
                        </p>
                        <p className='text-white'>
                            Making new friends, join clan that play the same games, chat with people around the world and invite your friend to play the match with you!
                        </p>
                        {/* <BorderButton label={"GO TO MY FEED"} /> */}
                    </div>
                    <div className='col-span-3'>
                        <img src="/images/nfts/timeline.png" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoadMapActivation