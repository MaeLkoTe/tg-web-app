import { useEffect, useState } from "react"

import { HeaderContainer } from "../HeaderContainer"
import { MySelect } from "../UI/select/MySelect"
import { SettingsPageProps, Language, Settings } from "../../types/types"
import { OptionItem } from "../OptionItem"
import { optionsSvg } from "../../icons/SettingsIcons"
import { MySwitchButton } from "../UI/button/MySwitchButton"
import { error } from "console"


const languageOptions = [
    { value: "en", label: "English" },
    { value: "ru", label: "Русский" }
];

export const SettingsPage = ({ settings, setSettings} : SettingsPageProps) => {
    const OptionItems = [
        {
            id: 1, 
            title: "Language select", 
            svg: optionsSvg.language,
            component: <MySelect 
                            id="lang"
                            options={languageOptions}
                            value={settings.selectedLanguage}
                            onChange={(e) => setSettings({...settings, selectedLanguage: e.target.value as Language})}
                        />
        },

        {
            id: 2,
            title: "Dark Mode",
            svg: optionsSvg.darkmode,
            component: <MySwitchButton
                            checked={settings.isDarkMode}
                            onChange={(e) => {setSettings({...settings, isDarkMode: e.target.checked})}}
                        />
        },
]

    return (
        <div className="">
            <HeaderContainer height="h-[22vh]" title="Settings"/>
            <div className="flex flex-col mx-8 mt-2 px-5 py-2 rounded-2xl ring-1 glass-panel">
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