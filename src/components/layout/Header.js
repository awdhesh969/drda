import { motion } from "framer-motion";
import {
PanelLeftClose,
PanelLeftOpen,
Bell,
Search,
UserCircle2,
Menu,
Shield,
MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Header({
collapsed,
setCollapsed,
roleName,
}) {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      setDateTime(
        `${now.toLocaleDateString()} | ${now.toLocaleTimeString()}`
      );
    };

    update();

    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);
return (
<header
  className="flex items-center justify-between px-4 py-2 bg-white border border-slate-200/60 rounded-xl shadow-sm">
  <button type="button" className="p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-lg lg:hidden transition-colors">
    <Menu size={20} />
  </button>
  <div className="flex items-center gap-2">
    <div
      className="flex items-center gap-1.5 bg-[#0a3d62] text-white px-3 py-1 rounded-full shadow-sm max-w-[200px] sm:max-w-none truncate">
      <Shield size={12} />
      <span className="text-[10px] font-bold uppercase tracking-wider truncate">{roleName}</span></div>
    <div className="h-3 w-px bg-slate-200 mx-1"></div>
    <div className="flex items-center gap-1 text-slate-500">
      <MapPin size={16} />
      <span className="text-xs font-medium">District — <span className="text-slate-900 font-bold"></span></span>
    </div>
  </div>
  <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-slate-400">
    <span className="hidden sm:inline">Last sync: {dateTime}</span>
  </div>
</header>
);
}