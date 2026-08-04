import { useState } from "react"

import { HeaderContainer } from "../HeaderContainer"
import { MySelect } from "../UI/select/MySelect"
import { Language } from "../../types/types"
import { OptionItem } from "../OptionItem"
import { optionsSvg } from "../../icons/SettingsIcons"
import { MySwitchButton } from "../UI/button/MySwitchButton"

const languageOptions = [
    { value: "en", label: "English" },
    { value: "ru", label: "Русский" }
];

export const SettingsPage = () => {

    const [selectedLanguage, setLanguage] = useState<Language>("en")
    const [isDarkMode, setDarkMode] = useState<boolean>(false)

    const OptionItems = [
        {
            id: 1, 
            title: "Language select", 
            svg: optionsSvg.language,
            component: <MySelect 
                            id="lang"
                            options={languageOptions}
                            value={selectedLanguage}
                            onChange={(e) => setLanguage(e.target.value as Language)}
                        />
        },

        {
            id: 2,
            title: "Dark Mode",
            svg: optionsSvg.darkmode,
            component: <MySwitchButton
                            checked={isDarkMode}
                            onChange={(e) => setDarkMode(e.target.checked)}
                        />
        },
]

    return (
        <div className="">
            <HeaderContainer height="h-[22vh]" title="Settings"/>
            <div className="flex flex-col mx-8 mt-2 px-5 py-2 rounded-2xl bg-white/70 backdrop-blur-md ring-1 ring-white/60 shadow-lg shadow-black/10">
                {OptionItems.map((item) => (
                    <OptionItem 
                        key={item.id}
                        title={item.title}
                        svg={item.svg}
                        component={item.component}
                    />
                )
                )}
            </div>
        </div>
    )
}