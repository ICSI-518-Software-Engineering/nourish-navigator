"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useGetUserActivityService } from "@/api/activity";
import { useGetUserProfileService } from "@/api/profile";
import { DEFAULTS } from "@/lib/constants";
import { Box, Stack, Typography } from "@mui/material";
import { BellIcon } from "lucide-react";
import moment, { MomentInput } from "moment";
import React, { useMemo } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { Button } from "./ui/button";

type NotificationType = {
  date: string;
  message: string;
};
const today = moment();

const Notifications: React.FC = () => {
  const { data, isLoading } = useGetUserProfileService();
  const { data: userActivity, isLoading: isLoadingActivity } =
    useGetUserActivityService();

  const notifications = useMemo(() => {
    if (!data || !userActivity) return null;

    const startDate = data?.mealPlan?.[0]?.date;

    const userActivityIndex = userActivity?.findIndex(
      (item) => item.date === startDate
    );

    const notificationsActivity = userActivity?.slice(userActivityIndex);
    const missedNotifications: NotificationType[] = [];

    enumerateDaysBetweenDates(startDate, today)?.forEach((d) => {
      const date = notificationsActivity?.find((i) => i.date === d);
      if (!date) {
        if (d === today.format(DEFAULTS.dateFormat)) {
          missedNotifications.push({
            date: d,
            message: "Update your activity for today.",
          });
        } else {
          missedNotifications.push({
            date: d,
            message: "You've missed to update the activity.",
          });
        }
      }
    });

    return missedNotifications?.reverse?.();
  }, [data, userActivity]);

  const hasTodayNotification = Boolean(
    notifications?.find(
      (item) => item.date === today.format(DEFAULTS.dateFormat)
    )
  );

  return (
    <>
      <LoadingOverlay isLoading={isLoading || isLoadingActivity} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Box position="relative">
              <BellIcon size={20} />
              {hasTodayNotification && (
                <Box
                  width="0.5rem"
                  height="0.5rem"
                  borderRadius="50%"
                  bgcolor="white"
                  position="absolute"
                  top={0}
                  right={0}
                  className="animate-ping"
                />
              )}
            </Box>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="p-5 space-y-5" align="end">
          {/* No Notifications  */}
          {(!data || !data.mealPlan || data.mealPlan.length === 0) && (
            <DropdownMenuItem asChild>
              <Typography>No notifications available.</Typography>
            </DropdownMenuItem>
          )}

          {/* Notifications Items */}
          {notifications?.map?.((n) => (
            <DropdownMenuItem asChild key={n.date} className="p-2">
              <Stack gap="0.5rem" alignItems="start" padding="0.5rem">
                <Typography>{n.message}</Typography>
                <Typography fontSize="0.75rem" alignSelf="end">
                  {n.date}
                </Typography>
              </Stack>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Notifications;

const allowedDateFormats = [DEFAULTS.dateFormat];

const enumerateDaysBetweenDates = (
  startDate: MomentInput,
  endDate: MomentInput
) => {
  const dates = [];
  while (
    moment(startDate, allowedDateFormats) <= moment(endDate, allowedDateFormats)
  ) {
    dates.push(
      moment(startDate, allowedDateFormats).format(DEFAULTS.dateFormat)
    );
    startDate = moment(startDate, allowedDateFormats)
      .add(1, "days")
      .format(DEFAULTS.dateFormat);
  }
  return dates;
};