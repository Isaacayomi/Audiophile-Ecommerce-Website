"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FiSettings, 
  FiUser, 
  FiLock, 
  FiBell, 
  FiShield, 
  FiGlobe, 
  FiCpu 
} from "react-icons/fi";

const SettingsSection = ({ title, description, children, icon, delay = 0 }: any) => (
  <motion.section
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
  >
    <div className="mb-6 flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D87D4A]/10 text-[#D87D4A]">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-bold text-white uppercase tracking-widest">{title}</h2>
        <p className="text-xs text-white/30 mt-1">{description}</p>
      </div>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </motion.section>
);

const SettingToggle = ({ label, description, defaultChecked }: any) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <p className="text-xs font-bold text-white">{label}</p>
      <p className="text-[10px] text-white/30 mt-0.5">{description}</p>
    </div>
    <button className={`h-5 w-9 rounded-full transition-all relative ${defaultChecked ? 'bg-[#D87D4A]' : 'bg-white/10'}`}>
      <div className={`absolute top-1 h-3 w-3 rounded-full bg-white transition-all ${defaultChecked ? 'right-1' : 'left-1'}`} />
    </button>
  </div>
);

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl pb-20">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-white">Store Settings</h1>
        <p className="text-sm text-white/40 mt-1">Tune the Audiophile admin experience and storefront preferences.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SettingsSection 
          title="Account Profile" 
          description="Manage the profile shown across the Audiophile admin area."
          icon={<FiUser />}
          delay={0.1}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#D87D4A] to-[#FBAF85] flex items-center justify-center text-white font-bold text-lg">
                JD
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-white">John Doe</p>
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Store Admin</p>
              </div>
              <button className="text-[10px] font-bold text-[#D87D4A] hover:underline uppercase tracking-widest">Edit</button>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Email Address</label>
              <input 
                type="email" 
                defaultValue="admin@audiophile.com" 
                className="h-10 rounded-xl bg-white/5 border border-white/5 px-4 text-xs text-white/60 outline-none"
                readOnly
              />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection 
          title="Security" 
          description="Keep the admin area secure and easy to manage."
          icon={<FiShield />}
          delay={0.2}
        >
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-white hover:bg-white/10 transition-all">
              <span className="flex items-center gap-3"><FiLock className="text-[#D87D4A]" /> Change Password</span>
              <FiGlobe className="text-white/20" />
            </button>
            <SettingToggle 
              label="Two-Factor Auth" 
              description="Protect your admin account with 2FA" 
              defaultChecked={true} 
            />
            <SettingToggle 
              label="Session Monitoring" 
              description="Alert on suspicious sign-ins" 
              defaultChecked={true} 
            />
          </div>
        </SettingsSection>

        <SettingsSection 
          title="Platform" 
          description="Control how the admin workspace behaves."
          icon={<FiCpu />}
          delay={0.3}
        >
          <div className="space-y-4">
            <SettingToggle 
              label="Live Sync" 
              description="Keep catalog changes in sync" 
              defaultChecked={true} 
            />
            <SettingToggle 
              label="Real-time Metrics" 
              description="Track catalog and order activity" 
              defaultChecked={true} 
            />
            <div className="h-px bg-white/5" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Storefront Build</span>
              <span className="text-[10px] font-bold text-[#D87D4A] uppercase tracking-widest bg-[#D87D4A]/10 px-2 py-0.5 rounded-lg">v2.4.0-stable</span>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection 
          title="Notifications" 
          description="Choose how you receive store updates."
          icon={<FiBell />}
          delay={0.4}
        >
          <div className="space-y-4">
            <SettingToggle 
              label="Email Alerts" 
              description="Order and stock notifications" 
              defaultChecked={true} 
            />
            <SettingToggle 
              label="System Audio" 
              description="Play sound on notifications" 
              defaultChecked={false} 
            />
            <button className="w-full mt-2 rounded-xl bg-white/5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:bg-white/10 hover:text-white transition-all border border-white/5">
              Manage Alerts
            </button>
          </div>
        </SettingsSection>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/5">
        <button className="text-xs font-bold text-white/40 hover:text-white transition-all uppercase tracking-widest">Restore Defaults</button>
        <button className="rounded-xl bg-[#D87D4A] px-10 py-3 text-xs font-bold text-white shadow-lg shadow-[rgba(216,125,74,0.2)] hover:bg-[#FBAF85] transition-all">
          Save Global Changes
        </button>
      </div>
    </div>
  );
}
