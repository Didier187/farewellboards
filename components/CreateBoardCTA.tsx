import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export default async function CreateBoardCTA() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const redirectUser = async () => {
    "use server";
    if (!user) {
      return redirect("/login");
    }
    return redirect("/");
  };
  return (
    <form action={redirectUser}>
      <Button type="submit">Create Board</Button>
    </form>
  );
}
