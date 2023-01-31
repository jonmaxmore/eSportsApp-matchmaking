import Layout from '../components/layout'
import Banner from '../components/banner'
import Featured from '../components/featured'
import Events from '../components/events'
import GetStarted from '../components/getstarted'
import Leaderboard from '../components/leaderboard'

const Home = (props) => {
  return (
    <Layout>
      <Banner />
      {/* <Featured label={"LOL is now available on BattleLab!"} description={"The twelfth League of Legends season has officially begun, starting with all the champion, item, and Summoner's Rift."}/> */}
      <Featured label={"Battlelab CEO NFT collection is now available on OpenSea"} description={"Become part of our project owning one of the NFT with sharing profits."}/>
      <Events eventsdata={props.eventsdata}/>
      <GetStarted />
      {/* <Leaderboard leaderboarddata={props.leaderboarddata}/> */}
    </Layout>
  )
}

export async function getStaticProps({ paprams }) {
  const leaderboarddata = await require('./leaderboarddata.json')
  const eventsdata = await require('../pages/eventsdata.json')
  return { props: {leaderboarddata, eventsdata}}
}

export default Home