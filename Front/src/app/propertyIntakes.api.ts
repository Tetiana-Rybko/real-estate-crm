import {api} from "./api";

export interface PropertyIntake {
  id: number;
  status: string;
  created_by_id: number;
  property_id?: number | null;
  created_at: string;
  updated_at: string;

  property_type?: string | null;
  residential_complex?: string | null;
  class_type?: string | null;
  exclusive?: boolean;

  city?: string | null;
  district?: string | null;
  street?: string | null;
  building_number?: string | null;
  apartment_number?: string | null;

  rooms?: number | null;
  total_floors?: number | null;
  floor?: number | null;
  area_total?: number | null;
  area_living?: number | null;
  area_kitchen?: number | null;
  ceiling_height?: number | null;
  layout_features?: string | null;
  sanitary_unit?: string | null;

  wall_type?: string | null;
  lift?: boolean | null;
  security?: string | null;
  repair?: string | null;
  insulation?: string | null;
  communications?: string | null;
  power_outage_notes?: string | null;
  year_built?: number | null;
  individual_meters?: boolean | null;
  heating?: string | null;
  water_heating?: string | null;

  furniture_appliances?: string | null;
  bathroom_type?: string | null;
  living_room_details?: string | null;
  walls_condition?: string | null;
  ceiling_condition?: string | null;
  floor_condition?: string | null;

  price?: number | null;
  commission?: number | null;
  osbb_monthly?: number | null;
  electricity_price_per_kw?: number | null;
  has_direct_electric_contract?: boolean | null;
  utility_debts?: string | null;

  owner_count?: number | null;
  owner_name?: string | null;
  marital_status?: string | null;
  registered_residents_count?: number | null;
  deal_formalization?: string | null;
  documents_ready?: boolean | null;
  children_shares?: boolean | null;
  programs?: string | null;

  viewing_schedule?: string | null;
  has_keys?: boolean | null;
  owner_phone?: string | null;

  notes?: string | null;
}

export interface PropertyIntakeCreate {
  property_type?: string;
  residential_complex?: string;
  class_type?: string;
  exclusive?: boolean;

  city?: string;
  district?: string;
  street?: string;
  building_number?: string;
  apartment_number?: string;

  rooms?: number;
  total_floors?: number;
  floor?: number;
  area_total?: number;
  area_living?: number;
  area_kitchen?: number;
  ceiling_height?: number;
  layout_features?: string;
  sanitary_unit?: string;

  wall_type?: string;
  lift?: boolean;
  security?: string;
  repair?: string;
  insulation?: string;
  communications?: string;
  power_outage_notes?: string;
  year_built?: number;
  individual_meters?: boolean;
  heating?: string;
  water_heating?: string;

  furniture_appliances?: string;
  bathroom_type?: string;
  living_room_details?: string;
  walls_condition?: string;
  ceiling_condition?: string;
  floor_condition?: string;

  price?: number;
  commission?: number;
  osbb_monthly?: number;
  electricity_price_per_kw?: number;
  has_direct_electric_contract?: boolean;
  utility_debts?: string;

  owner_count?: number;
  owner_name?: string;
  marital_status?: string;
  registered_residents_count?: number;
  deal_formalization?: string;
  documents_ready?: boolean;
  children_shares?: boolean;
  programs?: string;

  viewing_schedule?: string;
  has_keys?: boolean;
  owner_phone?: string;

  notes?: string;
}

export async function getPropertyIntakes(): Promise<PropertyIntake[]> {
  const res = await api.get("/property-intakes");
  return res.data;
}

export async function createPropertyIntake(
  payload: PropertyIntakeCreate,
): Promise<PropertyIntake> {
  const res = await api.post("/property-intakes", payload);
  return res.data;
}

export async function getPropertyIntake(id: number): Promise<PropertyIntake> {
  const res = await api.get(`/property-intakes/${id}`);
  return res.data;
}

export async function updatePropertyIntake(
  id: number,
  payload: Partial<PropertyIntakeCreate> & {
    status?: string;
    property_id?: number | null;
  },
): Promise<PropertyIntake> {
  const res = await api.put(`/property-intakes/${id}`, payload);
  return res.data;
}

export async function deletePropertyIntake(id: number): Promise<void> {
  await api.delete(`/property-intakes/${id}`);

}