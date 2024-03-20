"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FilteredMenuItem } from "./Menu";

export default function MobileMenu({
  filteredMenuItems,
}: {
  filteredMenuItems: FilteredMenuItem[];
}) {
  const handleSignOut = async () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            <HamburgerMenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {filteredMenuItems.map((item) => {
            if (item.action === "signOut") {
              return (
                <DropdownMenuItem onClick={handleSignOut} key={item.name}>
                  {item.name}
                </DropdownMenuItem>
              );
            }
            return (
              <DropdownMenuItem key={item.name} asChild>
                <Link href={item.href ?? "/"}>{item.name}</Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
