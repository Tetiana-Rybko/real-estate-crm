import { useEffect, useState } from "react";
import axios from "axios";
import {
  getProperties,
  deleteProperty,
  uploadPropertyImages,
  makePropertyImageMain,
  deletePropertyImage,
  type Property,
} from "../app/properties.api";
import CreatePropertyForm from "./CreatePropertyForm";

const labelStyle = {
  fontSize: 12,
  color: "#A07C8D",
  marginBottom: 4,
  textTransform: "uppercase" as const,
  letterSpacing: 0.4,
};

const valueStyle = {
  color: "#2F2430",
  fontSize: 15,
};

export default function PropertiesPage() {
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Property | null>(null);

  async function load(): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const data: Property[] = await getProperties();
      setItems(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || "Не вдалося завантажити об'єкти");
      } else {
        setError("Не вдалося завантажити об'єкти");
      }
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: number): Promise<void> {
    if (!confirm("Видалити об'єкт?")) return;

    try {
      await deleteProperty(id);
      if (editing?.id === id) {
        setEditing(null);
      }
      await load();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.detail || "Не вдалося видалити об'єкт");
      } else {
        alert("Не вдалося видалити об'єкт");
      }
    }
  }

  async function handleUpload(
    propertyId: number,
    files: FileList | null,
  ): Promise<void> {
    if (!files || files.length === 0) return;

    try {
      await uploadPropertyImages(propertyId, Array.from(files));
      await load();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.detail || "Не вдалося завантажити фото");
      } else {
        alert("Не вдалося завантажити фото");
      }
    }
  }

  async function handleMakeMain(imageId: number): Promise<void> {
    try {
      await makePropertyImageMain(imageId);
      await load();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.detail || "Не вдалося зробити фото головним");
      } else {
        alert("Не вдалося зробити фото головним");
      }
    }
  }

  async function handleDeleteImage(imageId: number): Promise<void> {
    if (!confirm("Видалити фото?")) return;

    try {
      await deletePropertyImage(imageId);
      await load();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.detail || "Не вдалося видалити фото");
      } else {
        alert("Не вдалося видалити фото");
      }
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
            Об'єкти
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#7A5A68",
              fontSize: 15,
            }}
          >
            Список об'єктів нерухомості
          </p>
        </div>

        <button
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
      </div>

      <CreatePropertyForm
        onCreated={async () => {
          setEditing(null);
          await load();
        }}
        initialData={editing}
        onCancelEdit={() => setEditing(null)}
      />

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
          Поки що немає жодного об'єкта.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: 20,
            marginTop: 20,
          }}
        >
          {items.map((p) => {
            const main = p.images?.find((img) => img.is_main) || p.images?.[0];
            const mainImageUrl = main
              ? `http://127.0.0.1:8000/${main.file_path}`
              : null;

            return (
              <div
                key={p.id}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: 16,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 12,
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
                      {p.title}
                    </div>

                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 13,
                        color: "#A07C8D",
                      }}
                    >
                      ID: {p.id}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => setEditing(p)}
                      type="button"
                      style={{
                        border: "none",
                        background: "#EEF2FF",
                        color: "#3A4ED5",
                        borderRadius: 10,
                        padding: "6px 10px",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Редагувати
                    </button>

                    <button
                      onClick={() => void remove(p.id)}
                      type="button"
                      style={{
                        border: "none",
                        background: "#FBECEF",
                        color: "#A53A57",
                        borderRadius: 10,
                        padding: "6px 10px",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Видалити
                    </button>
                  </div>
                </div>

                <div>
                  <div style={labelStyle}>Головне фото</div>

                  <div
                    style={{
                      width: "100%",
                      height: 220,
                      borderRadius: 12,
                      overflow: "hidden",
                      background: "#F6F1F4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {mainImageUrl ? (
                      <img
                        src={mainImageUrl}
                        alt={p.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          color: "#A07C8D",
                          fontSize: 14,
                        }}
                      >
                        Немає фото
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div style={labelStyle}>Завантажити фото</div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      void handleUpload(p.id, e.target.files);
                      e.currentTarget.value = "";
                    }}
                  />
                </div>

                <div>
                  <div style={labelStyle}>Галерея</div>

                  {!p.images || p.images.length === 0 ? (
                    <div style={valueStyle}>Немає фото</div>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                        gap: 10,
                      }}
                    >
                      {p.images.map((img) => {
                        const thumbUrl = `http://127.0.0.1:8000/${img.file_path}`;

                        return (
                          <div
                            key={img.id}
                            style={{
                              border: img.is_main
                                ? "2px solid #4A0F28"
                                : "1px solid #ddd",
                              borderRadius: 10,
                              padding: 8,
                              background: "#fff",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                height: 90,
                                overflow: "hidden",
                                borderRadius: 8,
                                marginBottom: 8,
                                background: "#f3f3f3",
                              }}
                            >
                              <img
                                src={thumbUrl}
                                alt={`property-${p.id}-img-${img.id}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  display: "block",
                                }}
                              />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 6,
                              }}
                            >
                              {img.is_main ? (
                                <div
                                  style={{
                                    fontSize: 12,
                                    color: "#4A0F28",
                                    fontWeight: 700,
                                  }}
                                >
                                  Головне фото
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => void handleMakeMain(img.id)}
                                  style={{
                                    border: "none",
                                    background: "#EEF2FF",
                                    color: "#3A4ED5",
                                    borderRadius: 8,
                                    padding: "6px 8px",
                                    cursor: "pointer",
                                    fontSize: 12,
                                    fontWeight: 600,
                                  }}
                                >
                                  Зробити головним
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => void handleDeleteImage(img.id)}
                                style={{
                                  border: "none",
                                  background: "#FBECEF",
                                  color: "#A53A57",
                                  borderRadius: 8,
                                  padding: "6px 8px",
                                  cursor: "pointer",
                                  fontSize: 12,
                                  fontWeight: 600,
                                }}
                              >
                                Видалити фото
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <div>
                    <div style={labelStyle}>Адреса</div>
                    <div style={valueStyle}>
                      {[p.city, p.district, p.address].filter(Boolean).join(", ") ||
                        "Не вказано"}
                    </div>
                  </div>

                  <div>
                    <div style={labelStyle}>Ціна</div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#4A0F28",
                      }}
                    >
                      {p.price ? `${p.price} €` : "Не вказано"}
                    </div>
                  </div>

                  <div>
                    <div style={labelStyle}>Характеристики</div>
                    <div style={valueStyle}>
                      {p.rooms ?? "—"} кімн • {p.area_total ?? "—"} м² • поверх{" "}
                      {p.floor ?? "—"}
                    </div>
                  </div>

                  <div>
                    <div style={labelStyle}>Кількість фото</div>
                    <div style={valueStyle}>{p.images_count ?? 0}</div>
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
