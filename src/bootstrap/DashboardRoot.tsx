import { StrictMode, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AuthRegistry, ClaimsConfig } from "@coderic/acl";
import { configureApiClient, type DashboardEnv } from "@coderic/dashboard-core";
import type { User } from "@auth0/auth0-spa-js";
import { DashboardAuthProvider } from "../auth/DashboardAuthProvider.js";

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

export type DashboardRootProps = {
  env: DashboardEnv;
  registry: AuthRegistry;
  claimsConfig: ClaimsConfig;
  isAdminUser?: (user: User | undefined) => boolean;
  queryClient?: QueryClient;
  children: ReactNode;
};

export function DashboardRoot({
  env,
  registry,
  claimsConfig,
  isAdminUser,
  queryClient = defaultQueryClient,
  children,
}: DashboardRootProps) {
  configureApiClient(env);
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <DashboardAuthProvider env={env} registry={registry} claimsConfig={claimsConfig} isAdminUser={isAdminUser}>
          {children}
        </DashboardAuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
