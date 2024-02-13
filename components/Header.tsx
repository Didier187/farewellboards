function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row items-center justify-between w-full p-4 border-b-[1px] border-slate-100">
      {children}
    </div>
  );
}
export { Header };
