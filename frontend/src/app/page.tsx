"use client";

import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { getLoggedInUserDetails } from "./(auth)/utils";

const HomePage: React.FC = () => {
  const user = getLoggedInUserDetails();
  return (
    <>
      <MaxWidthContainer>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl">
            One stop solution for{" "}
            <span className="text-teal-300">meal planning</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to Nourish Navigator. Every meal plan generated is
            completely based on your personal goals.
          </p>
          {/* These buttons should be visible only when user logged in */}
          {user && (
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/products" className={buttonVariants()}>
                Track your progress
              </Link>
              <Button variant="ghost">Update daily routine &rarr;</Button>
            </div>
          )}
        </div>
      </MaxWidthContainer>
    </>
  );
};

export default HomePage;
