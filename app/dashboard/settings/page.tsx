"use client";
import React, { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Globe,
  ToggleLeft,
  ToggleRight,
  FloppyDisk,
  Camera
} from "@phosphor-icons/react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { name: "Profile", icon: User },
    { name: "Notifications", icon: Bell },
    { name: "Security", icon: Lock },
    { name: "Preferences", icon: Globe },
  ];

  const [emailNotifs, setEmailNotifs] = useState({
    "New property alerts": true,
    "Price drops on saved homes": true,
    "Tour reminders": true,
    "Weekly newsletter": false
  });

  const [pushNotifs, setPushNotifs] = useState({
    "Direct messages": true,
    "Application status updates": true
  });

  const toggleEmail = (key: string) => {
    setEmailNotifs(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const togglePush = (key: string) => {
    setPushNotifs(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === tab.name
                  ? "bg-[#497693] text-white shadow-lg shadow-[#497693]/20"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <tab.icon size={20} weight={activeTab === tab.name ? "fill" : "regular"} />
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          
          {/* Profile Settings */}
          {activeTab === "Profile" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-6">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white/10">
                    <img 
                      src="https://images.unsplash.com/photo-1599566150163-29194dcaad36" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">John Doe</h3>
                  <p className="text-white/60">Admin User</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">First Name</label>
                  <input type="text" defaultValue="John" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#497693] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Last Name</label>
                  <input type="text" defaultValue="Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#497693] transition-colors" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-white/80">Email Address</label>
                  <input type="email" defaultValue="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#497693] transition-colors" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-white/80">Bio</label>
                  <textarea rows={4} defaultValue="Real estate enthusiast looking for modern properties." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#497693] transition-colors resize-none" />
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === "Notifications" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-bold text-white mb-6">Email Notifications</h3>
              
              {Object.entries(emailNotifs).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <span className="text-white/80">{key}</span>
                  <button 
                    onClick={() => toggleEmail(key)}
                    className={`transition-colors ${value ? "text-[#497693] hover:text-[#3a6078]" : "text-white/20 hover:text-white/40"}`}
                  >
                    {value ? <ToggleRight size={32} weight="fill" /> : <ToggleLeft size={32} weight="fill" />}
                  </button>
                </div>
              ))}

              <h3 className="text-xl font-bold text-white mt-8 mb-6">Push Notifications</h3>
              {Object.entries(pushNotifs).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <span className="text-white/80">{key}</span>
                  <button 
                    onClick={() => togglePush(key)}
                    className={`transition-colors ${value ? "text-[#497693] hover:text-[#3a6078]" : "text-white/20 hover:text-white/40"}`}
                  >
                     {value ? <ToggleRight size={32} weight="fill" /> : <ToggleLeft size={32} weight="fill" />}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "Security" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#497693] transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#497693] transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#497693] transition-colors" />
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-white/60">Add an extra layer of security to your account.</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-[#497693]/20 text-[#497693] hover:bg-[#497693]/30 transition-colors text-sm font-medium">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          )}

           {/* Preferences Settings */}
           {activeTab === "Preferences" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Currency</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#497693] transition-colors">
                  <option className="bg-zinc-900">USD ($)</option>
                  <option className="bg-zinc-900">EUR (€)</option>
                  <option className="bg-zinc-900">GBP (£)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Language</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#497693] transition-colors">
                  <option className="bg-zinc-900">English (US)</option>
                  <option className="bg-zinc-900">Spanish</option>
                  <option className="bg-zinc-900">French</option>
                </select>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
            <button className="flex items-center gap-2 px-6 py-3 bg-[#497693] hover:bg-[#3a6078] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#497693]/20">
              <FloppyDisk size={20} />
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
