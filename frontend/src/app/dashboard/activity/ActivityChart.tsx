import { GetUserActivityServiceResponseType } from "@/api/activity";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ActivityChartProps = {
  userActivities: GetUserActivityServiceResponseType[];
  isLoading?: boolean;
};

const ActivityChart: React.FC<ActivityChartProps> = ({
  userActivities = [],
  isLoading,
}) => {
  return (
    <Stack gap="1rem">
      <Typography variant="h6">Activity</Typography>

      <Stack gap="2rem">
        {charts.map((ch) => (
          <Card key={ch.dataKey}>
            <CardHeader>
              <CardTitle>{ch.cardTitle}</CardTitle>
            </CardHeader>

            <CardContent>
              {isLoading ? (
                <Box height="22rem">
                  <LoadingSpinner isVisible />
                </Box>
              ) : (
                <ResponsiveContainer height={400} width="100%">
                  <BarChart data={userActivities} barSize={40}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        borderRadius: "1rem",
                        padding: "1rem",
                      }}
                      formatter={(v: number) => v?.toFixed?.(2)}
                      cursor={{ fill: "hsl(var(--muted))" }}
                    />
                    <Legend />
                    <Bar
                      dataKey={ch.dataKey}
                      fill={ch.color}
                      unit={ch.unit}
                      name={ch.label}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};

export default ActivityChart;

/**
 * ===== CHARTS =======
 */

const charts = [
  {
    cardTitle: "Calories Tracker",
    dataKey: "totalCalories",
    color: "#22c55e",
    unit: " kcal",
    label: "Calories",
  },
  {
    cardTitle: "Protein Tracker",
    dataKey: "totalProtein",
    color: "#facc15",
    unit: " g",
    label: "Protein",
  },
  {
    cardTitle: "Fat Tracker",
    dataKey: "totalFat",
    color: "#dc2626",
    unit: " g",
    label: "Fat",
  },
];
