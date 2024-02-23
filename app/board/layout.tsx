import CreateBoardCTA from "@/components/CreateBoardCTA";
import { Header } from "@/components/Header";
import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full align-center">
      <Header>
        <Link href="/">Farewell Boards</Link>
        <CreateBoardCTA />
      </Header>
      <div className="px-6">{children}</div>
    </div>
  );
}
