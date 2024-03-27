import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";
import React from "react";

type DashboardPageProps = {};

const DashboardPage: React.FC<DashboardPageProps> = (props) => {
  return (
    <Box>
      {/* Sidebar */}
      <Sidebar />
    </Box>
  );
};

export default DashboardPage;
