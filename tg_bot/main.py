import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters.command import Command
import json

logging.basicConfig(level=logging.INFO)
with open(r'C:\Users\rcher\VsCode\tg-web-app\tg_bot\.config.json', 'r') as config_file:
    config_data = json.load(config_file)
    bot = Bot(token=config_data["bot_token"])
dp = Dispatcher()

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    await message.answer(f"Привет, {message.from_user.full_name}")

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())