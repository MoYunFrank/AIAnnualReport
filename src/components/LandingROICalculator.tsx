import React, { useState } from "react";
import { ROICalculationInput, ROICalculationResult } from "../types";
import { Calculator, CheckCircle2, Clock, DollarSign, Layers, AlertTriangle, ArrowRight, ShieldCheck, FileCheck, Award } from "lucide-react";

export const LandingROICalculator: React.FC = () => {
  const [input, setInput] = useState<ROICalculationInput>({
    annualAnnouncements: 80,
    dailyIRQuestions: 20,
    securitiesStaffCount: 4,
    crossDeptRequestsPerMonth: 15
  });

  // Dynamic ROI calculation algorithm
  const calculateResult = (): ROICalculationResult => {
    // Each announcement manually takes ~3.5 hours (drafting, cross-checking, internal reviews). AI reduces to ~0.5h. Saved 3h.
    const announcementHoursSaved = input.annualAnnouncements * 3.0;

    // Each IR question takes ~20 mins (asking business units, waiting, formatting). AI reduces to ~2 mins. Saved 18 mins (0.3h).
    const irHoursSavedPerYear = input.dailyIRQuestions * 250 * 0.3; // 250 working days

    // Cross dept requests take ~2.5h each in ping-pong. AI reduces by 1.5h.
    const crossDeptHoursSaved = input.crossDeptRequestsPerMonth * 12 * 1.5;

    const totalHoursSaved = Math.round(announcementHoursSaved + irHoursSavedPerYear + crossDeptHoursSaved);

    // Assume average hourly rate for securities/legal staff is ~150 RMB
    const estimatedCostSavingsRmb = Math.round(totalHoursSaved * 150);

    // Efficiency boost benchmark
    const efficiencyBoostPercent = Math.min(65, Math.round(35 + (input.dailyIRQuestions / 2)));

    return {
      hoursSavedPerYear: totalHoursSaved,
      manualCostSavingsRmb: estimatedCostSavingsRmb,
      efficiencyBoostPercent,
      errorRiskReductionRate: 99.2,
      estimatedSetupDays: 28, // ~1 month
      estimatedBudget: "15 万 - 20 万元以内",
      dataCheckVolumeBenchmark: "最高可达 1,000 份/小时 穿透检索"
    };
  };

  const result = calculateResult();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#1A1A1A]">
      
      {/* Editorial Header Banner */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 text-[#1A1A1A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="px-2 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5" />
              IMPLEMENTATION & ROI
            </span>
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">明确落地条件与经验测算口径</span>
          </div>
          <h2 className="text-2xl font-serif-title font-bold text-[#1A1A1A] tracking-tight">企业如何获得这项能力：落地路线与投入测算</h2>
          <p className="text-xs text-neutral-600 mt-1">
            输入贵公司证券事务日常业务体量，实时估算 AI 数字员工带来的降本增效与风险收益
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#F8F9FA] border border-[#1A1A1A] px-4 py-2.5 text-xs text-[#1A1A1A] font-bold uppercase">
          <Award className="w-4 h-4 text-[#1A1A1A] shrink-0" />
          <span>服务化快速适配 · 约 1 个月训练上线</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Calculator Inputs & Required Materials (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Interactive Calculator Form */}
          <div className="bg-white border border-[#1A1A1A] p-5 space-y-5">
            <div className="border-b border-neutral-300 pb-3 flex items-center justify-between">
              <h3 className="font-serif-title font-bold text-sm text-[#1A1A1A] flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#1A1A1A]" />
                业务体量评估参数
              </h3>
              <span className="text-xs font-mono font-bold uppercase text-neutral-500">DYNAMIC CALC</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1 text-[#1A1A1A] font-medium">
                  <span>年发布公告数量 (份/年)</span>
                  <span className="font-bold font-mono text-[#1A1A1A]">{input.annualAnnouncements} 份</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  value={input.annualAnnouncements}
                  onChange={(e) => setInput({ ...input, annualAnnouncements: parseInt(e.target.value) })}
                  className="w-full accent-[#1A1A1A] bg-neutral-200 h-2 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-[#1A1A1A] font-medium">
                  <span>日均收到 IR 投资者提问 (个/日)</span>
                  <span className="font-bold font-mono text-[#1A1A1A]">{input.dailyIRQuestions} 个</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={input.dailyIRQuestions}
                  onChange={(e) => setInput({ ...input, dailyIRQuestions: parseInt(e.target.value) })}
                  className="w-full accent-[#1A1A1A] bg-neutral-200 h-2 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-[#1A1A1A] font-medium">
                  <span>证券事务及董秘办团队人数</span>
                  <span className="font-bold font-mono text-[#1A1A1A]">{input.securitiesStaffCount} 人</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={input.securitiesStaffCount}
                  onChange={(e) => setInput({ ...input, securitiesStaffCount: parseInt(e.target.value) })}
                  className="w-full accent-[#1A1A1A] bg-neutral-200 h-2 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-[#1A1A1A] font-medium">
                  <span>月均跨部门资料收集沟通次数</span>
                  <span className="font-bold font-mono text-[#1A1A1A]">{input.crossDeptRequestsPerMonth} 次/月</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={input.crossDeptRequestsPerMonth}
                  onChange={(e) => setInput({ ...input, crossDeptRequestsPerMonth: parseInt(e.target.value) })}
                  className="w-full accent-[#1A1A1A] bg-neutral-200 h-2 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Enterprise Preparation Checklist */}
          <div className="bg-white border border-[#1A1A1A] p-5 space-y-4">
            <h3 className="font-serif-title font-bold text-sm text-[#1A1A1A] border-b border-neutral-300 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#1A1A1A]" />
              企业前期需准备材料清单
            </h3>

            <div className="space-y-2 text-xs text-neutral-800">
              {[
                { title: "1. 历史信息披露档案", desc: "近3年公司公告、定期报告Word/PDF版本（用于学习表达习惯与语言风格）" },
                { title: "2. 公司内部治理制度", desc: "《信息披露管理制度》《投资者关系管理制度》《内幕信息知情人登记制度》等" },
                { title: "3. 投资者关系 FAQ 与问答库", desc: "历史互动易问答记录、常见禁答或敏感边界说明列表" },
                { title: "4. 标准公告模板与表格", desc: "常用股份质押、定增、高管变动等格式模板" }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#F8F9FA] p-3 border border-neutral-300 space-y-0.5">
                  <div className="font-bold text-[#1A1A1A]">{item.title}</div>
                  <div className="text-[11px] text-neutral-600">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Calculated ROI Dashboard & Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Big Metrics Cards Grid */}
          <div className="bg-white border-2 border-[#1A1A1A] p-6 space-y-6">
            <h3 className="font-serif-title font-bold text-base text-[#1A1A1A] border-b border-neutral-300 pb-3 flex items-center justify-between">
              <span>预计 ROI 收益与效率提升评估</span>
              <span className="text-xs font-mono font-bold uppercase text-neutral-500">ESTIMATED OUTCOMES</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F8F9FA] p-5 border border-neutral-300 space-y-1">
                <div className="text-xs text-neutral-600 flex items-center gap-1.5 uppercase font-mono">
                  <Clock className="w-4 h-4 text-[#1A1A1A]" />
                  每年预计节省工时
                </div>
                <div className="text-3xl font-serif-title font-bold text-[#1A1A1A] tracking-tight">
                  {result.hoursSavedPerYear} <span className="text-xs font-sans font-normal text-neutral-600">小时/年</span>
                </div>
                <p className="text-[11px] text-neutral-600">相当于释放 1 名专职证券事务人员大部分重复工作</p>
              </div>

              <div className="bg-[#F8F9FA] p-5 border border-neutral-300 space-y-1">
                <div className="text-xs text-neutral-600 flex items-center gap-1.5 uppercase font-mono">
                  <DollarSign className="w-4 h-4 text-[#1A1A1A]" />
                  折合人工成本节省估算
                </div>
                <div className="text-3xl font-serif-title font-bold text-[#1A1A1A] tracking-tight">
                  ≈ {(result.manualCostSavingsRmb / 10000).toFixed(1)} <span className="text-xs font-sans font-normal text-neutral-600">万元/年</span>
                </div>
                <p className="text-[11px] text-neutral-600">按行业证券事务人员平均综合工时成本测算</p>
              </div>

              <div className="bg-[#F8F9FA] p-5 border border-neutral-300 space-y-1">
                <div className="text-xs text-neutral-600 flex items-center gap-1.5 uppercase font-mono">
                  <Award className="w-4 h-4 text-[#1A1A1A]" />
                  综合人效提升比例
                </div>
                <div className="text-3xl font-serif-title font-bold text-[#1A1A1A] tracking-tight">
                  约 {result.efficiencyBoostPercent}%
                </div>
                <p className="text-[11px] text-neutral-600">高频公告拟定与IR问答耗时缩短 80% 以上</p>
              </div>

              <div className="bg-[#F8F9FA] p-5 border border-neutral-300 space-y-1">
                <div className="text-xs text-neutral-600 flex items-center gap-1.5 uppercase font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#1A1A1A]" />
                  格式与勾稽错误降低率
                </div>
                <div className="text-3xl font-serif-title font-bold text-[#1A1A1A] tracking-tight">
                  {result.errorRiskReductionRate}%
                </div>
                <p className="text-[11px] text-neutral-600">消除因人工疏忽导致的信息披露更正风险</p>
              </div>
            </div>

            {/* Implementation Timeline & Budget */}
            <div className="bg-[#1A1A1A] text-white p-4 border border-[#1A1A1A] text-xs space-y-3">
              <div className="font-bold border-b border-neutral-700 pb-2 flex items-center justify-between">
                <span>实施落地周期与初期投入</span>
                <span className="text-emerald-400 font-mono uppercase text-[10px]">HIGH ROI</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-neutral-400 block mb-0.5">预计落地实施周期：</span>
                  <span className="text-white font-bold text-sm">约 1 个月（28天）完成训调上线</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">初期服务化投入：</span>
                  <span className="text-white font-bold text-sm">{result.estimatedBudget}</span>
                </div>
              </div>
            </div>

            {/* CAUTIONARY DISCLAIMER & TEST MOUTHPIECE */}
            <div className="bg-[#F8F9FA] border border-neutral-400 p-4 text-neutral-900 text-xs space-y-2">
              <div className="font-bold text-[#1A1A1A] flex items-center gap-2 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-[#1A1A1A]" />
                关于宣讲演示数据与测算口径的明确说明
              </div>
              <p className="leading-relaxed text-[11px] text-neutral-700">
                会议及宣讲中提及的“一小时处理一千份文件”、“效率提升约百分之四十”、“初期投入二十万元以内”、“约一个月完成训练”等数字，属于基于行业平均水平的<strong>建议性演示话术与经验评估</strong>。正式对外合同使用前，需通过企业真实数据量与规则复杂度进行实际测试，明确具体适用条件与测算口径，不直接作为固定硬性承诺。
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

