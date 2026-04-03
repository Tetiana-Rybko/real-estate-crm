import logging
import telebot

TOKEN = "8680328711:AAEcyb6HWtH9lf2iM8dkm6JwZsqBdhvDOsc"
ADMIN_ID = -1003697416898

logging.basicConfig(level=logging.INFO)

bot = telebot.TeleBot(TOKEN)


@bot.message_handler(commands=["start"])
def start(message):
    bot.send_message(
        message.chat.id,
        "👋 Вітаємо в агентстві «Багіра»!\n\n"
        "Допоможемо підібрати нерухомість 🏡\n\n"
        "Напишіть:\n"
        "👉 що шукаєте\n"
        "👉 бюджет\n"
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