"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiBell,
  FiCpu,
  FiGlobe,
  FiLock,
  FiSave,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { defaultSettings } from "../_lib/catalog";
import { useAdminCatalog } from "../_components/AdminCatalogProvider";

const SettingsSection = ({
  title,
  description,
  icon,
  children,
  delay = 0,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  delay?: number;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
  >
    <div className="mb-6 flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D87D4A]/10 text-[#D87D4A]">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-white">
          {title}
        </h2>
        <p className="mt-1 text-xs text-white/30">{description}</p>
      </div>
    </div>
    <div className="space-y-4">{children}</div>
  </motion.section>
);

const Toggle = ({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description: string;
}) => (
  <div className="flex items-center justify-between gap-4 py-1">
    <div>
      <p className="text-xs font-bold text-white">{label}</p>
      <p className="mt-0.5 text-[10px] text-white/30">{description}</p>
    </div>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 rounded-full transition-all ${
        checked ? "bg-[#D87D4A]" : "bg-white/10"
      }`}
    >
      <span
        className={`absolute top-1 h-3 w-3 rounded-full bg-white transition-all ${
          checked ? "right-1" : "left-1"
        }`}
      />
    </button>
  </div>
);

export default function SettingsPage() {
  const { settings, saveSettings } = useAdminCatalog();
  const [form, setForm] = useState(settings);

  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSave = () => {
    // The settings page persists to localStorage through the shared admin
    // provider, so these values are available across the dashboard after save.
    saveSettings(form);
  };

  const handleRestoreDefaults = () => {
    setForm(defaultSettings);
    saveSettings(defaultSettings);
  };

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Store Settings
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Control how the Audiophile admin area identifies itself and how it
          behaves.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SettingsSection
          title="Store Profile"
          description="These values show up in the dashboard and shared admin chrome."
          icon={<FiUser />}
          delay={0.05}
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
                Store Name
              </label>
              <input
                value={form.storeName}
                onChange={(event) => updateField("storeName", event.target.value)}
                className="h-10 rounded-xl border border-white/5 bg-white/5 px-4 text-xs text-white outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
                Admin Name
              </label>
              <input
                value={form.adminName}
                onChange={(event) => updateField("adminName", event.target.value)}
                className="h-10 rounded-xl border border-white/5 bg-white/5 px-4 text-xs text-white outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
                Support Email
              </label>
              <input
                type="email"
                value={form.supportEmail}
                onChange={(event) => updateField("supportEmail", event.target.value)}
                className="h-10 rounded-xl border border-white/5 bg-white/5 px-4 text-xs text-white outline-none"
              />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Security"
          description="Keep the admin workspace secure and easy to manage."
          icon={<FiShield />}
          delay={0.1}
        >
          <button className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-xs font-bold text-white transition-all hover:bg-white/10">
            <span className="flex items-center gap-3">
              <FiLock className="text-[#D87D4A]" />
              Change Password
            </span>
            <FiGlobe className="text-white/20" />
          </button>

          <Toggle
            checked={form.catalogSyncEnabled}
            onChange={(value) => updateField("catalogSyncEnabled", value)}
            label="Catalog Sync"
            description="Keep the dashboard aligned with storefront data"
          />
          <Toggle
            checked={form.emailAlertsEnabled}
            onChange={(value) => updateField("emailAlertsEnabled", value)}
            label="Email Alerts"
            description="Get notified about updates and low stock"
          />
        </SettingsSection>

        <SettingsSection
          title="Platform"
          description="Tune the admin workflow and catalog tone."
          icon={<FiCpu />}
          delay={0.15}
        >
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">
              Storefront Notes
            </p>
            <textarea
              rows={5}
              value={form.storefrontNotes}
              onChange={(event) =>
                updateField("storefrontNotes", event.target.value)
              }
              className="mt-3 w-full resize-none rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            />
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Current build
            </p>
            <p className="mt-1 text-xs text-[#D87D4A]">Audiophile admin tools</p>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Notifications"
          description="Choose how you want to receive operational updates."
          icon={<FiBell />}
          delay={0.2}
        >
          <Toggle
            checked={form.emailAlertsEnabled}
            onChange={(value) => updateField("emailAlertsEnabled", value)}
            label="Operational Email"
            description="Order and catalog updates"
          />
          <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">
              Admin identity
            </p>
            <p className="mt-1 text-xs text-white/60">{form.adminName}</p>
          </div>
        </SettingsSection>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={handleRestoreDefaults}
          className="text-xs font-bold uppercase tracking-widest text-white/40 transition-all hover:text-white"
        >
          Restore Defaults
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#D87D4A] px-8 text-xs font-bold text-white shadow-lg shadow-[rgba(216,125,74,0.2)] transition-all hover:bg-[#FBAF85]"
        >
          <FiSave />
          Save Changes
        </button>
      </div>
    </div>
  );
}
