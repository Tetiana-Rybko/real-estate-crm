export default function KvartiryBucha() {
  const sectionTitleStyle = {
    margin: 0,
    fontSize: 32,
    color: "#4A0F28",
    textAlign: "center" as const,
  };

  const sectionTextStyle = {
    margin: "12px auto 0",
    maxWidth: 760,
    color: "#5E4B55",
    fontSize: 18,
    lineHeight: 1.6,
    textAlign: "center" as const,
  };

  const cardStyle = {
    background: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 10px 30px rgba(74,15,40,0.08)",
  };

  const buttonPrimary = {
    background: "#8B1E3F",
    color: "#fff",
    padding: "14px 22px",
    borderRadius: 10,
    textDecoration: "none",
    display: "inline-block",
    fontWeight: 700,
  };

  const buttonSecondary = {
    background: "rgba(255,255,255,0.16)",
    color: "#fff",
    padding: "14px 22px",
    borderRadius: 10,
    textDecoration: "none",
    display: "inline-block",
    fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.35)",
  };

  return (
    <div style={{ background: "#F6F3F5", color: "#2F2430" }}>
      <section
        style={{
          minHeight: "44vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "linear-gradient(rgba(40,17,27,0.58), rgba(40,17,27,0.58)), url('/Bagira.jpg')",
          backgroundSize: "contain",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#2F2430",
          padding: "32px 24px 56px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "10px 40px",
            boxSizing: "border-box",
            color: "#FFFFFF",
          }}
        >
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img
              src="/LOGO/logo-bagira-w.png"
              alt="Багіра"
              style={{
                width: window.innerWidth < 768 ? 72 : 140,
                height: window.innerWidth < 768 ? 72 : 140,
                objectFit: "contain",
                borderRadius:"30%",

              }}
            />
          </a>

          <div
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              justifyContent: "flex-end",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            <a href="/" style={{ color: "#fff", textDecoration: "none" }}>Головна</a>
            <a href="/#catalog" style={{ color: "#fff", textDecoration: "none" }}>Каталог</a>
            <a href="/#contacts" style={{ color: "#fff", textDecoration: "none" }}>Контакти</a>
          </div>
        </div>

        <div
          style={{
            maxWidth: 980,
            width: "100%",
            textAlign: "center",
            color: "#fff",
            marginTop: 420,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: window.innerWidth < 768 ? 38 : 58,
              lineHeight: 1.1,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "4px",
            }}
          >
            Квартири в Бучі
          </h1>

          <p
            style={{
              margin: "20px auto 0",
              fontSize: window.innerWidth < 768 ? 20 : 24,
              lineHeight: 1.5,
              maxWidth: 900,
            }}
          >
            Купити житло без ризиків з агентством нерухомості Bagira
          </p>

          <p
            style={{
              margin: "18px auto 0",
              maxWidth: 760,
              fontSize: 18,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            Актуальні квартири в Бучі, реальні ціни та повний супровід угоди.
          </p>

          <div
            style={{
              marginTop: 60,
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <a
              href="https://t.me/bagirarieltor"
              target="_blank"
              rel="noreferrer"
              style={buttonPrimary}
            >
              Отримати варіанти в Telegram
            </a>

            <a href="/" style={buttonSecondary}>
              Перейти на головну
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 24px 24px", background: "#F6F3F5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={sectionTitleStyle}>Купити квартиру в Бучі</h2>
          <p style={sectionTextStyle}>
            Допоможемо підібрати квартиру в Бучі під ваш бюджет та побажання.
            Працюємо тільки з перевіреними об’єктами та супроводжуємо угоду.
          </p>

          <div
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            <div style={cardStyle}>
              <div style={{ fontWeight: 700, color: "#4A0F28", fontSize: 20 }}>
                Новобудови в Бучі
              </div>
              <p style={{ marginTop: 12, color: "#5E4B55", lineHeight: 1.6 }}>
                Підбираємо квартири в сучасних житлових комплексах з різними
                площами, плануваннями та умовами покупки.
              </p>
            </div>

            <div style={cardStyle}>
              <div style={{ fontWeight: 700, color: "#4A0F28", fontSize: 20 }}>
                Вторинний ринок
              </div>
              <p style={{ marginTop: 12, color: "#5E4B55", lineHeight: 1.6 }}>
                Допоможемо знайти перевірені квартири на вторинному ринку без
                зайвих ризиків та прихованих проблем.
              </p>
            </div>

            <div style={cardStyle}>
              <div style={{ fontWeight: 700, color: "#4A0F28", fontSize: 20 }}>
                Підбір під бюджет
              </div>
              <p style={{ marginTop: 12, color: "#5E4B55", lineHeight: 1.6 }}>
                Підбираємо варіанти під ваш бюджет: від доступних квартир до
                просторого житла для сім’ї.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 24px", background: "#F1EBEF" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={cardStyle}>
            <h2 style={{ marginTop: 0, color: "#4A0F28", fontSize: 28 }}>
              Чому варто купити квартиру в Бучі?
            </h2>

            <ul style={{ color: "#5E4B55", lineHeight: 1.9, paddingLeft: 20, marginTop: 16 }}>
              <li>Комфортне місто поруч із Києвом</li>
              <li>Розвинена інфраструктура та транспорт</li>
              <li>Популярні житлові комплекси та новобудови</li>
              <li>Вигідніші ціни в порівнянні зі столицею</li>
              <li>Зручний варіант для життя та інвестицій</li>
            </ul>

            <p style={{ color: "#5E4B55", lineHeight: 1.7, marginTop: 20 }}>
              Якщо ви хочете купити квартиру в Бучі, ми допоможемо знайти
              оптимальний варіант: однокімнатну, двокімнатну,трикімнатну квартиру з
              ремонтом або без ремонту, у готовому будинку або в новобудові.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 24px 84px", background: "#F6F3F5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={sectionTitleStyle}>Отримати актуальні пропозиції</h2>
          <p style={sectionTextStyle}>
            На сайті представлена лише частина об’єктів. Напишіть у Telegram —
            підберемо ще квартири в Бучі під ваш запит.
          </p>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              justifyContent: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://t.me/bagirarieltor"
              target="_blank"
              rel="noreferrer"
              style={buttonPrimary}
            >
              Написати в Telegram
            </a>

            <a href="/#contacts" style={{ ...buttonPrimary, background: "#4A0F28" }}>
              Контакти
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}