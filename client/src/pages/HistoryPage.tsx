import { HeaderContainer } from "../components/HeaderContainer"
import { RecentSearchItem } from "../components/RecentSearchItem"
import { HistoryPageProp } from "../types/types"

export const HistoryPage = ({ RECENT_SEARCHES_LIST }: HistoryPageProp) => {

    return (
        <div>
            <HeaderContainer height="h-[20vh]" title="History"/>
            {RECENT_SEARCHES_LIST.map((item) => (
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