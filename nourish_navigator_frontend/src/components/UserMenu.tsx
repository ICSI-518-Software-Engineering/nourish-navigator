"use client";

import { UserSessionDetailsType } from "@/app/(auth)/dataAndTypes";
import { logoutUser } from "@/app/(auth)/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

type UserMenuProps = {
  user: UserSessionDetailsType;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">My account</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60 p-5" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm">{user.name}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="/user-profile">User Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
