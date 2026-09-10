import React from "react";
import { NavigationProp, Page } from "../types/types";
import { NavItem } from "./NavItem";
import { svgIcons } from "../icons/ButtonIcons";
import { useLocation } from "react-router-dom";

const NAV_ITEMS: { id: Page; path: string; title: string; svg: React.ReactNode }[] = [
    { id: "home", path: "/", title: "Home", svg: svgIcons["home"] },
    { id: "history", path: "/history", title: "History", svg: svgIcons["history"] },
    { id: "stats", path: "/stats", title: "Statistic", svg: svgIcons["stats"] },
    { id: "settings", path: "/settings", title: "Settings", svg: svgIcons["settings"] }
];

export const BottomNav = ({onChangePage }: NavigationProp) => {
    const { pathname } = useLocation();
    const navClassName = "flex justify-around items-center fixed bottom-4 left-0 right-0 mx-4.5 py-2 rounded-2xl z-50 bottom-nav"

    return (
        <nav className={navClassName}>
            {NAV_ITEMS.map((item) => (
                <NavItem 
                    key={item.id}
                    title={item.title}
                    content={item.svg}
                    isActive={pathname === item.path}
                    onClick={() => onChangePage(item.id)}
                />
            ))}
        </nav>
    );
};
