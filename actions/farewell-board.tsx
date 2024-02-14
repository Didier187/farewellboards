"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
const supabase = createClient();

const createFarewellBoard = async (formData: FormData) => {
  const farewell_for = formData.get("farewell_for") as string;
  const description = formData.get("description") as string;
  const created_at = new Date().toISOString();
  const { data, error } = await supabase
    .from("farewellboard")
    .insert([{ farewell_for, description, created_at }]);
  //revalidate the page
  revalidatePath("/");

  if (error) {
    return console.error(error);
  }
  return data;
};

// delete farewell board
const deleteFarewellBoard = async (id: number) => {
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
export { createFarewellBoard, deleteFarewellBoard, updateFarewellBoard };
