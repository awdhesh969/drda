import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  User,
} from "lucide-react";

import sidebar from "@/config/sidebar";
import useAbility from "@/hooks/useAbility";
import Image from "next/image";
import { useLogout } from "@/features/login/useLogin";

export default function Sidebar({user}) {
  const pathname = usePathname();
  const ability = useAbility();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
 const { mutateAsync: logout } = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const MenuItem = ({ item }) => {
  if (!ability.can(item.action, item.subject)) return null;

  const Icon = item.icon;

  const hasChildren = item.children?.length > 0;

  const active =
    pathname === item.href ||
    item.children?.some((c) => pathname === c.href);

  return (
    <div>
      {hasChildren ? (
        <>
          <button
            onClick={() => !collapsed && toggleMenu(item.title)}
            className={`flex w-full items-center rounded-xl px-3 py-3 ${
              active
                ? "transition-all duration-200 bg-white/10 text-blue-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.25)] border border-blue-400/40"
                : "group flex items-center justify-between gap-2.5 rounded-2xl px-3 py-2.5 text-sm transition-all duration-200 text-slate-200 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <Icon size={20} />

            {!collapsed && (
              <span className="ml-3 flex-1 text-left">
                {item.title}
              </span>
            )}

            {!collapsed && (
              <div
                className={`transition-transform duration-200 ${
                  openMenus[item.title] ? "rotate-180" : ""
                }`}
              >
                <ChevronDown size={18} />
              </div>
            )}
          </button>

          {/* Keep submenu animation */}
          <motion.div
            initial={false}
            animate={{
              height: openMenus[item.title] ? "auto" : 0,
              opacity: openMenus[item.title] ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="ml-6 mt-2 space-y-1 border-l border-gray-700 pl-4">
              {item.children.map((child) => (
                <MenuItem key={child.title} item={child} />
              ))}
            </div>
          </motion.div>
        </>
      ) : (
        <Link href={item.href}>
          <div
            className={`flex items-center rounded-xl px-3 py-3 ${
              pathname === item.href
                ? "transition-all duration-200 bg-white/10 text-blue-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.25)] border border-blue-400/40"
                : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent transition-all duration-200"
            }`}
          >
            <Icon size={20} />

            {!collapsed && (
              <span className="ml-3">
                {item.title}
              </span>
            )}
          </div>
        </Link>
      )}
    </div>
  );
};

  return (
    <motion.aside
      animate={{
        width: collapsed ? 80 : 270,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
      }}
      className="h-screen overflow-hidden border-r border-slate-800/60 bg-linear-to-b from-blue-950 via-blue-900 to-slate-950 text-slate-50"
    >
      {/* Header */}

      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
          <AnimatePresence>
            {!collapsed && (
              <div className="flex items-center gap-3 min-w-0">
                <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="text-xl font-bold text-white"
              >
                <div className="h-10 w-10 rounded-2xl overflow-hidden bg-white border border-white/20 flex items-center justify-center shrink-0">
                  <Image src="/Seal_of_Goa.webp" alt="Logo" width={150} height={50} />
                </div>
              </motion.h1>
              <div className="overflow-hidden whitespace-nowrap"><p className="text-sm font-semibold text-slate-50 leading-tight">DRDA Goa CRP</p><p className="text-[11px] text-slate-400">Cohesive Rural Program</p></div>
              </div>
            )}
          </AnimatePresence>

          <motion.button
            whileTap={{ rotate: 180 }}
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-2 text-white hover:text-white hover:bg-white/5 border border-transparent transition-all duration-200"
          >
            {collapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </motion.button>
        </div>

        {/* Menu */}

        <div className="p-3 flex-1 px-3 py-3 overflow-y-auto space-y-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          {sidebar.map((item) => (
            <MenuItem key={item.title} item={item} />
          ))}
        </div>
        <div className="border-t border-slate-800/80 px-3 py-4">
            <div className="flex items-center gap-3 justify-between">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold uppercase text-slate-100 overflow-hidden border border-slate-700">
                <Image src={user.profile || "/Seal_of_Goa.webp"} alt="Logo" width={150} height={50} />
              </div>
              {!collapsed && <div className="flex items-center justify-between gap-2 flex-1 overflow-hidden">
                <div className="leading-tight min-w-0">
                  <p className="text-xs font-medium text-slate-100 truncate">{user?.fullname}</p>
                  <p className="text-[11px] text-slate-400 capitalize">{user?.role_name}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button title="View Profile"
                    className="flex items-center justify-center w-7 h-7 rounded-full border border-slate-700/80 bg-slate-900/80 text-slate-300 hover:text-blue-300 hover:border-blue-500/60 hover:bg-blue-500/10 transition-all duration-200">
                      <User size={16} />
                    </button>
                    <button
                    onClick={handleLogout}
                    className="shrink-0 text-[11px] font-medium text-slate-300 hover:text-rose-300 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 transition hover:border-rose-500/80 hover:bg-rose-500/10 whitespace-nowrap">
                      Logout
                    </button>
                </div>
              </div>}
            </div>
        </div>
      </div>
    </motion.aside>
  );
}