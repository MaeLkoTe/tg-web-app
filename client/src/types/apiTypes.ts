export type AccountState = {
    address : string,
    balance: string
}

export type AccountStatesResponse = {
    accounts: AccountState[]
}

export interface FetchAccountDataParams {
    testnet: boolean,
    address: string
}