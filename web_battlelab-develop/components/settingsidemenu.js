import Link from 'next/link'

const SettingSideMenu = (props) => {
    return (
        <div className='bg-bl-darker py-12'>
            <div className='pb-14 items-center flex flex-col'>
                <p className='text-white font-bold text-2xl'>Kumachan</p>
                <p className='text-white text-sm'>Code ID: PT9158xxxx3</p>
            </div>
            <Link href="/settingaccount">
                <a>
                    <SettingMenu label={"ACCOUNT"} highlight={ props.selected == "account" ? true : false } />
                </a>
            </Link>
            <Link href="/settingnotification">
                <a>
                    <SettingMenu label={"NOTIFICATION"} highlight={ props.selected == "notification" ? true : false } />
                </a>
            </Link>
            <Link href="/settingblockedusers">
                <a>
                    <SettingMenu label={"BLOCKED USERS"} highlight={ props.selected == "blocked users" ? true : false } />
                </a>
            </Link>
            <Link href="/settingtransaction">
                <a>
                    <SettingMenu label={"TRANSACTION"} highlight={ props.selected == "transaction" ? true : false } />
                </a>
            </Link>
            <Link href="/settinglinkid">
                <a>
                    <SettingMenu label={"LINK ID TO MAIN GAME ID"} highlight={ props.selected == "link id" ? true : false } />
                </a>
            </Link>
            <Link href="/settingupdatebattlelab">
                <a>
                    <SettingMenu label={"UPDATE BATTLELAB"} highlight={ props.selected == "update battlelab" ? true : false } />
                </a>
            </Link>
            <div className='mx-12 mt-12'>
                <button className='w-full bg-bl-hilight hover:bg-bl-hilight-dark border-2 border-bl-primary hover:border-bl-primary-dark px-10 py-3 rounded-lg text-md font-bold text-white transition duration-300'>LOG OUT</button>
            </div>
        </div>
    )
}

const SettingMenu = (props) => {
    return (
        // <div>
        //     <p className='bg-bl-hilight py-3 pl-12 border-l-4 border-bl-secondary font-bold text-white'>{props.label}</p>
        // </div>
        <div>
            <p className={`${props.highlight && 'bg-bl-hilight border-l-4 border-bl-secondary'} py-4 pl-12 font-bold text-sm text-white hover:bg-bl-hilight-dark transition duration-300`}>{props.label}</p>
        </div>
    )
}

export default SettingSideMenu