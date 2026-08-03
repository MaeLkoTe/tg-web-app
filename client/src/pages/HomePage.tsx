import React, {useState } from "react";
import { RecentSearchItem } from "../components/RecentSearchItem";

const MOCK_RECENT_SEARCHES: { id: number, title: string, value: string}[] = [
    { id: 1, title: "Address", value: "0x123..." },
    { id: 2, title: "Address", value: "EQB..." }
]

export const HomePage = () => {

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
            {MOCK_RECENT_SEARCHES.map((item) => (
                <RecentSearchItem
                    key={item.id}
                    title={item.title}
                    value={item.value}
                    onClick={() => {}}
                />
            )
            )}
        </div>
    );
}