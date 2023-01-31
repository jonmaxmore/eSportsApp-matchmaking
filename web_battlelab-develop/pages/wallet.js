import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'
import Layout from '../components/layout'
import Button from '../components/button'
import { divide } from 'lodash'
import { Dialog } from '@headlessui/react'
import { Menu } from '@headlessui/react'

const Wallet = (props) => {
    const [username, setUsername] = useState('Kumachan')
    const [isOpen, setIsOpen] = useState(false)
    const [isCompletedOpen, setIsCompletedOpen] = useState(false)

    return (
        <Layout>
            <WalletLayout username={username}>
                <ConfirmDialog isOpen={isOpen} setIsOpen={setIsOpen} setIsCompletedOpen={setIsCompletedOpen} />
                <TradeCompleteDialog isOpen={isCompletedOpen} setIsOpen={setIsCompletedOpen} />
                <div className='bg-bl-dark col-span-2 h-[560px] px-16 py-12 relative'>
                    <Chart />
                </div>

                <div className=''>
                    <div className='flex items-center justify-center gap-1 py-6 bg-gradient-to-b from-bl-hilight-dark to-bl-dark pl-6 h-16 border-l-6 border-bl-secondary relative'>
                        <p className='text-white text-sm font-bold'>SWAP</p>
                        <button className='w-12 h-12 bg-gradient-to-b from-bl-hilight to-bl-hilight-dark rounded-md absolute right-2 flex items-center justify-center'>
                            <img src="/images/wallet/ic_refresh.svg" alt="" className='' />
                        </button>
                    </div>
                    <div className='bg-neutral-900 p-12 space-y-6'>
                        <div className='space-y-2'>
                            <SwapButton tokenIcon={"/images/wallet/ic_busd_coin.svg"} balance={'24.4168'} />
                            <form>
                                <div className='border-l-5 border-bl-secondary bg-neutral-700 h-10'>
                                    <input type="text" placeholder='Enter amount' className='bg-transparent text-right pr-5 w-full h-10 text-white' />
                                </div>
                            </form>
                        </div>
                        <div className='flex justify-center'>
                            <div className='w-12 h-12 bg-bl-darker rounded-full flex items-center justify-center'>
                                <img src="/images/wallet/ic_transfer_to.svg" alt="" />
                            </div>
                        </div>
                        <div className='space-y-2 pb-4'>
                            <SwapButton tokenIcon={"/images/wallet/blc_coin.svg"} balance={'9,999,999'} />

                            <form>
                                <div className='border-l-5 border-bl-secondary bg-neutral-700 h-10'>
                                    <input type="text" placeholder='Enter amount' className=' bg-transparent text-right pr-5 w-full h-10 text-white' />
                                </div>
                            </form>
                        </div>
                        <div className='space-y-4'>
                            <div className='flex items-center justify-between'>
                                <p className='text-white'>Price</p>
                                <p className='text-white font-bold'>{'0.0'} BUSD per BLC</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-white'>Slippage Tolerance</p>
                                <p className='text-bl-secondary font-bold'>{'0.5'}%</p>
                            </div>
                        </div>
                        <ExchangeButton active={true} setIsOpen={setIsOpen} />
                    </div>
                </div>
            </WalletLayout>
        </Layout>
    )
}

const WalletLayout = (props) => {
    return (
        <>
            <div className="bg-[url('/images/home/img_main_bg_fix.png')] bg-cover bg-black bg-no-repeat bg-top">
                <div className="mx-auto max-w-screen-2xl pt-20 pb-40 px-12">
                    <div className="flex items-center justify-between">
                        <h1 className='text-4xl text-white font-bold mb-8'>My Wallet</h1>
                    </div>
                    <div className="grid grid-cols-3 md:gap-6 lg:gap-12">

                        {props.children}

                    </div>
                </div>
            </div>
        </>
    )
}

const SwapButton = (props) => {
    return (
        <>
            <Menu as="div" className="relative text-left">
                <div>
                    <Menu.Button className={"flex w-full items-center justify-between"}>
                        <div className='flex items-center gap-2'>
                            <img src={props.tokenIcon} alt="" />
                            <p className="text-white font-bold">BUSD</p>
                            <img src="/images/wallet/ic_dropdown.svg" alt="" />
                        </div>
                        <p className='text-white text-sm'>Balance {props.balance}</p>
                    </Menu.Button>
                </div>
                <Menu.Items className={"absolute w-full top-0 right-0 mt-9 flex flex-col z-10"}>
                    <TokenMenuRow tokenIcon={'/images/wallet/ic_busd_coin.svg'} tokenName={'BUSD'} />
                    <TokenMenuRow tokenIcon={'/images/wallet/bnb_coin.svg'} tokenName={'BNB'} />
                    <TokenMenuRow tokenIcon={'/images/wallet/alpaca_coin.svg'} tokenName={'ALPACA'} />
                    <TokenMenuRow tokenIcon={'/images/wallet/belt_coin.svg'} tokenName={'BELT'} />
                    <TokenMenuRow tokenIcon={'/images/wallet/btcb_coin.svg'} tokenName={'BTCB'} />
                    <TokenMenuRow tokenIcon={'/images/wallet/blc_coin.svg'} tokenName={'BLC'} />
                    <TokenMenuRow tokenIcon={'/images/wallet/bunny_coin.png'} tokenName={'BUNNY'} />
                </Menu.Items>
            </Menu>

        </>
    )
}

const TokenMenuRow = (props) => {
    return (
        <Menu.Item >
            {({ active }) => (
                <a
                    className={`${active ? 'bg-gradient-to-t from-bl-hilight to-bl-hilight-dark' : 'bg-gradient-to-t from-bl-dark-bg to-bl-dark-bg'
                        } text-white flex py-2 px-4 items-center gap-2 transition duration-300`}
                    href="#"
                >
                    <img src={props.tokenIcon} alt="" className='w-6 h-6' />
                    <p className='text-white text-xs font-light'>{props.tokenName}</p>
                </a>
            )}
        </Menu.Item>
    )
}

const Chart = (props) => {
    return (
        <>
            <div className='flex items-center gap-5 absolute top-10 right-16'>
                <div className='bg-bl-secondary w-16 h-8 rounded-full font-bold flex items-center justify-center'>24H</div>
                <div className='bg-black/80 text-white w-16 h-8 rounded-full font-bold flex items-center justify-center'>1W</div>
                <div className='bg-black/80 text-white w-16 h-8 rounded-full font-bold flex items-center justify-center'>1M</div>
                <div className='bg-black/80 text-white w-16 h-8 rounded-full font-bold flex items-center justify-center'>1Y</div>
            </div>
            <div className=''>
                <div className='flex items-center gap-3'>
                    <img src="/images/wallet/ic_busd_coin.svg" alt="" />
                    <img src="/images/wallet/ic_swap.svg" alt="" />
                    <img src="/images/wallet/blc_coin.svg" alt="" />
                    <p className='text-white font-bold'>BUSD/BLC</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='text-bl-secondary font-bold text-3xl'>0.623</p>
                    <p className='text-white font-bold'>BUSD/BLC</p>
                    <p className='text-bl-primary font-bold'>-0.030</p>
                    <p className='text-bl-primary font-bold'>(-4.64%)</p>
                </div>
                <p className='text-white'>Feb 15, 2022, 13:48</p>
            </div>
            <div>
                <img src="/images/wallet/graph.svg" alt="" className='py-12' />
            </div>
            <div className='flex items-center justify-between'>
                <p className='text-white'>02.00 PM</p>
                <p className='text-white'>05.00 PM</p>
                <p className='text-white'>08.00 PM</p>
                <p className='text-white'>11.00 PM</p>
                <p className='text-white'>02.00 AM</p>
                <p className='text-white'>05.00 AM</p>
                <p className='text-white'>08.00 AM</p>
            </div>
        </>
    )
}

const ExchangeButton = (props) => {
    return (

        <div className='py-10'>
            {props.active ?
                <div onClick={() => { props.setIsOpen(true) }} className='bg-bl-hilight hover:bg-bl-primary-darker border-2 border-bl-primary text-white font-bold text-xl h-14 flex items-center justify-center transition duration-300'>
                    EXCHANGE
                </div>
                :
                <div onClick={() => { props.setIsOpen(true) }} className='bg-bl-primary-bg hover:bg-bl-dark border-2 border-bl-hilight text-gray-600 font-bold text-xl h-14 flex items-center justify-center transition duration-300'>
                    EXCHANGE
                </div>
            }

        </div>


    )
}

const ConfirmDialog = (props) => {

    const handleConfirm = () => {
        props.setIsOpen(false)
        props.setIsCompletedOpen(true)
    }

    return (
        <Dialog
            open={props.isOpen}
            onClose={() => props.setIsOpen(false)}
            className={''}
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/80 z-10" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                <Dialog.Panel className="relative w-[706px] pb-8 rounded bg-bl-dark-bg">
                    <Dialog.Title className={'bg-gradient-to-b from-bl-hilight to-bl-dark text-white font-bold h-20 flex items-center justify-center'}>
                        <p>CONFIRM SWAP</p>
                        <button onClick={() => props.setIsOpen(false)} className='w-[50px] h-[50px] bg-bl-hilight rounded-md absolute right-4 flex items-center justify-center'>
                            <img src="/images/mail/close.svg" alt="" className='w-[20px] h-[20px]' />
                        </button>
                    </Dialog.Title>
                    <div className='px-12 pt-6 space-y-5'>
                        <ConfirmTokenBar tokenicon={'/images/wallet/ic_busd_coin.svg'} amount={'24.416866697259907235'} symbol={'BUSD'} />
                        <ConfirmTokenBar tokenicon={'/images/wallet/blc_coin.svg'} amount={'15.1588'} symbol={'BLC'} />
                        <Dialog.Description className={'text-white text-center'}>
                            Output is estimated. You will receive at least 15.08 BLC or the transaction will revert.
                        </Dialog.Description>
                        <div className='bg-gradient-to-b from-bl-dark-gray to-bl-darker-gray py-3 px-6'>

                            <table className="table-auto w-full">
                                <tbody className='text-white'>
                                    <ConfirmDetailRow title={'Price'} detail={'1.61074 BUSD/BLC'} />
                                    <ConfirmDetailRow title={'Minimum received'} detail={'0.5%'} />
                                    <ConfirmDetailRow title={'Price impact'} detail={'< 0.01%'} />
                                    <ConfirmDetailRow title={'Liquidity Provider Fee'} detail={'0.1219 BUSD'} />
                                </tbody>
                            </table>
                        </div>

                        <button onClick={handleConfirm} className='border-bl-primary w-full border-2 h-14 bg-bl-hilight text-white font-bold rounded-sm hover:bg-bl-hilight-dark transition duration-300'>
                            CONFIRM
                        </button>
                    </div>

                </Dialog.Panel>

            </div >
        </Dialog >
    )
}

const TradeCompleteDialog = (props) => {
    return (
        <Dialog
            open={props.isOpen}
            onClose={() => props.setIsOpen(false)}
            className={''}
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/80 z-10" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <Dialog.Panel className="relative w-[706px] pb-12 rounded bg-bl-dark-bg">
                    <Dialog.Title className={'bg-gradient-to-b from-bl-hilight to-bl-dark text-white font-bold h-20 flex items-center justify-center'}>
                        <p>TRADE COMPLETED</p>
                        <button onClick={() => props.setIsOpen(false)} className='w-[50px] h-[50px] bg-bl-hilight rounded-md absolute right-4 flex items-center justify-center'>
                            <img src="/images/mail/close.svg" alt="" className='w-[20px] h-[20px]' />
                        </button>
                    </Dialog.Title>
                    <div className='px-12 pt-10 space-y-8'>
                        {/* <Dialog.Description className={'text-white text-center'}>
                            Output is estimated. You will receive at least 15.08 BLC or the transaction will revert.
                        </Dialog.Description> */}
                        <div className='bg-gradient-to-b from-bl-dark-gray to-bl-darker-gray py-8 px-6'>
                            <div className='flex flex-col items-center space-y-4'>
                                <div className='flex items-center gap-4'>
                                    <p className='text-white'>You received</p>
                                    <img src='/images/wallet/blc_coin.svg' alt="" />
                                    <p className='text-white font-bold'>15.1588 BLC</p>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <p className='text-white'>Your current balance is now</p>
                                    <img src='/images/wallet/blc_coin.svg' alt="" />
                                    <p className='text-white font-bold'>10,000,014.1588 BLC</p>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => props.setIsOpen(false)} className='border-bl-primary w-full border-2 h-14 bg-bl-hilight text-white font-bold rounded-sm hover:bg-bl-hilight-dark transition duration-300'>
                            GOT IT
                        </button>
                    </div>

                </Dialog.Panel>

            </div >
        </Dialog >
    )
}

const ConfirmTokenBar = (props) => {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-6'>
                <img src={props.tokenicon} alt="" />
                <p className='text-white text-lg'>{props.amount}</p>
            </div>
            <p className='text-white text-lg font-bold'>{props.symbol}</p>
        </div>
    )
}

const ConfirmDetailRow = (props) => {
    return (
        <tr>
            <td className='pb-3'>{props.title}</td>
            <td className='text-right text-md font-bold pb-3'>{props.detail}</td>
        </tr>
    )
}
export default Wallet