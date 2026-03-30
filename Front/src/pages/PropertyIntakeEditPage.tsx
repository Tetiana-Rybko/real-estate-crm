import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  getPropertyIntake,
  updatePropertyIntake,
} from "../app/propertyIntakes.api";

const pageTitleStyle = {
  margin: 0,
  fontSize: 32,
  color: "#4A0F28",
};

const sectionStyle = {
  background: "#FFFFFF",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  display: "grid",
  gap: 16,
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

const inputStyle = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid #E7DCE2",
  outline: "none",
  fontSize: 14,
  width: "100%",
  boxSizing: "border-box" as const,
};

const textareaStyle = {
  ...inputStyle,
  minHeight: 90,
  resize: "vertical" as const,
};

const checkboxRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  fontSize: 14,
  color: "#2F2430",
};

function toNumber(value: string): number | undefined {
  if (!value.trim()) return undefined;
  return Number(value);
}

export default function PropertyIntakeEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [propertyType, setPropertyType] = useState("");
  const [residentialComplex, setResidentialComplex] = useState("");
  const [classType, setClassType] = useState("");
  const [exclusive, setExclusive] = useState(false);

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");

  const [rooms, setRooms] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [floor, setFloor] = useState("");
  const [areaTotal, setAreaTotal] = useState("");
  const [areaLiving, setAreaLiving] = useState("");
  const [areaKitchen, setAreaKitchen] = useState("");
  const [ceilingHeight, setCeilingHeight] = useState("");
  const [layoutFeatures, setLayoutFeatures] = useState("");
  const [sanitaryUnit, setSanitaryUnit] = useState("");

  const [wallType, setWallType] = useState("");
  const [lift, setLift] = useState(false);
  const [security, setSecurity] = useState("");
  const [repair, setRepair] = useState("");
  const [insulation, setInsulation] = useState("");
  const [communications, setCommunications] = useState("");
  const [powerOutageNotes, setPowerOutageNotes] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [individualMeters, setIndividualMeters] = useState(false);
  const [heating, setHeating] = useState("");
  const [waterHeating, setWaterHeating] = useState("");

  const [furnitureAppliances, setFurnitureAppliances] = useState("");
  const [bathroomType, setBathroomType] = useState("");
  const [livingRoomDetails, setLivingRoomDetails] = useState("");
  const [wallsCondition, setWallsCondition] = useState("");
  const [ceilingCondition, setCeilingCondition] = useState("");
  const [floorCondition, setFloorCondition] = useState("");

  const [price, setPrice] = useState("");
  const [commission, setCommission] = useState("");
  const [osbbMonthly, setOsbbMonthly] = useState("");
  const [electricityPricePerKw, setElectricityPricePerKw] = useState("");
  const [hasDirectElectricContract, setHasDirectElectricContract] = useState(false);
  const [utilityDebts, setUtilityDebts] = useState("");

  const [ownerCount, setOwnerCount] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [registeredResidentsCount, setRegisteredResidentsCount] = useState("");
  const [dealFormalization, setDealFormalization] = useState("");
  const [documentsReady, setDocumentsReady] = useState(false);
  const [childrenShares, setChildrenShares] = useState(false);
  const [programs, setPrograms] = useState("");

  const [viewingSchedule, setViewingSchedule] = useState("");
  const [hasKeys, setHasKeys] = useState(false);
  const [ownerPhone, setOwnerPhone] = useState("");

  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function load(): Promise<void> {
      if (!id) {
        setError("Не знайдено ID акту");
        setInitialLoading(false);
        return;
      }

      try {
        const data = await getPropertyIntake(Number(id));

        setPropertyType(data.property_type || "");
        setResidentialComplex(data.residential_complex || "");
        setClassType(data.class_type || "");
        setExclusive(Boolean(data.exclusive));

        setCity(data.city || "");
        setDistrict(data.district || "");
        setStreet(data.street || "");
        setBuildingNumber(data.building_number || "");
        setApartmentNumber(data.apartment_number || "");

        setRooms(data.rooms != null ? String(data.rooms) : "");
        setTotalFloors(data.total_floors != null ? String(data.total_floors) : "");
        setFloor(data.floor != null ? String(data.floor) : "");
        setAreaTotal(data.area_total != null ? String(data.area_total) : "");
        setAreaLiving(data.area_living != null ? String(data.area_living) : "");
        setAreaKitchen(data.area_kitchen != null ? String(data.area_kitchen) : "");
        setCeilingHeight(data.ceiling_height != null ? String(data.ceiling_height) : "");
        setLayoutFeatures(data.layout_features || "");
        setSanitaryUnit(data.sanitary_unit || "");

        setWallType(data.wall_type || "");
        setLift(Boolean(data.lift));
        setSecurity(data.security || "");
        setRepair(data.repair || "");
        setInsulation(data.insulation || "");
        setCommunications(data.communications || "");
        setPowerOutageNotes(data.power_outage_notes || "");
        setYearBuilt(data.year_built != null ? String(data.year_built) : "");
        setIndividualMeters(Boolean(data.individual_meters));
        setHeating(data.heating || "");
        setWaterHeating(data.water_heating || "");

        setFurnitureAppliances(data.furniture_appliances || "");
        setBathroomType(data.bathroom_type || "");
        setLivingRoomDetails(data.living_room_details || "");
        setWallsCondition(data.walls_condition || "");
        setCeilingCondition(data.ceiling_condition || "");
        setFloorCondition(data.floor_condition || "");

        setPrice(data.price != null ? String(data.price) : "");
        setCommission(data.commission != null ? String(data.commission) : "");
        setOsbbMonthly(data.osbb_monthly != null ? String(data.osbb_monthly) : "");
        setElectricityPricePerKw(
          data.electricity_price_per_kw != null ? String(data.electricity_price_per_kw) : "",
        );
        setHasDirectElectricContract(Boolean(data.has_direct_electric_contract));
        setUtilityDebts(data.utility_debts || "");

        setOwnerCount(data.owner_count != null ? String(data.owner_count) : "");
        setOwnerName(data.owner_name || "");
        setMaritalStatus(data.marital_status || "");
        setRegisteredResidentsCount(
          data.registered_residents_count != null
            ? String(data.registered_residents_count)
            : "",
        );
        setDealFormalization(data.deal_formalization || "");
        setDocumentsReady(Boolean(data.documents_ready));
        setChildrenShares(Boolean(data.children_shares));
        setPrograms(data.programs || "");

        setViewingSchedule(data.viewing_schedule || "");
        setHasKeys(Boolean(data.has_keys));
        setOwnerPhone(data.owner_phone || "");

        setNotes(data.notes || "");
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.detail || "Не вдалося завантажити акт");
        } else {
          setError("Не вдалося завантажити акт");
        }
        } finally {
        setInitialLoading(false);
      }
    }

    void load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) {
      setError("Не знайдено ID акту");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updatePropertyIntake(Number(id), {
        property_type: propertyType || undefined,
        residential_complex: residentialComplex || undefined,
        class_type: classType || undefined,
        exclusive,

        city: city || undefined,
        district: district || undefined,
        street: street || undefined,
        building_number: buildingNumber || undefined,
        apartment_number: apartmentNumber || undefined,

        rooms: toNumber(rooms),
        total_floors: toNumber(totalFloors),
        floor: toNumber(floor),
        area_total: toNumber(areaTotal),
        area_living: toNumber(areaLiving),
        area_kitchen: toNumber(areaKitchen),
        ceiling_height: toNumber(ceilingHeight),
        layout_features: layoutFeatures || undefined,
        sanitary_unit: sanitaryUnit || undefined,

        wall_type: wallType || undefined,
        lift,
        security: security || undefined,
        repair: repair || undefined,
        insulation: insulation || undefined,
        communications: communications || undefined,
        power_outage_notes: powerOutageNotes || undefined,
        year_built: toNumber(yearBuilt),
        individual_meters: individualMeters,
        heating: heating || undefined,
        water_heating: waterHeating || undefined,

        furniture_appliances: furnitureAppliances || undefined,
        bathroom_type: bathroomType || undefined,
        living_room_details: livingRoomDetails || undefined,
        walls_condition: wallsCondition || undefined,
        ceiling_condition: ceilingCondition || undefined,
        floor_condition: floorCondition || undefined,

        price: toNumber(price),
        commission: toNumber(commission),
        osbb_monthly: toNumber(osbbMonthly),
        electricity_price_per_kw: toNumber(electricityPricePerKw),
        has_direct_electric_contract: hasDirectElectricContract,
        utility_debts: utilityDebts || undefined,

        owner_count: toNumber(ownerCount),
        owner_name: ownerName || undefined,
        marital_status: maritalStatus || undefined,
        registered_residents_count: toNumber(registeredResidentsCount),
        deal_formalization: dealFormalization || undefined,
        documents_ready: documentsReady,
        children_shares: childrenShares,
        programs: programs || undefined,

        viewing_schedule: viewingSchedule || undefined,
        has_keys: hasKeys,
        owner_phone: ownerPhone || undefined,

        notes: notes || undefined,
      });

      navigate("/property-intakes");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || "Не вдалося зберегти зміни");
      } else {
        setError("Не вдалося зберегти зміни");
      }
    } finally {
      setLoading(false);
    }
  }

  if (initialLoading) {
    return (
      <div
        style={{
          padding: 24,
          borderRadius: 16,
          background: "#FFFFFF",
          color: "#7A5A68",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        Завантаження акту...
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div>
        <h1 style={pageTitleStyle}>Редагування акту</h1>
        <p style={{ margin: "8px 0 0", color: "#7A5A68" }}>
          Оновіть дані по об&apos;єкту
        </p>
      </div>

      {error && (
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
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Основне</h3>
          <div style={gridStyle}>
             <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} style={inputStyle}>
                 <option value="">Тип об&apos;єкта</option>
              <option value="квартира">Квартира</option>
              <option value="будинок">Будинок</option>
              <option value="комерція">Комерція</option>
              <option value="ділянка">Ділянка</option>
            </select>

            <input
              placeholder="Назва ЖК"
              value={residentialComplex}
              onChange={(e) => setResidentialComplex(e.target.value)}
              style={inputStyle}
            />

            <select value={classType} onChange={(e) => setClassType(e.target.value)} style={inputStyle}>
              <option value="">Клас житла</option>
              <option value="економ">Економ</option>
              <option value="комфорт">Комфорт</option>
              <option value="бізнес">Бізнес</option>
              <option value="преміум">Преміум</option>
            </select>

            <div style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={exclusive}
                onChange={(e) => setExclusive(e.target.checked)}
              />
              <span>Ексклюзив</span>
            </div>

            <input placeholder="Місто" value={city} onChange={(e) => setCity(e.target.value)} style={inputStyle} />
            <input placeholder="Район" value={district} onChange={(e) => setDistrict(e.target.value)} style={inputStyle} />
            <input placeholder="Вулиця" value={street} onChange={(e) => setStreet(e.target.value)} style={inputStyle} />
            <input
              placeholder="Номер будинку"
              value={buildingNumber}
              onChange={(e) => setBuildingNumber(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Номер квартири"
              value={apartmentNumber}
              onChange={(e) => setApartmentNumber(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Телефон власника"
              value={ownerPhone}
              onChange={(e) => setOwnerPhone(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Параметри квартири</h3>
          <div style={gridStyle}>
            <input placeholder="Кімнат" type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} style={inputStyle} />
            <input placeholder="Поверх" type="number" value={floor} onChange={(e) => setFloor(e.target.value)} style={inputStyle} />
            <input
              placeholder="Поверховість"
              type="number"
              value={totalFloors}
              onChange={(e) => setTotalFloors(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Загальна площа"
              type="number"
              value={areaTotal}
              onChange={(e) => setAreaTotal(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Житлова площа"
              type="number"
              value={areaLiving}
              onChange={(e) => setAreaLiving(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Площа кухні"
              type="number"
              value={areaKitchen}
              onChange={(e) => setAreaKitchen(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Висота стелі"
              type="number"
              value={ceilingHeight}
              onChange={(e) => setCeilingHeight(e.target.value)}
              style={inputStyle}
            />
            <select value={sanitaryUnit} onChange={(e) => setSanitaryUnit(e.target.value)} style={inputStyle}>
              <option value="">Санвузол</option>
              <option value="суміжний">Суміжний</option>
              <option value="роздільний">Роздільний</option>
              <option value="2+ санвузли">2+ санвузли</option>
            </select>
          </div>

          <textarea
            placeholder="Особливості планування"
            value={layoutFeatures}
            onChange={(e) => setLayoutFeatures(e.target.value)}
            style={textareaStyle}
          />
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Будинок і комунікації</h3>
          <div style={gridStyle}>
            <input placeholder="Тип стін" value={wallType} onChange={(e) => setWallType(e.target.value)} style={inputStyle} />

            <div style={checkboxRowStyle}>
              <input type="checkbox" checked={lift} onChange={(e) => setLift(e.target.checked)} />
              <span>Ліфт</span>
            </div>

            <select value={repair} onChange={(e) => setRepair(e.target.value)} style={inputStyle}>
              <option value="">Ремонт</option>
              <option value="без ремонту">Без ремонту</option>
              <option value="косметичний">Косметичний</option>
              <option value="євроремонт">Євроремонт</option>
              <option value="дизайнерський">Дизайнерський</option>
            </select>

            <input placeholder="Утеплення" value={insulation} onChange={(e) => setInsulation(e.target.value)} style={inputStyle} />
            <input
              placeholder="Рік побудови"
              type="number"
              value={yearBuilt}
              onChange={(e) => setYearBuilt(e.target.value)}
              style={inputStyle}
            />

            <div style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={individualMeters}
                onChange={(e) => setIndividualMeters(e.target.checked)}
              />
              <span>Індивідуальні лічильники</span>
            </div>

            <input placeholder="Опалення" value={heating} onChange={(e) => setHeating(e.target.value)} style={inputStyle} />
            <input
              placeholder="Підігрів води"
              value={waterHeating}
              onChange={(e) => setWaterHeating(e.target.value)}
              style={inputStyle}
            />
          </div>

          <textarea
            placeholder="Безпека"
            value={security}
            onChange={(e) => setSecurity(e.target.value)}
            style={textareaStyle}
          />
          <textarea
            placeholder="Комунікації"
            value={communications}
            onChange={(e) => setCommunications(e.target.value)}
            style={textareaStyle}
          />
          <textarea
            placeholder="Коли немає світла"
            value={powerOutageNotes}
            onChange={(e) => setPowerOutageNotes(e.target.value)}
            style={textareaStyle}
          />
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Стан і комплектація</h3>
          <div style={gridStyle}>
            <input
              placeholder="Ванна / душ"
              value={bathroomType}
              onChange={(e) => setBathroomType(e.target.value)}
              style={inputStyle}
            />
            <input placeholder="Стіни" value={wallsCondition} onChange={(e) => setWallsCondition(e.target.value)} style={inputStyle} />
            <input
              placeholder="Стеля"
              value={ceilingCondition}
              onChange={(e) => setCeilingCondition(e.target.value)}
              style={inputStyle}
            />
            <input placeholder="Підлога" value={floorCondition} onChange={(e) => setFloorCondition(e.target.value)} style={inputStyle} />
          </div>

          <textarea
            placeholder="Меблі і техніка"
            value={furnitureAppliances}
            onChange={(e) => setFurnitureAppliances(e.target.value)}
            style={textareaStyle}
          />
          <textarea
            placeholder="Житлова кімната"
            value={livingRoomDetails}
            onChange={(e) => setLivingRoomDetails(e.target.value)}
            style={textareaStyle}
          />
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Фінанси</h3>
          <div style={gridStyle}>
            <input placeholder="Ціна" type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={inputStyle} />
            <input
              placeholder="Комісія"
              type="number"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="ОСББ / місяць"
              type="number"
              value={osbbMonthly}
              onChange={(e) => setOsbbMonthly(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Електрика за 1 кВт"
              type="number"
              value={electricityPricePerKw}
              onChange={(e) => setElectricityPricePerKw(e.target.value)}
              style={inputStyle}
            />

            <div style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={hasDirectElectricContract}
                onChange={(e) => setHasDirectElectricContract(e.target.checked)}
              />
              <span>Прямий договір на електрику</span>
            </div>
          </div>

          <textarea
            placeholder="Борги по комуналці"
            value={utilityDebts}
            onChange={(e) => setUtilityDebts(e.target.value)}
            style={textareaStyle}
          />
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Юридична інформація</h3>
          <div style={gridStyle}>
            <input
              placeholder="К-сть власників"
              type="number"
              value={ownerCount}
              onChange={(e) => setOwnerCount(e.target.value)}
              style={inputStyle}
            />

            <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} style={inputStyle}>
              <option value="">Шлюбний статус</option>
              <option value="не в шлюбі">Не в шлюбі</option>
              <option value="у шлюбі">У шлюбі</option>
              <option value="розлучення">Розлучення</option>
            </select>

            <input
              placeholder="К-сть прописаних"
              type="number"
              value={registeredResidentsCount}
              onChange={(e) => setRegisteredResidentsCount(e.target.value)}
              style={inputStyle}
            />

            <div style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={documentsReady}
                onChange={(e) => setDocumentsReady(e.target.checked)}
              />
              <span>Документи готові</span>
            </div>

            <div style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={childrenShares}
                onChange={(e) => setChildrenShares(e.target.checked)}
              />
              <span>Є частки дітей</span>
            </div>
          </div>

          <textarea
            placeholder="Хто власник"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            style={textareaStyle}
          />
          <textarea
            placeholder="Оформлення"
            value={dealFormalization}
            onChange={(e) => setDealFormalization(e.target.value)}
            style={textareaStyle}
          />
          <textarea
            placeholder="Програми (єОселя, сертифікати тощо)"
            value={programs}
            onChange={(e) => setPrograms(e.target.value)}
            style={textareaStyle}
          />
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Перегляди і контакти</h3>
          <div style={gridStyle}>
            <div style={checkboxRowStyle}>
                <input type="checkbox" checked={hasKeys} onChange={(e) => setHasKeys(e.target.checked)} />
              <span>Є ключі</span>
            </div>
          </div>

          <textarea
            placeholder="Коли проводити перегляди"
            value={viewingSchedule}
            onChange={(e) => setViewingSchedule(e.target.value)}
            style={textareaStyle}
          />
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Додаткові нотатки</h3>
          <textarea
            placeholder="Внутрішні коментарі"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={textareaStyle}
          />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="button"
            onClick={() => navigate("/property-intakes")}
            style={{
              border: "1px solid #D9C3CF",
              background: "#FFFFFF",
              color: "#4A0F28",
              borderRadius: 12,
              padding: "12px 18px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Скасувати
          </button>

          <button
            type="submit"
            disabled={loading}
            style={{
              border: "none",
              background: "#4A0F28",
              color: "#FFFFFF",
              borderRadius: 12,
              padding: "12px 18px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Збереження..." : "Зберегти зміни"}
          </button>
        </div>
      </form>
    </div>
  );
}