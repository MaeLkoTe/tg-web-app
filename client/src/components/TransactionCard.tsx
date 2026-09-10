import { TransactionProps } from "../types/types"

export const TransactionCard = ({transactionType, transactionDate, transactionAmount, transactionToken, from, to}: TransactionProps)  => {
    const appearance = {
        sent: { title: "Sent", icon: "↗", color: "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200" },
        received: { title: "Received", icon: "↙", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200" },
        deploy: { title: "Deployed", icon: "◇", color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200" }
    }[transactionType];
    const date = new Date(transactionDate);

    return (
        <article className="address-panel transaction-card">
            <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-slate-100 pb-3 dark:border-blue-800/50">
                <div className="flex min-w-0 items-center gap-2">
                    <span aria-hidden="true" className={`grid size-7 shrink-0 place-items-center rounded-full font-semibold ${appearance.color}`}>{appearance.icon}</span>
                    <h3 className="text-main break-words text-xs font-semibold uppercase tracking-wide">
                        {appearance.title} {transactionAmount} {transactionToken}
                    </h3>
                </div>
                <time dateTime={date.toISOString()} className="text-muted text-[11px] tabular-nums">
                    {date.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </time>
            </header>
            <dl className="mt-3 grid grid-cols-2 gap-4 text-xs">
                <div className="min-w-0">
                    <dt className="text-muted mb-1">From</dt>
                    <dd className="text-main truncate font-medium" title={from}>{from}</dd>
                </div>
                <div className="min-w-0">
                    <dt className="text-muted mb-1">To</dt>
                    <dd className="text-main truncate font-medium" title={to}>{to}</dd>
                </div>
            </dl>
        </article>
    )
}
