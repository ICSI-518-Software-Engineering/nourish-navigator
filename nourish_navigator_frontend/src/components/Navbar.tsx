"use client";

import { getLoggedInUserDetails } from "@/app/(auth)/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MaxWidthContainer from "./MaxWidthContainer";
import NavbarMobile from "./NavbarMobile";
import UserMenu from "./UserMenu";
import { buttonVariants } from "./ui/button";

const Navbar: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const user = getLoggedInUserDetails();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="sticky z-50 top-0 inset-x-0 h-16"
      style={{
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),url(/assets/images/background1.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <header className="relative">
        {/* Container */}

        <MaxWidthContainer>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* Mobile Navbar */}
              <NavbarMobile />

              {/* Logo */}
              <div className="flex lg:ml-0">
                <Link href="/">
                  <Image
                    src="/assets/images/logo_white.png"
                    alt="logo"
                    height={100}
                    width={130}
                    className="h-auto w-40"
                    priority
                  />
                </Link>
              </div>

              {/* 
          <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
            <NavItems />
          </div> */}

              {mounted && (
                <div className="ml-auto flex items-center">
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
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
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
              )}
            </div>
          </div>
        </MaxWidthContainer>
      </header>
    </div>
  );
};

export default Navbar;
