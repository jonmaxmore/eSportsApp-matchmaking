import Layout from '../components/layout'
import Link from 'next/link'
import SettingHead from '../components/settinghead'
import SettingSideMenu from '../components/settingsidemenu'
import SettingLayout from '../components/settinglayout'

const blockuserdata = [
    {
        "blockedname": "ll_Harold_ll (David)",
        "detail": "Online",
        "level": 12
    },
    {
        "blockedname": "ll_Harold_ll (David)",
        "detail": "Leauge of Legends",
        "level": 11
    },
    {
        "blockedname": "ll_Harold_ll (David)",
        "detail": "Online",
        "level": 10
    },
    {
        "blockedname": "ll_Harold_ll (David)",
        "detail": "Online",
        "level": 12
    },
    {
        "blockedname": "ll_Harold_ll (David)",
        "detail": "Leauge of Legends",
        "level": 8
    },
    {
        "blockedname": "ll_Harold_ll (David)",
        "detail": "Leauge of Legends",
        "level": 9
    },
]
const SettingAccount = (props) => {

    const HandleOnClick = () => {
        console.log('Test');
    }

    return (
        <Layout>
            <SettingLayout>
                <SettingSideMenu selected={'blocked users'} />

                <div className='col-span-2 bg-bl-darker'>
                    <SettingHead label={"ACCOUNT SETTINGS"} />
                    {blockuserdata.map((data, index) => (
                        <BlockedUserCell {...data} key={index} />

                    ))}
                </div>

            </SettingLayout>

        </Layout>
    )
}

const BlockedUserCell = (props) => {
    return (
        <div className='flex items-center justify-between py-6 border-b border-neutral-500 mx-12'>
            <div className='flex items-center gap-6'>
                {/* <div className="w-14 h-14 bg-red-500"></div> */}
                <div className='relative'>
                    <img src="/images/home/mock_cha_avatar.png" alt="" className='w-24' />
                    <p className='text-md font-bold text-white w-7 h-7 bg-gradient-to-tr from-bl-dark to-bl-hilight rounded-md text-center absolute -bottom-1 right-1'>{props.level}</p>
                </div>
                <div>
                    <p className='text-white font-bold'>{props.blockedname}</p>
                    <p className='text-bl-primary'>{props.detail}</p>
                </div>
            </div>
            <div className=''>
                <button className='bg-bl-dark hover:bg-bl-darker border-2 border-bl-primary hover:border-bl-primary-dark px-6 py-3 rounded-lg text-md font-bold text-white transition duration-300'>UNBLOCK</button>
            </div>
        </div>
    )
}

export default SettingAccount