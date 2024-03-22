import Link from "next/link";
import MenuComponent from "./Menu";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import AvatarMenu from "./AvatarMneu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = session ? true : false;
  let userImageurl = "/default-user.png";
  if (session && isLoggedIn && session.user.image) {
    userImageurl = session.user.image;
  }
  return (
    <div className="w-full shadow-md fixed top-0 bg-white z-index: 10">
      <nav className="flex items-center justify-between p-5 mx-auto max-w-6xl">
        <Link href="/">
          <h1 className="text-2xl font-bold">Progress Pact</h1>
        </Link>
        {isLoggedIn ? (
          <AvatarMenu userImage={userImageurl} />
        ) : (
          <Link href="/auth/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}
      </nav>
    </div>
  );
}
