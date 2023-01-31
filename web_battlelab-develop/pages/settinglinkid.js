import Layout from '../components/layout'
import Link from 'next/link'
import SettingHead from '../components/settinghead'
import SettingSideMenu from '../components/settingsidemenu'
import SettingLayout from '../components/settinglayout'

const SettingAccount = (props) => {

    const HandleOnClick = () => {
        console.log('Test');
    }

    return (
        <Layout>
            <SettingLayout>
                <SettingSideMenu selected={'link id'} />

                <div className='col-span-2 bg-bl-darker'>
                    <SettingHead label={"LINK ID"} />

                    <p className='text-white text-center mt-8'>
                        Your Battlelab ID need to be connected to these platforms in order to play their games.
                    </p>
                    <div className='flex flex-col items-center space-y-6 mt-14'>
                        <ButtonWithLogo label='Link to steam' icon='/images/settings/ic_steam.svg' />
                        <ButtonWithLogo label='Link to riot' icon='/images/settings/ic_riot.svg' />
                        <ButtonWithLogo label='Link to Garena' icon='/images/settings/ic_garena.svg' />
                        <ButtonWithLogo label='Link to steam' icon='/images/settings/ic_epic.svg' />
                        <ButtonWithLogo label='Link to steam' icon='/images/settings/ic_overwatch.svg' />
                    </div>
                </div>

            </SettingLayout>
        </Layout>
    )
}

const ButtonWithLogo = (props) => {
    return (
        <>

            <button className='relative bg-bl-hilight hover:bg-bl-hilight-dark border-bl-primary border-2 w-80 py-2 rounded-lg text-lg font-bold text-white uppercase transition duration-300'>
                <img src={props.icon} alt="" className='absolute top-0 h-10 py-1 pl-2' />
                {props.label}
            </button>

        </>
    )
}

export default SettingAccount