import asyncio
import logging
from aiogram import Bot, Dispatcher
from dotenv import dotenv_values
import os
from hendlers import router

token = dotenv_values(".env")["TOKEN"]

if not token:
    logging.error("Token not found in .env file")
    exit(1)

logging.basicConfig(level=logging.INFO)
bot = Bot(token=token)
dp = Dispatcher()
dp.include_router(router)

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())