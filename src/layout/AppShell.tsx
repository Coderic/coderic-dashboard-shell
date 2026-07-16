import { useState, type CSSProperties } from "react";
import {
  Button,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  MastheadToggle,
  Page,
  PageSection,
} from "@patternfly/react-core";
import { BarsIcon } from "@patternfly/react-icons";
import { Outlet } from "react-router-dom";
import type { DashboardBrandConfig } from "../brand-types.js";
import type { NavLink as NavLinkDef, NavSection } from "../nav-types";
import { BrandMark, brandThemeStyle } from "./BrandMark.js";
import { SidebarNav } from "./SidebarNav.js";
import { UserMenu } from "./UserMenu.js";

export type AppShellProps = {
  brand: DashboardBrandConfig;
  footerLabel: string;
  dashboardLink: NavLinkDef;
  navSections: NavSection[];
  showPaymentsBilling?: boolean;
};

export function AppShell({
  brand,
  footerLabel,
  dashboardLink,
  navSections,
  showPaymentsBilling = false,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const themeStyle = brandThemeStyle(brand.accent);
  const header = (
    <Masthead style={themeStyle as CSSProperties}>
      <MastheadMain>
        <MastheadToggle>
          <Button
            variant="plain"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle sidebar"
            icon={<BarsIcon />}
          />
        </MastheadToggle>
        <MastheadBrand>
          <BrandMark {...brand} />
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <div className="dsh-masthead-actions">
          <UserMenu showPaymentsBilling={showPaymentsBilling} />
        </div>
      </MastheadContent>
    </Masthead>
  );
  return (
    <Page
      style={themeStyle as CSSProperties}
      masthead={header}
      sidebar={
        sidebarOpen ? (
          <SidebarNav footerLabel={footerLabel} dashboardLink={dashboardLink} navSections={navSections} />
        ) : undefined
      }
      isManagedSidebar
    >
      <PageSection isFilled>
        <Outlet />
      </PageSection>
    </Page>
  );
}
