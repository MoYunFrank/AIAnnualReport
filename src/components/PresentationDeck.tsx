import React, { useState } from "react";
import { SLIDES_DATA, MANUAL_VS_AI_COMPARISON, THREE_CORE_VALUES, PHASED_ROADMAP_STEPS, IMPLEMENTATION_CHECKLIST } from "../data/presentationData";
import { ActiveTab } from "../types";
import { ChevronLeft, ChevronRight, ShieldCheck, Zap, AlertTriangle, FileCheck, ArrowRight, Sparkles, CheckCircle2, Clock, DollarSign, Layers, Download, Copy, Check, Presentation, FileDown } from "lucide-react";
import { exportToPptx, generateMarkdownDeck } from "../utils/exportPptx";

interface PresentationDeckProps {
  onNavigateToDemo: (tab: ActiveTab) => void;
}

export const PresentationDeck: React.FC<PresentationDeckProps> = ({ onNavigateToDemo }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);

  const currentSlide = SLIDES_DATA[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < SLIDES_DATA.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleDownloadPptx = async () => {
    try {
      setIsExporting(true);
      await exportToPptx();
    } catch (err) {
      console.error("PPTX Export Error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdownDeck();
    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#1A1A1A]">
      
      {/* Top Slide Control Header (Editorial Deck Bar) */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 text-[#1A1A1A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="px-2 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest">
              {currentSlide.badge}
            </span>
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
              SECTION 0{currentSlide.id} / 0{SLIDES_DATA.length}
            </span>
          </div>
          <h2 className="text-2xl font-serif-title font-bold text-[#1A1A1A] tracking-tight">{currentSlide.title}</h2>
          <p className="text-xs text-neutral-600 mt-1">{currentSlide.subtitle}</p>
        </div>

        {/* Slide Selector & Export Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          
          {/* Export PPT Action Button */}
          <button
            onClick={() => setShowExportModal(true)}
            className="px-3.5 py-2 bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-[#1A1A1A] transition-colors"
          >
            <Download className="w-4 h-4 text-white" />
            <span>导出 PPT 演示文档</span>
          </button>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-1.5">
              {SLIDES_DATA.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-3 h-3 transition-all border ${
                    idx === currentSlideIndex
                      ? "bg-[#1A1A1A] border-[#1A1A1A] w-7"
                      : "bg-neutral-200 border-neutral-400 hover:bg-neutral-400"
                  }`}
                  title={slide.title}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                disabled={currentSlideIndex === 0}
                className="p-2 bg-white hover:bg-neutral-100 disabled:opacity-30 text-[#1A1A1A] transition-colors border border-[#1A1A1A] font-bold"
                title="上一页"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentSlideIndex === SLIDES_DATA.length - 1}
                className="p-2 bg-[#1A1A1A] hover:bg-neutral-800 disabled:opacity-30 text-white transition-colors border border-[#1A1A1A] font-bold"
                title="下一页"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Main Content Canvas */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 md:p-8 relative min-h-[520px] flex flex-col justify-between">
        
        {/* SLIDE 1: Pain Points & Shift to Digital Employee */}
        {currentSlide.id === 1 && (
          <div className="space-y-6">
            <div className="p-5 bg-[#F8F9FA] border-l-4 border-[#1A1A1A]">
              <h3 className="text-base font-serif-title font-bold text-[#1A1A1A] mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1A1A1A]" />
                定位升级核心理念
              </h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                方案<strong className="text-[#1A1A1A] font-bold">不是为了重塑企业原有的治理体系</strong>，而是在现有工作流程中嵌入辅助审核、解答与风控的 <strong className="text-[#1A1A1A] font-bold italic underline">“公司治理 AI 数字员工”</strong>。明确赋能董秘与证券事务团队。
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 border-b border-neutral-200 pb-2">
                人工作业传统方式 VS AI 数字员工全景对比
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MANUAL_VS_AI_COMPARISON.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 border border-[#1A1A1A] space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#1A1A1A] px-2 py-0.5">
                        {item.dimension}
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="bg-neutral-100 p-2.5 border border-dashed border-neutral-300 text-neutral-800">
                        <strong className="text-red-700 block mb-0.5">❌ 现有人工痛点：</strong>
                        {item.manual}
                      </div>
                      <div className="bg-[#1A1A1A] p-2.5 text-white">
                        <strong className="text-emerald-400 block mb-0.5">✅ AI 数字员工赋能：</strong>
                        {item.ai}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: Three Core Value Pillars */}
        {currentSlide.id === 2 && (
          <div className="space-y-6">
            <p className="text-xs text-neutral-600">
              对外讲解始终围绕三大核心价值展开，回答客户最关心的“具体强在哪里、能省多少成本、如何避免违规”。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {THREE_CORE_VALUES.map((val, idx) => (
                <div key={idx} className="bg-white p-6 border-2 border-[#1A1A1A] space-y-4 hover:bg-[#F8F9FA] transition-all">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                    <div className="w-10 h-10 bg-[#1A1A1A] text-white flex items-center justify-center font-bold">
                      {idx === 0 && <ShieldCheck className="w-5 h-5 text-white" />}
                      {idx === 1 && <FileCheck className="w-5 h-5 text-white" />}
                      {idx === 2 && <Zap className="w-5 h-5 text-white" />}
                    </div>
                    <span className="text-4xl font-serif-title font-bold text-[#1A1A1A]">{val.metric}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-serif-title font-bold text-[#1A1A1A] mb-1">{val.title}</h3>
                    <p className="text-xs text-neutral-700 font-bold mb-2">{val.subtext}</p>
                    <p className="text-xs text-neutral-600 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#E9ECEF] p-4 border border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-800">
                <strong className="text-[#1A1A1A] block font-bold">服务定位提示：</strong>
                当前提供 <strong className="underline">“企业资料+制度适配训练”</strong> 的数字员工服务，快速响应定制诉求。
              </div>
              <button
                onClick={() => onNavigateToDemo("landing-calculator")}
                className="whitespace-nowrap px-4 py-2 bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-2 transition-colors border border-[#1A1A1A]"
              >
                <span>查看 ROI 评估计算器</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 3: Case Study 1 - High Frequency Announcement */}
        {currentSlide.id === 3 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#1A1A1A] text-white p-4 border border-[#1A1A1A]">
              <div>
                <h3 className="text-base font-serif-title font-bold flex items-center gap-2 text-white">
                  <FileCheck className="w-5 h-5 text-white" />
                  案例一：质押 / 解除质押公告全流程智能辅助
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5">展示 AI 如何完成合同读取、模板匹配、规则校验与初稿输出</p>
              </div>
              <button
                onClick={() => onNavigateToDemo("announcement-demo")}
                className="px-4 py-2 bg-white text-[#1A1A1A] hover:bg-neutral-100 text-xs font-bold flex items-center gap-1.5 transition-colors border border-white"
              >
                <span>实操体验此场景</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
              {[
                { step: "01 文件读取", title: "多源格式解析", desc: "自动识别质押协议、解质证明、董事会决议及中登表格" },
                { step: "02 关键提取", title: "核心字段抽离", desc: "精准提取主体名称、质押股数、占持股及总股本比例" },
                { step: "03 模板匹配", title: "规则与规范核对", desc: "自动匹配上交所/深交所最新信披对应规范" },
                { step: "04 交叉校验", title: "风险与一致性", desc: "勾稽核算累计质押比例，排查窗口期禁质押及平仓红线" },
                { step: "05 结果生成", title: "格式化定稿辅助", desc: "生成标准定稿草稿，标记待确认事项供人工终审" }
              ].map((st, idx) => (
                <div key={idx} className="bg-white p-3.5 border border-[#1A1A1A] space-y-2 relative">
                  <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase">{st.step}</div>
                  <div className="font-serif-title font-bold text-[#1A1A1A] text-sm">{st.title}</div>
                  <div className="text-neutral-600 text-xs leading-normal">{st.desc}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#F8F9FA] p-4 border border-[#1A1A1A] text-xs space-y-2">
              <div className="font-bold text-[#1A1A1A]">解决实际问题与收益测算：</div>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-neutral-700">
                <li className="bg-white p-3 border border-neutral-300">
                  <span className="text-[#1A1A1A] font-bold block mb-1">耗时大幅缩短：</span>
                  人工耗时 2 小时 → AI 生成与核验只需 1 分钟，证券人员仅需 3 分钟审核定稿。
                </li>
                <li className="bg-white p-3 border border-neutral-300">
                  <span className="text-[#1A1A1A] font-bold block mb-1">杜绝数字勾稽错误：</span>
                  多文件数据穿透计算，消除因手工填报导致的比例算错风险。
                </li>
                <li className="bg-white p-3 border border-neutral-300">
                  <span className="text-[#1A1A1A] font-bold block mb-1">自动风险标记：</span>
                  质押比例超过高危红线时自动触发警戒提醒，提供监管预警。
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* SLIDE 4: Case Study 2 - Investor Relations High Value Scenario */}
        {currentSlide.id === 4 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#1A1A1A] text-white p-4 border border-[#1A1A1A]">
              <div>
                <h3 className="text-base font-serif-title font-bold flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5 text-white" />
                  案例二：投资者关系 (IR) 问答与敏感边界控制
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5">日均 20+ 投资者提问，是更有高价值落地意义的 AI 数字员工场景</p>
              </div>
              <button
                onClick={() => onNavigateToDemo("ir-demo")}
                className="px-4 py-2 bg-white text-[#1A1A1A] hover:bg-neutral-100 text-xs font-bold flex items-center gap-1.5 transition-colors border border-white"
              >
                <span>体验 IR 问答智能助手</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 border border-[#1A1A1A] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  现有人工处理 IR 问答的真实痛点
                </h4>
                <ul className="space-y-2 text-xs text-neutral-700 list-disc list-inside">
                  <li><strong>跨部门沟通繁琐：</strong> 提问涉及募投、业绩，证代需频繁向业务/财务催要答复。</li>
                  <li><strong>回复尺度难把握：</strong> 新员工缺乏经验，容易误将未公开细节披露，触发选择性披露违规。</li>
                  <li><strong>响应时效低下：</strong> 面对日均数十提问，查找历史公告慢，致投资者满意度低。</li>
                </ul>
              </div>

              <div className="bg-[#1A1A1A] text-white p-5 border border-[#1A1A1A] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  AI 数字员工提供的精准解答流程
                </h4>
                <ol className="space-y-2 text-xs text-neutral-200 list-decimal list-inside">
                  <li><strong>智能问题分类：</strong> 区分公开问询、预测性敏感数据、市场谣言澄清等。</li>
                  <li><strong>边界穿透审查：</strong> 严格比对已披露报告，锁定合法公开信息与禁止答复事项。</li>
                  <li><strong>匹配内部知识库：</strong> 调用企业历史模板与监管规范，生成严谨得体的建议回复。</li>
                  <li><strong>知识库持续沉淀：</strong> 积累企业固有回复尺度，大幅降低培训成本。</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 5: Phased Construction Roadmap */}
        {currentSlide.id === 5 && (
          <div className="space-y-6">
            <p className="text-xs text-neutral-600">
              采用分阶段建设思路，先解决部门内高频核心痛点，再向跨部门协同与公司治理层面逐步拓展。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-[#1A1A1A]">
              {PHASED_ROADMAP_STEPS.map((step, idx) => (
                <div key={idx} className={`p-6 flex flex-col justify-between ${idx !== 2 ? "border-r border-[#1A1A1A]" : ""} ${idx === 1 ? "bg-[#1A1A1A] text-white" : "bg-white text-[#1A1A1A]"}`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-400/40 pb-2">
                      <span className="text-xs font-mono font-bold uppercase">PHASE 0{idx + 1}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 border border-current font-bold uppercase">
                        {step.timeframe}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-serif-title font-bold mb-1">{step.phase}</h3>
                      <p className="text-xs opacity-80">{step.status}</p>
                    </div>

                    <ul className="space-y-2 text-xs pt-2">
                      {step.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {idx === 1 && (
                    <button
                      onClick={() => onNavigateToDemo("collaboration-preview")}
                      className="mt-6 w-full py-2 bg-white text-[#1A1A1A] hover:bg-neutral-100 text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-white"
                    >
                      <span>预览跨部门协同看板</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 6: Landing Roadmap & ROI */}
        {currentSlide.id === 6 && (
          <div className="space-y-6">
            <p className="text-xs text-neutral-600">
              落地方案不讲虚空概念，明确企业当前如何获得这项能力，包含资料准备清单、实施周期与透明的体验测算口径。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {IMPLEMENTATION_CHECKLIST.map((chk, idx) => (
                <div key={idx} className="bg-white p-5 border border-[#1A1A1A] space-y-3">
                  <div className="flex items-center space-x-2 font-serif-title font-bold text-sm text-[#1A1A1A] border-b border-neutral-300 pb-2">
                    {idx === 0 && <Layers className="w-4 h-4 text-[#1A1A1A]" />}
                    {idx === 1 && <Clock className="w-4 h-4 text-[#1A1A1A]" />}
                    {idx === 2 && <DollarSign className="w-4 h-4 text-[#1A1A1A]" />}
                    <span>{chk.category}</span>
                  </div>

                  <ul className="space-y-2 text-xs text-neutral-700">
                    {chk.items.map((it, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-[#1A1A1A] mt-1.5 shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Quantified Data Disclaimer */}
            <div className="bg-[#E9ECEF] border border-[#1A1A1A] p-4 text-xs text-neutral-800 space-y-1">
              <div className="font-bold text-[#1A1A1A] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#1A1A1A]" />
                关于量化数据的谨慎说明与测算口径
              </div>
              <p className="leading-relaxed text-[11px] text-neutral-600">
                “1小时处理1000份文件”、“效率提升约40%”、“初期投入20万元以内”、“约1个月完成训练”等数字，属于基于同类企业实践的经验评估与测算参考。正式交付前将结合企业实际资料体量与规则复杂程度，通过实测明确具体指标。
              </p>
            </div>
          </div>
        )}

        {/* Slide Bottom Key Takeaway Callout */}
        <div className="mt-8 pt-4 border-t-2 border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
          <div className="flex items-center space-x-2">
            <span className="font-bold uppercase tracking-wider text-[10px] bg-[#1A1A1A] text-white px-2 py-0.5">
              TAKEAWAY
            </span>
            <span className="text-[#1A1A1A] font-medium">{currentSlide.keyTakeaway}</span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {currentSlideIndex < SLIDES_DATA.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-1 transition-colors border border-[#1A1A1A]"
              >
                <span>下一页</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onNavigateToDemo("announcement-demo")}
                className="px-4 py-2 bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-1 transition-colors border border-[#1A1A1A]"
              >
                <span>进入数字员工实操体验</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* PPT Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#1A1A1A] max-w-xl w-full p-6 space-y-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] pb-4">
              <div className="flex items-center space-x-2">
                <Presentation className="w-6 h-6 text-[#1A1A1A]" />
                <h3 className="text-xl font-serif-title font-bold text-[#1A1A1A]">生成与导出宣讲 PPT</h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-[#1A1A1A] font-bold text-lg hover:opacity-70 px-2"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              系统为您提供两种灵活的 PPT 导出与使用方式：直接下载原生 PowerPoint 文件（.pptx），或复制 Markdown 大纲导入 AI 幻灯片生成工具（如 Gamma / MindShow / Office Copilot）。
            </p>

            <div className="space-y-4">
              
              {/* Option A: Direct PPTX File Download */}
              <div className="bg-[#F8F9FA] p-4 border-2 border-[#1A1A1A] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileDown className="w-5 h-5 text-[#1A1A1A]" />
                    <span className="font-serif-title font-bold text-sm text-[#1A1A1A]">方式一：直接下载原生 .pptx 幻灯片</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#1A1A1A] text-white px-2 py-0.5 uppercase">
                    MICROSOFT PPTX
                  </span>
                </div>
                <p className="text-xs text-neutral-600">
                  包含完整的 6 页 16:9 经典高对比度设计，附带文字框、对比表格、核心指标与演练说明。
                </p>
                <button
                  onClick={handleDownloadPptx}
                  disabled={isExporting}
                  className="w-full py-3 bg-[#1A1A1A] hover:bg-neutral-800 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all border border-[#1A1A1A]"
                >
                  {isExporting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-white" />
                      <span>正在构建 PPTX 幻灯片文件...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-white" />
                      <span>📥 立即生成并下载《公司治理AI数字员工_宣讲演示.pptx》</span>
                    </>
                  )}
                </button>
              </div>

              {/* Option B: Markdown Deck Text Copy */}
              <div className="bg-white p-4 border border-neutral-300 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Copy className="w-5 h-5 text-[#1A1A1A]" />
                    <span className="font-serif-title font-bold text-sm text-[#1A1A1A]">方式二：复制 Markdown 幻灯片大纲</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-neutral-200 text-neutral-700 px-2 py-0.5 uppercase">
                    AI SLIDES TEXT
                  </span>
                </div>
                <p className="text-xs text-neutral-600">
                  可直接复制 Markdown 演讲文稿，一键粘贴入 Gamma、MindShow、Kimi 或 Office 365 Copilot 自动生成幻灯片。
                </p>
                <button
                  onClick={handleCopyMarkdown}
                  className="w-full py-2.5 bg-white hover:bg-neutral-100 text-[#1A1A1A] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all border border-[#1A1A1A]"
                >
                  {copiedMd ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">已成功复制全套 PPT 大纲至剪贴板</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#1A1A1A]" />
                      <span>📋 复制 PPT 结构化文稿大纲</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            <div className="text-[11px] text-neutral-500 border-t border-neutral-200 pt-3 flex items-center justify-between">
              <span>注：导出的 PPT 内容包含 6 个核心主题与实测收益测算说明</span>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-[#1A1A1A] font-bold underline hover:opacity-80"
              >
                关闭窗口
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};


