"use client";

import { UserSessionDetailsType } from "@/app/(auth)/dataAndTypes";
import { getLoggedInUserDetails } from "@/app/(auth)/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { buttonVariants } from "./ui/button";
import { SheetClose } from "./ui/sheet";

type NavItemsProps = {
  mobile?: boolean;
};

const NavItems: React.FC<NavItemsProps> = (props) => {
  const user = getLoggedInUserDetails();
  const pathname = usePathname();

  if (!user) return null;

  return navItems?.map((item) => {
    if (item.displayAccessor && !item.displayAccessor?.(user)) return;
    if (props.mobile) {
      return (
        <SheetClose key={item.url} asChild>
          <Link href={item.url} className="-m-2 p-2 block font-medium">
            {item.label}
          </Link>
        </SheetClose>
      );
    }
    return (
      <Link
        key={item.url}
        className={buttonVariants({
          variant: pathname === item.url ? "secondary" : "ghost",
        })}
        href={item.url}
      >
        {item.label}
      </Link>
    );
  });
};

export default NavItems;

type NavItemsType<T = unknown> = {
  label: string;
  url: string;
  displayAccessor?: (item: T) => boolean;
};

export const navItems: NavItemsType<UserSessionDetailsType | null>[] = [
  {
    label: "Dashboard",
    url: "/dashboard",
  },
  {
    label: "Manage User Profiles",
    url: "/user-profiles",
    displayAccessor: (item) => Boolean(item && item.isAdmin),
  },
];
