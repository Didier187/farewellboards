"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const createFarewell = async (
  farewellboard_id: number,
  values: {
    content: string;
    email?: string;
    name: string;
  }
) => {
  const supabase = createClient();
  const created_at = new Date().toISOString();
  const { content, email, name } = values;
  const { data, error } = await supabase
    .from("farewells")
    .insert([
      { content, created_at, email, created_by: name, farewellboard_id },
    ]);
  revalidatePath(`/board/view/${farewellboard_id}`);
  if (error) {
    return console.error(error);
  }
  return data;
};

export { createFarewell };
