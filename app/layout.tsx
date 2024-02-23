import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Fairwell Board",
  description: "Create and share farewell boards for your loved ones.",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "bg-background text-foreground min-h-[100vh] grid grid-rows-[auto,1fr,auto] gap-y-4",
          fontSans.variable
        )}
      >
        <main className="flex flex-col items-center min-h-[90vh]">
          {children}
          {modal}
          <Toaster richColors />
          <div id="modal-root" />
        </main>
        <footer className="p-4 text-xs text-center text-slate-400 row-start-3 row-span-1">
          <p>© {new Date().getFullYear()} Farewell boards </p>
        </footer>
      </body>
    </html>
  );
}
