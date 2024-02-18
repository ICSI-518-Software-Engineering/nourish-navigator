"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

const NavbarMobile = () => {
  return (
    <Sheet>
      {/* Menu Button */}
      <SheetTrigger className="items-center">
        <Menu
          className="h-6 w-6 lg:hidden -m-2 mr-1 rounded-md text-gray-400 absolute right-3"
          aria-hidden="true"
        />
      </SheetTrigger>

      {/* Menu Content / Sidebar */}
      <SheetContent className="w-2/5">
        <SheetHeader className="mt-4">
          <hr className="my-5 absolute inset-0 top-11" />
          <SheetDescription>
            <div className="space-y-6 py-6 pt-8">
              {/* Sign In Link */}
              <SheetClose asChild>
                <Link
                  href="/sign-in"
                  className="-m-2 p-2 block font-medium text-gray-900"
                >
                  Sign in
                </Link>
              </SheetClose>

              {/* Sign Up Link */}
              <SheetClose asChild>
                <Link
                  href="/sign-up"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign up
                </Link>
              </SheetClose>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobile;
