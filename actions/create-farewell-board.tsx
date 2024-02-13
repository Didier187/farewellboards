import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient();

const createFarewellBoard = async (formData: FormData) => {
  "use server";
  const farewell_for = formData.get("farewell_for") as string;
  const description = formData.get("description") as string;
  const created_at = new Date().toISOString();
  const { data, error } = await supabase
    .from("farewellboard")
    .insert([{ farewell_for, description, created_at }]);
  revalidatePath("/");
  if (error) {
    return console.error(error);
  }
  return data;
};
export { createFarewellBoard };
