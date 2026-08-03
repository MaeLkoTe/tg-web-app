import React, { useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { HomePage, HistoryPage, StatsPage, SettingsPage } from "./components/pages/import";
import { Page, RecentSearchesList} from "./types/types";

const MOCK_RECENT_SEARCHES: RecentSearchesList = [
    { id: 1, title: "Address", value: "0x123...", type: "address", timestamp: Date.now()},
    { id: 2, title: "Address", value: "EQB...", type: "address", timestamp: Date.now()+1 }
]

export const App = () => {

    const [currentPage, setCurrentPage] = useState<Page>("home");
    
    return (
        <div>
            {currentPage === "home" && <HomePage    
                                            onChangePage={setCurrentPage} 
                                            RECENT_SEARCHES_LIST={MOCK_RECENT_SEARCHES}
                                        />}

            {currentPage === "history" && <HistoryPage RECENT_SEARCHES_LIST={MOCK_RECENT_SEARCHES}></HistoryPage>}
            {currentPage === "stats" && <StatsPage></StatsPage>}
            {currentPage === "settings" && <SettingsPage></SettingsPage>}
            <BottomNav activePage={currentPage} onChangePage={setCurrentPage}/>
        </div>
    );
}
