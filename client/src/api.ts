interface ApiObject {
    testnet: boolean,
    address: string
}

export const fetchAccountData = async (request: ApiObject): Promise<any | null> => {
    try{
        const response = await fetch(`https://${request.testnet? "testnet.": ""}toncenter.com/api/v3/accountStates?address=${request.address}&include_boc=true`)
        if (response.ok) {
            const data = await response.json()
            return data
        }
        return null
            
    }
    catch(ConnectionError){
        return null
    }
}