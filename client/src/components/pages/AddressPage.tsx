import { AccountState } from "../../types/apiTypes"
import { useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"

export const AddressPage = () => {
    const address = useParams().addressName
    const [testNetState, setTestnetState] = useSearchParams()
    const boolTestnet = testNetState.get("testnet") === "true"

    const [account, setAccount] = useState<AccountState | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    return (
        <div>
            {"Введённый адрес - " + address}
            <br></br>
            {boolTestnet? "TestNet": "MainNet"}
        </div>
    )
}