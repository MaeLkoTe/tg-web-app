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
    return (
        <nav>
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