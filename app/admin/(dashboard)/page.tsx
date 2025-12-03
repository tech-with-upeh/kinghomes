"use client";

import React from "react";
import {
  TrendUp,
  HouseLine,
  Users,
  Eye,
  CurrencyDollar,
  CaretRight,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Listings",
      value: "1,248",
      change: "+12.5%",
      isPositive: true,
      icon: HouseLine,
      color: "bg-blue-500",
    },
    {
      title: "Total Views",
      value: "84.3k",
      change: "+24.2%",
      isPositive: true,
      icon: Eye,
      color: "bg-purple-500",
    },
    {
      title: "Active Users",
      value: "3,842",
      change: "-2.4%",
      isPositive: false,
      icon: Users,
      color: "bg-orange-500",
    },
    {
      title: "Revenue",
      value: "$42,500",
      change: "+8.1%",
      isPositive: true,
      icon: CurrencyDollar,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors">
            Download Report
          </button>

          <Link href="/admin/listings/create">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all">
              Add New Listing
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-${stat.color.replace(
                  "bg-",
                  ""
                )}`}
              >
                <stat.icon size={24} className={`text-${stat.color.replace("bg-", "")}`} weight="duotone" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.isPositive
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-xs text-gray-400">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Listings */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Recent Listings
            </h2>
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center gap-1">
              View All <CaretRight />
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-neutral-800"
              >
                <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-neutral-800 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-1600596542815-27b5c0c8aa0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`}
                    alt="House"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Modern Villa in Beverly Hills
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    $2,500,000 • 4 Beds • 3 Baths
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Active
                  </span>
                  <p className="text-xs text-gray-400 mt-1">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Notifications */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Notifications
          </h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-bold">John Doe</span> submitted a new
                    inquiry for <span className="font-medium">Villa #24</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">10 mins ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
}
