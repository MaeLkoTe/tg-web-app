import React, { useState, useEffect } from "react";
import { BottomNav } from "./components/BottomNav";
import { HomePage, HistoryPage, StatsPage, SettingsPage } from "./components/pages/import";
import { Page, RecentSearchesList, Language, Settings} from "./types/types";

const MOCK_RECENT_SEARCHES: RecentSearchesList = [
    { id: 1, title: "Address", value: "0x123...", type: "address", timestamp: Date.now()},
    { id: 2, title: "Address", value: "EQB...", type: "address", timestamp: Date.now()+1 }
]

export const App = () => {
    const [currentPage, setCurrentPage] = useState<Page>("home");

    const [settings, setSettings] = useState<Settings>(() => {
        const savedValue = localStorage.getItem("settings")
        if (savedValue !== null){
            return JSON.parse(savedValue)
        }
        return {isDarkMode: false, selectedLanguage: "en"}
    });

    const settingsToggle = (settings: Settings) => {
        document.documentElement.classList.toggle("dark", settings.isDarkMode);
        
        localStorage.setItem("settings", JSON.stringify(settings))
    }

    useEffect(() => settingsToggle(settings), [settings])

    return (
        <div className="">
            {currentPage === "home" && <HomePage
                                            onChangePage={setCurrentPage}
                                            RECENT_SEARCHES_LIST={MOCK_RECENT_SEARCHES}
                                        />}

            {currentPage === "history" && <HistoryPage RECENT_SEARCHES_LIST={MOCK_RECENT_SEARCHES}></HistoryPage>}
            {currentPage === "stats" && <StatsPage></StatsPage>}
            {currentPage === "settings" && <SettingsPage settings={settings} setSettings={setSettings}></SettingsPage>} {/*в будущем это надо будет переделать - потому, что передавать дохуища пропсов в SettingsPage это пиздец полный - варианты: React Context API | Все настройки объеденить в один объект | Zustand?*/}
            <BottomNav activePage={currentPage} onChangePage={setCurrentPage}/>
        </div>
    );
}
