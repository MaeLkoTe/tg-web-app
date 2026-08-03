import React, { useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { HomePage } from "./pages/HomePage";

export const App = () => {

    const [currentPage, setCurrentPage] = useState("home");
    
    return (
        <div>
            {currentPage === "home" && <HomePage></HomePage>}
            {currentPage === "history" && <div>History Page</div>}
            {currentPage === "stats" && <div>Stats Page</div>}
            {currentPage === "settings" && <div>Settings Page</div>}
            <BottomNav activePage={currentPage} onChangePage={setCurrentPage}/>
        </div>
    );
}
