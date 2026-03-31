import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getPropertyIntake, type PropertyIntake } from "../app/propertyIntakes.api";

const cardStyle = {
  background: "#FFFFFF",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  display: "grid",
  gap: 20,
};

const sectionStyle = {
  display: "grid",
  gap: 12,
};

const sectionTitleStyle = {
  margin: 0,
  fontSize: 18,
  fontWeight: 700,
  color: "#4A0F28",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 14,
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
  whiteSpace: "pre-wrap" as const,
};

function showValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "Не вказано";
  }

  if (typeof value === "boolean") {
    return value ? "Так" : "Ні";
  }

  return String(value);
}

export default function PropertyIntakePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState<PropertyIntake | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load(): Promise<void> {
      if (!id) {
        setError("Не знайдено ID акту");
        setLoading(false);
        return;
      }

      try {
        const data = await getPropertyIntake(Number(id));
        setItem(data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.detail || "Не вдалося завантажити акт");
        } else {
          setError("Не вдалося завантажити акт");
        }
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [id]);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return (
      <div
        style={{
          color: "crimson",
          padding: 16,
          borderRadius: 12,
          background: "#FFF5F7",
        }}
      >
        Помилка: {error}
      </div>
    );
  }

  if (!item) {
    return <div>Акт не знайдено</div>;
  }

  const fullAddress = [
    item.city,
    item.district,
    item.street,
    item.building_number,
    item.apartment_number,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          flexWrap: "wrap" as const,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 32, color: "#4A0F28" }}>
            {item.residential_complex || "Картка акту"}
          </h1>
          <p style={{ margin: "8px 0 0", color: "#7A5A68" }}>
            Акт прийому №{item.id}
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
          <button
            type="button"
            onClick={() => navigate(`/property-intakes/${item.id}/edit`)}
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
            Редагувати
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            style={{
              border: "1px solid #D9C3CF",
              background: "#FFFFFF",
              color: "#4A0F28",
              borderRadius: 10,
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Друк
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Основне</h3>
          <div style={gridStyle}>
            <div>
              <div style={labelStyle}>Статус</div>
              <div style={valueStyle}>{showValue(item.status)}</div>
            </div>
            <div>
              <div style={labelStyle}>Тип об'єкта</div>
              <div style={valueStyle}>{showValue(item.property_type)}</div>
            </div>
            <div>
              <div style={labelStyle}>ЖК</div>
              <div style={valueStyle}>{showValue(item.residential_complex)}</div>
            </div>
            <div>
              <div style={labelStyle}>Клас житла</div>
              <div style={valueStyle}>{showValue(item.class_type)}</div>
            </div>
            <div>
              <div style={labelStyle}>Ексклюзив</div>
              <div style={valueStyle}>{showValue(item.exclusive)}</div>
            </div>
            <div>
              <div style={labelStyle}>Місто</div>
              <div style={valueStyle}>{showValue(item.city)}</div>
            </div>
            <div>
              <div style={labelStyle}>Район</div>
              <div style={valueStyle}>{showValue(item.district)}</div>
            </div>
            <div>
              <div style={labelStyle}>Вулиця</div>
              <div style={valueStyle}>{showValue(item.street)}</div>
            </div>
            <div>
              <div style={labelStyle}>Будинок</div>
              <div style={valueStyle}>{showValue(item.building_number)}</div>
            </div>
            <div>
              <div style={labelStyle}>Квартира</div>
              <div style={valueStyle}>{showValue(item.apartment_number)}</div>
            </div>
            <div>
              <div style={labelStyle}>Повна адреса</div>
              <div style={valueStyle}>{showValue(fullAddress)}</div>
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Параметри квартири</h3>
          <div style={gridStyle}>
            <div>
              <div style={labelStyle}>Кімнат</div>
              <div style={valueStyle}>{showValue(item.rooms)}</div>
            </div>
            <div>
              <div style={labelStyle}>Поверхів</div>
              <div style={valueStyle}>{showValue(item.total_floors)}</div>
            </div>
            <div>
              <div style={labelStyle}>Поверх</div>
              <div style={valueStyle}>{showValue(item.floor)}</div>
            </div>
            <div>
              <div style={labelStyle}>Загальна площа</div>
              <div style={valueStyle}>{showValue(item.area_total)}</div>
            </div>
            <div>
              <div style={labelStyle}>Житлова площа</div>
              <div style={valueStyle}>{showValue(item.area_living)}</div>
            </div>
            <div>
              <div style={labelStyle}>Площа кухні</div>
              <div style={valueStyle}>{showValue(item.area_kitchen)}</div>
            </div>
            <div>
              <div style={labelStyle}>Висота стелі</div>
              <div style={valueStyle}>{showValue(item.ceiling_height)}</div>
            </div>
            <div>
              <div style={labelStyle}>Санвузол</div>
              <div style={valueStyle}>{showValue(item.sanitary_unit)}</div>
            </div>
          </div>

          <div>
            <div style={labelStyle}>Особливості планування</div>
            <div style={valueStyle}>{showValue(item.layout_features)}</div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Будинок і комунікації</h3>
          <div style={gridStyle}>
            <div>
              <div style={labelStyle}>Тип стін</div>
              <div style={valueStyle}>{showValue(item.wall_type)}</div>
            </div>
            <div>
              <div style={labelStyle}>Ліфт</div>
              <div style={valueStyle}>{showValue(item.lift)}</div>
            </div>
            <div>
              <div style={labelStyle}>Ремонт</div>
              <div style={valueStyle}>{showValue(item.repair)}</div>
            </div>
            <div>
              <div style={labelStyle}>Утеплення</div>
              <div style={valueStyle}>{showValue(item.insulation)}</div>
            </div>
            <div>
              <div style={labelStyle}>Рік побудови</div>
              <div style={valueStyle}>{showValue(item.year_built)}</div>
            </div>
            <div>
              <div style={labelStyle}>Лічильники</div>
              <div style={valueStyle}>{showValue(item.individual_meters)}</div>
            </div>
            <div>
              <div style={labelStyle}>Опалення</div>
              <div style={valueStyle}>{showValue(item.heating)}</div>
            </div>
            <div>
              <div style={labelStyle}>Підігрів води</div>
              <div style={valueStyle}>{showValue(item.water_heating)}</div>
            </div>
          </div>

          <div>
            <div style={labelStyle}>Безпека</div>
            <div style={valueStyle}>{showValue(item.security)}</div>
          </div>
          <div>
            <div style={labelStyle}>Комунікації</div>
            <div style={valueStyle}>{showValue(item.communications)}</div>
          </div>
          <div>
            <div style={labelStyle}>Відключення світла</div>
            <div style={valueStyle}>{showValue(item.power_outage_notes)}</div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Стан і комплектація</h3>
          <div style={gridStyle}>
            <div>
              <div style={labelStyle}>Ванна / душ</div>
              <div style={valueStyle}>{showValue(item.bathroom_type)}</div>
            </div>
            <div>
              <div style={labelStyle}>Стіни</div>
              <div style={valueStyle}>{showValue(item.walls_condition)}</div>
            </div>
            <div>
              <div style={labelStyle}>Стеля</div>
              <div style={valueStyle}>{showValue(item.ceiling_condition)}</div>
            </div>
            <div>
              <div style={labelStyle}>Підлога</div>
              <div style={valueStyle}>{showValue(item.floor_condition)}</div>
            </div>
          </div>

          <div>
            <div style={labelStyle}>Меблі і техніка</div>
            <div style={valueStyle}>{showValue(item.furniture_appliances)}</div>
          </div>
          <div>
            <div style={labelStyle}>Житлова кімната</div>
            <div style={valueStyle}>{showValue(item.living_room_details)}</div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Фінанси</h3>
          <div style={gridStyle}>
            <div>
              <div style={labelStyle}>Ціна</div>
              <div style={valueStyle}>{showValue(item.price)}</div>
            </div>
            <div>
              <div style={labelStyle}>Комісія</div>
              <div style={valueStyle}>{showValue(item.commission)}</div>
            </div>
            <div>
              <div style={labelStyle}>ОСББ / місяць</div>
              <div style={valueStyle}>{showValue(item.osbb_monthly)}</div>
            </div>
            <div>
              <div style={labelStyle}>Електрика за 1 кВт</div>
              <div style={valueStyle}>{showValue(item.electricity_price_per_kw)}</div>
            </div>
            <div>
              <div style={labelStyle}>Прямий договір</div>
              <div style={valueStyle}>{showValue(item.has_direct_electric_contract)}</div>
            </div>
          </div>

          <div>
            <div style={labelStyle}>Борги по комуналці</div>
            <div style={valueStyle}>{showValue(item.utility_debts)}</div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Юридична інформація</h3>
          <div style={gridStyle}>
            <div>
              <div style={labelStyle}>К-сть власників</div>
              <div style={valueStyle}>{showValue(item.owner_count)}</div>
            </div>
            <div>
              <div style={labelStyle}>Власник</div>
              <div style={valueStyle}>{showValue(item.owner_name)}</div>
            </div>
            <div>
              <div style={labelStyle}>Шлюбний статус</div>
              <div style={valueStyle}>{showValue(item.marital_status)}</div>
            </div>
            <div>
              <div style={labelStyle}>К-сть прописаних</div>
              <div style={valueStyle}>{showValue(item.registered_residents_count)}</div>
            </div>
            <div>
              <div style={labelStyle}>Оформлення</div>
              <div style={valueStyle}>{showValue(item.deal_formalization)}</div>
            </div>
            <div>
              <div style={labelStyle}>Документи готові</div>
              <div style={valueStyle}>{showValue(item.documents_ready)}</div>
            </div>
            <div>
              <div style={labelStyle}>Частки дітей</div>
              <div style={valueStyle}>{showValue(item.children_shares)}</div>
            </div>
            <div>
              <div style={labelStyle}>Програми</div>
              <div style={valueStyle}>{showValue(item.programs)}</div>
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Перегляди і контакти</h3>
          <div style={gridStyle}>
            <div>
              <div style={labelStyle}>Графік переглядів</div>
              <div style={valueStyle}>{showValue(item.viewing_schedule)}</div>
            </div>
            <div>
              <div style={labelStyle}>Є ключі</div>
              <div style={valueStyle}>{showValue(item.has_keys)}</div>
            </div>
            <div>
              <div style={labelStyle}>Телефон власника</div>
              <div style={valueStyle}>{showValue(item.owner_phone)}</div>
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Нотатки</h3>
          <div style={valueStyle}>{showValue(item.notes)}</div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Системна інформація</h3>
          <div style={gridStyle}>
            <div>
              <div style={labelStyle}>ID акту</div>
              <div style={valueStyle}>{showValue(item.id)}</div>
            </div>
            <div>
              <div style={labelStyle}>ID об'єкта</div>
              <div style={valueStyle}>{showValue(item.property_id)}</div>
            </div>
            <div>
              <div style={labelStyle}>Створив користувач</div>
              <div style={valueStyle}>{showValue(item.created_by_id)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}