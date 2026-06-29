"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "./Sidebar";
import Header from "./Header";
import useAuth from "@/hooks/useAuth";
import GlobalLoader from "../common/GlobalLoader";

export default function Layout({ children }) {
  const {user} = useAuth();
  const userData = user?.data || {};

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar
        user={userData}
      />
      <motion.div
        layout
        className="flex flex-1 flex-col gap-4 overflow-hidden p-4"
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 25,
        }}
      >
        <Header roleName={userData.role_name} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight capitalize">{userData.role_name} Dashboard</h1>
            <p className="text-sm text-slate-500">Monitor CRP activity with a calm, focused workspace.</p>
          </div>
          <div
            className="flex items-center gap-2 self-start sm:self-center px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span
                className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500">
                  </span>
                  </span>
              <span
              className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">Logged In</span></div>
          </div>
          <main className="bg-white rounded-[1.5rem] border border-slate-100 p-6 shadow-sm min-h-[480px]">
            <GlobalLoader />
            {children}
          </main>
      </motion.div>
    </div>
  );
}