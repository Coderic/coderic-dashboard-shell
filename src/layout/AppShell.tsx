import { useState } from "react";
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
import type { NavLink as NavLinkDef, NavSection } from "../nav-types";
import { BrandMark } from "./BrandMark";
import { SidebarNav } from "./SidebarNav";
import { UserMenu } from "./UserMenu";

export type AppShellProps = {
  brandTitle: string;
  brandSubtitle?: string;
  footerLabel: string;
  dashboardLink: NavLinkDef;
  navSections: NavSection[];
  showPaymentsBilling?: boolean;
};

export function AppShell({
  brandTitle,
  brandSubtitle,
  footerLabel,
  dashboardLink,
  navSections,
  showPaymentsBilling = false,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const header = (
    <Masthead>
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
          <BrandMark title={brandTitle} subtitle={brandSubtitle} />
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
