import {
  Nav,
  NavGroup,
  NavItem,
  NavList,
  PageSidebar,
  PageSidebarBody,
} from "@patternfly/react-core";
import { NavLink, useLocation } from "react-router-dom";
import type { NavLink as NavLinkDef, NavSection } from "../nav-types";
import { NavIcon } from "./NavIcon";
import { useAuth } from "../auth/DashboardAuthProvider";

function isActive(pathname: string, route: string, exact?: boolean): boolean {
  if (exact) return pathname === route || (route !== "/" && pathname === route);
  if (route === "/") return pathname === "/";
  return pathname === route || pathname.startsWith(`${route}/`);
}

function displayName(user: { name?: string; email?: string; nickname?: string } | undefined): string {
  return user?.name ?? user?.nickname ?? user?.email ?? "User";
}

function initials(user: { name?: string; email?: string; nickname?: string } | undefined): string {
  const n = displayName(user);
  const parts = n.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return n.slice(0, 2).toUpperCase();
}

export type SidebarNavProps = {
  footerLabel: string;
  dashboardLink: NavLinkDef;
  navSections: NavSection[];
};

export function SidebarNav({ footerLabel, dashboardLink, navSections }: SidebarNavProps) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  return (
    <PageSidebar>
      <PageSidebarBody>
        <Nav aria-label="Dashboard">
          <NavList>
            <NavItem itemId="dashboard-home" isActive={isActive(pathname, dashboardLink.route, true)}>
              <NavLink to={dashboardLink.route} className="pf-v6-c-nav__link">
                <span className="dsh-nav-icon">
                  <NavIcon name={dashboardLink.icon} />
                </span>
                {dashboardLink.label}
              </NavLink>
            </NavItem>
            {navSections.map((section) => (
              <NavGroup key={section.id} title={section.label}>
                {section.children.map((child) => (
                  <NavItem
                    key={child.route}
                    itemId={child.route}
                    isActive={isActive(pathname, child.route, child.exact)}
                  >
                    <NavLink to={child.route} className="pf-v6-c-nav__link">
                      <span className="dsh-nav-icon">
                        <NavIcon name={child.icon} />
                      </span>
                      {child.label}
                    </NavLink>
                  </NavItem>
                ))}
              </NavGroup>
            ))}
          </NavList>
        </Nav>
        <div className="dsh-sidebar-footer">
          <div className="dsh-avatar">{initials(user)}</div>
          <div>
            <strong>{displayName(user)}</strong>
            <div className="dsh-sidebar-meta">{footerLabel}</div>
          </div>
        </div>
      </PageSidebarBody>
    </PageSidebar>
  );
}
