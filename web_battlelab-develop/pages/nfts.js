import Layout from '../components/layout'
import Aboutnft from '../components/aboutnft'
import WhatisCEO from '../components/whatisceo'
import CEOCollection from '../components/ceocollection'
import RoadMapActivation from '../components/roadmap'
import Benifit from '../components/benefit'
import WhereTOBUY from '../components/wheretobuy'
import CEOFace from '../components/ceoface'

const AboutUs = (props) => {
    return (
        <Layout>
            <Aboutnft />
            <WhatisCEO />
            <CEOCollection />
            <CEOFace/>
            <RoadMapActivation />
            <Benifit />
            <WhereTOBUY />
        </Layout>
    )
}

export default AboutUs