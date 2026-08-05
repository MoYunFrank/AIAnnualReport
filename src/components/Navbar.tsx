import React from "react";
import { ActiveTab } from "../types";
import { Bot, Presentation, FileText, MessageSquare, Users, Calculator, ShieldCheck } from "lucide-react";

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "presentation" as ActiveTab, label: "方案宣讲与核心价值", icon: Presentation, badge: "精简宣讲" },
    { id: "announcement-demo" as ActiveTab, label: "实操1: 公告生成与校验", icon: FileText, badge: "高频突破" },
    { id: "ir-demo" as ActiveTab, label: "实操2: 投资者互动(IR)", icon: MessageSquare, badge: "高价值场景" },
    { id: "collaboration-preview" as ActiveTab, label: "跨部门协同预审", icon: Users, badge: "二三阶段" },
    { id: "landing-calculator" as ActiveTab, label: "快速落地与ROI评估", icon: Calculator, badge: "实施指南" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F8F9FA]/95 backdrop-blur-md border-b-2 border-[#1A1A1A] text-[#1A1A1A] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Masthead Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between py-3 border-b border-neutral-300 gap-2">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("presentation")}>
            <div className="w-9 h-9 bg-[#1A1A1A] text-white flex items-center justify-center font-serif text-lg font-bold">
              AI
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Solutions Architecture v2.4 · 证券事务 & 公司治理</p>
              <h1 className="text-xl sm:text-2xl font-serif-title font-bold tracking-tight text-[#1A1A1A] flex items-center gap-2">
                AI 数字员工服务方案
                <span className="text-[10px] uppercase font-sans font-bold bg-[#1A1A1A] text-white px-2 py-0.5 tracking-wider">
                  全流程辅助
                </span>
              </h1>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-3 text-xs font-mono text-neutral-600">
            <span className="flex items-center gap-1.5 font-bold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A]" />
              数据不出域
            </span>
            <span className="text-neutral-400">|</span>
            <span className="text-[11px]">无缝嵌入现有流程</span>
            <span className="text-neutral-400">|</span>
            <span className="text-[10px] bg-neutral-200 px-2 py-0.5 text-neutral-700 font-bold">SE_SEC_GOV_A01</span>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between py-2 overflow-x-auto no-scrollbar">
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-medium tracking-wide transition-all border ${
                    isActive
                      ? "bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold shadow-sm"
                      : "bg-white text-neutral-700 border-neutral-300 hover:border-[#1A1A1A] hover:bg-neutral-100"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-neutral-500"}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1 py-0.1 font-mono uppercase font-semibold ${
                      isActive ? "bg-white text-[#1A1A1A]" : "bg-neutral-200 text-neutral-600"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hidden md:block text-[11px] font-serif italic text-neutral-500">
            Editorial Governance Desk
          </div>
        </div>

      </div>
    </header>
  );
};

