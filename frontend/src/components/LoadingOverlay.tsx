import { Backdrop, Stack, Typography } from "@mui/material";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

type LoadingOverlayProps = {
  loadingLabel?: string;
  isLoading?: boolean;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  loadingLabel = "Loading...",
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <Stack alignItems="center" justifyContent="center">
        <LoadingSpinner isVisible />
        <Typography>{loadingLabel}</Typography>
      </Stack>
    </Backdrop>
  );
};

export default LoadingOverlay;
