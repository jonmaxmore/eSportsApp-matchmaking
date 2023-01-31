import BorderButton from './borderbutton'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'
import EventsContent from './eventscontent'

const Events = (props) => {
    return (
        <div className='bg-black'>
            <div className='mx-auto max-w-screen-2xl md:py-20'>
                <h1 className='text-2xl md:text-5xl font-bold text-white mb-4 ml-6'>News & Events</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 py-6 md:py-14 px-4 md:px-28 bg-bl-darker gap-8 ">
                    <img src="/images/news/960x0.jpg" alt="" className='object-cover min-w-full min-h-full h-full' />
                    <div>
                        <div className="">

                            <Tab.Group>
                                <Tab.List as="div" className="flex justify-between mb-6 pb-6 border-b border-bl-gray">
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={
                                                    `${selected ? 'text-bl-secondary' : 'text-white'} text-sm md:text-lg font-bold`
                                                }
                                            >
                                                All
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={
                                                    `${selected ? 'text-bl-secondary' : 'text-white'} text-sm md:text-lg font-bold`
                                                }
                                            >
                                                News
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={
                                                    `${selected ? 'text-bl-secondary' : 'text-white'} text-sm md:text-lg font-bold`
                                                }
                                            >
                                                Events
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={
                                                    `${selected ? 'text-bl-secondary' : 'text-white'} text-sm md:text-lg font-bold`
                                                }
                                            >
                                                Announcement
                                            </button>
                                        )}
                                    </Tab>

                                </Tab.List>
                                {/* <Tab.Panels>
                                    <Tab.Panel>
                                        <EventsContent eventsdata={props.eventsdata} filter={'ALL'}/>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <EventsContent eventsdata={props.eventsdata} filter={'NEWS'}/>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <EventsContent eventsdata={props.eventsdata} filter={'EVENT'} />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <EventsContent eventsdata={props.eventsdata} filter={'ANNOUNCE'}/>
                                    </Tab.Panel>
                                </Tab.Panels> */}
                                <div className='text-2xl justify-center text-center text-white font-bold'><p>No data found</p></div>

                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events