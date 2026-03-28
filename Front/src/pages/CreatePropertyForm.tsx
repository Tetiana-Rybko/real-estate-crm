import { useEffect, useState } from "react";
import axios from "axios";
import {
  createProperty,
  updateProperty,
  type Property,
} from "../app/properties.api";

type Props = {
  onCreated: () => Promise<void> | void;
  initialData?: Property | null;
  onCancelEdit?: () => void;
};

export default function CreatePropertyForm({
  onCreated,
  initialData = null,
  onCancelEdit,
}: Props) {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [rooms, setRooms] = useState("");
  const [areaTotal, setAreaTotal] = useState("");
  const [floor, setFloor] = useState("");
  const [classType, setClassType] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [heating, setHeating] = useState("");
  const [furniture, setFurniture] = useState("");
  const [commission, setCommission] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(initialData?.title ?? "");
    setCity(initialData?.city ?? "");
    setDistrict(initialData?.district ?? "");
    setAddress(initialData?.address ?? "");
    setPrice(
      initialData?.price !== null && initialData?.price !== undefined
        ? String(initialData.price)
        : ""
    );
    setClassType(initialData?.class_type ?? "");
    setYearBuilt(
      initialData?.year_built !== null && initialData?.year_built !== undefined
      ? String(initialData.year_built)
      : ""
    );
    setHeating(initialData?.heating ?? "");
    setFurniture(initialData?.furniture ?? "");
    setCommission(
      initialData?.commission !== null && initialData?.commission !== undefined
      ? String(initialData.commission)
      : ""
    );

    setRooms(
      initialData?.rooms !== null && initialData?.rooms !== undefined
        ? String(initialData.rooms)
        : ""
    );
    setAreaTotal(
      initialData?.area_total !== null && initialData?.area_total !== undefined
        ? String(initialData.area_total)
        : ""
    );
    setFloor(
      initialData?.floor !== null && initialData?.floor !== undefined
        ? String(initialData.floor)
        : ""
    );
    setError(null);
  }, [initialData]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title,
      city: city || undefined,
      district: district || undefined,
      address: address || undefined,
      price: price ? Number(price) : undefined,
      rooms: rooms ? Number(rooms) : undefined,
      area_total: areaTotal ? Number(areaTotal) : undefined,
      floor: floor ? Number(floor) : undefined,
    };

    try {
      if (initialData) {
        await updateProperty(initialData.id, payload);
      } else {
        await createProperty(payload);
      }

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
        setError(err.response?.data?.detail || "Не вдалося зберегти об'єкт");
      } else {
        setError("Не вдалося зберегти об'єкт");
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
        gap: 16,
        marginBottom: 28,
        padding: 20,
        borderRadius: 16,
        background: "#FFFFFF",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#4A0F28",
          }}
        >
          {initialData ? "Редагувати об'єкт" : "Додати об'єкт"}
        </div>

        {initialData && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            style={{
              border: "none",
              background: "#ECECEC",
              color: "#333333",
              borderRadius: 10,
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Скасувати
          </button>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
        }}
      >
        <input
          placeholder="Назва об'єкта"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />

        <input
          placeholder="Місто"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />

        <input
          placeholder="Район"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />

        <input
          placeholder="Адреса"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />

        <input
          placeholder="Ціна"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />

        <input
          placeholder="Кімнат"
          type="number"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />

        <input
          placeholder="Площа, м²"
          type="number"
          value={areaTotal}
          onChange={(e) => setAreaTotal(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />

        <input
          placeholder="Класс жилья"
          value={classType}
          onChange={(e) => setClassType(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />

        <input
          placeholder="Год постройки"
          type="number"
          value={yearBuilt}
          onChange={(e) => setYearBuilt(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />

        <input
          placeholder="Отопление"
          value={heating}
          onChange={(e) => setHeating(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />

        <input
          placeholder="Мебель и техника"
          value={furniture}
          onChange={(e) => setFurniture(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />

       <input
         placeholder="Комиссия"
         type="number"
         value={commission}
         onChange={(e) => setCommission(e.target.value)}
         style={{
           padding: 12,
           borderRadius: 12,
           border: "1px solid #E7DCE2",
           outline: "none",
           fontSize: 14,
          }}
        /> 

        <input
          placeholder="Поверх"
          type="number"
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid #E7DCE2",
            outline: "none",
            fontSize: 14,
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          type="submit"
          disabled={loading || !title.trim()}
          style={{
            border: "none",
            background: "#4A0F28",
            color: "#FFFFFF",
            borderRadius: 12,
            padding: "12px 18px",
            fontWeight: 600,
            cursor: loading || !title.trim() ? "not-allowed" : "pointer",
            opacity: loading || !title.trim() ? 0.7 : 1,
          }}
        >
          {loading
            ? initialData
              ? "Збереження..."
              : "Створення..."
            : initialData
            ? "Зберегти зміни"
            : "Створити"}
        </button>
      </div>

      {error && (
        <div
          style={{
            color: "crimson",
            fontSize: 14,
          }}
        >
          Помилка: {error}
        </div>
      )}
    </form>
  );
}
