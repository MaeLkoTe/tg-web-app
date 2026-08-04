import { RecentSearchProps } from "../types/types";

export const RecentSearchItem = ({ title, value, onClick }: RecentSearchProps) => {
    
    return (
        <div onClick={onClick} className="my-2 items-center bg-white/70 backdrop-blur-md ring-1 ring-white/60 rounded-full shadow-lg shadow-black/10 cursor-pointer gap-3 px-4 py-3">
            <h4>{title}</h4>
            <p>{value}</p>
        </div>
    )
};