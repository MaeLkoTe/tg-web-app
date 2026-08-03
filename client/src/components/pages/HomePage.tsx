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
        <div>
            <HeaderContainer height="h-[35vh]" title={<>ton<br/>explorer</>}/>
            <form className={""} onSubmit={handleSubmit}>
                <input 
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
                
                <MySwitchButton id="testnet"/>

                <p>{errorText}</p>
                
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