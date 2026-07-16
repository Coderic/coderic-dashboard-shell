/** Portal-supplied accent gradient for wordmark subtitle and PatternFly brand tokens. */
export type DashboardBrandAccent = {
  start: string;
  mid?: string;
  end: string;
};

/** Brand chrome injected by each portal (logo, wordmark, accent). */
export type DashboardBrandConfig = {
  logoSrc?: string;
  logoAlt?: string;
  title: string;
  subtitle?: string;
  homeHref?: string;
  accent?: DashboardBrandAccent;
};
