import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { cn } from "@/lib/utils";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Fairwell Board",
  description: "Create and share farewell boards for your loved ones.",
};
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={cn("bg-background text-foreground", fontSans.variable)}>
        <main className="flex flex-col items-center min-h-screen">
          {children}
          <Toaster richColors />
        </main>
        <footer className="p-4 text-xs text-center text-slate-400">
          <p>© {new Date().getFullYear()} Farewell boards </p>
        </footer>
      </body>
    </html>
  );
}
