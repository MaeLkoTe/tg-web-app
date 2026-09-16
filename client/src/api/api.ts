import { FetchAccountDataParams, AccountStatesResponse, FetchActionsParams, ActionsResponse } from "../types/apiTypes"
import { validateActionsResponse } from "./validation"

export const fetchAccountData = async (request: FetchAccountDataParams): Promise<AccountStatesResponse | null> => {
    try{
        const url = `https://${request.testnet? "testnet.": ""}toncenter.com/api/v3/accountStates?address=${request.address}&include_boc=true`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-API-Key": "510137b1d341809fe298ed3bf486cd84e732b55a19f99c08e05cf4fa9a8e46cd"
            }
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
        account: request.address,
        action_type: "ton_transfer"
    })
    try {
        const url = `https://${request.testnet? "testnet.": ""}toncenter.com/api/v3/actions?${searchParams.toString()}`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-API-Key": "510137b1d341809fe298ed3bf486cd84e732b55a19f99c08e05cf4fa9a8e46cd"
            }
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