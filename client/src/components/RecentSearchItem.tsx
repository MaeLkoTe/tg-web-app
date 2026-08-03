import { RecentSearchProps } from "../types/types";

export const RecentSearchItem = ({ title, value, onClick }: RecentSearchProps) => (
    <div onClick={onClick} className="card-style">
        <h4>{title}</h4>
        <p>{value}</p>
    </div>
);