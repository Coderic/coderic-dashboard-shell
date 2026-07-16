# @coderic/dashboard-shell

PatternFly 6 dashboard shell: layout, sidebar navigation, Auth0 provider, protected routes.

Generic text brand mark only — no proprietary logos or tenant defaults.

## Install

```bash
npm install @coderic/dashboard-shell @coderic/dashboard-core @coderic/acl
```

Peer dependencies: React 19, PatternFly 6, Auth0 SPA SDK, TanStack Query, React Router.

## Usage

```tsx
import { DashboardRoot, AppShell } from "@coderic/dashboard-shell";
import "@coderic/dashboard-shell/styles";

<DashboardRoot env={env} registry={registry} claimsConfig={claimsConfig}>
  <AppRoutes />
</DashboardRoot>
```

## License

MIT
