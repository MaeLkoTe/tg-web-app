import React, {useState } from "react";
import { RecentSearchItem } from "../RecentSearchItem";
import { HeaderContainer } from "../HeaderContainer";
import { HomePageProps } from "../../types/types";
import { MySwitchButton } from "../UI/button/MySwitchButton";

export const HomePage = ({ onChangePage, RECENT_SEARCHES_LIST }: HomePageProps) => {

    const [inputField, setInputField] = useState("");
    const [testNetState, setTestNetState] = useState(false);
    const [errorText, setErrorText] = useState("")
    
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (inputField.trim() === ""){
            setErrorText("Поле адресса не может быть пустым")
        } else {
            setErrorText("")
            console.log("Отправлено", inputField)
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTestNetState(e.target.checked);
    };

    return (
        <div className="flex flex-col items-center">
            <HeaderContainer height="h-[35vh]" title={<>ton<br/>explorer</>}/>
            <form className="w-full px-4 -mt-8 z-10 relative" onSubmit={handleSubmit}>
                <div className="mx-auto max-w-[90vw] flex items-center gap-3 rounded-full bg-white/55 backdrop-blur-md ring-1 ring-white/60 shadow-lg shadow-black/10 px-4 py-3">
                    <input 
                        className="w-full bg-transparet outline-none text-slate-900 placeholder:text-slate-500" 
                        id="address-input"
                        type="text"
                        value={inputField}
                        placeholder="Input addres"
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
                    <label className="inline-flex items-center gap-3 rounded-full bg-white/70 backdrop-blur-md ring-1 ring-white/60 shadow-lg shadow-black/10 px-4 py-2 cursor-pointer select-none">
                    <span className="text-sm font-medium text-slate-900/80">testnet</span>
                        <MySwitchButton 
                            id="testnet"
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