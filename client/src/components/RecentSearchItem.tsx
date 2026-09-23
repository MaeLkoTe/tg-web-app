import { RecentSearchProps } from "../types/types";

export const RecentSearchItem = ({ title, value, testnet, timestamp, onClick }: RecentSearchProps) => {
    const shortAddress = value.length > 22 ? `${value.slice(0, 10)}…${value.slice(-8)}` : value;
    const date = new Date(timestamp);
    const hasDate = !Number.isNaN(date.getTime());
    const network = testnet ? "Testnet" : "Mainnet";

    return (
        <button
            type="button"
            onClick={onClick}
            className="recent-search-card group"
            aria-label={`Открыть ${title}: ${value}, ${network}`}
            title={value}
        >
            <span className="recent-search-icon" aria-hidden="true">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                    <path d="M5 7h14v12H5zM5 7V5h11v2M15 12h4v3h-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
            </span>
            <span className="min-w-0 flex-1">
                <span className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span className="text-muted text-xs font-medium">{title}</span>
                    <span className={`recent-search-network ${testnet ? "recent-search-testnet" : "recent-search-mainnet"}`}>
                        <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                        {network}
                    </span>
                </span>
                <span className="text-main block truncate font-mono text-sm font-semibold tracking-tight sm:text-base">
                    {shortAddress}
                </span>
                {hasDate && (
                    <time dateTime={date.toISOString()} className="text-muted mt-1.5 block text-[11px] tabular-nums">
                        {date.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </time>
                )}
            </span>
            <span className="recent-search-arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
        </button>
    )
};
