"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import bg from "@/public/bg.jpg";
import logo from "@/public/kglogo.png";
import {
  SquaresFourIcon,
  HouseIcon,
  UsersIcon,
  GearIcon,
  SignOutIcon,
  BellIcon,
  ListIcon,
  X,
  TrendUpIcon,
  ChatCircleDotsIcon
} from "@phosphor-icons/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, text: "Price drop on 'Sunny Loft'", time: "2m ago", unread: true },
    { id: 2, text: "New message from Agent Sarah", time: "1h ago", unread: true },
    { id: 3, text: "Your tour is confirmed", time: "5h ago", unread: false },
  ];

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: SquaresFourIcon },
    { name: "Properties", href: "/dashboard/properties", icon: HouseIcon },
    { name: "Analytics", href: "/dashboard/analytics", icon: TrendUpIcon },
    { name: "Messages", href: "/dashboard/messages", icon: ChatCircleDotsIcon },
    { name: "Clients", href: "/dashboard/clients", icon: UsersIcon },
    { name: "Settings", href: "/dashboard/settings", icon: GearIcon },
  ];

  return (
    <div className="relative min-h-screen w-full font-sans overflow-hidden bg-black">
      {/* Global Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src={bg}
          alt="Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col`}
        >
          {/* Logo Area */}
          <div className="h-20 flex items-center px-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Image src={logo} height={32} width={32} alt="Logo" />
              <span className="text-xl font-bold text-white tracking-tight">
                KingHomes
              </span>
            </div>
            <button
              className="md:hidden ml-auto text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-[#497693] text-white shadow-lg shadow-[#497693]/20"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon
                    size={20}
                    weight={isActive ? "fill" : "regular"}
                    className={isActive ? "text-white" : "group-hover:scale-110 transition-transform"}
                  />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Logout */}
          <div className="p-4 border-t border-white/10">
            <Link href={"/"}>
                <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all">
              <SignOutIcon size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top Header */}
          <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-white/10 bg-white/5 backdrop-blur-md relative z-40">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg"
                onClick={() => setIsSidebarOpen(true)}
              >
                <ListIcon size={24} />
              </button>
              <h1 className="text-xl font-semibold text-white hidden md:block">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-6">
              {/* Search Placeholder */}
              <div className="hidden md:block relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 w-64 transition-all"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none"
                >
                  <BellIcon size={24} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-black" />
                </button>

                {isNotificationsOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsNotificationsOpen(false)} 
                    />
                    <div className="absolute right-0 mt-4 ml-4 w-60 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center">
                        <span className="text-sm text-white font-semibold">Notifications</span>
                        <span className="text-xs text-[#497693] cursor-pointer hover:text-white">Mark all read</span>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div key={notif.id} className="px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0">
                            <div className="flex justify-between items-start mb-1">
                              <p className={`text-sm ${notif.unread ? "text-white font-medium" : "text-white/60"}`}>
                                {notif.text}
                              </p>
                              {notif.unread && <div className="w-2 h-2 bg-[#497693] rounded-full mt-1.5" />}
                            </div>
                            <p className="text-xs text-white/40">{notif.time}</p>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-2 border-t border-white/10 text-center">
                        <button className="text-xs text-white/60 hover:text-white transition-colors">View All Notifications</button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* User Avatar & Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 pl-6 border-l border-white/10 focus:outline-none"
                >
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-semibold text-white">John Doe</p>
                    <p className="text-xs text-white/50">Admin</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#497693] to-cyan-500 p-[2px]">
                    <div className="h-full w-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36" alt="User" className="h-full w-full object-cover" />
                    </div>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsProfileOpen(false)} 
                    />
                    <div className="absolute right-0 mt-4 w-56 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-3 border-b border-white/10 mb-2">
                        <p className="text-sm text-white font-semibold">John Doe</p>
                        <p className="text-xs text-white/50">john@example.com</p>
                      </div>
                      
                      <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                        <UsersIcon size={16} /> Profile
                      </Link>
                      <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                        <GearIcon size={16} /> Settings
                      </Link>
                      
                      <div className="h-px bg-white/10 my-2" />
                      

                      <Link href={"/auths/login"}>
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left">
                            <SignOutIcon size={16} /> Sign Out
                        </button>
                      </Link>
                      
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-hide">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
