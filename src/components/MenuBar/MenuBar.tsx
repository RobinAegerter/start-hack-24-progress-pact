"use client";

import { LuGoal } from "react-icons/lu";
import { RiShakeHandsLine } from "react-icons/ri";
import { Button } from "../ui/button";
import Link from "next/link";
import { LuMessageSquare } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { LuHome } from "react-icons/lu";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

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

export default function MenuBar() {
  const pathname = usePathname();
  const session = useSession();
  const menuItems = [
    {
      name: "Home",
      icon: <LuHome className="size-5" />,
      href: "/avatar",
      requiresSignIn: SignInStatus.SignedIn,
    },
    {
      name: "Coach",
      icon: <RiShakeHandsLine className="size-5" />,
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
      icon: <LuMessageSquare className="size-5" />,
      href: "/chats",
      requiresSignIn: SignInStatus.SignedIn,
    },
    {
      name: "Events",
      icon: <PiUsersThree className="size-5" />,
      href: "/events",
      requiresSignIn: SignInStatus.SignedIn,
    },
  ] as FilteredMenuItem[];

  return (
    <div className="w-full bg-white border-t border-slate-200">
      {session.data?.user &&
        menuItems.map((item, index) => {
          return (
            <Link key={item.name} href={item.href as any}>
              <Button
                // className="flex flex-col items-center justify-center"
                style={{
                  margin: 2,
                  height: "50px",
                  width: "calc(20% - 4px)",
                  color:
                    pathname.includes(item.href as string) && item.href !== "/"
                      ? "#326480"
                      : "#000",
                }}
                variant={"ghost"}
                className="flex-col"
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
