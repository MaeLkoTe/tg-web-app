import React, {useState } from "react";
import { RecentSearchItem } from "../components/RecentSearchItem";
import { HeaderContainer } from "../components/HeaderContainer";
import { HomePageProps } from "../types/types";



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
                    onChange={(e) => setInputField(e.target.value)}
                />

                <button 
                    type="submit">
                    {">"}
                </button>
                
                <input
                    type="checkbox"
                    checked={testNetState}
                    onChange={handleOnChange}
                />

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