import Link from "next/link";

export default function Landing() {
  return (
    <div className="h-full p-6 flex flex-col items-center justify-center">
      <h1>You need to be logged in to create a Farewell Board</h1>
      <Link href="/login">Login</Link>
    </div>
  );
}
