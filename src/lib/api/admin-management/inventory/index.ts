import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { requisitionInventorySchema, requisitionTypeSchema } from "@/lib/types";
import { getCompanyId } from "../../company-info/employees";

export async function getRequisitionTypes() {
  const client = await createClient();
  const company_id = await getCompanyId();

  const { data, error } = await client
    .from("requisition_types")
    .select("*")
    .eq("company_id", company_id);

  if (error) throw error;
  return data;
}

export async function createRequisitionType(
  payload: z.infer<typeof requisitionTypeSchema>
) {
  const client = await createClient();
  const company_id = await getCompanyId();

  const validated = requisitionTypeSchema.safeParse(payload);
  if (!validated.success) throw validated.error;

  const { data, error } = await client.from("requisition_types").insert({
    payload,
    company_id,
  });

  if (error) throw error;
  return data;
}

export async function deleteRequisitionType(id: number) {
  const client = await createClient();
  const company_id = await getCompanyId();

  const { error } = await client
    .from("requisition_types")
    .delete()
    .eq("id", id)
    .eq("company_id", company_id);

  if (error) throw error;
}

export async function getRequisitionInventories() {
  const client = await createClient();
  const company_id = await getCompanyId();

  const { data, error } = await client
    .from("requisition_inventories")
    .select("*")
    .eq("company_id", company_id);

  if (error) throw error;
  return data;
}

export async function createRequisitionInventory(
  payload: z.infer<typeof requisitionInventorySchema>
) {
  const client = await createClient();
  const company_id = await getCompanyId();

  const validated = requisitionInventorySchema.safeParse(payload);
  if (!validated.success) throw validated.error;

  const { data, error } = await client.from("requisition_inventories").insert({
    ...payload,
    company_id,
  });

  if (error) throw error;
  return data;
}

export async function updateRequisitionInventory(
  payload: z.infer<typeof requisitionInventorySchema>
) {
  const client = await createClient();
  const company_id = await getCompanyId();

  const validated = requisitionInventorySchema.safeParse(payload);
  if (!validated.success) throw validated.error;

  const { data, error } = await client
    .from("requisition_inventories")
    .update(payload)
    .eq("id", payload.id)
    .eq("company_id", company_id);

  if (error) throw error;
  return data;
}

export async function deleteRequisitionInventory(id: number) {
  const client = await createClient();
  const company_id = await getCompanyId();

  const { error } = await client
    .from("requisition_inventories")
    .delete()
    .eq("id", id)
    .eq("company_id", company_id);

  if (error) throw error;
}

export async function getEmployeesInfo() {
  const client = await createClient();
  const company_id = await getCompanyId();

  const { data, error } = await client
    .from("employees")
    .select("id, first_name, last_name")
    .eq("company_id", company_id);

  const employees = data?.map((employee) => ({
    id: employee.id,
    name: `${employee.first_name} ${employee.last_name}`,
  }));

  if (error) throw error;
  return { data: employees, error: null };
}
