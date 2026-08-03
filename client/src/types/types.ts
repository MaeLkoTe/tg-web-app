import { HistoryPage } from './../pages/HistoryPage';
import React from "react";

export type Page = "home" | "history" | "stats" | "settings";

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

export interface NavigationProp {
    onChangePage: (page: Page) => void;
}

export interface BottomNavProps extends NavigationProp {
    activePage: Page;
}

export interface HomePageProps extends NavigationProp{
    RECENT_SEARCHES_LIST: { id: number, title: string, value: string}[]
}

export type HistoryPageProp = Omit<HomePageProps, "onChangePage">

export interface HeaderContainerProps {
    height?: string;
    title: React.ReactNode;
}