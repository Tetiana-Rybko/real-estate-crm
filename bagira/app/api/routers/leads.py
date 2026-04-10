import os

import telebot
from dotenv import load_dotenv
from fastapi import APIRouter
from pydantic import BaseModel

load_dotenv()

router = APIRouter()

TOKEN = os.getenv("TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID"))

bot = telebot.TeleBot(TOKEN)


class LeadRequest(BaseModel):
    name: str
    phone: str
    comment: str


@router.post("/api/lead")
def create_lead(data: LeadRequest):
    text = (
        "📩 Нова заявка з сайту\n\n"
        f"👤 Ім'я: {data.name}\n"
        f"📞 Телефон: {data.phone}\n"
        f"💬 Коментар: {data.comment}"
    )
    bot.send_message(ADMIN_ID, text)
    return {"status": "ok"}