export interface NavLink {
  label: string;
  icon: string;
  route: string;
  exact?: boolean;
}

export interface NavSection {
  id: string;
  label: string;
  children: NavLink[];
}
