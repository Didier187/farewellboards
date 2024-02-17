"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const createFarewellBoard = async (formData: FormData) => {
  const supabase = createClient();

  const farewell_for = formData.get("farewell_for") as string;
  const description = formData.get("description") as string;
  const created_at = new Date().toISOString();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("farewellboard")
    .insert([{ farewell_for, description, created_at, user_id: user?.id }]);
  //revalidate the page
  revalidatePath("/");

  if (error) {
    return console.error(error);
  }

  return data;
};

// delete farewell board
const deleteFarewellBoard = async (id: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("farewellboard")
    .delete()
    .eq("id", id);
  //revalidate the page
  revalidatePath("/");

  if (error) {
    return console.error(error);
  }
  return data;
};

// update farewell board
const updateFarewellBoard = async (
  id: number,
  formData: {
    farewell_for: string;
    description: string;
  }
) => {
  const supabase = createClient();

  const { farewell_for, description } = formData;
  const { data, error } = await supabase
    .from("farewellboard")
    .update({ farewell_for, description })
    .eq("id", id);
  //revalidate the page
  revalidatePath("/");
  if (error) {
    return console.error(error);
  }
  return data;
};

// read farewell board by id
const getFarewellBoard = async (id: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("farewellboard")
    .select()
    .eq("id", id)
    .single();

  return [data, error];
};

export {
  createFarewellBoard,
  deleteFarewellBoard,
  getFarewellBoard,
  updateFarewellBoard,
};
