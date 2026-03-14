import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  getDeals,
  createDeal,
  updateDealStatus,
  deleteDeal,
  type Deal,
  type DealStatus,
  type DealType,
} from "../app/deals.api";

const statuses: DealStatus[] = [
  "new",
  "qualified",
  "showing",
  "negotiation",
  "contract",
  "won",
  "lost",
  "archived",];

const statusTitles: Record<DealStatus, string> = {
  new: "Нова",
  qualified: "Кваліфікація",
  showing: "Показ",
  negotiation: "Переговори",
  contract: "Договір",
  won: "Успішно",
  lost: "Втрачено",
  archived: "Архів",
};

const typeTitles: Record<DealType, string> = {
  sale: "Продаж",
  purchase: "Покупка",
  rent: "Оренда",
};

export default function DealsPage() {
  const [items, setItems] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [type, setType] = useState<DealType>("sale");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [note, setNote] = useState("");
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);

  async function load(): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const data = await getDeals();
      setItems(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data?.detail;
        if (typeof detail === "string") {
          setError(detail);
        } else {
          setError("Не вдалося завантажити угоди");
        }
      } else {
        setError("Не вдалося завантажити угоди");
      }
    } finally {
      setLoading(false);
    }
  }

  async function onCreate(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    try {
      await createDeal({
        title,
        type,
        status: "new",
        client_id: 1,
        realtor_id: 1,
        budget_min: budgetMin ? Number(budgetMin) : undefined,
        budget_max: budgetMax ? Number(budgetMax) : undefined,
        note: note || undefined,
      });

      setTitle("");
      setType("sale");
      setBudgetMin("");
      setBudgetMax("");
      setNote("");

      await load();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data?.detail;

        if (Array.isArray(detail) && detail.length > 0) {
          alert(detail[0]?.msg || "Не вдалося створити угоду");
        } else if (typeof detail === "string") {
          alert(detail);
        } else {
          alert("Не вдалося створити угоду");
        }
      } else {
        alert("Не вдалося створити угоду");
      }
    }
  }

  async function moveDeal(deal: Deal, status: DealStatus): Promise<void> {
    try {
      await updateDealStatus(deal.id, status);
      await load();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data?.detail;
        if (typeof detail === "string") {
          alert(detail);
        } else {
          alert("Не вдалося оновити статус угоди");
        }
      } else {
        alert("Не вдалося оновити статус угоди");
      }
    }
  }
  async function handleDrop(status: DealStatus): Promise<void> {
  if (!draggedDeal) return;

  try {
    await updateDealStatus(draggedDeal.id, status );
    setDraggedDeal(null);
    await load();
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const detail = err.response?.data?.detail;
      if (typeof detail === "string") {
        alert(detail);
      } else {
        alert("Не вдалося перемістити угоду");
      }
    } else {
      alert("Не вдалося перемістити угоду");
    }
  }
}

  async function archiveDeal(id: number): Promise<void> {
  if (!confirm("Перевести угоду в архів?")) return;

  try {
    await updateDealStatus(id, "archived");
    await load();
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const detail = err.response?.data?.detail;
      if (typeof detail === "string") {
        alert(detail);
      } else {
        alert("Не вдалося архівувати угоду");
      }
    } else {
      alert("Не вдалося архівувати угоду");
    }
  }
}

  async function removeDeal(id: number): Promise<void> {
    if (!confirm("Видалити угоду?")) return;

    try {
      await deleteDeal(id);
      await load();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data?.detail;
        if (typeof detail === "string") {
          alert(detail);
        } else {
          alert("Не вдалося видалити угоду");
        }
      } else {
        alert("Не вдалося видалити угоду");
      }
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const grouped = useMemo(() => {
    return {
    new: items.filter((x) => x.status === "new"),
    qualified: items.filter((x) => x.status === "qualified"),
    showing: items.filter((x) => x.status === "showing"),
    negotiation: items.filter((x) => x.status === "negotiation"),
    contract: items.filter((x) => x.status === "contract"),
    won: items.filter((x) => x.status === "won"),
    lost: items.filter((x) => x.status === "lost"),
    archived: items.filter((x) => x.status === "archived"),
    };
  }, [items]);

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
          <h1 style={{ margin: 0 }}>Угоди</h1>
          <p style={{ margin: "8px 0 0", color: "#666" }}>
            Pipeline угод CRM
          </p>
        </div>

        <button onClick={() => void load()}>Оновити</button>
      </div>

      <form
        onSubmit={(e) => void onCreate(e)}
        style={{
          display: "grid",
          gap: 10,
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
          background: "#fff",
          maxWidth: 560,
        }}
      >
        <h3 style={{ margin: 0 }}>Додати угоду</h3>

        <input
          placeholder="Назва угоди"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value as DealType)}>
          <option value="sale">Продаж</option>
          <option value="purchase">Покупка</option>
          <option value="rent">Оренда</option>
        </select>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          <input
            placeholder="Бюджет від"
            type="number"
            value={budgetMin}
            onChange={(e) => setBudgetMin(e.target.value)}
          />

          <input
            placeholder="Бюджет до"
            type="number"
            value={budgetMax}
            onChange={(e) => setBudgetMax(e.target.value)}
          />
        </div>

        <textarea
          placeholder="Нотатка"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          style={{ resize: "vertical" }}
        />

        <button type="submit">Створити</button>
      </form>

      {loading && <div>Завантаження...</div>}

      {error && <div style={{ color: "crimson" }}>Помилка: {error}</div>}

      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            alignItems: "start",
          }}
        >
          {statuses.map((status) => (
            <div
              key={status}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => void handleDrop(status)}
              style={{
                background: "#f7f7f7",
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 12,
                minHeight: 340,
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: 12 }}>
                {statusTitles[status]}
              </h3>

              <div style={{ display: "grid", gap: 10 }}>
                {grouped[status].map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={(e) => {
                       e.dataTransfer.effectAllowed = "move";
                        setDraggedDeal(deal);
                    }}
                    style={{
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: 10,
                      padding: 12,
                      cursor: "grab",
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 16 }}>
                      {deal.title}
                    </div>

                    <div style={{ marginTop: 8, color: "#666" }}>
                      <b>Тип:</b> {typeTitles[deal.type]}
                    </div>

                    <div style={{ marginTop: 4, color: "#666" }}>
                      <b>Бюджет від:</b> {deal.budget_min ?? "—"} €
                    </div>

                    <div style={{ marginTop: 4, color: "#666" }}>
                      <b>Бюджет до:</b> {deal.budget_max ?? "—"} €
                    </div>

                    <div style={{ marginTop: 4, color: "#666" }}>
                      <b>Клієнт ID:</b> {deal.client_id}
                    </div>

                    <div style={{ marginTop: 4, color: "#666" }}>
                      <b>Рієлтор ID:</b> {deal.realtor_id}
                    </div>

                    {deal.note && (
                      <div
                        style={{
                          marginTop: 8,
                          padding: 8,
                          background: "#fafafa",
                          borderRadius: 8,
                          color: "#555",
                        }}
                      >
                        {deal.note}
                      </div>
                    )}

                    <div style={{ display: "grid", gap: 6, marginTop: 12 }}>
                      <select
                        value={deal.status}
                        onChange={(e) =>
                          void moveDeal(deal, e.target.value as DealStatus)
                        }
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {statusTitles[s]}
                          </option>
                        ))}
                      </select>

                      <button onClick={() => void archiveDeal(deal.id)}>
                        В архів
                      </button>
                    </div>
                  </div>
                ))}

                {grouped[status].length === 0 && (
                  <div style={{ color: "#777" }}>Порожньо</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
