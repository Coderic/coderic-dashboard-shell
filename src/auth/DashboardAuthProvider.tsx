import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createAuth0Client, type Auth0Client, type User } from "@auth0/auth0-spa-js";
import { AuthzProvider } from "@coderic/acl/react";
import type { AuthRegistry, ClaimsConfig } from "@coderic/acl";
import { createAuthHelpers, type DashboardEnv } from "@coderic/dashboard-core";

export interface AuthContextValue {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | undefined;
  roles: string[];
  permissions: string[];
  isAdmin: boolean;
  hasRole: (role: string) => boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

let clientPromise: Promise<Auth0Client> | null = null;
let clientEnvKey = "";

function getClient(env: DashboardEnv): Promise<Auth0Client> {
  const key = `${env.auth0Domain}:${env.auth0ClientId}:${env.auth0Audience}`;
  if (!clientPromise || clientEnvKey !== key) {
    clientEnvKey = key;
    clientPromise = createAuth0Client({
      domain: env.auth0Domain,
      clientId: env.auth0ClientId,
      authorizationParams: {
        redirect_uri: env.redirectUri,
        audience: env.auth0Audience,
      },
    });
  }
  return clientPromise;
}

export type DashboardAuthProviderProps = {
  env: DashboardEnv;
  registry: AuthRegistry;
  claimsConfig: ClaimsConfig;
  isAdminUser?: (user: User | undefined) => boolean;
  children: ReactNode;
};

export function DashboardAuthProvider({
  env,
  registry,
  claimsConfig,
  isAdminUser: isAdminUserOverride,
  children,
}: DashboardAuthProviderProps) {
  const helpers = useMemo(() => createAuthHelpers(claimsConfig), [claimsConfig]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>();

  const refresh = useCallback(async () => {
    const client = await getClient(env);
    const authed = await client.isAuthenticated();
    setIsAuthenticated(authed);
    setUser(authed ? await client.getUser() : undefined);
  }, [env]);

  useEffect(() => {
    void (async () => {
      try {
        await getClient(env);
        await refresh();
      } finally {
        setIsLoading(false);
      }
    })();
  }, [env, refresh]);

  const login = useCallback(async () => {
    const client = await getClient(env);
    await client.loginWithRedirect({
      authorizationParams: { redirect_uri: env.redirectUri, audience: env.auth0Audience },
      appState: { returnTo: env.authReturnTo },
    });
  }, [env]);

  const logout = useCallback(async () => {
    const client = await getClient(env);
    await client.logout({ logoutParams: { returnTo: window.location.origin + "/" } });
  }, [env]);

  const getAccessToken = useCallback(async () => {
    const client = await getClient(env);
    return client.getTokenSilently({ authorizationParams: { audience: env.auth0Audience } });
  }, [env]);

  const roles = useMemo(() => helpers.rolesFromUser(user), [helpers, user]);
  const permissions = useMemo(() => helpers.permissionsFromUser(user), [helpers, user]);
  const isAdmin = useMemo(
    () => (isAdminUserOverride ?? helpers.isAdminUser)(user),
    [helpers, isAdminUserOverride, user],
  );
  const principal = useMemo(() => helpers.principalFromUser(user), [helpers, user]);
  const hasRole = useCallback((role: string) => roles.includes(role), [roles]);

  const value = useMemo(
    () => ({
      isLoading,
      isAuthenticated,
      user,
      roles,
      permissions,
      isAdmin,
      hasRole,
      login,
      logout,
      getAccessToken,
    }),
    [isLoading, isAuthenticated, user, roles, permissions, isAdmin, hasRole, login, logout, getAccessToken],
  );

  return (
    <AuthzProvider registry={registry} user={principal}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </AuthzProvider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within DashboardAuthProvider");
  return ctx;
}

export function useAccessToken(): () => Promise<string> {
  return useAuth().getAccessToken;
}
