import React from "react";

export type Page = "home" | "history" | "stats" | "settings";

export interface BottomNavProps {
    activePage: Page | string;
    onChangePage: (page: Page | string) => void;
}

export interface NavItemProps {
    title: string;
    content: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}

export interface RecentSearchProps {
    title: string;
    value: string;                  /*в будущем у этого будет тип address | block | hash и т.д.*/
    onClick: () => void;
}