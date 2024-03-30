"use client";

import { getLoggedInUserDetails, logoutUser } from "@/app/(auth)/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import NavItems from "./NavItems";

const NavbarMobile = () => {
  const user = getLoggedInUserDetails();

  return (
    <Sheet>
      {/* Menu Button */}
      <SheetTrigger className="items-center">
        <Menu
          className="h-6 w-6 lg:hidden -m-2 mr-1 rounded-md text-gray-100 absolute right-3"
          aria-hidden="true"
        />
      </SheetTrigger>

      {/* Menu Content / Sidebar */}
      <SheetContent className="w-2/5">
        <SheetHeader className="mt-4">
          <hr className="my-5 absolute inset-0 top-11" />
          <div className="space-y-6 py-6 pt-8">
            {/* Name */}
            {user && (
              <p className="font-medium text-gold-500">Hi, {user.name}</p>
            )}

            <NavItems mobile />

            {/* Sign In Link / Profile Link */}
            <SheetClose asChild>
              <Link
                href={user ? "/user-profile" : "/sign-in"}
                className="-m-2 p-2 block font-medium"
              >
                {user ? "My Account" : "Sign in"}
              </Link>
            </SheetClose>

            {/* Sign Up Link */}
            <SheetClose asChild>
              <Link
                href={user ? "" : "/sign-up"}
                onClick={() => (user ? logoutUser() : null)}
                className="-m-2 block p-2 font-medium"
              >
                {user ? "Logout" : "Sign up"}
              </Link>
            </SheetClose>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobile;
