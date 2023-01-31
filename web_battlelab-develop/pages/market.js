import { useState } from 'react'
import Link from 'next/link'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'
import Layout from '../components/layout'
import { Dialog } from '@headlessui/react'


const Market = (props) => {
    const [username, setUsername] = useState('Kumachan')
    const [action, setAction] = useState(5)
    const [isOpen, setIsOpen] = useState(false)
    const [isInventoryOpen, setIsInventoryOpen] = useState(false)
    const [isSellConfirm, setIsSellConfirm] = useState(false)
    const [isBuyItemOpen, setIsBuyItemOpen] = useState(false)

    return (
        <Layout>
            <MarketLayout username={username} isInventoryOpen={isInventoryOpen} setIsInventoryOpen={setIsInventoryOpen}>
                <ConfirmDialog isOpen={isOpen} setIsOpen={setIsOpen} />
                <InventoryDialog isOpen={isInventoryOpen} setIsOpen={setIsInventoryOpen} setIsSellConfirm={setIsSellConfirm} />
                <SellItemDialog isOpen={isSellConfirm} setIsOpen={setIsSellConfirm} />
                <BuyItemDialog isOpen={isBuyItemOpen} setIsOpen={setIsBuyItemOpen} />

                <div className='col-span-3'>
                    <Tab.Group>
                        <Tab.List className={'grid grid-cols-2 w-full'}>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <div
                                        className={
                                            selected ? 'flex items-center justify-center gap-1 py-6 pl-6 h-16 bg-gradient-to-b from-bl-hilight-dark to-bl-dark transition duration-300'
                                                :
                                                'flex items-center justify-center gap-1 py-6 pl-6 h-16 bg-black  transition duration-300'
                                        }
                                    >
                                        <p className='text-white font-bold'>My action listing</p><p className='text-white font-normal'>({action})</p>
                                    </div>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <div
                                        className={
                                            selected ? 'flex items-center justify-center gap-1 py-6 pl-6 h-16 bg-gradient-to-b from-bl-hilight-dark to-bl-dark transition duration-300'
                                                :
                                                'flex items-center justify-center gap-1 py-6 pl-6 h-16 bg-black transition duration-300'
                                        }
                                    >
                                        <p className='text-white font-bold'>My market history</p>
                                    </div>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            {/* Action */}
                            <Tab.Panel>
                                <div className='bg-bl-darker overflow-hidden overflow-y-scroll'>
                                    <table className="w-full text-center">
                                        <thead>
                                            <tr className='text-white bg-neutral-800'>
                                                <th className='h-8'></th>
                                                <th className='text-left'>Item/Type</th>
                                                <th>Available in the market</th>
                                                <th>Price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <ItemRow
                                                image={"/images/marketplace/mock_item1.png"}
                                                item={'Perfect shield'}
                                                type={'Weapon left'}
                                                available={12}
                                                price={'20 $'}
                                                button={true}
                                                setIsOpen={setIsOpen}
                                            />
                                            <ItemRow
                                                image={"/images/marketplace/mock_item2.png"}
                                                item={'Perfect shield'}
                                                type={'Weapon right'}
                                                available={2}
                                                price={'20 $'}
                                                button={true}
                                                setIsOpen={setIsOpen}
                                            />
                                        </tbody>
                                    </table>
                                </div>
                            </Tab.Panel>
                            {/* Market */}
                            <Tab.Panel>
                                <div className='bg-bl-darker overflow-hidden overflow-y-scroll'>
                                    <table className="w-full text-center">
                                        <thead>
                                            <tr className='text-white bg-neutral-800'>
                                                <th className='h-8'></th>
                                                <th className='text-left'>Item/Type</th>
                                                <th>Available in the market</th>
                                                <th>Price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <ItemRow image={"/images/marketplace/mock_item1.png"} item={'Perfect shield'} type={'Weapon left'} available={12} price={'20 $'} button={false} />
                                            <ItemRow image={"/images/marketplace/mock_item2.png"} item={'Perfect shield'} type={'Weapon right'} available={2} price={'20 $'} button={false} />
                                        </tbody>
                                    </table>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                    <Tab.Group>
                        <Tab.List className='grid grid-cols-3'>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <div
                                        className={
                                            selected ? 'flex w-full items-center justify-center gap-1 py-6 bg-gradient-to-b from-bl-hilight-dark to-bl-dark pl-6 h-16 transition duration-300'
                                                :
                                                'flex w-full items-center justify-center gap-1 py-6 bg-black pl-6 h-16 transition duration-300'
                                        }
                                    >
                                        <p className='text-white font-bold'>Popular</p>
                                    </div>
                                )}
                            </Tab>

                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <div
                                        className={
                                            selected ? 'flex w-full items-center justify-center gap-1 py-6 bg-gradient-to-b from-bl-hilight-dark to-bl-dark pl-6 h-16 transition duration-300'
                                                :
                                                'flex w-full items-center justify-center gap-1 py-6 bg-black pl-6 h-16 transition duration-300'
                                        }
                                    >
                                        <p className='text-white font-bold'>Newly listed</p>
                                    </div>
                                )}
                            </Tab>

                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <div
                                        className={
                                            selected ? 'flex w-full items-center justify-center gap-1 py-6 bg-gradient-to-b from-bl-hilight-dark to-bl-dark pl-6 h-16 transition duration-300'
                                                :
                                                'flex w-full items-center justify-center gap-1 py-6 bg-black pl-6 h-16 transition duration-300'
                                        }
                                    >
                                        <p className='text-white font-bold'>Recent sold</p>
                                    </div>
                                )}
                            </Tab>

                        </Tab.List>
                        <Tab.Panels>
                            {/* Action */}
                            <Tab.Panel>
                                <div className='bg-bl-darker overflow-hidden overflow-y-scroll'>
                                    <table className="w-full text-center">
                                        <thead>
                                            <tr className='text-white bg-neutral-800'>
                                                <th className='h-8'></th>
                                                <th className='text-left'>Item/Type</th>
                                                <th>Available in the market</th>
                                                <th>Price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <ItemRow
                                                image={"/images/marketplace/mock_item1.png"}
                                                item={'Perfect shield'}
                                                type={'Weapon left'}
                                                available={12}
                                                price={'20 $'}
                                                setIsBuyItemOpen={setIsBuyItemOpen}
                                            />
                                            <ItemRow
                                                image={"/images/marketplace/mock_item2.png"}
                                                item={'Perfect shield'}
                                                type={'Weapon right'}
                                                available={2}
                                                price={'20 $'}
                                            />
                                            <ItemRow
                                                image={"/images/marketplace/mock_item1.png"}
                                                item={'Perfect shield'}
                                                type={'Weapon left'}
                                                available={12}
                                                price={'20 $'}
                                            />
                                            <ItemRow
                                                image={"/images/marketplace/mock_item2.png"}
                                                item={'Perfect shield'}
                                                type={'Weapon right'}
                                                available={2}
                                                price={'20 $'}
                                            />
                                            <ItemRow
                                                image={"/images/marketplace/mock_item1.png"}
                                                item={'Perfect shield'}
                                                type={'Weapon left'}
                                                available={12}
                                                price={'20 $'}
                                            />
                                            <ItemRow
                                                image={"/images/marketplace/mock_item2.png"}
                                                item={'Perfect shield'}
                                                type={'Weapon right'}
                                                available={2}
                                                price={'20 $'}
                                            />
                                        </tbody>
                                    </table>
                                </div>
                            </Tab.Panel>
                            {/* Newly listed */}
                            <Tab.Panel>
                                <div className='bg-bl-darker h-[855px] overflow-hidden overflow-y-scroll'>
                                    <table className="w-full text-center">
                                        <thead>
                                            <tr className='text-white bg-neutral-800'>
                                                <th className='h-8'></th>
                                                <th className='text-left'>Item/Type</th>
                                                <th>Available in the market</th>
                                                <th>Price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <ItemRow image={"/images/marketplace/mock_item1.png"} item={'Perfect shield'} type={'Weapon left'} available={12} price={'20 $'} button={false} />
                                            <ItemRow image={"/images/marketplace/mock_item2.png"} item={'Perfect shield'} type={'Weapon right'} available={2} price={'20 $'} button={false} />
                                        </tbody>
                                    </table>
                                </div>
                            </Tab.Panel>
                            {/* Recent sold */}
                            <Tab.Panel>
                                <div className='bg-bl-darker h-[855px] overflow-hidden overflow-y-scroll'>
                                    <table className="w-full text-center">
                                        <thead>
                                            <tr className='text-white bg-neutral-800'>
                                                <th className='h-8'></th>
                                                <th className='text-left'>Item/Type</th>
                                                <th>Available in the market</th>
                                                <th>Price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <ItemRow image={"/images/marketplace/mock_item1.png"} item={'Perfect shield'} type={'Weapon left'} available={12} price={'20 $'} button={false} />
                                            <ItemRow image={"/images/marketplace/mock_item2.png"} item={'Perfect shield'} type={'Weapon right'} available={2} price={'20 $'} button={false} />
                                            <ItemRow image={"/images/marketplace/mock_item2.png"} item={'Perfect shield'} type={'Weapon right'} available={2} price={'20 $'} button={false} />
                                            <ItemRow image={"/images/marketplace/mock_item2.png"} item={'Perfect shield'} type={'Weapon right'} available={2} price={'20 $'} button={false} />
                                        </tbody>
                                    </table>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>

                </div>
                <div className=''>
                    <div className='flex items-center justify-center py-6 bg-bl-hilight-dark h-16'>
                        <p className='text-white text-lg font-bold'>Filter</p>
                    </div>
                    <div className='bg-bl-darker py-10'>

                        <table className='w-full'>
                            <tbody>
                                <FilterCell label='Head' />
                                <FilterCell label='Eye' />
                                <FilterCell label='Neck' />
                                <FilterCell label='Shirt' />
                                <FilterCell label='Bottom' />
                                <FilterCell label='Sock' />
                                <FilterCell label='Shoes' />
                                <FilterCell label='Weapon left' />
                                <FilterCell label='Weapon right' />
                                <FilterCell label='Aura' />
                            </tbody>
                        </table>

                    </div>
                </div>
            </MarketLayout>
        </Layout>
    )
}

const FilterCell = (props) => {
    const [isChecked, setIsChecked] = useState(false)

    const checked = () => {
        setIsChecked(!isChecked)
        console.log('checked');
    }

    return (
        <td className='flex gap-8 px-8 py-4'>
            <div className='relative flex items-center justify-center'>
                <button type="checkbox" id='check-box-1' onClick={checked} className={`${isChecked ? 'bg-black' : 'border-white border-2'} appearance-none h-7 w-7 rounded-sm`}>
                    {isChecked && <img src="/images/marketplace/ic_filter_filled.svg" alt="" className='w-full h-full' />}
                </button>
            </div>
            <p className='text-white text-xl'>{props.label}</p>
        </td>
    )
}
const MarketLayout = (props) => {
    return (

        <div className="bg-[url('/images/home/img_main_bg_fix.png')] bg-cover bg-black bg-no-repeat bg-top">
            <div className="mx-auto max-w-screen-2xl pt-20 pb-40 px-12">
                <div className='grid grid-cols-4 gap-6 pb-10'>
                    <div className='col-span-3'>
                        <div className='flex items-center justify-between'>
                            <MarketTitle />
                            <div className="flex items-center justify-end gap-8">
                                <BalanceButton balance={'9,999,999'} link1={'wallet'} link2={'profileeditavatar'} />
                                <SaleAnItemButton setIsInventoryOpen={props.setIsInventoryOpen} isInventoryOpen={props.isInventoryOpen} />
                            </div>
                        </div>
                    </div>
                    <SearchButton link={'#'} />
                </div>
                <div className="grid grid-cols-4 md:gap-6 lg:gap-6">

                    {props.children}

                </div>
            </div>
        </div>

    )
}

const MarketTitle = (props) => {
    return (
        <h1 className='text-4xl text-white font-bold'>Marketplace</h1>
    )
}

const BalanceButton = (props) => {
    return (
        <div className="bg-bl-dark w-[400px] h-14 flex justify-between rounded-md">
            <p className='text-white text-lg font-bold flex items-center justify-center pl-8'>Balance:</p>
            <div className='flex items-center gap-8'>
                <Link href={props.link1}>
                    <a>
                        <p className='text-lg text-bl-primary font-bold flex items-center justify-center'>{props.balance} BLC</p>
                    </a>
                </Link>
                <Link href={props.link2}>
                    <a className='bg-bl-primary w-14 h-14 flex items-center justify-center rounded-md'>
                        <img src="/images/marketplace/ic_plus.svg" alt="" className='w-6 h-6' />
                    </a>
                </Link>
            </div>
        </div>
    )
}

const SaleAnItemButton = (props) => {
    return (
        <>
            <button onClick={() => { props.setIsInventoryOpen(true) }} className="bg-bl-hilight flex items-center">
                <div className='border-2 border-bl-primary w-[56px] h-[56px] flex items-center justify-center'>
                    <img src="/images/marketplace/ic_plus.svg" alt="" className='w-6 h-6' />
                </div>
                <div className='border-t-2 border-b-2 border-r-2 border-bl-primary text-white font-bold h-14 w-[200px] flex items-center justify-center text-lg'>SELL AN ITEM</div>
            </button>
        </>
    )
}

const SearchButton = (props) => {
    return (
        <form>
            <div className='bg-gradient-to-b from-bl-hilight/50 to-bl-dark/50 h-14 z-10 flex items-center pl-4 gap-5'>
                <Link href={props.link}>
                    <a>
                        <img src="/images/profile/ic_search.svg" alt="" className='text-white h-6 w-6 z-10' />
                    </a>
                </Link>
                <input type="text" placeholder='Search profile...' className='bg-transparent w-full h-10 text-white z-20' />
            </div>
        </form>
    )
}

const ItemRow = (props) => {

    const handleClick = () => {
        if (props.setIsBuyItemOpen != undefined) {
            props.setIsBuyItemOpen(true)
        }
    }

    return (
        <tr onClick={handleClick} className={`${props.setIsBuyItemOpen != undefined && 'cursor-pointer'} hover:bg-bl-hilight-dark transition duration-300`}>
            <td className='p-4'>
                <div className='bg-bl-hilight w-[78px] h-[78px] flex items-center justify-center rounded-md'>
                    <img src={props.image} alt="" />
                </div>
            </td>
            <td>
                <div className='text-white text-left space-y-4'>
                    <p className='font-bold'>{props.item}</p>
                    <p>{props.type}</p>
                </div>
            </td>
            <td className='text-white font-bold'>{props.available}</td>
            <td className='text-bl-primary font-bold'>{props.price}</td>
            <td>
                {props.button ?
                    <button onClick={() => { props.setIsOpen(true) }} className='relative border-3 border-bl-primary rounded-md bg-bl-hilight hover:bg-bl-hilight-dark w-56 h-16 transition duration-300'>
                        <img src="/images/marketplace/ic_remove_item.svg" alt="" className='absolute left-4 inset-x-0' />
                        <p className='text-xl font-bold text-white uppercase'>
                            Remove
                        </p>
                    </button>
                    :
                    <div className='w-56 h-16'></div>
                }
            </td>
        </tr>
    )
}


const ConfirmDialog = (props) => {
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
                    <Dialog.Title className={'bg-gradient-to-b from-bl-hilight to-bl-dark text-white font-bold h-20 flex items-center justify-center uppercase'}>
                        <p>REMOVE SELL ITEM</p>
                        <button onClick={() => props.setIsOpen(false)} className='w-[50px] h-[50px] bg-bl-hilight rounded-md absolute right-4 flex items-center justify-center'>
                            <img src="/images/mail/close.svg" alt="" className='w-[20px] h-[20px]' />
                        </button>
                    </Dialog.Title>
                    <div className='px-12 pt-10 space-y-8 flex flex-col items-center'>
                        <p className='text-white'>Are you sure you want to remove this item from your sell item listing?</p>
                        <button onClick={() => props.setIsOpen(false)} className='border-bl-primary w-[301px] border-2 h-14 bg-bl-hilight text-white font-bold rounded-sm hover:bg-bl-hilight-dark transition duration-300'>
                            REMOVE
                        </button>
                        <button onClick={() => props.setIsOpen(false)} className='border-bl-primary w-[301px] border-2 h-14 bg-bl-dark-bg text-white font-bold rounded-sm hover:bg-black transition duration-300'>
                            CANCEL
                        </button>
                    </div>

                </Dialog.Panel>

            </div >
        </Dialog >
    )
}

const InventoryDialog = (props) => {
    const handleSellItem = () => {
        props.setIsOpen(false)
        props.setIsSellConfirm(true)
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
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <Dialog.Panel className="relative w-[989px] pb-12 rounded bg-bl-dark-bg">
                    <Dialog.Title className={'bg-gradient-to-b from-bl-hilight to-bl-dark text-white font-bold h-20 flex items-center justify-center uppercase'}>
                        <p>Choose an item form your inventory</p>
                        <button onClick={() => props.setIsOpen(false)} className='w-[50px] h-[50px] bg-bl-hilight rounded-md absolute right-4 flex items-center justify-center'>
                            <img src="/images/mail/close.svg" alt="" className='w-[20px] h-[20px]' />
                        </button>
                    </Dialog.Title>
                    <div className='flex items-center bg-gradient-to-b from-bl-hilight-dark to-bl-dark pl-6 h-20 border-l-6 border-bl-secondary space-x-2 overflow-x-auto'>
                        <FilterButton label='All' selected={true} />
                        <FilterButton label='Head' />
                        <FilterButton label='Eyes' />
                        <FilterButton label='Mouth' />
                        <FilterButton label='Top' />
                        <FilterButton label='Bottom' />
                        <FilterButton label='Bottom' />
                    </div>
                    <div className='px-8 pt-10 grid grid-cols-3 border p-8'>
                        <div className='col-span-2 grid grid-cols-4'>
                            <Item image={'/images/marketplace/mock_item4.png'} />
                            <Item image={'/images/marketplace/mock_item5.png'} />
                            <Item image={'/images/marketplace/mock_item6.png'} />
                            <Item image={'/images/marketplace/mock_item7.png'} />
                            <Item image={'/images/marketplace/mock_item8.png'} />
                            <Item image={'/images/marketplace/mock_item9.png'} />
                            <Item image={'/images/marketplace/mock_item3.png'} />
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                        </div>
                        <div className='rounded-lg overflow-hidden flex flex-col items-center bg-bl-primary-bg'>
                            <div className='h-[51px] w-full bg-gradient-to-b from-bl-primary-darker to-bl-hilight-dark text-white font-bold flex items-center justify-center'>
                                Perfect Bow
                            </div>
                            <img src="/images/marketplace/mock_item3.png" alt="" />
                            <div className='bg-bl-dark flex flex-col items-start w-auto m-6 rounded-lg px-6 py-2 space-y-4'>
                                <p className='text-bl-primary font-bold'>Item Description</p>
                                <p className='text-white'>
                                    A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.
                                </p>
                                <div className='border-b border-gray-400 w-full'></div>
                                <p className='text-bl-secondary font-bold'>View in market</p>
                                <p className='text-white'>
                                    Starting at 1.50 $
                                </p>
                                <p className='text-white'>
                                    Volumn: 3124 sold in the last 24 hours.
                                </p>
                            </div>
                            <button onClick={handleSellItem} className='border-bl-primary w-[292px] border-2 h-14 bg-bl-hilight text-white font-bold rounded-sm hover:bg-bl-hilight-dark transition duration-300'>
                                SELL ITEM
                            </button>
                        </div>
                    </div>

                </Dialog.Panel>

            </div >
        </Dialog >
    )
}

const FilterButton = (props) => {
    return (
        <button className={props.selected ?
            'font-bold flex-none text-black bg-bl-secondary py-3 w-24 rounded-2xl text-sm'
            :
            'text-white bg-bl-dark flex-none py-3 w-24 rounded-2xl text-sm'}>
            {props.label}
        </button>
    )
}

const SellItemDialog = (props) => {
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
                    <Dialog.Title className={'bg-gradient-to-b from-bl-hilight to-bl-dark text-white font-bold h-20 flex items-center justify-center uppercase'}>
                        <p>SELL ITEM</p>
                        <button onClick={() => props.setIsOpen(false)} className='w-[50px] h-[50px] bg-bl-hilight rounded-md absolute right-4 flex items-center justify-center'>
                            <img src="/images/mail/close.svg" alt="" className='w-[20px] h-[20px]' />
                        </button>
                    </Dialog.Title>
                    <div className='space-y-4 py-8'>
                        <p className='text-white text-center font-bold'>
                            Perfect Bow
                        </p>
                        <p className='text-white text-center'>
                            Are you sure you want to sell this item from your inventory?
                        </p>
                        <div className='flex items-center justify-center gap-24'>
                            <img src="/images/marketplace/mock_item3.png" alt="" className='h-36' />
                            <div>
                                <div className='flex items-center gap-4'>
                                    <p className='text-white'>You'll receive:</p>
                                    <p className='text-white font-bold bg-neutral-700 py-2 w-24 border-l-3 border-bl-secondary pl-2'>0.75 $</p>
                                </div>

                                <div className='flex items-center gap-5'>
                                    <p className='text-white'>Player buy for:</p>
                                    <p className='text-white font-bold'>1.50 $</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            {/* <img src="/images/mall/mockup1.png" alt="" className='h-52' /> */}
                            <img src="/images/marketplace/graph.png" alt="" />
                        </div>
                    </div>

                    <div className='flex items-center justify-center gap-12'>
                        <button onClick={() => props.setIsOpen(false)} className='border-bl-primary w-[292px] border-2 h-14 bg-bl-hilight text-white font-bold rounded-sm hover:bg-bl-hilight-dark transition duration-300'>
                            PUT ON SELL
                        </button>
                        <button onClick={() => props.setIsOpen(false)} className='border-bl-primary w-[292px] border-2 h-14 bg-bl-dark text-white font-bold rounded-sm hover:bg-black transition duration-300'>
                            CANCEL
                        </button>
                    </div>

                </Dialog.Panel>

            </div >
        </Dialog >
    )
}

const BuyItemDialog = (props) => {
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
                    <Dialog.Title className={'bg-gradient-to-b from-bl-hilight to-bl-dark text-white font-bold h-20 flex items-center justify-center uppercase'}>
                        <p>BUY ITEM</p>
                        <button onClick={() => props.setIsOpen(false)} className='w-[50px] h-[50px] bg-bl-hilight rounded-md absolute right-4 flex items-center justify-center'>
                            <img src="/images/mail/close.svg" alt="" className='w-[20px] h-[20px]' />
                        </button>
                    </Dialog.Title>
                    <div className='grid grid-cols-2 m-6 gap-6'>
                        <div className='flex flex-col items-center space-y-4'> 
                            <div className='w-48 h-48 bg-bl-primary-alt2 rounded-lg flex items-center justify-center' >
                                <img src="/images/marketplace/mock_item1_large.png" alt="" className='' />
                            </div>
                            <p className='text-white text-center font-bold'>
                                Perfect shield
                            </p>
                            <div className='bg-black/60 flex flex-col items-start w-auto rounded-lg px-6 py-4 space-y-4'>
                                <p className='text-bl-primary font-bold'>Item Description</p>
                                <p className='text-white'>
                                    A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.
                                </p>
                                <div className='border-b border-gray-400 w-full'></div>
                                <p className='text-bl-secondary font-bold'>View in market</p>
                                <p className='text-white'>
                                    Starting at 20 $
                                </p>
                                <p className='text-white'>
                                    Volumn: 20 sold in the last 24 hours.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='bg-black/60 flex flex-col items-start w-auto rounded-lg px-6 py-2 space-y-4'>
                                <p className='text-bl-primary font-bold'></p>
                                <p className='text-white'>
                                    A perfect golden bow builded by the ancient elf family. Use for right-hand equipment.
                                </p>
                                <div className='border-b border-gray-400 w-full'></div>
                                <p className='text-bl-secondary font-bold'>View in market</p>
                                <p className='text-white'>
                                    Starting at 1.50 $
                                </p>
                                <p className='text-white'>
                                    Volumn: 3124 sold in the last 24 hours.
                                </p>
                            </div>
                            <button onClick={() => props.setIsOpen(false)} className='border-bl-primary w-full border-2 h-14 bg-bl-hilight text-white font-bold rounded-sm hover:bg-bl-hilight-dark transition duration-300'>
                                BUY
                            </button>
                        </div>
                    </div>




                </Dialog.Panel>

            </div >
        </Dialog >
    )
}

const Item = (props) => {
    return (
        <>
            {props.image ?
                <div className='border-2 border-bl-primary bg-gradient-to-b from-bl-primary-darker to-bl-hilight-dark rounded-md w-28 h-28 flex items-center justify-center'>
                    <img src={props.image} alt="" />
                </div>
                :
                <div className='border-2 border-bl-primary bg-gradient-to-b from-bl-primary-darker to-bl-hilight-dark rounded-md w-28 h-28 flex items-center justify-center'>
                    <img src={props.image} alt="" />
                </div>
            }
        </>
    )
}
export default Market