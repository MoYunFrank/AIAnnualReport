import React, { useState } from "react";
import { SAMPLE_IR_QUESTIONS } from "../data/mockSamples";
import { IRQuestionSample } from "../types";
import { MessageSquare, Bot, AlertTriangle, CheckCircle2, Play, Sparkles, RefreshCw, Send, ShieldAlert, History } from "lucide-react";

export const IRWorkbench: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<IRQuestionSample>(SAMPLE_IR_QUESTIONS[0]);
  const [customQuestionInput, setCustomQuestionInput] = useState(selectedQuestion.question);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Switch preset question
  const handleSelectQuestion = (item: IRQuestionSample) => {
    setSelectedQuestion(item);
    setCustomQuestionInput(item.question);
    setAiResult(null);
  };

  const handleRunIRAssistant = async () => {
    setIsProcessing(true);
    setAiResult(null);

    try {
      const response = await fetch("/api/ai/ir-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: customQuestionInput,
          projectContext: "主要从事半导体与新能源高精芯片研发，包含募投项目二期，发行过可转债。"
        }),
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

  const handleCopy = (text: string) => {
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
              <MessageSquare className="w-3.5 h-3.5" />
              DEMO SCENARIO 02
            </span>
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">第一阶段高频重点：每日处理 20+ 投资者提问</span>
          </div>
          <h2 className="text-2xl font-serif-title font-bold text-[#1A1A1A] tracking-tight">投资者关系 (IR) 问答与敏感边界判定</h2>
          <p className="text-xs text-neutral-600 mt-1">
            解决互动易/电话咨询中反复询问、回复尺度难把控、跨部门沟通慢等痛点，自动区分公开与未公开边界并拟定回复
          </p>
        </div>

        {/* Quick Metrics Badge */}
        <div className="flex items-center space-x-3 bg-[#F8F9FA] px-4 py-2.5 border border-[#1A1A1A] text-xs">
          <div>
            <div className="text-neutral-500 font-mono text-[11px] uppercase">日均问答处理能力</div>
            <div className="text-sm font-bold text-[#1A1A1A]">20+ 提问/日 · 秒级分类</div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Question Stream & Custom Input (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Preset Investor Questions List */}
          <div className="bg-white border border-[#1A1A1A] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-300 pb-3">
              <h3 className="font-serif-title font-bold text-sm text-[#1A1A1A] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#1A1A1A]" />
                互动易 / 电话咨询实时提问池
              </h3>
              <span className="text-[10px] font-mono font-bold bg-[#1A1A1A] text-white px-2 py-0.5">
                PENDING STREAM
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {SAMPLE_IR_QUESTIONS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectQuestion(item)}
                  className={`p-3.5 border cursor-pointer transition-all ${
                    selectedQuestion.id === item.id
                      ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                      : "bg-[#F8F9FA] border-neutral-300 text-[#1A1A1A] hover:border-[#1A1A1A]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 font-bold uppercase ${
                      selectedQuestion.id === item.id ? "bg-white text-black" : "bg-[#1A1A1A] text-white"
                    }`}>
                      {item.channel}
                    </span>
                    <span className={`text-[10px] font-mono ${selectedQuestion.id === item.id ? "text-neutral-300" : "text-neutral-500"}`}>{item.time}</span>
                  </div>
                  <p className="font-medium text-xs leading-snug line-clamp-2">{item.question}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className={`font-bold ${selectedQuestion.id === item.id ? "text-white" : "text-[#1A1A1A]"}`}>{item.categoryTag}</span>
                    {item.hasSensitivity && (
                      <span className={`flex items-center gap-1 font-bold ${selectedQuestion.id === item.id ? "text-amber-300" : "text-amber-700"}`}>
                        <AlertTriangle className="w-3 h-3" />
                        含未公开敏感边界
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Input Box */}
          <div className="bg-white border border-[#1A1A1A] p-5 space-y-4">
            <h3 className="font-serif-title font-bold text-sm text-[#1A1A1A] border-b border-neutral-300 pb-3 flex items-center justify-between">
              <span>自定义输入或修改提问内容</span>
              <span className="text-xs text-neutral-500 font-normal">支持任意提问</span>
            </h3>

            <textarea
              rows={4}
              value={customQuestionInput}
              onChange={(e) => setCustomQuestionInput(e.target.value)}
              placeholder="请输入投资者提问内容..."
              className="w-full bg-[#F8F9FA] border border-neutral-300 p-3 text-xs text-[#1A1A1A] font-medium focus:outline-none focus:border-[#1A1A1A] leading-relaxed"
            />

            <button
              onClick={handleRunIRAssistant}
              disabled={isProcessing || !customQuestionInput.trim()}
              className="w-full py-3 bg-[#1A1A1A] hover:bg-neutral-800 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all border border-[#1A1A1A]"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>AI 数字员工正在研判披露边界与检索依据...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>启动 AI 审查并生成合规回复草稿</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: AI Analysis & Draft Response (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {aiResult ? (
            <div className="space-y-6">
              
              {/* Boundary Analysis & Category Header */}
              <div className="bg-white border-2 border-[#1A1A1A] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-300 pb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-[#1A1A1A]" />
                    <h3 className="font-serif-title font-bold text-base text-[#1A1A1A]">AI 智能判定与披露边界分析</h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-[#1A1A1A] text-white px-2 py-0.5 font-bold">
                    类别: {aiResult.category || "募投项目与业绩提问"}
                  </span>
                </div>

                <div className="p-4 border border-neutral-300 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="font-bold text-[#1A1A1A] flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-[#1A1A1A]" />
                      信息披露边界判定结论：
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 uppercase font-bold ${
                      aiResult.isPublicData ? "bg-emerald-800 text-white" : "bg-amber-800 text-white"
                    }`}>
                      {aiResult.isPublicData ? "全公开数据，可直接回复" : "涉及未公开敏感边界，需合规防范"}
                    </span>
                  </div>

                  <p className="text-neutral-800 leading-relaxed bg-[#F8F9FA] p-3 border border-neutral-200">
                    {aiResult.boundaryAnalysis}
                  </p>

                  {/* Matched Internal Sources */}
                  <div className="space-y-1 pt-1">
                    <span className="text-neutral-600 font-bold uppercase tracking-wider text-[11px] block">匹配的历史公告与内部知识库依据：</span>
                    <ul className="space-y-1 text-neutral-800">
                      {aiResult.matchedInternalSources?.map((src: string, idx: number) => (
                        <li key={idx} className="flex items-center space-x-2 text-[11px] bg-[#F8F9FA] px-2.5 py-1 border border-neutral-300 font-mono">
                          <History className="w-3 h-3 text-[#1A1A1A] shrink-0" />
                          <span>{src}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Risk Warnings */}
                  {aiResult.riskWarnings && aiResult.riskWarnings.length > 0 && (
                    <div className="bg-red-50 border border-red-700 p-3 text-red-900 text-[11px] space-y-1">
                      <span className="font-bold block uppercase tracking-wider">合规红线与注意事项：</span>
                      <ul className="list-disc list-inside space-y-0.5">
                        {aiResult.riskWarnings.map((warn: string, idx: number) => (
                          <li key={idx}>{warn}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Draft Response Box */}
              <div className="bg-white border-2 border-[#1A1A1A] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-300 pb-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-[#1A1A1A]" />
                    <h3 className="font-serif-title font-bold text-base text-[#1A1A1A]">推荐使用的标准回复草稿（可人工确认）</h3>
                  </div>

                  <button
                    onClick={() => handleCopy(aiResult.draftResponse)}
                    className="px-3 py-1 bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-bold flex items-center space-x-1 border border-[#1A1A1A]"
                  >
                    <span>{copied ? "已复制" : "复制回复内容"}</span>
                  </button>
                </div>

                <div className="bg-[#1A1A1A] text-white p-4 text-xs leading-relaxed whitespace-pre-wrap select-all font-mono">
                  {aiResult.draftResponse}
                </div>

                <div className="bg-[#F8F9FA] p-3 border border-neutral-300 text-xs text-[#1A1A1A] flex items-center justify-between">
                  <span>动作建议：{aiResult.actionAdvice || "人工确认后，可一键提交至互动易/上证e互动。"}</span>
                  <span className="text-[10px] text-neutral-500 font-mono">已自动记录入公司回复规范库</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white border-2 border-[#1A1A1A] border-dashed p-12 text-center space-y-4 text-neutral-600 min-h-[480px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-xl">
                <Bot className="w-8 h-8" />
              </div>
              <div className="max-w-md space-y-1">
                <h3 className="text-base font-serif-title font-bold text-[#1A1A1A]">等待启动 IR 问答智能审核</h3>
                <p className="text-xs text-neutral-600">
                  点击左侧提问列表或输入自定义问题后，点击“启动 AI 审查”，AI 将帮您把控答复边界并拟定回复。
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

