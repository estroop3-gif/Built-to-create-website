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
      { label: "Filmmaking in the Real World", href: "/experiences/filmmaking-in-the-real-world" },
      { label: "Costa Rica", href: "/experiences/costa-rica" },
      { label: "Media Leaders Retreat", href: "/experiences/texas" }
    ]
  },
  { label: "FAQ", href: "/faq" },
  { label: "Course (Coming Soon)", href: "/course" },
  { label: "Contact", href: "/contact" },
  { label: "Register", href: "/register" }
];