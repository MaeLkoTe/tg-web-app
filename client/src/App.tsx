import React, { useState, useEffect } from "react";
import { BottomNav } from "./components/BottomNav";
import { HomePage, HistoryPage, StatsPage, SettingsPage, AddressPage } from "./components/pages/import";
import { Page, RecentSearchesList, Language, Settings} from "./types/types";
import { Route, Routes, useNavigate } from "react-router-dom";

const MOCK_RECENT_SEARCHES: RecentSearchesList = [
    { id: 1, title: "Address", value: "0x123...", type: "address", timestamp: Date.now()},
    { id: 2, title: "Address", value: "EQB...", type: "address", timestamp: Date.now()+1 }
]

export const App = () => {
    const navigate = useNavigate();

    const pageNavigate = (page: Page) => {
        navigate(page === "home" ? "/" : `/${page}`);
    };

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
        <div>
            <Routes>
                <Route path="/" element={<HomePage
                                                onChangePage={pageNavigate}
                                                RECENT_SEARCHES_LIST={MOCK_RECENT_SEARCHES}
                                            />}/>

                <Route path="history" element={<HistoryPage RECENT_SEARCHES_LIST={MOCK_RECENT_SEARCHES}/>}/>
                <Route path="stats" element={<StatsPage></StatsPage>}/>
                <Route path="settings" element={<SettingsPage settings={settings} setSettings={setSettings}/>}/> {/*в будущем это надо будет переделать - потому, что передавать дохуища пропсов в SettingsPage это пиздец полный - варианты: React Context API | Все настройки объеденить в один объект | Zustand?*/}
                <Route path="address/:addressName" element={<AddressPage/>}/>
            </Routes>
            <BottomNav onChangePage={pageNavigate}/>
            
        </div>
    );
}
