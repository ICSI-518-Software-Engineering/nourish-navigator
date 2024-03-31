"use client";

import { useGetUserProfileService } from "@/api/profile";
import { DEFAULTS } from "@/lib/constants";
import { Stack, Typography } from "@mui/material";
import { ActivityIcon, PieChartIcon } from "lucide-react";
import moment from "moment";
import React from "react";
import KpiCard from "./KpiCard";
import TodaysMealPlan from "./TodaysMealPlan";

const ActivityPage: React.FC = () => {
  const { data: userProfile } = useGetUserProfileService();

  return (
    <Stack gap="1rem">
      {/* Title */}
      <Typography variant="h4" fontWeight="bold">
        Today&apos;s Activity ({moment().format(DEFAULTS.dateFormat)})
      </Typography>

      {/* KPI Cards */}
      <Stack gap="2rem">
        {/* KPI CARDS */}
        <Stack direction="row" gap="1rem">
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

        {/* Todays Meal Plan  */}
        <TodaysMealPlan />
      </Stack>
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