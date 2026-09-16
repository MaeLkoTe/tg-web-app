import { AccountState, AccountStatesResponse, Action } from "../../types/apiTypes"
import { fetchAccountData, fetchActions } from "../../api/api"
import { TransactionCard } from "../TransactionCard"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { fromNano, Address } from "@ton/core"

type ValidationResult =
    {
      success: true;
      account: AccountState;
    }
  | {
      success: false;
      error: string;
    };

export const AddressPage = () => {
    const address = useParams().addressName
    const [testNetState, setTestnetState] = useSearchParams()
    const boolTestnet = testNetState.get("testnet") === "true"

    const [account, setAccount] = useState<AccountState | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const [actions, setActions] = useState<Action[]>([])
    const [actionsLoading, setaActionLoading] = useState<boolean>(false)
    const [actionsError, setActionError] = useState<string | null>(null)

    const [inputField, setInputField] = useState<string>("")

    const getTransactionType = (
        action: Action,
        currentAddress: string
    ): "sent" | "received" | null => {
        try {
            const {parsedSourceAddress, parsedDestinationAddress, parsedAddress} = {
                parsedSourceAddress: Address.parse(action.details.source),
                parsedDestinationAddress: Address.parse(action.details.destination),
                parsedAddress: Address.parse(currentAddress)
            }
            
            if (parsedSourceAddress.equals(parsedAddress)) return "sent" 
            else if (parsedDestinationAddress.equals(parsedAddress)) return "received"
            return null
        }
        catch { return null }

    };

    const requestValidation = (data: AccountStatesResponse | null): ValidationResult => {
        
        if (data === null) return {
            success: false,
            error: "Неудачный запрос к API"
        }
        
        else if (!data.accounts?.length) return {
            success: false,
            error: "Аккаунт не найден"
        }

        else if (data.address_book === undefined) return {
            success: false,
            error: "Адресс аккаунта не найден"
        }
        
        const rawAddress = data.accounts[0].address
        const userFriendlyAddress = data.address_book[rawAddress].user_friendly

        return {
            success: true,
            account: {
                address: userFriendlyAddress || rawAddress,
                balance: data.accounts[0].balance
            }
        }
    }

    useEffect(() => {
        let isActual = true;

        const requestAccountHandle = async () => {
            if (address === undefined){
                setError("Что-то пошло не так")
                return
            }

            setLoading(true)
            setError(null)
            setAccount(null)
            const request = {address, testnet: boolTestnet}
            const data = await fetchAccountData(request)
            console.log(data)
            
            if (isActual === false) return

            const validationResult = requestValidation(data)
            if (validationResult.success === false) {
                setError(validationResult.error)
                setLoading(false)
                return
            } else {
                setAccount(validationResult.account)
                setLoading(false)
            }
        }

        requestAccountHandle();

        return () => {
            isActual = false
        };
    }, [address, boolTestnet])

    useEffect(() => {
        let isActual = true;

        const requestActionHandle = async () => {
            if (address === undefined) { 
                setActionError("Что-то пошло не так с транзакциями")
                return
             }
            setaActionLoading(true);
            setActionError(null);
            setActions([])


            const request = {address, testnet: boolTestnet}
            const data = await fetchActions(request)

            if (isActual === false) { return }

            if (data === null) {
                setActionError("Что-то пошло не так")
                setaActionLoading(false)
                return
            }

            setActions(data.actions)   
            setaActionLoading(false) 
        }

        requestActionHandle();

        return () => {
            isActual = false
        }
    }, [address, boolTestnet])
    return (
        <div>
            {
                loading? 
                "Загрузка...":
                error?
                    error:
                    account?
                        <main className="address-page">
                            <header className="address-header">
                                <span className="grid size-7 place-items-center rounded-full bg-cyan-400/25 text-cyan-100" aria-hidden="true">◇</span>
                                <h1 className="text-sm font-semibold tracking-wide">Ton Explorer</h1>
                                <span className="ml-auto rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider">{boolTestnet ? "Testnet" : "Mainnet"}</span>
                            </header>
                            <form className="px-4 pt-4 sm:px-6" onSubmit={(event) => event.preventDefault()}>
                                <div className="flex items-center gap-3 rounded-xl bg-slate-100/80 px-3 py-2 ring-1 ring-slate-200/60 focus-within:ring-indigo-400 dark:bg-blue-950/50 dark:ring-blue-800">
                                    <input 
                                        className="min-w-0 w-full bg-transparent text-sm outline-none text-main" 
                                        id="address-input"
                                        type="text"
                                        value={inputField}
                                        placeholder="Enter address"
                                        aria-label="Адрес для поиска"
                                        onChange={(e) => setInputField(e.target.value)}
                                    />

                                    <button 
                                        type="submit"
                                        aria-label="Поиск"
                                        className="grid place-items-center h-9 w-9 rounded-full text-slate-900/70 hover:bg-white/60 active:scale-95 transition"
                                    >
                                        <svg className="h-5 w-5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none">
                                            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                            <div className="address-layout">
                            <aside className="min-w-0 space-y-3" aria-label="Данные аккаунта">
                                <div className="address-panel p-4">
                                    <h2 className="text-muted mb-2 text-[10px] font-medium uppercase tracking-widest">Address</h2>
                                    <p className="text-main break-all font-mono text-sm leading-relaxed">{account.address}</p>
                                </div>
                                <div className="address-panel p-4">
                                    <h2 className="text-muted mb-1 text-[10px] font-medium uppercase tracking-widest">Balance</h2>
                                    <p className="text-main break-all text-2xl font-semibold tabular-nums">{fromNano(account.balance)} <span className="text-muted text-xs font-medium">Gram</span></p>
                                </div>
                            </aside>
                            <section className="min-w-0" aria-labelledby="transaction-heading">
                                <h2 id="transaction-heading" className="text-main mb-4 text-xs font-semibold uppercase tracking-wider">Transaction timeline</h2>
                                <p className="text-muted mb-3 text-xs"></p>
                                <div className="transaction-list">
                                    {actionsLoading && <p>Загрузка истории…</p>}

                                    {actionsError && <p>{actionsError}</p>}

                                    {!actionsLoading && !actionsError && (
                                        actions.length > 0?
                                            actions.map((item) => {
                                                if (address === undefined) return null
                                                const transactionType = getTransactionType(item, address)

                                                if (transactionType === null) return null
                                                
                                                return (
                                                    <TransactionCard 
                                                        transactionType={transactionType}
                                                        transactionDate={item.end_utime*1000}
                                                        transactionAmount={fromNano(item.details.value)}
                                                        transactionToken="Gram"
                                                        from={Address.parse(item.details.source).toString()}
                                                        to={Address.parse(item.details.destination).toString()}
                                                    />
                                            );
                                        })
                                        : <p>Список транзакций пустой</p>
                                    )}
                                </div>
                            </section>
                            </div>
                        </main>:
                        "Аккаунт не найден"
            }
        </div>
    )
}
