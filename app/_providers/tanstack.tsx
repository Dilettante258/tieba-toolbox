"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import {getQueryClient} from "@/utils/get-query-client";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export default function AppTanstackProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}
