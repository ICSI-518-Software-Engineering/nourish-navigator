import Image from "next/image";
import Link from "next/link";
import React from "react";
import MaxWidthContainer from "./MaxWidthContainer";
import NavbarMobile from "./NavbarMobile";
import { buttonVariants } from "./ui/button";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
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
                    src="/assets/images/logo.png"
                    alt="logo"
                    height={100}
                    width={130}
                    className="h-auto w-40"
                  />
                </Link>
              </div>

              {/* 
          <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
            <NavItems />
          </div> */}

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    href="/sign-in"
                    className={buttonVariants({
                      variant: "ghost",
                    })}
                  >
                    Sign in
                  </Link>

                  <Link
                    href="/sign-up"
                    className={buttonVariants({
                      variant: "ghost",
                    })}
                  >
                    Create account
                  </Link>
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
