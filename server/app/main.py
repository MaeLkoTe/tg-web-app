from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.services.tonapi import fetch_ton_price

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
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
