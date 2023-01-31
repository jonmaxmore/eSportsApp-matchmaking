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
    const HandleOnClick = () => {
        console.log('Test');
    }

    return (
        <Layout>
            <SettingLayout>

                <SettingSideMenu selected={'account'} />

                <div className='col-span-2 bg-bl-darker'>
                    <SettingHead label={"ACCOUNT SETTINGS"} />
                    <form className='flex flex-col space-y-4 w-1/2 ml-28 mt-8'>
                        <label htmlFor="avatarname" className='text-white font-bold'>AVATAR NAME</label>
                        <div className='flex relative'>
                            <input type="text" name="avatarname" className='bg-neutral-800 border-l-4 border-bl-secondary h-12 pl-3 w-full' placeholder="Kumachan" />
                            <ButtonOverField label="EDIT" />
                            <CancelButton /> <OKButton />
                        </div>
                        <label htmlFor="email" className='text-white font-bold'>E-MAIL ADDRESS</label>
                        <div className='flex relative'>
                            <input type="email" name="email" className='bg-neutral-800 border-l-4 border-bl-secondary h-12 pl-3 w-full' placeholder="username@email.com" />
                            <ButtonOverField label="CHANGE" />
                            <CancelButton /> <OKButton />
                        </div>
                        <label htmlFor="password" className='text-white font-bold pt-3'>PASSWORD</label>
                        <div className='flex relative'>
                            <input type="password" name="password" className='text-white bg-neutral-800 border-l-4 border-bl-secondary h-12 pl-3 w-full' placeholder="••••••••" />
                            <ButtonOverField label="CHANGE" />
                            <CancelButton /> <OKButton />
                        </div>
                        <label htmlFor="language" className='text-white font-bold'>LANGUAGE</label>
                        <select name="" id="" className='form-select bg-neutral-800 border-l-4 border-bl-secondary h-12 pl-3 text-white'>
                            <option selected>English</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </form>

                    <div className='border-b border-neutral-500 ml-28 mr-28 mt-8'>

                    </div>
                    <ToggleSwitch
                        enabled={enabled}
                        setEnabled={setEnabled}
                        label='ALLOW LOGIN'
                        description='Enable this setting to use your account an mobiles and tablet devices'
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

const ButtonOverField = (props) => {
    return (
        <button className='border-3 rounded-md border-bl-primary bg-bl-hilight-dark hover:bg-bl-hilight text-white font-bold h-12 w-32 transition duration-300 absolute right-0'>
            {props.label}
        </button>
    )
}

const OKButton = (props) => {
    return (
        <button className='border-3 rounded-md border-bl-primary bg-bl-hilight-dark hover:bg-bl-hilight text-white font-bold h-12 w-12 transition duration-300 absolute right-0 flex items-center justify-center'>
            <img src="/images/settings/ok.svg" alt="" />
        </button>
    )
}

const CancelButton = (props) => {
    return (
        <button className='border-3 rounded-md border-bl-primary bg-neutral-800 hover:bg-neutral-700 text-white font-bold h-12 w-12 transition duration-300 absolute right-16 flex items-center justify-center'>
            <img src="/images/settings/cancel.svg" alt="" />
        </button>
    )
}
