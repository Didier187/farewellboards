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
    <div className="flex flex-col items-center flex-1 w-full  max-w-[1200px] px-4 pb-6">
      <Header>
        <Link href="/">Farewell Boards</Link>
        <AuthButton />
      </Header>
      <h1 className="text-3xl md:text-4xl mt-4 mb-16 md:mt-16 md:mb-20 text-center">Create a new Farewell Board</h1>
      <div className="grid grid-cols-1 md:gap-6 md:grid-cols-6 w-full">
        <CreateBoardForm />

        <div className="md:col-span-4">
          <h2 className="mb-2 text-right">
            Farewell Boards{" "}
            <span className="text-sm text-slate-400">
              ({data?.length || 0})
            </span>
          </h2>
          <div className="grid gap-4">
            {data && data?.length > 0 ? (
              data?.map((farewell) => (
                <FarewellCard key={farewell.id} {...farewell} />
              ))
            ) : (
              <div className="bg-slate-400 h-56 p-6 rounded-md">
                <h3 className="text-pretty text-2xl text-gray-50">No Farewell Boards</h3>
                <p className="text-pretty text-justify w-full text-gray-200">
                  Create a farewell board for a person you cared about.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
