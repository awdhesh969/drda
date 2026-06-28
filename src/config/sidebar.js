import {
  LayoutDashboard,
  Users,
  Shield,
  Settings,
} from "lucide-react";

const sidebar = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    action: "read",
    subject: "Dashboard",
  },
  {
    title: "User Management",
    icon: Users,
    action: "read",
    subject: "Users",
    children: [
      {
        title: "Users",
        href: "/users",
        icon: Users,
        action: "read",
        subject: "Users",
      },
      {
        title: "Roles",
        href: "/roles",
        icon: Shield,
        action: "read",
        subject: "Roles",
      },
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    action: "read",
    subject: "Settings",
  },
];

export default sidebar;