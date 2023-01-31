import Layout from '../components/layout'
import SupportBanner from '../components/supportbanner'
import Bounty from '../components/bounty'
import Faqs from '../components/faqs'
import ContactSupport from '../components/contactsupport'

const Contact = (props) => {
    return (
        <Layout>
            <SupportBanner />
            {/* <Bounty /> */}
            <ContactSupport />
            <div id='faqs'>
                <Faqs />
            </div>
        </Layout>
    )
}

export default Contact