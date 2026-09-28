from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.services.tonapi import fetch_ton_price, fetch_gram_chart
from app.services.toncenter import fetch_account_data, fetch_actions

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://maelkote.github.io/tg-web-app/"
    ],
    allow_methods=["GET"],
)

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/ton_price")
async def get_ton_price():
    data = await fetch_ton_price()
    return { "price": data["rates"]["GRAM"]["prices"]["USD"] }

@app.get("/charts")
async def get_ton_charts():
    data = await fetch_gram_chart()
    return data

@app.get("/account_data")
async def get_account_data(address: str, testnet: bool = False):
    data = await fetch_account_data(address=address, testnet=testnet)
    return data 

@app.get("/actions")
async def get_account_actions(address: str, testnet: bool = False):
    data = await fetch_actions(address=address, testnet=testnet)
    return data


