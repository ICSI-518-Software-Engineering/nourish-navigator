"use client";

import { getLoggedInUserDetails } from "@/app/(auth)/utils";
import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MaxWidthContainer from "./MaxWidthContainer";
import NavItems from "./NavItems";
import NavbarMobile from "./NavbarMobile";
import UserMenu from "./UserMenu";
import { buttonVariants } from "./ui/button";

const Navbar: React.FC = () => {
  const user = getLoggedInUserDetails();

  return (
    <div
      className="sticky z-50 top-0 inset-x-0 h-16"
      style={{
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(/assets/images/background1.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <header className="relative">
        {/* Container */}

        <MaxWidthContainer className="border-b border-gray-200">
          <div>
            <div className="flex h-16 items-center">
              {/* Mobile Navbar */}
              <NavbarMobile />

              {/* Logo */}
              <div className="flex lg:ml-0">
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src="/assets/images/logo_no_text.png"
                    alt="logo"
                    height={40}
                    width={40}
                    className="h-auto w-10"
                    priority
                  />
                  <Typography letterSpacing={2} fontWeight={600}>
                    NOURISH NAVIGATOR
                  </Typography>
                </Link>
              </div>

              <div className="ml-auto flex items-center gap-3">
                {user && (
                  <div className="hidden z-50 lg:flex items-center gap-3">
                    <NavItems />
                  </div>
                )}

                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? (
                    <UserMenu user={user} />
                  ) : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Create account
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthContainer>
      </header>
    </div>
  );
};

export default Navbar;
