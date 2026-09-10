import React from "react";

export type Page = "home" | "history" | "stats" | "settings" | "address";
export type SearchType = "address" | "hash" | "block";
export type Language = "ru" | "en";
type TransactionType = "received" | "sent" | "deploy"

export type RecentSearchesList = { 
    id: number,
    title: string, 
    value: string, 
    type: SearchType, 
    timestamp: number
}[]

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
    RECENT_SEARCHES_LIST: RecentSearchesList
}

export interface HistoryPageProp{
    RECENT_SEARCHES_LIST: RecentSearchesList
}

export interface HeaderContainerProps {
    height?: string;
    title: React.ReactNode;
}

export interface OptionItemsProps {
    title: string;
    svg: React.ReactNode
    component: React.ReactNode
}

export interface SettingsPageProps {
    settings: Settings,
    setSettings: (settings: Settings) => void,
}

export interface Settings {
    selectedLanguage: Language,
    isDarkMode: boolean
}

export interface TransactionProps{
    transactionType: TransactionType, 
    transactionDate: number,
    transactionAmount: string,
    transactionToken: string,
    from: string,
    to: string
}