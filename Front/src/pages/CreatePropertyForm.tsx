import { useState } from "react";
import axios from "axios";
import { createProperty } from "../app/properties.api";

type Props = {
  onCreated: () => Promise<void> | void;
};

export default function CreatePropertyForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [rooms, setRooms] = useState("");
  const [areaTotal, setAreaTotal] = useState("");
  const [floor, setFloor] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createProperty({
        title,
        city: city || undefined,
        district: district || undefined,
        address: address || undefined,
        price: price ? Number(price) : undefined,
        rooms: rooms ? Number(rooms) : undefined,
        area_total: areaTotal ? Number(areaTotal) : undefined,
        floor: floor ? Number(floor) : undefined,
      });

      setTitle("");
      setCity("");
      setDistrict("");
      setAddress("");
      setPrice("");
      setRooms("");
      setAreaTotal("");
      setFloor("");

      await onCreated();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || "Не вдалося створити об'єкт");
      } else {
        setError("Не вдалося створити об'єкт");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: 10,
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        background: "#fff",
      }}
    >
      <h3 style={{ margin: 0 }}>Додати об'єкт</h3>

      <input
        placeholder="Назва об'єкта"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Місто"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <input
        placeholder="Район"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      />

      <input
        placeholder="Адреса"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        placeholder="Ціна"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        placeholder="Кімнат"
        type="number"
        value={rooms}
        onChange={(e) => setRooms(e.target.value)}
      />

      <input
        placeholder="Площа, м²"
        type="number"
        value={areaTotal}
        onChange={(e) => setAreaTotal(e.target.value)}
      />

      <input
        placeholder="Поверх"
        type="number"
        value={floor}
        onChange={(e) => setFloor(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Створення..." : "Створити"}
      </button>

      {error && <div style={{ color: "crimson" }}>Помилка: {error}</div>}
    </form>
  );
}