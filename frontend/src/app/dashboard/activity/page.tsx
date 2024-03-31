"use client";

import { useGetUserActivityService } from "@/api/activity";
import { DEFAULTS } from "@/lib/constants";
import { Stack, Typography } from "@mui/material";
import { ActivityIcon, PieChartIcon, TorusIcon } from "lucide-react";
import moment from "moment";
import React, { useMemo } from "react";
import ActivityChart from "./ActivityChart";
import KpiCard from "./KpiCard";
import TodaysMealPlan from "./TodaysMealPlan";

const ActivityPage: React.FC = () => {
  const { data: userActivities = [], isLoading } = useGetUserActivityService();

  const todaysActivity = useMemo(() => {
    if (!userActivities || userActivities?.length === 0) {
      return;
    }
    return userActivities.find((item) =>
      moment().isSame(moment(item.date, DEFAULTS.dateFormat), "day")
    );
  }, [userActivities]);

  /**
   * KPI Cards
   */

  const kpiCards = [
    {
      icon: <ActivityIcon size="2.5rem" />,
      label: "Total Calories",
      value: (todaysActivity?.totalCalories ?? 0).toFixed(2) + " kcal",
    },
    {
      icon: <PieChartIcon size="2.5rem" />,
      label: "Total Protein",
      value: (todaysActivity?.totalProtein ?? 0).toFixed(2) + " g",
    },
    {
      icon: <TorusIcon size="2.5rem" />,
      label: "Total Fat",
      value: (todaysActivity?.totalFat ?? 0).toFixed(2) + " g",
    },
  ];

  return (
    <Stack gap="1rem">
      {/* Title */}
      <Typography variant="h4" fontWeight="bold">
        Today&apos;s Activity ({moment().format(DEFAULTS.dateFormat)})
      </Typography>

      <Typography color={DEFAULTS.textColor}>
        Showing all your activity for today
      </Typography>

      {/* Main Content */}
      <Stack gap="2rem" overflow="auto" height="77vh">
        {/* KPI CARDS */}
        <Stack gap="1rem">
          <Typography variant="h6">Nutrients Info</Typography>

          {/* Nutrients Info */}
          <Stack
            direction="row"
            gap="1rem"
            overflow="auto"
            className="hide-scrollbar"
          >
            {kpiCards.map((card) => (
              <KpiCard key={card.label} isLoading={isLoading}>
                <Stack
                  direction="row"
                  gap="1rem"
                  alignItems="flex-start"
                  width="12rem"
                >
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
        </Stack>

        {/* Todays Meal Plan  */}
        <TodaysMealPlan />

        <ActivityChart userActivities={userActivities} isLoading={isLoading} />
      </Stack>
    </Stack>
  );
};

export default ActivityPage;