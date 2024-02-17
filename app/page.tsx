import { CreateBoardForm } from "@/components/CreateBoardForm";
import { FarewellCard } from "@/components/FarewellCard";
import { Header } from "@/components/Header";
import Landing from "@/components/Landing";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import AuthButton from "../components/AuthButton";

export default async function Index() {

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("farewellboard")
    .select()
    .order("created_at", { ascending: false });

  if (!user) return <Landing />;
  
  return (
    <div className="flex flex-col items-center flex-1 w-full gap-20 max-w-[1200px] px-4 pb-6">
      <Header>
        <Link href="/">Farewell Boards</Link>
        <AuthButton />
      </Header>
      <h1 className="text-4xl">Create a new Farewell Board</h1>
      <div className="grid grid-cols-1 md:gap-6 md:grid-cols-6">
        <CreateBoardForm />

        <div className="md:col-span-4">
          <h2 className="mb-2 text-right">
            Farewell Boards{" "}
            <span className="text-sm text-slate-400">
              ({data?.length || 0})
            </span>
          </h2>
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
