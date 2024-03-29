"use client";

import http from "@/api/http";
import Sidebar from "@/components/Sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DEFAULTS } from "@/lib/constants";
import { Box } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { getLoggedInUserDetails } from "../(auth)/utils";


type DashboardPageProps = {};

function mealPlan(userID: string) {
  http.get(`/planner/meals/${userID}`)
}

const DashboardPage: React.FC<DashboardPageProps> = (props) => {

  useEffect(() => {
    const userDetails = getLoggedInUserDetails();
    if (!userDetails){
      console.log('error')
    }
    else{
      mealPlan(userDetails._id)
    }
    
  }, []);

  return (
    <Box>
      {/* Sidebar */}
      <Sidebar />

      {/* Meal Planner */}
      <Box
        width="25rem"
        marginLeft={`calc(${DEFAULTS.sidebarWidth} + 3rem)`}
        px="1rem"
      >
        <Card>
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={200}
              height={200}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DashboardPage;
