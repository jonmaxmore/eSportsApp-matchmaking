import Layout from '../components/layout'
import AboutBanner from '../components/aboutbanner'
import UltimatePlatform from '../components/ultimateplatform'
import JoinBattleLabCommunity from '../components/joinbattlelabcommunity'
import CustomizeAvatar from '../components/customizeavatar'
import Archievement from '../components/archievement'

const AboutUs = (props) => {
    return (
        <Layout>
            <AboutBanner />
            <UltimatePlatform />
            <JoinBattleLabCommunity />
            <CustomizeAvatar />
            <Archievement />
        </Layout>
    )
}

export default AboutUs