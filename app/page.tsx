import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import SubmitButton from "@/components/SubmitButton";
import { createFarewellBoard } from "@/actions/create-farewell-board";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FarewellCard } from "@/components/FarewellCard";
import { Header } from "@/components/Header";
import Link from "next/link";

export default async function Index() {
  const supabase = createClient();

  const { data } = await supabase.from("farewellboard").select();

  return (
    <div className="flex flex-col items-center flex-1 w-full gap-20 max-w-[1200px]">
      <Header>
        <Link href="/">Farewell Boards</Link>
        <AuthButton />
      </Header>
      <h1 className="text-4xl">Create a new Farewell Board</h1>
      <div className="grid grid-cols-6 gap-6">
        <form
          className="flex flex-col col-span-2 space-y-4"
          action={createFarewellBoard}
        >
          <Label htmlFor="farewell_for">Farewell For</Label>
          <Input type="text" name="farewell_for" id="farewell_for" />
          <Label htmlFor="description">Description</Label>
          <Textarea name="description" id="description" />
          <SubmitButton />
        </form>

        <div className="col-span-4">
          <h2 className="text-2xl">Farewell Boards</h2>
          <div className="grid gap-4">
            {data?.map((farewell) => (
              <FarewellCard key={farewell.id} {...farewell} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
