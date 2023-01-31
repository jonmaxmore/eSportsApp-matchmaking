const Headline = (props) => {
    return (
        <div className='flex flex-col items-center space-y-10 p-10'>
            <div className='flex flex-col items-center'>
                <div className="flex gap-3">
                    {/* <img src="/images/aboutus/ic_play_battlelab.svg" alt="" className='w-10 h-10' /> */}
                    <p className='text-3xl font-bold text-center text-white'>{props.headline1}</p>
                </div>
                <p className='text-5xl font-bold text-center mt-5 text-white'>{props.headline2}</p>
            </div>
            <p className='text-white text-center'>{props.subtitle}</p>
        </div>
    )
}

const CEOFace = (props) => {
    return (
        <div className='bg-black'>
            <div className="mx-auto max-w-screen-2xl py-28 px-14">
                <div className="grid grid-cols-2 items-center">
                    <Headline headline1={"COLLECT 5 TYPES OF CEO SUIT TO REDEEM LEGENDARY NFT!"} headline2={"CEo Face"} subtitle={"5 NFTs to unlock ceo suite full potential . The box contain the last Legendary NFT."} />
                    <div>
                        <img src="/images/nfts/question.png" alt="" />
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center -mt-16">
                    <div>
                        <img src="/images/nfts/Photo_2 extra(slide4).gif" alt="" />
                    </div>

                    {/* <Headline headline1={"BET WITH"} headline2={"CRYPTOCURRENCY"} subtitle={"Win to earn with your gaming skills. We aim to abolish the notion that only 1 Percent of gamers can make a living from playing video games. With the focus on creating a safe and secure platform where gamers can earn without fear of being scammed or cheated."} /> */}
                    <Headline headline1={"Battlelab CEO"} subtitle={`" I'm a casual gamer seeking a competitive challenge and higher competition  that comes with justice which will treat to all gamer as familly."  - Battlelab CEO`} />

                </div>
            </div>
        </div>
    )
}

export default CEOFace