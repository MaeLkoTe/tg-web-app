import { useState } from "react"
import { HeaderContainer } from "../HeaderContainer"

type Language = "ru" | "en"

export const SettingsPage = () => {

    const [selectedLanguage, setLanguage] = useState<Language>("en")
    const [isDarkMode, setDarkMode] = useState<boolean>(false)

    return (
        <div>
            <HeaderContainer height="h-[22vh]" title="Settings"/>
        </div>
    )
}