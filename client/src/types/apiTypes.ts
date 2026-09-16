export interface FetchAccountDataParams {
    address: string,
    testnet: boolean,    
}

export interface FetchActionsParams extends FetchAccountDataParams{
}

export type AccountState = {
    address : string,
    balance: string
}

export interface ActionsResponse {
  actions: Action[];
}

export interface TonTransferDetails {
  source: string
  destination: string
  value: string
}

export interface Action {
  action_id: string;
  details: TonTransferDetails;
  end_utime: number;
  success: boolean;
  type: "ton_transfer";
}


export interface AccountStatesResponse {
  accounts?: AccountState[];
  address_book?: AddressBook;
  metadata?: Metadata;
}

export type AddressBook = Record<string, AddressBookRow>;

export type Metadata = Record<string, AddressMetadata>;

export interface AddressBookRow {
  domain?: string;
  interfaces?: string[];
  user_friendly?: string;
}

export interface AddressMetadata {
  is_indexed?: boolean;
  token_info?: TokenInfo[];
}

export interface TokenInfo {
  description?: string;
  extra?: Record<string, unknown>;
  image?: string;
  is_nsfw?: boolean;
  is_scam?: boolean;
  name?: string;
  nft_index?: string;
  symbol?: string;
  type?: string;
  valid?: boolean;
}


