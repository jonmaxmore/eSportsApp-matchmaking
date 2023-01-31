import { useState } from 'react'
import Layout from '../components/layout'
import Link from 'next/link'
import SettingHead from '../components/settinghead'
import SettingSideMenu from '../components/settingsidemenu'
import SettingLayout from '../components/settinglayout'
import ToggleSwitch from '../components/toggleswitch'

const SettingAccount = (props) => {
    const [enabled, setEnabled] = useState(false)
    const [enabled1, setEnabled1] = useState(false)
    const [enabled2, setEnabled2] = useState(false)
    const [enabled3, setEnabled3] = useState(false)
    const [enabled4, setEnabled4] = useState(false)
    const HandleOnClick = () => {
        console.log('Test');
    }

    return (
        <Layout>
            <SettingLayout>
                <SettingSideMenu selected={'notification'} />

                <div className='col-span-2 bg-bl-darker'>
                    <SettingHead label={"ACCOUNT SETTINGS"} />

                    {/* TODO:Fix toggle not working with multiple toggle */}
                    <ToggleSwitch
                        enabled={enabled}
                        setEnabled={setEnabled}
                        label='Friend request'
                        description='Get notified whenever someone sent you a friend request'
                    />
                    <ToggleSwitch
                        enabled={enabled1}
                        setEnabled={setEnabled1}
                        label='Match invitation'
                        description='Get notified whenever someone sent you an invitation to the match room'
                    />
                    <ToggleSwitch
                        enabled={enabled2}
                        setEnabled={setEnabled2}
                        label='Clan Invitation'
                        description='Get notified whenever someone sent you an invitation to their clan'
                    />
                    <ToggleSwitch
                        enabled={enabled3}
                        setEnabled={setEnabled3}
                        label='Clan Application'
                        description='Get notified whenever someone applied to join your clan'
                    />
                    <ToggleSwitch
                        enabled={enabled4}
                        setEnabled={setEnabled4}
                        label='Alert with sound'
                        description='All notifications will be notified with the sound'
                    />

                    <div className='mt-8 mb-8 flex justify-center'>
                        <button className='bg-bl-dark hover:bg-bl-darker border-2 border-bl-primary hover:border-bl-primary-dark px-16 py-3 rounded-lg text-md font-bold text-white transition duration-300'>DELETE ACCOUNT</button>
                    </div>
                </div>
            </SettingLayout>
        </Layout>
    )
}

export default SettingAccount