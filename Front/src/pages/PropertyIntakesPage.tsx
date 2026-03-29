import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getPropertyIntakes,
  type PropertyIntake,
} from "../app/propertyIntakes.api";

const cardStyle = {
  background: "#fff",
  borderRadius: 14,
  padding: 16,
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  display: "grid",
  gap: 8,
};

const labelStyle = {
  fontSize: 12,
  color: "#A07C8D",
  textTransform: "uppercase" as const,
  letterSpacing: 0.4,
};

const valueStyle = {
  color: "#2F2430",
  fontSize: 15,
};

export default function PropertyIntakesPage() {
  const [items, setItems] = useState<PropertyIntake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load(): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const data = await getPropertyIntakes();
      setItems(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || "Не вдалося завантажити акти");
      } else {
        setError("Не вдалося завантажити акти");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 32,
              color: "#4A0F28",
            }}
          >
            Акти прийому
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#7A5A68",
              fontSize: 15,
            }}
          >
            Польові акти прийому об&apos;єктів
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={() => void load()}
            style={{
              border: "none",
              background: "#4A0F28",
              color: "#FFFFFF",
              borderRadius: 10,
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Оновити
          </button>

          <Link
            to="/property-intakes/new"
            style={{
              textDecoration: "none",
              background: "#7B2D52",
              color: "#FFFFFF",
              borderRadius: 10,
              padding: "10px 14px",
              fontWeight: 600,
            }}
          >
            + Новий акт
          </Link>
        </div>
      </div>

      {loading && (
        <div
          style={{
            padding: 24,
            borderRadius: 16,
            background: "#FFFFFF",
            color: "#7A5A68",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          Завантаження...
        </div>
      )}

      {error && (
        <div
          style={{
            color: "crimson",
            marginBottom: 16,
            padding: 16,
            borderRadius: 12,
            background: "#FFF5F7",
          }}
        >
          Помилка: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div
          style={{
            padding: 24,
            borderRadius: 16,
            background: "#FFFFFF",
            color: "#7A5A68",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          Поки що немає жодного акту.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}
        >
          {items.map((item) => {
            const address = [
              item.city,
              item.district,
              item.street,
              item.building_number,
               item.apartment_number,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <div key={item.id} style={cardStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#4A0F28",
                      }}
                    >
                      {item.residential_complex || "Акт без назви"}
                    </div>

                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 13,
                        color: "#A07C8D",
                      }}
                    >
                      ID: {item.id}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: "#F6EEF2",
                      color: "#7A5A68",
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.status}
                  </div>
                </div>

                <div>
                  <div style={labelStyle}>Адреса</div>
                  <div style={valueStyle}>{address || "Не вказано"}</div>
                </div>

                <div>
                  <div style={labelStyle}>Власник</div>
                  <div style={valueStyle}>{item.owner_name || "Не вказано"}</div>
                </div>

                <div>
                  <div style={labelStyle}>Телефон</div>
                  <div style={valueStyle}>{item.owner_phone || "Не вказано"}</div>
                </div>

                <div>
                  <div style={labelStyle}>Ціна</div>
                  <div style={valueStyle}>
                    {item.price ? `${item.price} €` : "Не вказано"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}