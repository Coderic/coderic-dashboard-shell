import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@patternfly/react-core";
import { useAuth } from "./DashboardAuthProvider";

export function ProtectedRoute() {
  const { isLoading, isAuthenticated, login } = useAuth();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void login();
    }
  }, [isLoading, isAuthenticated, login]);
  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
        <Spinner size="lg" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
