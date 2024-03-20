import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";
import MobileMenu from "./MobileMenu";
import SignOutButton from "./SignOutButton";

export enum SignInStatus {
  SignedIn,
  SignedOut,
  Both,
}

export interface FilteredMenuItem {
  name: string;
  href?: string;
  action?: string;
  requiresSignIn: SignInStatus;
  variant?: "default" | "outline";
}

export default async function MenuComponent() {
  const menuItems = [
    {
      name: "Home",
      href: "/",
      requiresSignIn: SignInStatus.SignedOut,
    },
    {
      name: "About",
      href: "/about",
      requiresSignIn: SignInStatus.SignedOut,
    },
    {
      name: "Contact",
      href: "/contact",
      requiresSignIn: SignInStatus.SignedOut,
    },
    {
      name: "App",
      href: "/app",
      requiresSignIn: SignInStatus.SignedIn,
    },
    {
      name: "Profile",
      href: "/profile",
      requiresSignIn: SignInStatus.SignedIn,
    },
    {
      name: "Sign In",
      href: "/auth/sign-in",
      requiresSignIn: SignInStatus.SignedOut,
      variant: "default",
    },
    {
      name: "Sign Out",
      href: "/auth/sign-out",
      action: "signOut",
      requiresSignIn: SignInStatus.SignedIn,
    },
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
    <>
      {" "}
      <div className="space-x-5 hidden md:flex">
        {filteredMenuItems.map((item, index) => {
          if (item.action === "signOut") {
            return <SignOutButton key={item.name}>{item.name}</SignOutButton>;
          } else if (item.href) {
            return (
              <Link key={item.name} href={item.href}>
                <Button variant={item.variant ?? "outline"}>{item.name}</Button>
              </Link>
            );
          }
        })}
      </div>
      <div className="block md:hidden">
        <MobileMenu filteredMenuItems={filteredMenuItems} />
      </div>
    </>
  );
}
