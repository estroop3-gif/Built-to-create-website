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
      { label: "Filmmaking — Jasper, GA", href: "/experiences/filmmaking-in-the-real-world" },
      { label: "Filmmaking — Canton, GA", href: "/experiences/filmmaking-canton" }
    ]
  },
  { label: "FAQ", href: "/faq" },
  { label: "Course (Coming Soon)", href: "/course" },
  { label: "Contact", href: "/contact" },
  { label: "Register", href: "/register" }
];