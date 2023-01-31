import BorderButton from './borderbutton'

const WhereTOBUY = (props) => {
    return (
        <div className="bg-bl-darker">
            <div className="mx-auto max-w-screen-2xl">
                <div className="grid grid-cols-5 items-center">
                    <div className='col-span-2 space-y-10 pl-12'>
                        <p className='text-5xl text-white font-bold'>
                            {/* Various WhereTOBUY to unlock! */}
                            where to buy

                        </p>
                        <p className='text-white'>
                            {/* Making new friends, join clan that play the same games, chat with people around the world and invite your friend to play the match with you! */}
                            CEO suit will be available on OpenSea 
                        </p>
                        <button className='flex w-40 justify-between bg-bl-primary hover:bg-bl-primary-dark px-10 py-5 rounded-lg text-xl font-bold text-white transition duration-300'>
                                    Buy Now
                        </button>
                        {/* <BorderButton label={"GO TO MY PROFILE"} /> */}
                    </div>
                    <div className='col-span-3'>
                        <img src="/images/nfts/OpenSea.png" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhereTOBUY