import React, { useState } from "react";
import { SAMPLE_PLEDGE_CASES } from "../data/mockSamples";
import { PledgeSampleData } from "../types";
import { FileText, Bot, AlertTriangle, CheckCircle2, Play, Copy, Check, Sparkles, RefreshCw, FileCheck, Layers } from "lucide-react";

export const AnnouncementWorkbench: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<PledgeSampleData>(SAMPLE_PLEDGE_CASES[0]);
  const [announcementType, setAnnouncementType] = useState<'pledge' | 'release'>('pledge');
  
  // Form input state
  const [shareholderName, setShareholderName] = useState(selectedCase.shareholderName);
  const [pledgedShares, setPledgedShares] = useState(selectedCase.pledgedShares);
  const [pledgeeName, setPledgeeName] = useState(selectedCase.pledgeeName);
  const [pledgePurpose, setPledgePurpose] = useState(selectedCase.pledgePurpose);
  const [startDate, setStartDate] = useState(selectedCase.startDate);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Update form inputs when case changes
  const handleCaseSelect = (caseItem: PledgeSampleData) => {
    setSelectedCase(caseItem);
    setAnnouncementType(caseItem.announcementType);
    setShareholderName(caseItem.shareholderName);
    setPledgedShares(caseItem.pledgedShares);
    setPledgeeName(caseItem.pledgeeName);
    setPledgePurpose(caseItem.pledgePurpose);
    setStartDate(caseItem.startDate);
    setAiResult(null);
  };

  const handleRunAiEmployee = async () => {
    setIsProcessing(true);
    setAiResult(null);

    const pledgeData = {
      shareholderName,
      pledgedShares,
      pledgeeName,
      pledgePurpose,
      startDate,
      contractFile: selectedCase.contractFile,
      resolutionFile: selectedCase.resolutionFile,
      registerFile: selectedCase.registerFile
    };

    try {
      const response = await fetch("/api/ai/announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pledgeData, announcementType }),
      });
      const data = await response.json();
      if (data.success) {
        setAiResult(data);
      } else {
        alert("处理失败: " + data.error);
      }
    } catch (err: any) {
      console.error(err);
      alert("服务器请求失败，请重试。");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#1A1A1A]">
      
      {/* Editorial Header Banner */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 text-[#1A1A1A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="px-2 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
              <Bot className="w-3.5 h-3.5" />
              DEMO SCENARIO 01
            </span>
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">第一阶段：董秘/证券事务高频突破</span>
          </div>
          <h2 className="text-2xl font-serif-title font-bold text-[#1A1A1A] tracking-tight">质押/解除质押公告生成与多源材料核验</h2>
          <p className="text-xs text-neutral-600 mt-1">
            演示 AI 数字员工如何读取合同、提取关键数据、交叉核对持股规则并自动拟定合规公告草稿
          </p>
        </div>

        {/* Preset Sample Selector */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {SAMPLE_PLEDGE_CASES.map((caseItem) => (
            <button
              key={caseItem.id}
              onClick={() => handleCaseSelect(caseItem)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                selectedCase.id === caseItem.id
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : "bg-white text-neutral-700 border-neutral-300 hover:border-[#1A1A1A]"
              }`}
            >
              {caseItem.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Source Documents & Inputs vs Right AI Digital Employee Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Raw Documents & Form Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Source Documents Accordion/Cards */}
          <div className="bg-white border border-[#1A1A1A] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-300 pb-3">
              <h3 className="font-serif-title font-bold text-sm text-[#1A1A1A] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#1A1A1A]" />
                业务输入材料（已导入 AI 解析池）
              </h3>
              <span className="text-[10px] font-mono font-bold bg-[#1A1A1A] text-white px-2 py-0.5">3 源文件</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#F8F9FA] p-3 border border-neutral-300 space-y-1">
                <div className="font-bold text-[#1A1A1A] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  协议合同（PDF/扫描件）
                </div>
                <pre className="text-[11px] text-neutral-800 whitespace-pre-wrap font-mono bg-white p-2 border border-neutral-200">
                  {selectedCase.contractFile}
                </pre>
              </div>

              <div className="bg-[#F8F9FA] p-3 border border-neutral-300 space-y-1">
                <div className="font-bold text-[#1A1A1A] flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5" />
                  董事会备案及股东持股库
                </div>
                <pre className="text-[11px] text-neutral-800 whitespace-pre-wrap font-mono bg-white p-2 border border-neutral-200">
                  {selectedCase.resolutionFile}
                </pre>
              </div>

              <div className="bg-[#F8F9FA] p-3 border border-neutral-300 space-y-1">
                <div className="font-bold text-[#1A1A1A] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  中登公司证明材料
                </div>
                <pre className="text-[11px] text-neutral-800 whitespace-pre-wrap font-mono bg-white p-2 border border-neutral-200">
                  {selectedCase.registerFile}
                </pre>
              </div>
            </div>
          </div>

          {/* Form Controls for Fine-Tuning or Overriding Parameters */}
          <div className="bg-white border border-[#1A1A1A] p-5 space-y-4">
            <h3 className="font-serif-title font-bold text-sm text-[#1A1A1A] border-b border-neutral-300 pb-3 flex items-center justify-between">
              <span>提取字段与公告设置</span>
              <span className="text-xs text-neutral-500 font-normal">支持微调核对</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <label className="block text-neutral-600 font-bold mb-1">公告类型</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setAnnouncementType('pledge')}
                    className={`flex-1 py-1.5 font-bold text-xs uppercase transition-colors border ${
                      announcementType === 'pledge' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    股份质押公告
                  </button>
                  <button
                    onClick={() => setAnnouncementType('release')}
                    className={`flex-1 py-1.5 font-bold text-xs uppercase transition-colors border ${
                      announcementType === 'release' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    解除质押公告
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 font-bold mb-1">股东名称</label>
                <input
                  type="text"
                  value={shareholderName}
                  onChange={(e) => setShareholderName(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-neutral-300 px-2.5 py-1.5 text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-bold mb-1">本次质押/解质股数</label>
                <input
                  type="text"
                  value={pledgedShares}
                  onChange={(e) => setPledgedShares(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-neutral-300 px-2.5 py-1.5 text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-bold mb-1">质权人名称</label>
                <input
                  type="text"
                  value={pledgeeName}
                  onChange={(e) => setPledgeeName(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-neutral-300 px-2.5 py-1.5 text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-bold mb-1">起始/登记日期</label>
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-neutral-300 px-2.5 py-1.5 text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-neutral-600 font-bold mb-1">质押用途</label>
                <input
                  type="text"
                  value={pledgePurpose}
                  onChange={(e) => setPledgePurpose(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-neutral-300 px-2.5 py-1.5 text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
            </div>

            <button
              onClick={handleRunAiEmployee}
              disabled={isProcessing}
              className="w-full py-3 bg-[#1A1A1A] hover:bg-neutral-800 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all border border-[#1A1A1A]"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>AI 数字员工正在交叉核验并拟定公告...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>启动 AI 数字员工自动生成与核验</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: AI Processing Results & Draft Announcement (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {aiResult ? (
            <div className="space-y-6">
              
              {/* Executive Summary & Risk Alerts */}
              <div className="bg-white border-2 border-[#1A1A1A] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-300 pb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-[#1A1A1A]" />
                    <h3 className="font-serif-title font-bold text-base text-[#1A1A1A]">AI 数字员工多源交叉校验结论</h3>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#1A1A1A] text-white font-bold">
                    VERIFIED READY
                  </span>
                </div>

                <p className="text-xs text-neutral-800 font-medium bg-[#F8F9FA] p-3 border border-neutral-300 leading-relaxed">
                  💡 {aiResult.summary || "多源合同字段勾稽算计完成，自动匹配深交所主板股份质押/解质公告指引。"}
                </p>

                {/* Cross-Check Risk Alerts List */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[11px] block">自动风控核验节点：</span>
                  {aiResult.crossCheckAlerts?.map((alert: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-3 border flex items-start space-x-2.5 ${
                        alert.type === 'warning'
                          ? 'bg-[#E9ECEF] border-[#1A1A1A] text-[#1A1A1A]'
                          : alert.type === 'danger'
                          ? 'bg-red-50 border-red-700 text-red-900'
                          : alert.type === 'success'
                          ? 'bg-emerald-50 border-emerald-700 text-emerald-900'
                          : 'bg-white border-[#1A1A1A] text-[#1A1A1A]'
                      }`}
                    >
                      {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />}
                      {alert.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />}
                      {alert.type === 'info' && <FileCheck className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />}
                      <div>
                        <strong className="font-bold block text-xs">{alert.title}</strong>
                        <span className="text-[11px] leading-snug">{alert.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Draft Announcement Editor / Preview Card */}
              <div className="bg-white border-2 border-[#1A1A1A] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-300 pb-3">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-[#1A1A1A]" />
                    <h3 className="font-serif-title font-bold text-base text-[#1A1A1A]">自动生成的上市公司公告（Markdown初稿）</h3>
                  </div>

                  <button
                    onClick={() => handleCopyText(aiResult.draftAnnouncement)}
                    className="px-3 py-1 bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-bold flex items-center space-x-1 border border-[#1A1A1A]"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "已复制到剪贴板" : "复制公告全文"}</span>
                  </button>
                </div>

                <div className="bg-[#1A1A1A] text-white p-4 text-xs font-mono leading-relaxed max-h-[420px] overflow-y-auto whitespace-pre-wrap selection:bg-white selection:text-black">
                  {aiResult.draftAnnouncement}
                </div>

                <div className="text-[11px] text-neutral-600 flex items-center justify-between bg-[#F8F9FA] p-2.5 border border-neutral-300">
                  <span>确认把关：符合《上市公司信息披露管理办法》及最新深交所/上交所规范指引草案。</span>
                  <span className="text-[#1A1A1A] font-bold">证券事务人员可直接定稿发报</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white border-2 border-[#1A1A1A] border-dashed p-12 text-center space-y-4 text-neutral-600 min-h-[480px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-xl">
                <Bot className="w-8 h-8" />
              </div>
              <div className="max-w-md space-y-1">
                <h3 className="text-base font-serif-title font-bold text-[#1A1A1A]">准备就绪：等待启动 AI 数字员工</h3>
                <p className="text-xs text-neutral-600">
                  请选择左侧案例，或修改相关提取参数后点击“启动 AI 数字员工自动生成与核验”，即可实时体验自动化公告拟定与风控提示。
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

