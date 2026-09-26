import React, { useState, useEffect } from "react";
import { BottomNav } from "./components/BottomNav";
import { HomePage, HistoryPage, StatsPage, SettingsPage, AddressPage } from "./components/pages/import";
import { Page, RecentSearch, Language, Settings} from "./types/types";
import { Route, Routes, useNavigate } from "react-router-dom";

export const App = () => {
    const navigate = useNavigate();
    const pageNavigate = (page: Page) => {
        navigate(page === "home" ? "/" : `/${page}`);
    };

    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(() => {
        try {
            const savedValue = localStorage.getItem("recentSearches");
            if (savedValue !== null){
                return JSON.parse(savedValue)
            }
            return []
        } catch { return [] }
    });
    const [settings, setSettings] = useState<Settings>(() => {
        try {
            const savedValue = localStorage.getItem("settings");
            if (savedValue !== null){
                return JSON.parse(savedValue)
            }
            return {isDarkMode: false, selectedLanguage: "en"}
        } catch {return {isDarkMode: false, selectedLanguage: "en"}}
    });

    const addRecentSearch = (address: string, testnet: boolean) => {
        const currentDate = Date.now()
        const isPrevSearch = (search: RecentSearch) => {
            if (search.value === address && search.testnet === testnet) return false
            return true 
        }

        setRecentSearches((prev => [
            {
                id: currentDate,
                title: "Address", 
                value: address, 
                type: "address", 
                timestamp: currentDate,
                testnet: testnet
            },
        ...prev.filter((search) => isPrevSearch(search))]))
    };

    const settingsToggle = (settings: Settings) => {
        document.documentElement.classList.toggle("dark", settings.isDarkMode);
        
        localStorage.setItem("settings", JSON.stringify(settings));
    };

    const onSaveRecentSearhes = (recentSearches: RecentSearch[]) => {
        localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
    } 

    useEffect(() => settingsToggle(settings), [settings]);
    useEffect(() => {onSaveRecentSearhes(recentSearches)}, [recentSearches])

    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage
                                                RECENT_SEARCHES_LIST={recentSearches}
                                                onAddRecentSearch={addRecentSearch}
                                            />}/>

                <Route path="history" element={<HistoryPage RECENT_SEARCHES_LIST={recentSearches}/>}/>
                <Route path="stats" element={<StatsPage></StatsPage>}/>
                <Route path="settings" element={<SettingsPage settings={settings} setSettings={setSettings}/>}/> {/*в будущем это надо будет переделать - потому, что передавать дохуища пропсов в SettingsPage это пиздец полный - варианты: React Context API | Все настройки объеденить в один объект | Zustand?*/}
                <Route path="address/:addressName" element={<AddressPage
                                                                onAddRecentSearch={addRecentSearch}
                                                            />}/>
            </Routes>
            <BottomNav onChangePage={pageNavigate}/>
            
        </div>
    );
}
