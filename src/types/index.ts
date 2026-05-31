export type AdminRole = "super_admin" | "admin";

export type SideNavItem = {
  label: string;
  href: string;
  description: string;
};

export type Metric = {
  label: string;
  value: string;
  trend: string;
};

export type ScreenFlowStage = {
  stage: string;
  title: string;
  points: string[];
};
