import { getFarewellBoard } from "@/actions/farewell-board";
import AuthButton from "@/components/AuthButton";
import { Header } from "@/components/Header";
import { UpdateBoardForm } from "@/components/UpdateFarewellBoard";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const [data, error] = await getFarewellBoard(params.id);
  return (
    <div className="flex flex-col items-center flex-1 w-full gap-20 max-w-[1200px] px-4 pb-6">
      <Header>
        <Link href="/">Farewell Boards</Link>
        <AuthButton />
      </Header>
      <div className="h-full p-6 flex flex-1 flex-col items-center">
        <UpdateBoardForm id={params.id} initialState={data} />
      </div>
    </div>
  );
}
