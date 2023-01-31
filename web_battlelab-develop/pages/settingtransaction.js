import Layout from '../components/layout'
import Link from 'next/link'
import SettingHead from '../components/settinghead'
import SettingSideMenu from '../components/settingsidemenu'
import ButtonSmall from '../components/buttonsmall'
import SettingLayout from '../components/settinglayout'

const transactiondata = [
    {
        'date': '02/01/2021',
        'ID': 'XT4567ER',
        'type': 'Deposite',
        'method': 'Credit card',
        'amount': 100
    },
    {
        'date': '31/01/2021',
        'ID': 'XT4567ER',
        'type': 'Withdraw',
        'method': 'Paypal',
        'amount': 5000
    },
    {
        'date': '25/01/2021',
        'ID': 'XT4567ER',
        'type': 'Deposite',
        'method': 'Credit card',
        'amount': 100
    },
    {
        'date': '20/01/2021',
        'ID': 'XT4567ER',
        'type': 'Withdraw',
        'method': 'Paypal',
        'amount': 2000
    }
]

const SettingAccount = (props) => {

    const HandleOnClick = () => {
        console.log('Test');
    }

    return (
        <Layout>
            <SettingLayout>
                <SettingSideMenu selected={'transaction'} />
                <div className='col-span-2 bg-bl-darker'>
                    <div>
                        <SettingHead label={"BALANCE"} />
                        <div className='p-12 flex items-start justify-between'>
                            <div className='space-y-1'>
                                <p className='text-gray-500'>Total balance</p>
                                <p className='text-white font-bold text-xl'>65,045 $</p>
                                <p className='text-bl-secondary font-bold text-xs pt-3'>=4,912.8 BLC</p>
                            </div>
                            <div className='flex flex-col space-y-10 items-end'>
                                <div className='flex gap-2'>
                                    <ButtonSmall label="TOP UP" border={true} />
                                    <ButtonSmall label="WITHDRAW" style="dark" border={true} />
                                </div>
                                <p className='text-white text-xs'>The amount of BLC is updated in real-time</p>
                            </div>
                        </div>
                    </div>

                    <SettingHead label={"BALANCE"} />
                    <div>
                        <table className="table-auto w-full">
                            <thead>
                                <tr className='text-white text-sm bg-neutral-800'>
                                    <th>Date</th>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Method</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactiondata.map((data, index) => (
                                    <tr className='text-white text-xs text-center h-14' key={index}>
                                        <td className='font-bold'>{data.date}</td>
                                        <td>{data.id}</td>
                                        <td>{data.type}</td>
                                        <td>{data.method}</td>
                                        <td className='text-bl-secondary'>$ {data.amount}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
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