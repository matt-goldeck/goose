import Link from "next/link";
import HeaderAuth from "@/components/header/header-auth";
import HeaderNav from "./header-nav";

export default function NavBar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 p-card">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <HeaderNav />
        <HeaderAuth />
      </div>
    </nav>
  );
}
