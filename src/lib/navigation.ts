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
  { label: "Course (Coming Soon)", href: "/course" },
  { label: "Contact", href: "/contact" },
  { label: "Register", href: "/register" }
];