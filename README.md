# @coderic/dashboard-shell

PatternFly 6 dashboard shell: masthead, sidebar, Auth0 provider, protected routes, React Query bootstrap.

**Generic text brand only** (`BrandMark`). No proprietary logos or default tenant labels.

## Install

```bash
npm install @coderic/dashboard-shell @coderic/dashboard-core @coderic/acl
```

Peers (install in app): React 19, React Router 7, PatternFly 6, `@auth0/auth0-spa-js`, `@tanstack/react-query`.

```ini
@coderic:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Repo: https://github.com/Coderic/coderic-dashboard-shell

Styles: `import "@coderic/dashboard-shell/styles";`

## Exports

| Symbol | Purpose |
|--------|---------|
| `DashboardRoot` | QueryClient + `DashboardAuthProvider` wrapper (**requires `claimsConfig`**) |
| `DashboardAuthProvider` | Auth0 SPA + ACL context |
| `AppShell` | PatternFly `Page` layout with sidebar |
| `ProtectedRoute` | Redirect unauthenticated users |
| `RouterLinkButton` | PF button as React Router link |
| `BrandMark` | Text masthead brand (`title`, optional `subtitle`) |
| `useAuth`, `useAccessToken` | Auth hooks |

CSS classes use prefix `dsh-*` (not vendor-specific).

## Vite (required in consuming apps)

Prebuilt `@coderic/*` dist must share one React instance with the app:

```ts
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom", "react-router", "react-router-dom", "@tanstack/react-query"],
    alias: {
      react: path.join(appDir, "node_modules/react"),
      "react-dom": path.join(appDir, "node_modules/react-dom"),
    },
  },
});
```

Without this, runtime fails with `Cannot read properties of null (reading 'useEffect')`.

## Usage

```tsx
import { DashboardRoot, AppShell, ProtectedRoute } from "@coderic/dashboard-shell";
import "@coderic/dashboard-shell/styles";
import { env } from "./config/env";
import { claimsConfig } from "./config/claims";
import { dashboardRegistry } from "./auth/registry";

createRoot(document.getElementById("root")!).render(
  <DashboardRoot
    env={env}
    registry={dashboardRegistry}
    claimsConfig={claimsConfig}
    isAdminUser={(user) => user?.email?.endsWith("@example.com")}
  >
    <BrowserRouter basename="/dashboard">
      <Routes>
        <Route element={<ProtectedRoute><AppShell … /></ProtectedRoute>}>
          …
        </Route>
      </Routes>
    </BrowserRouter>
  </DashboardRoot>,
);
```

### AppShell props

```tsx
<AppShell
  brand={dashboardBrand}
  dashboardLink={{ label: "Home", route: "/" }}
  navSections={[…]}
  showBilling={false}
/>
```

**Removed (do not use):** `CodericAuthProvider`, `MasterBrand`, `portalLabel`.

## Coderic portal mapping

| Portal | `brandSubtitle` | `auth0ClientGroup` |
|--------|-----------------|---------------------|
| coderic.cloud | CLOUD | corporate |
| coderic.store | STORE | corporate |
| coderic.com | BUSINESS | corporate |
| coderic.financial | FINTECH | corporate |
| coderic.dev | DEVELOPMENT | foundation |
| coderic.org | ORGANIZATION | foundation |
| coderic.net | NETWORK | foundation |
| coderic.io | HUB | foundation |

Always set `brandTitle="CODERIC"` in Coderic portals.

## License

MIT
