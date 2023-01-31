import FeatureCard from './featurecard'

const Features = (props) => {
    return (
        <div className='bg-black overflow-hidden'>
            <div className="bg-[url('/images/home/img_main_bg_fix.png')] bg-cover bg-no-repeat bg-center px-6 py-14 md:px-8 lg:px-20 md:py-20 space-y-6">
                <h1 className="text-2xl md:text-5xl font-bold text-white text-center">Features</h1>
                <p className='text-base md:text-lg text-white text-left md:text-center'>We are constantly working on Battlelab to bring out the best experience for the users with new updates and features such as</p>
                <div className='grid grid-cols-2 md:grid-cols-3 justify-items-center'>
                <FeatureCard title={"CHAT SYSTEM"} description={"Players can chat with other players in channels such as World Chat, Personal Chat, Team Chat and Clan Chat."}/>
                    <FeatureCard title={"CLAN SYSTEM"} description={"Groups of players can join together and form their own Clan. Each Clan can set their own criteria for recruiting new members such as preferred language, skill level as determined by the clan leader. Clans will be ranked in the clan leaderboards to compete with other Clans."}/>
                    <FeatureCard title={"MATCHMAKING"} description={"Lets players compete with other players from all around the world. They can play alone or a team, but the platform’s algorithm groups players with teammates and opponents in accordance to their match making rating. All you need to do is just pick the game that you like to play and enjoy. Bring your competitive side and conquer the platform."}/>
                    <FeatureCard title={"MARKET"} description={"Players can conveniently buy or sell their NFT items on the Battlelab marketplace. Players can browse and discover the available items that are for sale on the marketplace. The Marketplace is a great way for players to acquire or earn in on their rare NFTs."}/>
                    <FeatureCard title={"RANKING"} description={"Everyone will be able to see their ranking and their rank will be published in real time. There will be several ranking boards, each leader board will be set apart by the tiers that the player will be in. The leaderboard will show the Player that has earned the highest money and the Players win/lose ratio. Prizes will also be given to the top ranking players in each leaderboard."}/>
                    <FeatureCard title={"AVATAR"} description={"Each Player will have an avatar that they could customize as according to the player's style, mood or preference. NFT items will be the things that Players need to acquire to be able customize their avatar’s appearance."}/>

                </div>
            </div>
        </div>
    )
}

export default Features