const Headline = (props) => {
    return (
        <div className='flex flex-col items-center space-y-10 p-10'>
            <div className='flex flex-col items-center'>
                <div className="flex gap-3">
                    <img src="/images/aboutus/ic_play_battlelab.svg" alt="" className='w-10 h-10' />
                    <p className='text-4xl font-bold text-white'>{props.headline1}</p>
                </div>
                <p className='text-4xl font-bold text-white'>{props.headline2}</p>
            </div>
            <p className='text-white text-center'>{props.subtitle}</p>
        </div>
    )
}

const WhatisCEO = (props) => {
    return (
        <div className='bg-black'>
            <div className="mx-auto max-w-screen-2xl py-28 px-14">
                <div className="grid grid-cols-2 items-center">

                    {/* <Headline headline1={"ULTIMATE PLATFORM"} headline2={"FOR E-SPORT"} subtitle={"Battlelab is creating a platform where people from all over the world can compete with each other in their favorite competitive online games for cryptocurrency. The stakes are real, the winnings are real, players will have to put in all their effort into each game they play, making each game more exciting, more exhilarating and a more authentic experience.  We aim to revolutionize the gaming industry while also strengthening the Esports community and we want gamers of all levels both amateurs and experienced ones, to be a part of it."} /> */}
                    <Headline headline1={"What is CEO suit?"} subtitle={"Battlelab's first nft collection generating a sharing profit with owners all owners will be involved in our projects and received many special awards."} />

                    <div>
                        <img src="/images/nfts/Photo_1(slide4).png" alt="" />
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

export default WhatisCEO