import { useState } from "react"

import { HeaderContainer } from "../HeaderContainer"
import { RecentSearchItem } from "../RecentSearchItem"
import { HistoryPageProp, SearchType } from "../../types/types"
import { MySelect } from "../UI/select/MySelect"


const filterOptions: { value: string, label: string }[] = [
    { value: "all", label: "All" },
    { value: "address", label: "Show only addresses" },
    { value: "hash", label: "Show only hashes"},
    { value: "block", label: "Show only blocks"}
]

const sortOptions: { value: string, label: string }[] = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" }
]

export const HistoryPage = ({ RECENT_SEARCHES_LIST }: HistoryPageProp) => {

    const [filterType, setFilterType] = useState<SearchType | "all">("all")
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest") 

    const filtredSearches = filterType !== "all" 
    ? (RECENT_SEARCHES_LIST.filter((item) => item.type === filterType)) 
    : RECENT_SEARCHES_LIST
    
    const finalSearches = sortOrder === "newest" 
    ? [...filtredSearches].sort((a, b) => b.timestamp - a.timestamp) /*Используется спред оператор [...], потому что sort мутирует исходный объект/массив*/
    : [...filtredSearches].sort((a, b) => a.timestamp - b.timestamp)

    return (
        <div>
            <HeaderContainer height="h-[20vh]" title="History"/>

            <MySelect 
                id="filter-searches"    
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as SearchType | "all")}
                options={filterOptions}
            />

            <MySelect
                id="sort-searches"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                options={sortOptions}
            />

            {finalSearches.map((item) => (
                <RecentSearchItem
                    key={item.id}
                    title={item.title}
                    value={item.value}
                    onClick={() => {}}
                />
            )
            )}
        </div>
    )
}