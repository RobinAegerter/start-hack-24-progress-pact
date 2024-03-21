import { CiHome, CiChat1 } from "react-icons/ci";
import { FaHandsHelping } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { LuGoal } from "react-icons/lu";
import { Button } from "../ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export interface FilteredMenuItem {
  name: string;
  icon: React.ReactNode;
  href?: string;
  action?: string;
  requiresSignIn: SignInStatus;
  variant?: "default" | "outline";
}

export enum SignInStatus {
  SignedIn,
  SignedOut,
  Both,
}

export default async function MenuBar() {
  const menuItems = [
    {
      name: "Home",
      icon: <CiHome className="size-5" />,
      href: "/",
      requiresSignIn: SignInStatus.SignedOut,
    },
    {
      name: "About",
      icon: <CiHome className="size-5" />,
      href: "/about",
      requiresSignIn: SignInStatus.SignedOut,
    },
    {
      name: "Contact",
      icon: <CiHome className="size-5" />,
      href: "/contact",
      requiresSignIn: SignInStatus.SignedOut,
    },
    {
      name: "Home",
      icon: <CiHome className="size-5" />,
      href: "/",
      requiresSignIn: SignInStatus.SignedIn,
    },
    {
      name: "Coach",
      icon: <FaHandsHelping className="size-5" />,
      href: "/coach",
      requiresSignIn: SignInStatus.SignedIn,
    },
    {
      name: "Goals",
      icon: <LuGoal className="size-5" />,
      href: "/goals",
      requiresSignIn: SignInStatus.SignedIn,
    },
    {
      name: "Chat",
      icon: <CiChat1 className="size-5" />,
      href: "/chats",
      requiresSignIn: SignInStatus.SignedIn,
    },
    {
      name: "Events",
      icon: <MdEmojiEvents className="size-5" />,
      href: "/events",
      requiresSignIn: SignInStatus.SignedIn,
    },
    // {
    //   name: "Profile",
    //   icon: <CiHome />,
    //   href: "/profile",
    //   requiresSignIn: SignInStatus.SignedIn,
    // },
    // {
    //   name: "Sign In",
    //   icon: <CiHome />,
    //   href: "/auth/sign-in",
    //   requiresSignIn: SignInStatus.SignedOut,
    //   variant: "default",
    // },
    // {
    //   name: "Sign Out",
    //   icon: <CiHome />,
    //   href: "/auth/sign-out",
    //   action: "signOut",
    //   requiresSignIn: SignInStatus.SignedIn,
    // },
  ] as FilteredMenuItem[];

  const session = await getServerSession(authOptions);

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.requiresSignIn === SignInStatus.Both) {
      return true;
    }
    if (item.requiresSignIn === SignInStatus.SignedIn && session) {
      return true;
    }
    if (item.requiresSignIn === SignInStatus.SignedOut && !session) {
      return true;
    }
    return false;
  });
  return (
    <div className="w-full">
      {filteredMenuItems.map((item, index) => {
        return (
          <Link key={item.name} href={item.href}>
            <Button
              // className="flex flex-col items-center justify-center"
              style={{
                margin: 2,
                height: "50px",
                width: "calc(20% - 4px)",
              }}
              variant={item.variant ?? "outline"}
              className="flex-col "
            >
              <div>{item.icon}</div>
              <div>{item.name}</div>
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
