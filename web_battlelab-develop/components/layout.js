import Header from '../components/header'
import Footer from './footer'
import HeadMeta from './headmeta'

const Layout = (props) => {
    return (
        <>
            <HeadMeta />
            <Header />
            {props.children}
            <Footer />
        </>
    )
}

export default Layout