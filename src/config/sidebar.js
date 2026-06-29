import {
  LayoutDashboard,
  Users,
  Shield,
  Settings,
  MapPin,
  ChevronRight,
} from "lucide-react";

const rootPath = "/dashboard";

const sidebar = [
  {
    title: "Dashboard",
    href: rootPath,
    icon: LayoutDashboard,
    action: "read",
    subject: "Dashboard",
  },
  {
    title: "Location",
    icon: MapPin,
    action: "read",
    subject: "Location",
    children: [
      {
        title: "Districts",
        href: `${rootPath}/location/districts`,
        icon: ChevronRight,
        action: "read",
        action: "create",
        action: "update",
        action: "delete",
        subject: "Districts",
      },
      {
        title: "Talukas",
        href: `${rootPath}/location/talukas`,
        icon: ChevronRight,
        action: "read",
        action: "create",
        action: "update",
        action: "delete",
        subject: "Talukas",
      },
      {
        title: "Villages",
        href: `${rootPath}/location/villages`,
        icon: ChevronRight,
        action: "read",
        action: "create",
        action: "update",
        action: "delete",
        subject: "Villages",
      },
    ],
  },
  {
    title: "CRP Management",
    icon: Users,
    action: "read",
    subject: "Users",
    children: [
      {
        title: "CRP List",
        href: `${rootPath}/crp-management`,
        icon: ChevronRight,
        action: "read",
        subject: "CRP List",
      }
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