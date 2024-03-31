import { Stack, Typography } from "@mui/material";
import { ActivityIcon, PieChartIcon } from "lucide-react";
import React from "react";
import KpiCard from "./KpiCard";

const ActivityPage: React.FC = () => {
  return (
    <Stack direction="row" gap="1rem">
      {/* KPI CARDS */}
      {kpiCards.map((card) => (
        <KpiCard key={card.label}>
          <Stack direction="row" gap="1rem" alignItems="flex-start">
            {card.icon}
            <Stack>
              <Typography fontSize="1rem">{card.label}</Typography>
              <Typography fontSize="1.25rem" fontWeight="bold">
                {card.value}
              </Typography>
            </Stack>
          </Stack>
        </KpiCard>
      ))}
    </Stack>
  );
};

export default ActivityPage;

/**
 * KPI Cards
 */

const kpiCards = [
  {
    icon: <ActivityIcon size="2.5rem" />,
    label: "Total Calories",
    value: 3022,
  },
  {
    icon: <PieChartIcon size="2.5rem" />,
    label: "Total Protein",
    value: 2000,
  },
];
