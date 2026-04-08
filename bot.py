import logging
import telebot
import os
from dotenv import load_dotenv

load_dotenv("bagira/.env")

TOKEN = os.getenv("TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID"))

logging.basicConfig(level=logging.INFO)

bot = telebot.TeleBot(TOKEN)


@bot.message_handler(commands=["start"])
def start(message):
    bot.send_message(
        message.chat.id,
        "👋 Вітаємо в агентстві «Багіра»!\n\n"
        "Допоможемо підібрати нерухомість \n\n"
        "Напишіть:\n"
        "👉 що шукаєте\n"
        "👉 місто"
    )


@bot.message_handler(func=lambda message: True)
def handle_message(message):
    text = message.text or ""
    username = message.from_user.username or "без_username"

    bot.send_message(
        ADMIN_ID,
        text=f"🔥 Нова заявка:\n\n{text}\n\nВід: @{username}"
    )

    bot.send_message(
        message.chat.id,
        text="✅ Дякую! Ми скоро зв'яжемося з вами"
    )


if __name__ == "__main__":
    print("Bot is starting...")
    try:
        bot.remove_webhook()
        bot.infinity_polling(skip_pending=True, timeout=30, long_polling_timeout=30)
    except Exception as e:
        print("BOT ERROR:", repr(e))