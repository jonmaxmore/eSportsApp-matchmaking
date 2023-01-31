import Head from 'next/head'

const HeadMeta = () => {
    return (
        <Head>
                <title>BATTTLELAB</title>

                <meta property="og:type" content="website" />
                <meta property="og:title" content="BATTTLELAB" />
                <meta property="og:url" content="https://battlelab.com" />
                <meta property="og:image" content={"https://battlelab.com/images/preview.jpg"} />
                <meta
                    property="og:description"
                    content="description goes here."
                />
                <meta
                    name="description"
                    content="description goes here."
                />
                <meta name="twitter:card" content="summary" />
            </Head>
    )
}

export default HeadMeta