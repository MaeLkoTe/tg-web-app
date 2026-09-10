import { FetchAccountDataParams, AccountStatesResponse } from "./types/apiTypes"

export const fetchAccountData = async (request: FetchAccountDataParams): Promise<AccountStatesResponse | null> => {
    try{
        const response = await fetch(`https://${request.testnet? "testnet.": ""}toncenter.com/api/v3/accountStates?address=${request.address}&include_boc=true`)
        const data = await response.json()
        if (response.ok) { return data }
        return null
            
    }
    catch(ConnectionError){
        return null
    }
}