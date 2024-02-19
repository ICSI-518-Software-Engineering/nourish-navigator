"use client";

import { getLoggedInUserDetails } from "@/app/(auth)/utils";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { buttonVariants } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

type AuthLayoutProps = {
  children: React.ReactNode;
  headerText: string;
  redirectionLinkText?: string;
  redirectionLinkUrl?: string;
  disableAutoRedirect?: boolean;
  className?: string;
  isLoading?: boolean;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, ...props }) => {
  const router = useRouter();
  const isLoggedIn = getLoggedInUserDetails();

  useEffect(() => {
    if (isLoggedIn && !props.disableAutoRedirect) {
      router.replace("/");
    }
  }, [isLoggedIn, props.disableAutoRedirect, router]);

  if (isLoggedIn && !props.disableAutoRedirect) {
    return null;
  }

  if (props.isLoading) {
    return <Skeleton className="h-12 w-12 rounded-full mx-auto mt-10" />;
  }

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div
        className={cn(
          "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",
          props.className
        )}
      >
        <div className="flex flex-col items-center space-y-2 text-center">
          <Image
            src="/assets/images/logo_no_text.png"
            alt="logo without text"
            height={60}
            width={80}
            className="w-auto h-auto"
          />

          <h1 className="text-2xl font-semibold tracking-tight">
            {props.headerText}
          </h1>

          {/* Link to register Page */}
          {props.redirectionLinkUrl && (
            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href={props.redirectionLinkUrl}
            >
              {props.redirectionLinkText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="grid gap-6 pb-20">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
