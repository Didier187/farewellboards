export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full max-w-[1200px] border-2 border-cyan-800">
      {children}
    </div>
  );
}
