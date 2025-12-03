"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  ListPlus,
  Users,
  Gear,
  SignOut,
  List,
  Bell,
  MagnifyingGlass,
  CaretDown,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: House, path: "/admin" },
    { name: "Listings", icon: ListPlus, path: "/admin/listings" },
    { name: "Users", icon: Users, path: "/admin/users" }, // Placeholder
    { name: "Settings", icon: Gear, path: "/admin/settings" }, // Placeholder
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-neutral-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white dark:bg-neutral-950 border-r border-gray-200 dark:border-neutral-800 flex flex-col z-20 relative shadow-xl"
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100 dark:border-neutral-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-bold text-xl text-gray-900 dark:text-white whitespace-nowrap"
              >
                KingHomes
              </motion.span>
            )}
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                <item.icon
                  size={24}
                  weight={isActive ? "fill" : "regular"}
                  className="flex-shrink-0"
                />
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
                {!isSidebarOpen && isActive && (
                  <div className="absolute inset-y-0 left-0 w-1 bg-white rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-neutral-800">
          <button className="flex items-center gap-3 w-full px-3 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors">
            <SignOut size={24} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-500 transition-colors"
            >
              <List size={24} />
            </button>
            <div className="relative hidden md:block">
              <MagnifyingGlass
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-neutral-900 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors">
              <Bell size={24} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-neutral-950"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200 dark:border-neutral-800">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  Admin User
                </p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center overflow-hidden">
                   <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="Admin" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
             <div className="max-w-7xl mx-auto">
                {children}
             </div>
        </main>
      </div>
    </div>
  );
}
