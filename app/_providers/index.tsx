import type { PropsWithChildren, JSX } from "react";
import AppTanstackProvider from "./tanstack";
import AppThemeProvider from "./theme";

export default function AppProviders({ children }: PropsWithChildren) {
  const providers = [
    AppThemeProvider,
    AppTanstackProvider,
  ];
  return providers.reduce(nestProviders)({ children });
}

export function nestProviders(
  PreviousProviders: ({ children }: PropsWithChildren) => JSX.Element,
  CurrentProvider: ({ children }: PropsWithChildren) => JSX.Element,
) {
  return function NestedProviders({ children }: PropsWithChildren<object>) {
    return (
      <PreviousProviders>
        <CurrentProvider>{children}</CurrentProvider>
      </PreviousProviders>
    );
  };
}
