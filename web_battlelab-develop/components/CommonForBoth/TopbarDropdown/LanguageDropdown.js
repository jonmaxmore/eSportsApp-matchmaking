import React, { useEffect, useState } from "react"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"
import { get, map } from "lodash"
import { withTranslation } from "react-i18next"
import { Menu } from '@headlessui/react'

//i18n
import i18n from "../../../i18n"
import languages from "../../common/languages"

const LanguageDropdown = () => {
  // Declare a new state variable, which we'll call "menu"
  const [selectedLang, setSelectedLang] = useState("")
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const currentLanguage = localStorage.getItem("I18N_LANGUAGE")
    setSelectedLang(currentLanguage)
  }, [])

  const changeLanguageAction = lang => {
    //set language as i18n
    i18n.changeLanguage(lang)
    localStorage.setItem("I18N_LANGUAGE", lang)
    setSelectedLang(lang)
  }

  const toggle = () => {
    setMenu(!menu)
  }

  return (
    <>
      <Menu as="div" className="relative inline-block text-left z-50 right-2">
        <div>
          <Menu.Button className={"flex items-center px-2 py-1 gap-2 rounded-md bg-bl-dark hover:bg-bl-hilight-dark border border-bl-primary text-white hover:text-bl-primary transition duration-300"}>
            <img src="/images/home/ic_flag_english.svg" alt="English Flag" />
            <p className='text-md font-bold '>ENG</p>
            <img src="/images/home/ic_dropdown.png" alt="drop down icon" className='w-3' />
          </Menu.Button>
        </div>
        <Menu.Items className={"absolute bg-bl-hilight w-44 rounded-md top-0 right-0 mt-9 flex flex-col overflow-hidden divide-y divide-bl-hilight-dark"}>

          {map(Object.keys(languages), key => (
            <Menu.Item key={key}
              onClick={() => changeLanguageAction(key)}
              className={`notify-item ${selectedLang === key ? "active" : "none"
                }`}>
              {({ active }) => (
                <a
                  className={`${active ? 'bg-bl-primary text-black' : 'text-white'
                    } flex py-2 px-4 items-center gap-2`}
                  href="#"
                >
                  <img  src={get(languages,`${key}.flag.src`)} alt="lang-flag"  style={{ width:'15%'}} />
                  {get(languages, `${key}.label`)}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </>
  )
}

export default withTranslation()(LanguageDropdown)
