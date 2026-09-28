import httpx

from app.config import settings

async def fetch_account_data(address: str, testnet: bool = False) -> dict:
    async with httpx.AsyncClient(timeout=10.0) as client:
        url = f"https://{"testnet." if testnet else ""}toncenter.com/api/v3/accountStates?address={address}&include_boc=true"
        response = await client.get(
            url=url,
            headers={
                "X-API-Key": f"{settings.toncenter_key.get_secret_value()}"
            }
        )
        response.raise_for_status()
        data = response.json()
    return data

async def fetch_actions(address: str, testnet: bool = False) -> dict:
    async with httpx.AsyncClient(timeout=10.0) as client:
        search_params = {
            "account": address,
            "action_type": "ton_transfer"
        }
        url = f"https://{"testnet." if testnet else ""}toncenter.com/api/v3/actions"
        response = await client.get(
            url=url, 
            params=search_params,
            headers={
                "X-API-Key": f"{settings.toncenter_key.get_secret_value()}"
            }
        )
        response.raise_for_status()
        data = response.json()
    return data
