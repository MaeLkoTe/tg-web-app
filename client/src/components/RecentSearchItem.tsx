import { RecentSearchProps } from "../types/types";

export const RecentSearchItem = ({ title, value, onClick }: RecentSearchProps) => {
    
    return (
        <div onClick={onClick} className="my-2 items-center ring-1 rounded-full cursor-pointer gap-3 px-4 py-3 glass-panel">
            <h4>{title}</h4>
            <p>{value}</p>
        </div>
    )
};