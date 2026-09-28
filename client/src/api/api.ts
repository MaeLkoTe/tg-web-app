import { FetchAccountDataParams, AccountStatesResponse, FetchActionsParams, ActionsResponse } from "../types/apiTypes"
import { validateActionsResponse } from "./validation"

export const fetchAccountData = async (request: FetchAccountDataParams): Promise<AccountStatesResponse | null> => {
    const searchParams = new URLSearchParams({
        address: request.address,
        testnet: `${request.testnet}`
    })
    
    try{
        const url = `http://127.0.0.1:8000/account_data?${searchParams.toString()}`
        const response = await fetch(url, {
            method: "GET",
        });

        if (response.ok) { 
            const data = await response.json(); 
            return data 
        }
        return null
            
    }
    catch(ConnectionError){
        return null
    }
}

export const fetchActions = async (request: FetchActionsParams): Promise<ActionsResponse | null> => {
    const searchParams = new URLSearchParams({
        address: request.address,
        testnet: String(request.testnet)
    })

    try {
        const url = `http://127.0.0.1:8000/actions?${searchParams.toString()}`
        const response = await fetch(url, {
            method: "GET",
        });

        if (!response.ok) {
            return null
        }

        const rawData = await response.json() as unknown; 
        const validateData = validateActionsResponse(rawData);
        return validateData;
    }

    catch(ConnectionError){
        return null
    }
}