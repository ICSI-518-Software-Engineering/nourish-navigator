import Sidebar from "@/components/Sidebar";
import { DEFAULTS } from "@/lib/constants";
import { Box } from "@mui/material";
import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Box>
      {/* Sidebar */}
      <Sidebar />

      <Box marginLeft={DEFAULTS.sidebarWidth} mt="2.25rem" px="2rem">
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
