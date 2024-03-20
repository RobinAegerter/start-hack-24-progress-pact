import Link from "next/link";
import MenuComponent from "./Menu";

export default function Navbar() {
  return (
    <div className="w-full shadow-md">
      <nav className="flex items-center justify-between p-5 mx-auto max-w-6xl">
        <Link href="/">
          <h1 className="text-2xl font-bold">App Name</h1>
        </Link>
        <MenuComponent />
      </nav>
    </div>
  );
}
