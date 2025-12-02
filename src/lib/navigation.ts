export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Experiences",
    children: [
      { label: "Costa Rica", href: "/experiences/costa-rica" },
      { label: "Jasper, GA", href: "/experiences/jasper" }
    ]
  },
  { label: "FAQ", href: "/faq" },
  {
    label: "Retreats",
    children: [
      { label: "Costa Rica", href: "/retreats/costa-rica" },
      { label: "Greece", href: "/retreats/greece" },
      { label: "Africa", href: "/retreats/africa" },
      { label: "Japan", href: "/retreats/japan" },
      { label: "Panama", href: "/retreats/panama" },
      { label: "United Kingdom", href: "/retreats/london" },
      { label: "Germany", href: "/retreats/germany" },
      { label: "Thailand", href: "/retreats/thailand" }
    ]
  },
  { label: "Course (Coming Soon)", href: "/course" },
  { label: "Contact", href: "/contact" }
];