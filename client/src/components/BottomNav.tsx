import React from "react";
import { BottomNavProps, Page } from "../types/types";
import { NavItem } from "./NavItem";
import { svgIcons } from "../icons/ButtonIcons";

const NAV_ITEMS: { id: Page; title: string; svg: React.ReactNode }[] = [
    { id: "home", title: "Home", svg: svgIcons["home"] },
    { id: "history", title: "History", svg: svgIcons["history"] },
    { id: "stats", title: "Statistic", svg: svgIcons["stats"] },
    { id: "settings", title: "Settings", svg: svgIcons["settings"] }
];

export const BottomNav = ({ activePage, onChangePage }: BottomNavProps) => {

    const navClassName = "flex justify-around items-center fixed bottom-4 left-0 right-0 mx-4.5 py-2 border-t border-gray-200 bg-gray-300/30 backdrop-blur-md rounded-2xl shadow-lg shadow-black/10 z-50"

    return (
        <nav className={navClassName}>
            {NAV_ITEMS.map((item) => (
                <NavItem 
                    key={item.id}
                    title={item.title}
                    content={item.svg}
                    isActive={activePage === item.id}
                    onClick={() => onChangePage(item.id)}
                />
            ))}
        </nav>
    );
};