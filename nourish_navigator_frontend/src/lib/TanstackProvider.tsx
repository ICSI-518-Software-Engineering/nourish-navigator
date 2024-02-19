"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";

type TanstackProviderProps = {
  children: React.ReactNode;
};

export const queryClient = new QueryClient();

const TanstackProvider: React.FC<TanstackProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackProvider;
