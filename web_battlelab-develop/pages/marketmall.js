import { useState } from 'react'
import Link from 'next/link'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'
import Layout from '../components/layout'
import Button from '../components/button'
import { Dialog } from '@headlessui/react'

const items = [
    {
        'name': 'Gacha Pack x 10 (+1)',
        'price': '1.50',
        'image': 'mockup1.png'
    },
    {
        'name': 'Gacha x 1',
        'price': '3.00',
        'image': 'mockup2.png'
    },
    {
        'name': 'Sapphire Gems x 10',
        'price': '5.00',
        'image': 'mockup3.png'
    },
    {
        'name': 'Boost Potions x 5',
        'price': '1.50',
        'image': 'mockup4.png'
    },
    {
        'name': 'Boost Potions x 5',
        'price': '1.50',
        'image': 'mockup4.png'
    },
    {
        'name': 'Perfect Shield',
        'price': '1.50',
        'image': 'mockup5.png'
    },
    {
        'name': 'Perfect Ring',
        'price': '1.50',
        'image': 'mockup6.png'
    },
    {
        'name': 'Lv. Boost Mushroom',
        'price': '1.50',
        'image': 'mockup7.png'
    },
    {
        'name': 'Viking Helmet',
        'price': '1.50',
        'image': 'mockup8.png'
    },
    {
        'name': 'Boost Potions x 5',
        'price': '1.50',
        'image': 'mockup4.png'
    },

]

const Market = (props) => {
    const [username, setUsername] = useState('Kumachan')
    const [action, setAction] = useState(5)
    const [isOpen, setIsOpen] = useState(false)
    const [isItemOpen, setIsItemOpen] = useState(false)
    const [isInventoryOpen, setIsInventoryOpen] = useState(false)

    return (
        <Layout>
            <MarketMallLayout username={username} isInventoryOpen={isInventoryOpen} setIsInventoryOpen={setIsInventoryOpen}>
                <ConfirmDialog isOpen={isOpen} setIsOpen={setIsOpen} />
                <InventoryDialog isOpen={isInventoryOpen} setIsOpen={setIsInventoryOpen} />
                <ItemDialog isOpen={isItemOpen} setIsOpen={setIsItemOpen} />
                <div className='bg-bl-darker border w-full'>
                    <Tab.Group>
                        <Tab.List className={'flex items-center justify-between px-14 mx-14 py-6 border-b'}>
                            <TabHead label={'Hot'} />
                            <TabHead label={'Item'} />
                            <TabHead label={'Head'} />
                            <TabHead label={'Top'} />
                            <TabHead label={'Bottom'} />
                            <TabHead label={'Shoes'} />
                            <TabHead label={'Weapon'} />
                        </Tab.List>
                        <Tab.Panels>
                            {/* Head */}
                            <Tab.Panel>
                                <div className='h-[760px] overflow-hidden overflow-y-scroll mx-14 py-12'>
                                    <div className="grid grid-cols-5 gap-8">
                                        {items.map((item, index) => (
                                            <ItemCard {...item} setIsOpen={setIsItemOpen} key={index} />
                                        ))}
                                    </div>
                                </div>
                            </Tab.Panel>
                            {/* Item */}
                            <Tab.Panel>
                                <div className='h-[760px] overflow-hidden overflow-y-scroll'>

                                </div>
                            </Tab.Panel>
                            {/* Head */}
                            <Tab.Panel>
                                <div className='h-[760px] overflow-hidden overflow-y-scroll'>

                                </div>
                            </Tab.Panel>
                            {/* Top */}
                            <Tab.Panel>
                                <div className='h-[760px] overflow-hidden overflow-y-scroll'>

                                </div>
                            </Tab.Panel>
                            {/* Bottom */}
                            <Tab.Panel>
                                <div className='h-[760px] overflow-hidden overflow-y-scroll'>

                                </div>
                            </Tab.Panel>
                            {/* Shoes */}
                            <Tab.Panel>
                                <div className='h-[760px] overflow-hidden overflow-y-scroll'>

                                </div>
                            </Tab.Panel>
                            {/* Weapon */}
                            <Tab.Panel>
                                <div className='h-[760px] overflow-hidden overflow-y-scroll'>

                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </MarketMallLayout>
        </Layout>
    )
}

const TabHead = (props) => {
    return (
        <Tab as={Fragment}>
            {({ selected }) => (
                <button
                    className={
                        selected ? 'text-bl-secondary font-bold text-2xl' : 'text-white text-2xl'
                    }
                >
                    {props.label}
                </button>
            )}
        </Tab>
    )
}

const ItemCard = (props) => {
    return (
        <div className='relative h-[324px] border-2 border-bl-primary bg-gradient-to-b from-bl-primary-alt4 to-bl-primary-alt4-dark flex flex-col items-center space-y-2'>
            <div className='w-full bg-gradient-to-b from-bl-primary-alt4 to-bl-primary-alt4-dark h-12 flex items-center justify-center'>
                <p className='text-white text-xl'>{props.name}</p>
            </div>
            {/* <div className='flex-shrink-0 border w-50 h-50 '></div> */}
            <img src={`/images/mall/${props.image}`} alt="" className='h-40' />
            <p className='text-white text-3xl font-bold'>{props.price} $</p>
            <button onClick={() => props.setIsOpen(true)} className='bg-gradient-to-b from-bl-secondary-light to-bl-secondary-dark h-14 w-32 rounded-full absolute -bottom-4'>
                <p className='font-bold text-xl'>BUY</p>
            </button>
        </div>
    )
}

const MarketMallLayout = (props) => {
    return (
        <>
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
                    <>

                        {props.children}

                    </>
                </div>
            </div>
        </>
    )
}

const MarketTitle = (props) => {
    return (
        <h1 className='text-4xl text-white font-bold'>Item Mall</h1>
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

const ItemDialog = (props) => {
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
                        <p>BUY GACHA PACK x 10 (+1)</p>
                        <button onClick={() => props.setIsOpen(false)} className='w-[50px] h-[50px] bg-bl-hilight rounded-md absolute right-4 flex items-center justify-center'>
                            <img src="/images/mail/close.svg" alt="" className='w-[20px] h-[20px]' />
                        </button>
                    </Dialog.Title>
                    <div className='my-8 mx-24 space-y-6'>
                        <p className='text-white text-center'>
                            Are you sure you want to buy the following item?
                        </p>
                        <div className='border-2 border-bl-primary bg-gradient-to-b from-bl-primary-alt4 to-bl-darker flex justify-center'>
                            <img src="/images/mall/mockup1.png" alt="" className='h-52'/>
                        </div>
                        <div className='bg-bl-shade flex flex-col items-start w-auto rounded-lg space-y-4 p-6'>
                            <p className='text-bl-primary font-bold'>Item Description</p>
                            <p className='text-white'>
                            This is a Gacha Box especially designed to celebrate the 1-year anniversary of Battlelab. 
                            </p>
                            <p className='text-bl-secondary'>Right-click to use the item in your profile inventory.</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-center gap-12'>
                        <button onClick={() => props.setIsOpen(false)} className='border-bl-primary w-[292px] border-2 h-14 bg-bl-hilight text-white font-bold rounded-sm hover:bg-bl-hilight-dark transition duration-300'>
                            BUY
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

const InventoryDialog = (props) => {
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
                            <button onClick={() => props.setIsOpen(false)} className='border-bl-primary w-[292px] border-2 h-14 bg-bl-hilight text-white font-bold rounded-sm hover:bg-bl-hilight-dark transition duration-300'>
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