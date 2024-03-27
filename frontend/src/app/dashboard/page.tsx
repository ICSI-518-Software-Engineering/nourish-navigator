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
import React from "react";

type DashboardPageProps = {};

const DashboardPage: React.FC<DashboardPageProps> = (props) => {
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
