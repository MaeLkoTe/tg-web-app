import httpx

from app.config import settings

async def fetch_ton_price() -> dict:
    async with httpx.AsyncClient(timeout=10.0) as client:
        url = "https://tonapi.io/v2/rates?tokens=gram&currencies=usd"
        response = await client.get(
            url=url,
            headers={
                "Authorization": f"Bearer {settings.tonapi_key.get_secret_value()}",
            },
        )
        response.raise_for_status()
        data = response.json()
    return data
