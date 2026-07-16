import { useState, type Ref } from "react";
import {
  Avatar,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  type MenuToggleElement,
} from "@patternfly/react-core";
import { useAuth } from "../auth/DashboardAuthProvider";

function displayName(user: { name?: string; email?: string; nickname?: string } | undefined): string {
  return user?.name ?? user?.nickname ?? user?.email ?? "User";
}

function initials(user: { name?: string; email?: string; nickname?: string } | undefined): string {
  const n = displayName(user);
  const parts = n.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return n.slice(0, 2).toUpperCase();
}

export type UserMenuProps = {
  showPaymentsBilling?: boolean;
};

export function UserMenu({ showPaymentsBilling = false }: UserMenuProps) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const name = displayName(user);
  const email = user?.email ?? "";
  const picture = typeof user?.picture === "string" ? user.picture : undefined;
  const toggleIcon = picture ? (
    <Avatar src={picture} alt="" size="sm" />
  ) : (
    <span className="dsh-user-menu-initials" aria-hidden>
      {initials(user)}
    </span>
  );
  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      onSelect={() => setIsOpen(false)}
      popperProps={{ position: "right" }}
      shouldFocusToggleOnSelect
      toggle={(toggleRef: Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          variant="plainText"
          icon={toggleIcon}
          isExpanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          aria-label="User menu"
        >
          <span className="dsh-user-menu-name">{name}</span>
        </MenuToggle>
      )}
    >
      <DropdownList>
        <DropdownItem isDisabled key="identity" description={email || undefined}>
          {name}
        </DropdownItem>
        <Divider component="li" key="sep-identity" />
        <DropdownItem key="profile" to="/profile/">
          Profile
        </DropdownItem>
        {showPaymentsBilling ? (
          <DropdownItem key="payments-billing" to="/billing/payments/">
            Payments & Billing
          </DropdownItem>
        ) : null}
        <DropdownItem key="hello-world" to="/hello-world/">
          Hello World
        </DropdownItem>
        <Divider component="li" key="sep-logout" />
        <DropdownItem key="logout" onClick={() => void logout()}>
          Sign out
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
