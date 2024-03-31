import { Stack, Typography } from "@mui/material";
import { ActivityIcon } from "lucide-react";
import React from "react";
import KpiCard from "./KpiCard";

const ActivityPage: React.FC = () => {
  return (
    <Stack direction="row" gap="1rem">
      {/* KPI CARDS */}
      <KpiCard>
        <Stack direction="row" gap="1rem" alignItems="flex-start">
          <ActivityIcon size="2.5rem" />
          <Stack>
            <Typography fontSize="1rem">Total Calories</Typography>
            <Typography fontSize="1.25rem" fontWeight="bold">
              3022
            </Typography>
          </Stack>
        </Stack>
      </KpiCard>
    </Stack>
  );
};

export default ActivityPage;
