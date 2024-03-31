"use client";

import MaxWidthContainer from "@/components/MaxWidthContainer";
import { buttonVariants } from "@/components/ui/button";
import { DEFAULTS } from "@/lib/constants";
import { Typography } from "@mui/material";
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
            <Typography
              component="span"
              variant="inherit"
              color={DEFAULTS.textColor}
            >
              meal planning
            </Typography>
            .
          </h1>
          <Typography className="max-w-prose" mt="2rem">
            Welcome to Nourish Navigator. Every meal plan generated is
            completely based on your personal goals.
          </Typography>
          {/* These buttons should be visible only when user logged in */}
          {user && (
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/dashboard/activity" className={buttonVariants()}>
                Track your progress
              </Link>
              <Link
                href="/dashboard/meal-planner"
                className={buttonVariants({ variant: "secondary" })}
              >
                View current meal plan &rarr;
              </Link>
            </div>
          )}
        </div>
      </MaxWidthContainer>
    </>
  );
};

export default HomePage;
