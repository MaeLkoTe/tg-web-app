import httpx
from time import time

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

async def fetch_gram_chart() -> dict:
    end_date = int(time()) 
    request_params = {
        "token": "gram",
        "currency": "usd",
        "start_date": end_date - 7 * 24 * 60 * 60,
        "end_date": end_date,
        "points_count": 100,
    }
    
    async with httpx.AsyncClient(timeout=10.0) as client:
        url = "https://tonapi.io/v2/rates/chart"
        response = await client.get(
            url=url,
            params=request_params,
            headers={
                "Authorization": f"Bearer {settings.tonapi_key.get_secret_value()}",
            },
        )
        response.raise_for_status()
        data = response.json()
    return data