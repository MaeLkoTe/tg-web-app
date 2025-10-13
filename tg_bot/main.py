import asyncio
import logging
from aiogram import Bot, Dispatcher
import json
from hendlers import router

logging.basicConfig(level=logging.INFO)
with open(r'C:\Users\rcher\VsCode\tg-web-app\tg_bot\.config.json', 'r') as config_file:
    config_data = json.load(config_file)
    bot = Bot(token=config_data["bot_token"])
dp = Dispatcher()
dp.include_router(router)

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())