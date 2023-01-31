import BorderButton from './borderbutton'

const Benifit = (props) => {
    return (
        <div className="bg-bl-darker">
            <div className="mx-auto max-w-screen-2xl">
                <div className="grid grid-cols-5 items-center">
                    <div className='col-span-3'>
                        <img src="/images/nfts/benefit.jpg" alt="" />
                    </div>
                    <div className='col-span-2 space-y-10 pr-12 flex flex-col items-end'>
                        <p className='text-5xl text-white font-bold'>
                            {/* Customize avatar */} Benefit
                        </p>
                        <p className='text-white text-right'>
                        {/* Have a look at how your avatar is set, make changes and customize according to your style, mood or preference. */}
                        NFTs holder will be gain 3% profit each month from sharing pool
                        </p>
                        {/* <BorderButton label={"GO TO MY PROFILE"} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Benifit