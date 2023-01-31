import { Switch } from '@headlessui/react'

const ToggleSwitch = (props) => {
    return (
        <div className='flex items-center justify-between ml-28 py-8 mr-28'>
            <div className='space-y-4'>
                <p className='text-white font-bold'>{props.label}</p>
                <p className='text-white'>{props.description}</p>
            </div>
            <Switch
                checked={props.enabled}
                onChange={props.setEnabled}
                className={`${props.enabled ? 'bg-bl-primary' : 'bg-bl-hilight'
                    } relative inline-flex h-4 w-12 items-center rounded-full transition duration-150`}
            >
                {/* <span className="sr-only">Enable notifications</span> */}
                <span
                    className={`${props.enabled ? 'translate-x-6' : 'translate-x-0'
                        } inline-block h-6 w-6 transform rounded-full bg-white transition duration-150`}
                />
            </Switch>
        </div>
    )
}

export default ToggleSwitch