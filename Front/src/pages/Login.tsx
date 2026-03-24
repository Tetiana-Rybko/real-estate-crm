import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../app/auth.api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.access_token);
      navigate("/clients");
    } catch {
      alert("Невірний логін або пароль");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at center, #a24f9a 0%, #6e255e 35%, #2a1026 70%, #14080E 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "70px",
        paddingLeft: "20px",
        paddingRight: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,10,12,0.75) 0%, rgba(10,10,12,0.25) 35%, rgba(10,10,12,0.55) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/logo.png")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 55%",
          backgroundSize: "38%",
          opacity: 0.08,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1180px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "30px",
            flexWrap: "wrap",
            marginBottom: "70px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <img
              src="/logo.png"
              alt="Багіра"
              style={{
                width: "130px",
                height: "130px",
                objectFit: "contain",
                filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.35))",
              }}
            />

            <div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "76px",
                  lineHeight: 0.95,
                  fontWeight: 400,
                  letterSpacing: "0.5px",
                }}
              >
                Багіра
              </div>

              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "34px",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginTop: "10px",
                }}
              >
                Агентство
                <br />
                нерухомості
              </div>
            </div>
          </div>

          <div
            style={{
              color: "#FFFFFF",
              fontSize: "30px",
              fontWeight: 700,
              lineHeight: 1.9,
              textAlign: "right",
              textShadow: "0 4px 12px rgba(0,0,0,0.35)",
              minWidth: "250px",
            }}
          >
            <div>(050) 067-13-56</div>
            <div>(093) 354-94-45</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "520px",
              padding: "34px 34px 30px",
              borderRadius: "20px",
              border: "2px solid rgba(255,255,255,0.45)",
              background: "rgba(255,255,255,0.06)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
              backdropFilter: "blur(4px)",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <h2
              style={{
                margin: 0,
                textAlign: "center",
                color: "#FFFFFF",
                fontSize: "28px",
                fontWeight: 800,
              }}
            >
              Авторизуватися
            </h2>

            <input
              placeholder="admin@bagira.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "16px 18px",
                borderRadius: "14px",
                border: "none",
                outline: "none",
                background: "#F5F5F0",
                color: "#3a2a34",
                fontSize: "18px",
              }}
            />

            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "16px 18px",
                borderRadius: "14px",
                border: "none",
                outline: "none",
                background: "#F5F5F0",
                color: "#3a2a34",
                fontSize: "18px",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px 18px",
                borderRadius: "14px",
                border: "none",
                background: "#F5F5F0",
                color: "#6B5870",
                fontSize: "20px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Увійти
            </button>
          </form>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: "42px",
          top: "38%",
          color: "#FFFFFF",
          fontSize: "28px",
          opacity: 0.9,
          zIndex: 1,
        }}
      >
        ✦
      </div>

      <div
        style={{
          position: "absolute",
          right: "54px",
          bottom: "95px",
          color: "#FFFFFF",
          fontSize: "34px",
          opacity: 0.95,
          zIndex: 1,
        }}
      >
        ✦
      </div>

      <div
        style={{
          position: "absolute",
          right: "26px",
          bottom: "34px",
          color: "#FFFFFF",
          fontSize: "48px",
          opacity: 0.95,
          zIndex: 1,
        }}
      >
        ✦
      </div>
    </div>
  );
}