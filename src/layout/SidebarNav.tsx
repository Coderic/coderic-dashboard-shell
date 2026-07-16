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

function isActive(pathname: string, route: string, exact?: boolean): boolean {
  if (exact) return pathname === route || (route !== "/" && pathname === route);
  if (route === "/") return pathname === "/";
  return pathname === route || pathname.startsWith(`${route}/`);
}

export type SidebarNavProps = {
  dashboardLink: NavLinkDef;
  navSections: NavSection[];
};

export function SidebarNav({ dashboardLink, navSections }: SidebarNavProps) {
  const { pathname } = useLocation();
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
      </PageSidebarBody>
    </PageSidebar>
  );
}
