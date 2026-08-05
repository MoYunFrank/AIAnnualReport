import React, { useState } from "react";
import { ActiveTab } from "./types";
import { Navbar } from "./components/Navbar";
import { PresentationDeck } from "./components/PresentationDeck";
import { AnnouncementWorkbench } from "./components/AnnouncementWorkbench";
import { IRWorkbench } from "./components/IRWorkbench";
import { CrossDeptCollaborationPreview } from "./components/CrossDeptCollaborationPreview";
import { LandingROICalculator } from "./components/LandingROICalculator";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("presentation");

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-white flex flex-col justify-between">
      
      {/* Top Navbar */}
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* View Switcher Container */}
        <main className="pb-16">
          {activeTab === "presentation" && (
            <PresentationDeck onNavigateToDemo={(tab) => setActiveTab(tab)} />
          )}

          {activeTab === "announcement-demo" && (
            <AnnouncementWorkbench />
          )}

          {activeTab === "ir-demo" && (
            <IRWorkbench />
          )}

          {activeTab === "collaboration-preview" && (
            <CrossDeptCollaborationPreview />
          )}

          {activeTab === "landing-calculator" && (
            <LandingROICalculator />
          )}
        </main>
      </div>

      {/* Editorial Footer */}
      <footer className="bg-white border-t-2 border-[#1A1A1A] py-6 text-xs text-neutral-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="font-serif-title font-bold text-[#1A1A1A] text-sm">公司治理与证券事务 AI 数字员工</span>
            <span className="text-neutral-300">|</span>
            <span className="text-neutral-500 font-mono text-[11px]">高效率 · 低成本 · 零失误信披 · 稳定风控</span>
          </div>
          <div className="text-neutral-500 text-[11px] font-mono">
            DEPLOYMENT: ~30 DAYS · PRIVACY: AIR-GAPPED READY · ID: SE_SEC_GOV_A01
          </div>
        </div>
      </footer>

    </div>
  );
}

