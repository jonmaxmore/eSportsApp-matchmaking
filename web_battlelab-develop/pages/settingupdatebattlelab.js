import { useState } from 'react'
import Layout from '../components/layout'
import Link from 'next/link'
import SettingHead from '../components/settinghead'
import SettingSideMenu from '../components/settingsidemenu'
import SettingToggle from '../components/settingtoggle'
import SettingLayout from '../components/settinglayout'
import ToggleSwitch from '../components/toggleswitch'

const SettingAccount = (props) => {
    const [enabled, setEnabled] = useState(false)

    return (
        <Layout>
            <SettingLayout>
                <SettingSideMenu selected={'update battlelab'} />

                <div className='col-span-2 bg-bl-darker'>
                    <SettingHead label={"UPDATE BATTLELAB"} />
                    <UpdateCell label="Last update" description="The last update was installed on 27 August 2021 at 13:35." />
                    <ToggleSwitch
                        enabled={enabled}
                        setEnabled={setEnabled}
                        label='Auto download over Wi-Fi'
                        description='Download software updates automatically when connected to a Wi-Fi network.'
                    />
                    <UpdateCell label="Update ver.0.01" description="There is a new update available. Would you like to update it now?" />

                    <div className='mt-8 mb-8 flex justify-center'>
                        <button className='bg-bl-dark hover:bg-bl-darker border-2 border-bl-primary hover:border-bl-primary-dark px-16 py-3 rounded-lg text-md font-bold text-white transition duration-300'>UPDATE NOW</button>
                    </div>
                    <div className='ml-28 mr-28 space-y-8 bg-bl-darker p-8'>
                        <p className='text-white font-bold'>New Battlelab Update v.0.7</p>
                        <p className='text-white text-sm'>Today’s update includes  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                </div>
            </SettingLayout>
        </Layout>
    )
}

const UpdateCell = (props) => {
    return (
        <div className='border-b border-neutral-500 ml-28 py-8 mr-28 flex justify-between items-center'>
            <div className='space-y-4'>
                <p className='text-white font-bold uppercase text-lg'>{props.label}</p>
                <p className='text-white'>{props.description}</p>
            </div>
        </div>
    )
}
export default SettingAccount