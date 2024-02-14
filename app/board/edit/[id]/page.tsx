import { UpdateBoardForm } from "@/components/UpdateFarewellBoard";
import { createClient } from "@/utils/supabase/server";

export default async function page({ params }: { params: any }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("farewellboard")
    .select()
    .eq("id", params.id)
    .single();
  return (
    <div className="max-w-[600px] p-6 flex flex-col items-center">
      <UpdateBoardForm id={params.id} initialState={data} />
    </div>
  );
}
