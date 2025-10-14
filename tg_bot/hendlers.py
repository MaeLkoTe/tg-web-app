from aiogram import Router, F
from aiogram.filters import Command
from aiogram.types import Message, InlineKeyboardButton, WebAppInfo
from aiogram.utils.keyboard import InlineKeyboardBuilder

router = Router()

@router.message(Command("start"))
async def cmd_start(message: Message):
    builder = InlineKeyboardBuilder()
    text = ["Проверить баланс"]
    web_app = WebAppInfo(url="https://telegram.org/apps")
    for i in text:
        builder.add(InlineKeyboardButton(
            text=i, 
            web_app=web_app)
    )
    await message.answer(text=f"Привет, {message.from_user.first_name}",
                         reply_markup=builder.as_markup()
    )

