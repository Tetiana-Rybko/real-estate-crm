import { useMemo, useState } from "react";

type Property = {
  id: number;
  title: string;
  location: string;
  address: string;
  price: string;
  details: string[];
  extra?: string;
  mainImage?: string;
  images?: string[];
  video?: string;
  isHot?: boolean;
};

export default function LandingPage() {
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [activeMedia, setActiveMedia] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
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
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  };

  const buttonPrimaryStyle = {
    display: "inline-block",
    background: "#4A0F28",
    color: "#FFFFFF",
    textDecoration: "none",
    borderRadius: 10,
    padding: "14px 22px",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
  };

  const buttonSecondaryStyle = {
    display: "inline-block",
    background: "#FFFFFF",
    color: "#4A0F28",
    textDecoration: "none",
    borderRadius: 10,
    padding: "14px 22px",
    fontWeight: 700,
    border: "1px solid #D9C3CF",
    cursor: "pointer",
  };

  const properties = useMemo<Property[]>(
    () => [
      {
          id: 1,
        title: "Квартира бункер з газом",
        location: "Локація",
        address: "Адреса",
        price: "25 500$",
        details: ["Фото та опис додаються"],

        video:"/bunker/main.mp4",

      },
      {
        id: 2,
        title: "Простора 1 кімнатна квартира",
        location: "Михайлівка-Рубежівка,Гранд Віллас",
        address: "",
        price: "25 000$",
        details: [
            "Площа 46,5 м²",
            "Можливість зробити дворівневу",
            "Електро опалення",
            "Під сертифікат обговорюється",
        ],
        extra: "Гарна квартира з можливістю зробити її дворівневою",
        mainImage: "/willas/main.jpg",
        images: [
          "/willas/main.jpg",
          "/willas/2.jpg",
          "/willas/3.jpg",
          "/willas/4.jpg",
          "/willas/5.jpg",
        ],
        isHot: true,
      },

      {
        id: 3,
        title: "Ексклюзивний таунхаус з відеооглядом",
        location: "Ірпінь",
        address: "6 Лінія, 21/4",
        price: "88 000$",
        details: [
              "Площа 110,2 м²",
              "Ділянка 1,3 сотки",
              "1 пов.: кухня-студія + спальня, 2 пов.: 3 спальні, 2 санвузли",
              "Газове опалення",
              "Централізована вода, 2 септики",
              "Тепла підлога + радіатори",
              "Електрика 7 кВт",
              "Лазерна стяжка",
        ],
        extra: "Якісний таунхаус з усіма комунікаціями — ідеальний варіант для сім’ї",
        video: "/irpin_6line/main.mp4",
        images: [
          "/irpin_6line/1.jpg",
          "/irpin_6line/2.jpg",
          "/irpin_6line/3.jpg",
          "/irpin_6line/4.jpg",

        ],
        isHot: true,
      },

      {
        id: 4,
        title: "Таунхаус",
        location: "Буча",
        address: "вул. Яблунська, 39-л",
        price: "65 000$",
        details: [
           "Площа 123 м²",
           "Ділянка 1,6 сотки",
           "Газ, котел",
           "Електрика",
           "Центральна каналізація",
           "Свердловина",
           "З наповненням",],
      },

      {
          id: 5,
        title: "Дворівнева 3 к. кв. в ЖК RIVIERA",
        location: "м. Гостомель",
        address: "вул. Ювілейна, 14/2",
        price: "64 000 $",
        details: [
          "Газ, двоконтурний котел",
          "Електрика",
          "Централізована каналізація",
          "Централізована вода",
        ],
        extra: "Простора дворівнева квартира в новому будинку. Гарячий варіант для сімʼї або інвестиції.",
        mainImage: "/riviera/main.jpg",
        images: [
          "/riviera/main.jpg",
          "/riviera/2.jpg",
          "/riviera/3.jpg",
          "/riviera/4.jpg",
          "/riviera/5.jpg",
        ],
        isHot: true,

      },
      {
        id: 6,
        title: "Квартира №6 — заповнюється",
        location: "Локація",
        address: "Адреса",
        price: "Ціна",
        details: ["Фото та опис додаються"],
      },
    ],
    []
  );

  return (
    <div style={{ background: "#F6F3F5", color: "#2F2430" }}>
      <section
        style={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "linear-gradient(rgba(40,17,27,0.45), rgba(40,17,27,0.45)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px 24px",
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
            alignItems: "center",
            padding: "24px 40px",
            color: "#FFFFFF",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src="/logo-bagira-w.png"
              alt="Багіра"
              style={{
                width: window.innerWidth < 768 ? 110 : 170,
                height: window.innerWidth < 768 ? 110 : 170,
                objectFit: "contain",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
              }}
            />
          </div>

          <nav
            style={{
              position: "absolute",
              top: 20,
              right: 40,
              display: "flex",
              gap: 24,
              color: "#fff",
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            <a href="#about" style={{ color: "#FFFFFF", textDecoration: "none" }}>
              Про нас
            </a>
            <a href="#catalog" style={{ color: "#FFFFFF", textDecoration: "none" }}>
              Каталог
            </a>
            <a href="#jobs" style={{ color: "#FFFFFF", textDecoration: "none" }}>
              Вакансії
            </a>
            <a href="#contacts" style={{ color: "#FFFFFF", textDecoration: "none" }}>
              Контакти
            </a>
          </nav>
        </div>

        <div
          style={{
            maxWidth: 900,
            textAlign: "center",
            color: "#FFFFFF",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 56,
              lineHeight: 1.1,
              fontWeight: 800,
            }}
          >
            ПІДБЕРЕМО НЕРУХОМІСТЬ БЕЗ СТРЕСУ ТА РИЗИКІВ
          </h1>

          <p
            style={{
              margin: "20px auto 0",
              maxWidth: 760,
              fontSize: 22,
              lineHeight: 1.5,
              color: "#F3EAF0",
            }}
          >
            Перевірені об’єкти • Реальні ціни • Повний супровід угоди
          </p>

          <p
            style={{
              margin: "18px auto 0",
              maxWidth: 760,
              fontSize: 18,
              lineHeight: 1.5,
              color: "#F3EAF0",
            }}
          >
            Працюємо з перевіреними об&apos;єктами та супроводжуємо вас до передачі ключів
          </p>
            <div
              style={{
                marginTop: 12,
                fontSize: 16,
                color: "#ffffff",
                opacity: 0.9,
              }}
            >
             Працюємо в Ірпені, Бучі, Гостомелі та прилеглих населених пунктах
           </div>

          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="tel:+380753549445" style={buttonPrimaryStyle}>
              📞 Отримати консультацію
            </a>

            <a
              href="https://t.me/bagirarieltor"
              target="_blank"
              rel="noreferrer"
              style={buttonSecondaryStyle}
            >
              Написати в Telegram
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px 20px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {[
            { value: "10+", label: "років досвіду" },
            { value: "600+", label: "клієнтів" },
            { value: "300+", label: "угод" },
            { value: "100%", label: "уваги до клієнта" },
          ].map((item) => (
            <div key={item.label} style={{ ...cardStyle, textAlign: "center" }}>
              <div style={{ fontSize: 42, fontWeight: 800, color: "#4A0F28" }}>{item.value}</div>
              <div style={{ marginTop: 8, color: "#6E5B65", fontSize: 16 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" style={{ padding: "80px 24px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 28,
            alignItems: "center",
          }}
        >
          <div
            style={{
              minHeight: 520,
              borderRadius: 20,
              backgroundImage: "url('/agent-photo.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          />

          <div>
            <h2 style={{ ...sectionTitleStyle, textAlign: "left" }}>Про мене та мою команду</h2>

            <p style={{ ...sectionTextStyle, textAlign: "left", margin: "16px 0 0" }}>
              Вітаємо в «Багіра»!
            </p>

            <p style={{ ...sectionTextStyle, textAlign: "left", margin: "12px 0 0" }}>
              Ми — команда професіоналів у сфері нерухомості, яка допомагає клієнтам безпечно
              купувати, продавати, інвестувати та знаходити найкращі рішення під свій запит.
            </p>

            <p style={{ ...sectionTextStyle, textAlign: "left", margin: "12px 0 0" }}>
              Ми працюємо на ринку вже багато років, добре знаємо кожний куточок у радіусі 100 км
              від Києва, супроводжуємо клієнта на кожному етапі та беремо на себе всі складні
              питання: перевірку документів, переговори, організацію переглядів і повний супровід
              угоди.
            </p>

            <p style={{ ...sectionTextStyle, textAlign: "left", margin: "12px 0 0" }}>
              Наша мета — зробити процес з нерухомістю максимально простим, зрозумілим і безпечним
              для вас.
            </p>

            <div
              style={{
                marginTop: 24,
                display: "grid",
                gap: 10,
                color: "#4A0F28",
                fontWeight: 600,
              }}
            >
              <div>✔️ Багато років досвіду на ринку нерухомості</div>
              <div>✔️ Працюємо в Ірпені, Бучі, Гостомелі та прилеглих населених пунктах</div>
              <div>✔️ Перевіряємо документи перед угодою</div>
              <div>✔️ Допомагаємо уникнути ризиків і переплат</div>
              <div>✔️ Супроводжуємо клієнта до результату</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: "#F1EBEF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={sectionTitleStyle}>Наші послуги</h2>
          <p style={sectionTextStyle}>Допомагаємо продати, здати або знайти житло під ваш запит</p>

          <div
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {[
              "Підбір квартири під ваш бюджет і запит",
              "Продаж нерухомості",
              "Інвестиції в нерухомість",
              "Оренда житла",
              "Повний юридичний супровід",
              "Консультація по ринку",
            ].map((service) => (
              <div key={service} style={cardStyle}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#4A0F28" }}>{service}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", ...cardStyle, textAlign: "center" }}>
          <h2 style={sectionTitleStyle}>Не знаєте, яку квартиру обрати?</h2>
          <p style={sectionTextStyle}>
            На ринку багато варіантів, але не всі безпечні. Ми підберемо перевірені об&apos;єкти,
            які підходять саме вам, і допоможемо уникнути помилок.
          </p>

          <div style={{ marginTop: 28 }}>
            <a href="tel:+380753549445" style={buttonPrimaryStyle}>
              📞 Зателефонувати зараз
            </a>
          </div>
        </div>
      </section>

      <section id="catalog" style={{ padding: "80px 24px", background: "#F1EBEF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={sectionTitleStyle}>ГАРЯЧІ ПРОПОЗИЦІЇ 🔥🔥🔥</h2>
          <p style={sectionTextStyle}>Перевірені об&apos;єкти з реальними цінами</p>

          <div
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
            {properties.map((property) => (
              <div key={property.id} style={{ ...cardStyle, padding: 16 }}>
                <div
                  style={{
                    height: 220,
                    borderRadius: 14,
                    marginBottom: 16,
                    overflow: "hidden",
                    background: "#E9DDE3",
                    position: "relative",
                  }}
                >
                  {property.video ? (
                    <video
                      src={property.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={property.mainImage}
                      onClick={(e) => {
                         e.stopPropagation();
                         setActiveVideo(property.video!);
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        cursor: "pointer",
                      }}
                   />
               ) : property.mainImage ? (
                 <img
                    src={property.mainImage}
                    alt={property.title}
                    onClick={(e) => {
                       e.stopPropagation();
                        setActiveMedia(property.mainImage!);
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                  }}
                />
               ) : null}

                  {property.isHot ? (
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: "rgba(74,15,40,0.92)",
                        color: "#fff",
                        padding: "6px 10px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      HOT
                    </div>
                  ) : null}
                </div>

                <div style={{ fontSize: 22, fontWeight: 700, color: "#4A0F28", lineHeight: 1.3 }}>
                  {property.title}
                </div>

                <div style={{ marginTop: 8, color: "#6E5B65", fontSize: 15 }}>
                  {property.location}, {property.address}
                </div>

                <div
                  style={{
                    marginTop: 14,
                    display: "grid",
                    gap: 8,
                    color: "#4F4048",
                    fontSize: 15,
                    lineHeight: 1.5,
                  }}
                >
                  {property.details.map((detail) => (
                    <div key={detail}>• {detail}</div>
                  ))}
                </div>

                {property.extra ? (
                  <div style={{ marginTop: 14, color: "#6E5B65", fontSize: 15, lineHeight: 1.6 }}>
                    {property.extra}
                  </div>
                ) : null}

                <div style={{ marginTop: 18, fontSize: 28, fontWeight: 800, color: "#4A0F28" }}>
                  {property.price}
                </div>

                <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {property.images?.length ? (
                    <button type="button" style={buttonSecondaryStyle} onClick={() => setActiveProperty(property)}>
                      Дивитись усі фото
                    </button>
                  ) : null}
                  <a href="tel:+380753549445" style={buttonPrimaryStyle}>
                    Дізнатись деталі
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="jobs" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", ...cardStyle, textAlign: "center" }}>
          <h2 style={sectionTitleStyle}>Вакансії</h2>
          <p style={sectionTextStyle}>
            Шукаємо активних рієлторів у команду Bagira. Якщо вам цікава нерухомість, продажі та
            розвиток — зв&apos;яжіться з нами.
          </p>

          <div style={{ marginTop: 28 }}>
            <a href="tel:+380753549445" style={buttonPrimaryStyle}>
              📞 Дізнатись про вакансії
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: "#4A0F28", color: "#FFFFFF" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: 38 }}>Маємо багато класних варіантів для перегляду</h2>

          <p
            style={{
              margin: "16px auto 0",
              maxWidth: 760,
              fontSize: 20,
              lineHeight: 1.6,
              color: "#F3EAF0",
            }}
          >
            Для отримання додаткової інформації та запису телефонуйте прямо зараз
          </p>

          <div
            style={{
              marginTop: 28,
              display: "grid",
              gap: 10,
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            <a href="tel:+380753549445" style={{ color: "#FFFFFF", textDecoration: "none" }}>
              +38 (075) 354 94 45
            </a>

          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", ...cardStyle }}>
          <h2 style={sectionTitleStyle}>Залиште заявку</h2>
          <p style={sectionTextStyle}>Ми підберемо для вас варіанти та передзвонемо протягом години</p>

          <form style={{ marginTop: 28, display: "grid", gap: 14 }}>
            <input
              placeholder="Ваше ім'я"
              style={{
                padding: 14,
                borderRadius: 10,
                border: "1px solid #D9C3CF",
                fontSize: 16,
              }}
            />
            <input
              placeholder="Телефон"
              style={{
                padding: 14,
                borderRadius: 10,
                border: "1px solid #D9C3CF",
                fontSize: 16,
              }}
            />
            <textarea
              placeholder="Коментар"
              rows={5}
              style={{
                padding: 14,
                borderRadius: 10,
                border: "1px solid #D9C3CF",
                fontSize: 16,
                resize: "vertical",
              }}
            />
            <button type="button" style={buttonPrimaryStyle}>
              Отримати варіанти
            </button>
          </form>
        </div>
      </section>

      <section id="contacts" style={{ padding: "80px 24px 100px", background: "#F1EBEF" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={sectionTitleStyle}>Контакти</h2>
          <p style={sectionTextStyle}>Зв&apos;яжіться з нами зручним для вас способом</p>

          <div
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            <div style={cardStyle}>
             <div style={{ fontWeight: 700, color: "#4A0F28", fontSize: 18 }}>
               Телефон
             </div>
             <div style={{ marginTop: 12 }}>
               +38 (075) 354 94 45
           </div>
         </div>

        <div style={cardStyle}>
          <div style={{ fontWeight: 700, color: "#4A0F28", fontSize: 18 }}>
            Telegram
          </div>
        <div style={{ marginTop: 12 }}>
          <a
            href="https://t.me/bagirarieltor"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#2F2430", textDecoration: "none" }}
          >
           @bagirarieltor
         </a>
       </div>
     </div>

     <div style={cardStyle}>
       <div style={{ fontWeight: 700, color: "#4A0F28", fontSize: 18 }}>
         Email
       </div>
       <div style={{ marginTop: 12 }}>
         ukrainarieltorbagira@gmail.com
       </div>
     </div>

          </div>
            <div
               style={{
                 marginTop: 40,
                 textAlign: "center",
                 fontSize: 24,
                 fontWeight: 700,
                 color: "#4A0F28",
               }}
            >
              Соціальні мережі
            </div>

            <div
               style={{
                 display: "grid",
                 gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                 gap: 16,
                 marginTop: 20,
               }}
            >
               {/* Instagram */}
               <div style={cardStyle}>
               <div style={{ fontWeight: 700, color: "#4A0F28", fontSize: 18 }}>
                   Instagram
               </div>
               <div style={{ marginTop: 12 }}>
                 <a
                  href="https://instagram.com/bagira.irpin"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#2F2430", textDecoration: "none" }}
                 >
                  @bagira.irpin
                </a>
              </div>
            </div>

            {/* TikTok */}
            <div style={cardStyle}>
            <div style={{ fontWeight: 700, color: "#4A0F28", fontSize: 18 }}>
              TikTok
            </div>
            <div style={{ marginTop: 12 }}>
              <a
                href="https://www.tiktok.com/@bagira.irpin"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#2F2430", textDecoration: "none" }}
              >
                @bagira.irpin
              </a>
            </div>
          </div>

          {/* YouTube */}
         <div style={cardStyle}>
           <div style={{ fontWeight: 700, color: "#4A0F28", fontSize: 18 }}>
             YouTube
           </div>
           <div style={{ marginTop: 12 }}>
             <a
               href="https://youtube.com/@bagira-irpin"
               target="_blank"
               rel="noreferrer"
               style={{ color: "#2F2430", textDecoration: "none" }}
              >
               @bagira-irpin
             </a>
           </div>
         </div>
       </div>
        </div>
      </section>

      {activeProperty?.images?.length ? (
        <div
          onClick={() => setActiveProperty(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(22, 10, 16, 0.82)",
            zIndex: 999,
            padding: 24,
            overflowY: "auto",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              maxWidth: 1100,
              margin: "40px auto",
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              boxShadow: "0 20px 60px rgba(0,0,0,0.24)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                marginBottom: 20,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#4A0F28" }}>
                  {activeProperty.title}
                </div>
                <div style={{ marginTop: 6, color: "#6E5B65" }}>
                  {activeProperty.location}, {activeProperty.address}
                </div>
              </div>

              <button type="button" onClick={() => setActiveProperty(null)} style={buttonSecondaryStyle}>
                Закрити
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              {activeProperty.images.map((image:string, index: number) => (
                <div key={image} style={{ borderRadius: 16, overflow: "hidden", background: "#f5f1f3" }}>
                  <img
                    src={image}
                    alt={activeProperty.title}
                     onClick={(e) => {
                       e.stopPropagation();
                       setActiveMedia(image);
                       setActiveVideo(null);
                       setActiveIndex(index);
                   }}
                    style={{ width: "100%", height: 240, objectFit: "cover", display: "block",cursor: "pointer" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
       {(activeMedia || activeVideo) && (
  <div
    onClick={() => {
      setActiveMedia(null);
      setActiveVideo(null);
    }}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      cursor: "pointer",
      padding: 20,
    }}
  >
    <div
      onClick={(e) => {
        e.stopPropagation();
        setActiveMedia(null);
        setActiveVideo(null);
      }}
      style={{
        position: "absolute",
        top: 20,
        right: 30,
        color: "#fff",
        fontSize: 30,
        cursor: "pointer",
      }}
    >
      ✕
    </div>

    {!activeVideo && activeProperty?.images?.length ? (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveIndex((prev) =>
            prev === 0 ? (activeProperty?.images?.length ?? 1) - 1 : prev - 1
          );
        }}
        style={{
          position: "absolute",
          left: 20,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#fff",
          fontSize: 48,
          lineHeight: 1,
          cursor: "pointer",
          userSelect: "none",
          padding: "8px 12px",
        }}
      >
        ‹
      </div>
    ) : null}

    {!activeVideo && activeProperty?.images?.length ? (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveIndex((prev) =>
            prev === (activeProperty?.images?.length ?? 1) - 1 ? 0 : prev + 1
          );
        }}
        style={{
          position: "absolute",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#fff",
          fontSize: 48,
          lineHeight: 1,
          cursor: "pointer",
          userSelect: "none",
          padding: "8px 12px",
        }}
      >
        ›
      </div>
    ) : null}

    {activeVideo ? (
      <video
        src={activeVideo}
        controls
        autoPlay
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
          cursor: "default",
        }}
      />
    ) : (
      <img
        src={activeProperty?.images?.[activeIndex] || activeMedia!}
        alt="Preview"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
          objectFit: "contain",
          cursor: "default",
        }}
      />
    )}
  </div>
)}
        <div style={{ marginTop: 40 }}>
  <h2>Квартиры в городах</h2>

  <ul>
    <li><a href="/kvartiry-irpen">Квартиры в Ирпене</a></li>
    <li><a href="/kvartiry-bucha">Квартиры в Буче</a></li>
    <li><a href="/kvartiry-gostomel">Квартиры в Гостомеле</a></li>
  </ul>
</div>
    </div>
  );
}
