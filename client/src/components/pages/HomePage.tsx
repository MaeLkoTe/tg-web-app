import React, {useState } from "react";
import { RecentSearchItem } from "../RecentSearchItem";
import { HeaderContainer } from "../HeaderContainer";
import { HomePageProps } from "../../types/types";
import { MySwitchButton } from "../UI/button/MySwitchButton";
import { Address } from "@ton/core";
import { useNavigate } from "react-router-dom";

export const HomePage = ({ onChangePage, RECENT_SEARCHES_LIST }: HomePageProps) => {
    const [inputField, setInputField] = useState("");
    const [testNetState, setTestNetState] = useState(false);
    const [errorText, setErrorText] = useState("")
    const navigate = useNavigate();
    
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const address = inputField.trim();
        const validationError = validateTonAddress(address, testNetState);

        if (validationError !== null) {
            setErrorText(validationError);
            return;
        } else {
            setErrorText("")
            navigate(`/address/${encodeURIComponent(address)}?testnet=${testNetState}`)
            
            console.log("Переход на страницу address")
        }
    }

    const validateTonAddress = function (
        value: string,
        testnet: boolean,
    ): string | null {
        const address = value.trim();

        if (!address) {
            return "Введите адрес";
        }

        try {
            if (address.includes(":")) {
                // Строго проверяем raw-формат перед разбором.
                if (!/^-?\d+:[a-fA-F0-9]{64}$/.test(address)) {
                    return "Некорректный raw-адрес";
                }

                Address.parseRaw(address);
            } else {
                const parsed = Address.parseFriendly(address);

                if (parsed.isTestOnly && !testnet) {
                    return "Это testnet-адрес. Включите testnet";
                }
            }

            return null;
        } catch {
            return "Некорректный TON-адрес. Проверьте скопированное значение";
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTestNetState(e.target.checked);
    };

    return (
        <div className="flex flex-col items-center">
            <HeaderContainer height="h-[35vh]" title={<>Ton<br/>Explorer</>}/>
            <form className="w-full px-4 -mt-8 z-10 relative" onSubmit={handleSubmit}>
                <div className="mx-auto max-w-[90vw] flex items-center gap-3 rounded-full ring-1 px-4 py-3 glass-panel">
                    <input 
                        className="w-full bg-transparet outline-none text-muted" 
                        id="address-input"
                        type="text"
                        value={inputField}
                        placeholder="Input address"
                        onChange={(e) => setInputField(e.target.value)}
                    />

                    <button 
                        type="submit"
                        className="grid place-items-center h-9 w-9 rounded-full text-slate-900/70 hover:bg-white/60 active:scale-95 transition"
                    >
                        <svg className="h-5 w-5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none">
                            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <p className="ml-[6vw] mt-2.5">{errorText}</p>

                <div className="mt-4 flex justify-center">
                    <label className="inline-flex items-center gap-3 rounded-full ring-1 px-4 py-2 cursor-pointer select-none glass-panel">
                    <span className="text-sm font-medium text-main">testnet</span>
                        <MySwitchButton 
                            id="testnet"
                            checked={testNetState}
                            onChange={handleOnChange}    
                        />
                    </label>
                </div>
        

            </form>

            {RECENT_SEARCHES_LIST.map((item) => (
                <RecentSearchItem
                    key={item.id}
                    title={item.title}
                    value={item.value}
                    onClick={() => onChangePage("history")}
                />
            )
            )}
        </div>
    );
}