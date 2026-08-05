import React, { useState } from "react";
import { SAMPLE_CROSS_DEPT_TASKS } from "../data/mockSamples";
import { CrossDeptTask } from "../types";
import { Users, CheckCircle2, AlertCircle, Clock, ShieldCheck, ArrowRight, Sparkles, Building, RefreshCw } from "lucide-react";

export const CrossDeptCollaborationPreview: React.FC = () => {
  const [tasks, setTasks] = useState<CrossDeptTask[]>(SAMPLE_CROSS_DEPT_TASKS);
  const [selectedTask, setSelectedTask] = useState<CrossDeptTask>(tasks[0]);
  const [simulatingAiAudit, setSimulatingAiAudit] = useState(false);

  const handleSimulateAudit = () => {
    setSimulatingAiAudit(true);
    setTimeout(() => {
      setSimulatingAiAudit(false);
      setTasks(prev => prev.map(t => {
        if (t.id === selectedTask.id) {
          return {
            ...t,
            status: 'ai-checked',
            aiCheckNote: 'AI 数字员工自动完成完整性预审与勾稽关系校验：核心数据符合监管指引。'
          };
        }
        return t;
      }));
      setSelectedTask(prev => ({
        ...prev,
        status: 'ai-checked',
        aiCheckNote: 'AI 数字员工自动完成完整性预审与勾稽关系校验：核心数据符合监管指引。'
      }));
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#1A1A1A]">
      
      {/* Editorial Header */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 text-[#1A1A1A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="px-2 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              STAGES 02 & 03 PREVIEW
            </span>
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">跨部门资料收集与全域风险控制</span>
          </div>
          <h2 className="text-2xl font-serif-title font-bold text-[#1A1A1A] tracking-tight">跨部门资料收集与完整性预审平台</h2>
          <p className="text-xs text-neutral-600 mt-1">
            自动向财务、法务、业务分发定期报告收集任务，进行完整性与一致性预审，减少证券部门与跨部门间的反复拉扯
          </p>
        </div>

        <div className="bg-[#F8F9FA] px-4 py-2.5 border border-[#1A1A1A] text-xs text-right">
          <span className="text-neutral-500 font-mono text-[11px] uppercase block">减少跨部门摩擦</span>
          <span className="text-[#1A1A1A] font-bold text-sm">预审自动化 · 降低50%+沟通时长</span>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Task List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#1A1A1A] p-5 space-y-3">
            <h3 className="font-serif-title font-bold text-sm text-[#1A1A1A] border-b border-neutral-300 pb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#1A1A1A]" />
                定期报告跨部门收集任务池
              </span>
              <span className="text-xs text-neutral-500">半年度报告/年报范畴</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              {tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`p-3.5 border cursor-pointer transition-all ${
                    selectedTask.id === task.id
                      ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                      : "bg-[#F8F9FA] border-neutral-300 text-[#1A1A1A] hover:border-[#1A1A1A]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-mono px-2 py-0.5 font-bold uppercase ${
                      selectedTask.id === task.id ? "bg-white text-black" : "bg-[#1A1A1A] text-white"
                    }`}>
                      {task.targetDept}
                    </span>
                    <span className={`text-[10px] font-mono flex items-center gap-1 ${
                      selectedTask.id === task.id ? "text-neutral-300" : "text-neutral-500"
                    }`}>
                      <Clock className="w-3 h-3" />
                      截止: {task.deadline}
                    </span>
                  </div>

                  <p className="font-bold text-xs mt-1">{task.taskName}</p>

                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    {task.status === 'incomplete' && (
                      <span className={`flex items-center gap-1 font-bold ${
                        selectedTask.id === task.id ? "text-amber-300" : "text-amber-700"
                      }`}>
                        <AlertCircle className="w-3 h-3" />
                        存在缺少文件，AI 已标记
                      </span>
                    )}
                    {task.status === 'ai-checked' && (
                      <span className={`flex items-center gap-1 font-bold ${
                        selectedTask.id === task.id ? "text-emerald-300" : "text-emerald-700"
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        AI 预审一致性通过
                      </span>
                    )}
                    {task.status === 'pending' && (
                      <span className={selectedTask.id === task.id ? "text-neutral-300" : "text-neutral-500"}>
                        正在等待部门交付...
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Task Detail & AI Audit Output */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border-2 border-[#1A1A1A] p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-300 pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-neutral-500">{selectedTask.targetDept} 交付审核项</span>
                <h3 className="text-lg font-serif-title font-bold text-[#1A1A1A] mt-0.5">{selectedTask.taskName}</h3>
              </div>

              <button
                onClick={handleSimulateAudit}
                disabled={simulatingAiAudit}
                className="px-4 py-2 bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors border border-[#1A1A1A]"
              >
                {simulatingAiAudit ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>自动预审中...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>运行 AI 完整性预审</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Check Status Banner */}
            <div className="p-4 border border-neutral-300 space-y-3 text-xs">
              <div className="font-bold text-[#1A1A1A] flex items-center justify-between border-b border-neutral-200 pb-2">
                <span>AI 数字员工完整性预审反馈：</span>
                <span className="text-neutral-500 font-mono text-[11px] uppercase">阶段二：跨部门自动化</span>
              </div>

              <p className="text-neutral-800 bg-[#F8F9FA] p-3 border border-neutral-200 leading-relaxed font-sans">
                {selectedTask.aiCheckNote || "AI 正在对部门提交的数据模板、盖章附件及勾稽关系进行自动扫描。"}
              </p>

              {selectedTask.missingFiles && selectedTask.missingFiles.length > 0 && (
                <div className="bg-amber-50 border border-amber-700 p-3 space-y-1 text-amber-900">
                  <span className="font-bold block flex items-center gap-1 uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 text-amber-800" />
                    缺失或需要补充的附件材料：
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                    {selectedTask.missingFiles.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                  <p className="text-[10px] text-amber-800/90 pt-1 border-t border-amber-200 mt-2">
                    数字员工将自动向{selectedTask.targetDept}接口人发送材料补交提示，免去证券人员手动催办。
                  </p>
                </div>
              )}
            </div>

            {/* Phase 3 Strategic Outlook */}
            <div className="bg-[#F8F9FA] p-4 border border-[#1A1A1A] text-xs text-[#1A1A1A] space-y-2">
              <div className="font-serif-title font-bold text-[#1A1A1A] flex items-center gap-1.5 text-sm">
                <ShieldCheck className="w-4 h-4 text-[#1A1A1A]" />
                阶段三扩展方向：公司治理风险控制中枢
              </div>
              <p className="leading-relaxed text-neutral-700">
                在完成跨部门资料收集后，数字员工可延伸至公司治理层面的全局风控：对对外新闻稿、IR路演材料、股东大会决议实施常态化合规审查，构建持续稳定的合规防火墙。
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

