import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini API client on server
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY environment variable is missing.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// Health Check Endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Endpoint 1: Announcement Parsing & Multi-Doc Consistency Verification (质押/解质押公告生成)
app.post("/api/ai/announcement", async (req, res) => {
  try {
    const { pledgeData, announcementType } = req.body;
    const ai = getAiClient();

    if (!ai) {
      // Fallback structured simulation if key not configured
      return res.json({
        success: true,
        extractedFields: {
          shareholderName: pledgeData?.shareholderName || "控股股东 张伟",
          pledgedShares: pledgeData?.pledgedShares || "15,000,000股",
          ratioTotalShares: "4.85%",
          ratioOwnedShares: "18.30%",
          pledgeeName: pledgeData?.pledgeeName || "中信证券股份有限公司",
          pledgePurpose: pledgeData?.pledgePurpose || "个人资金需求/生产经营",
          startDate: pledgeData?.startDate || "2026-08-01",
          endDate: pledgeData?.endDate || "解除质押登记之日止"
        },
        crossCheckAlerts: [
          { type: "info", title: "数据一致性核验通过", desc: "质押合同主体、质押股数与董事会备案股东持股数匹配。" },
          { type: "warning", title: "累计质押比例提示", desc: "本次质押后控股股东及其一致行动人累计质押比例达到 68.50%，触发交易所平仓风险提示标准。" },
          { type: "success", title: "合规边界校验", desc: "未发现违规高管减持窗口期禁质押条款。" }
        ],
        draftAnnouncement: `# 关于控股股东股份${announcementType === 'release' ? '解除质押' : '质押'}的公告

本公司及董事会全体成员保证信息披露的内容真实、准确、完整，没有虚假记载、误导性陈述或重大遗漏。

一、股东股份${announcementType === 'release' ? '解除质押' : '质押'}基本情况
1. 本次股份${announcementType === 'release' ? '解除质押' : '质押'}基本情况
- 股东名称：${pledgeData?.shareholderName || "控股股东 张伟"}
- 是否为控股股东或第一大股东及其一致行动人：是
- 本次${announcementType === 'release' ? '解除质押' : '质押'}数量：${pledgeData?.pledgedShares || "15,000,000股"}
- 占其所持股份比例：18.30%
- 占公司总股本比例：4.85%
- 质权人：${pledgeData?.pledgeeName || "中信证券股份有限公司"}
- 质押用途：${pledgeData?.pledgePurpose || "生产经营支持"}

二、股东股份累计质押情况
截至公告披露日，上述股东及其一致行动人累计质押股份数量为 56,200,000 股，占其持股总数的 68.50%，占公司总股本的 18.15%。

三、备查文件
1. 证券质押及司法冻结明细表；
2. 中国证券登记结算有限责任公司质押登记证明文件；
3. 股票质押式回购交易协议。

特此公告。
XX股份有限公司董事会
2026年8月5日`,
        summary: "数字员工已完成合同提取、交易所规则核对及高风险累计比例预警，已生成标准初稿。"
      });
    }

    const prompt = `你是一位精通中国证券市场（沪深交易所）上市公司的证券事务 AI 数字员工（董秘助手）。
请根据以下业务材料输入，进行多文件数据提取、一致性交叉比对、合规风险提示，并生成一份符合监管规范的上市公司公告初稿。

公告类型: ${announcementType === 'release' ? '股份解除质押' : '股份质押'}
输入业务数据:
${JSON.stringify(pledgeData, null, 2)}

请以 JSON 格式输出，结构必须符合以下规范：
{
  "extractedFields": {
    "shareholderName": "股东名称",
    "pledgedShares": "本次质押/解质押股数",
    "ratioTotalShares": "占总股本比例",
    "ratioOwnedShares": "占所持股份比例",
    "pledgeeName": "质权人名称",
    "pledgePurpose": "质押用途",
    "startDate": "起始日",
    "endDate": "截止日"
  },
  "crossCheckAlerts": [
    { "type": "info" | "warning" | "danger" | "success", "title": "简短标题", "desc": "具体说明" }
  ],
  "draftAnnouncement": "完整的 Markdown 格式公告初稿",
  "summary": "一句话核心结论（例如人工审核重点）"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error("Error generating announcement:", error);
    res.status(500).json({ success: false, error: error.message || "AI 处理公告失败" });
  }
});

// Endpoint 2: IR Investor Relations Questions Classification, Boundary Checking & Compliant Response
app.post("/api/ai/ir-question", async (req, res) => {
  try {
    const { question, projectContext } = req.body;
    const ai = getAiClient();

    if (!ai) {
      // Simulation fallback
      return res.json({
        success: true,
        category: "募投项目进展与业绩预期",
        isPublicData: true,
        boundaryAnalysis: "投资者询问的‘半导体高精芯片募投项目二期进度’属于市场关注焦点。项目投产时间已在《2025年半年度报告》第38页披露；二季度具体财务指标尚未经审计公布，属于未公开敏感财务数据，不可提前披露。",
        matchedInternalSources: [
          "《2025年半年度报告》“第三节 管理层讨论与分析”",
          "《关于募集资金存放与实际使用情况的专项报告》（2026-015号）",
          "证券事务回复规范库（违规减持与业绩预测限制条款）"
        ],
        riskLevel: "medium", // low, medium, high
        riskWarnings: [
          "注意不要包含未披露的2026年Q2财务营收预测数字",
          "避免使用‘行业绝对领先’等无依据绝对化用词",
          "需提醒投资者注意市场风险及项目达产的不确定性"
        ],
        draftResponse: `尊敬的投资者您好！
感谢您对公司的关注。关于您询问的“半导体高精芯片项目”进展情况：

1. 截至目前，公司募投项目二期厂房建设及设备安装调试工作正按计划稳步推进，具体进展请参考公司已于巨潮资讯网披露的《2025年半年度报告》及相关募集资金使用进展公告。
2. 涉及公司2026年二季度的具体经营数据及财务指标，公司将严格按照深交所股票上市规则要求，在后续定期报告中统一进行信息披露。
3. 市场有风险，投资需谨慎，请广大投资者注意投资风险。`,
        actionAdvice: "建议证代确认后直接提交互动平台回复。"
      });
    }

    const prompt = `你是一位精通上市公司投资者关系管理（IR）与信息披露合规边界的证券事务 AI 数字员工。
请对以下投资者提问进行问题分类、信息披露边界审查（区分已公开可回答 vs 未公开敏感禁止回答）、匹配历史公告/内部知识库依据，并生成一份安全合规的回复草稿。

投资者提问: "${question}"
参考企业背景与信息库: ${projectContext || "主要从事半导体与新能源材料研发，有募投项目及可转债。"}

请输出 JSON 格式：
{
  "category": "问题分类（如：募投项目/财务业绩/可转债/股价波动/谣言澄清等）",
  "isPublicData": true/false (是否全在已公开范围内),
  "boundaryAnalysis": "信息披露边界判定说明（明确指出哪些能答、哪些属于违规提前披露）",
  "matchedInternalSources": ["依据1", "依据2"],
  "riskLevel": "low" | "medium" | "high",
  "riskWarnings": ["风险提醒1", "风险提醒2"],
  "draftResponse": "给投资者的标准合规回复文字（语气礼貌、严谨、符合交易所IR规范）",
  "actionAdvice": "给证券事务人员的操作建议"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error("Error processing IR question:", error);
    res.status(500).json({ success: false, error: error.message || "AI 处理 IR 提问失败" });
  }
});

// Endpoint 3: Corporate Governance Risk & Audit Assistant
app.post("/api/ai/governance-audit", async (req, res) => {
  try {
    const { documentText, auditType } = req.body;
    const ai = getAiClient();

    if (!ai) {
      return res.json({
        success: true,
        auditSummary: "完成跨部门关联交易与重大合同审核，识别出1处比例超出授权范围提示。",
        issues: [
          { level: "high", rule: "关联交易审批权限", text: "合同金额达 2,500 万元，占公司最近一期经审计净资产 3.2%，已超过总经理决策权限，须提交董事会审议。" },
          { level: "medium", rule: "信息披露时限", text: "协议签署日期为2026年8月3日，按照2个交易日披露要求，最迟应于8月5日开盘前完成公告发报。" }
        ],
        recommendations: "建议补充拟提交董事会审议的决议草案，并同步准备《关于签订重大关联交易合同的公告》初稿。"
      });
    }

    const prompt = `你是一位上市公司治理与证券事务 AI 数字员工。
请对以下拟审核文件/业务规则（审核类型: ${auditType}）进行合规性审查：
文件内容/描述: ${documentText}

请输出 JSON 格式：
{
  "auditSummary": "整体审核总结",
  "issues": [
    { "level": "high" | "medium" | "low", "rule": "规则名称", "text": "问题具体描述" }
  ],
  "recommendations": "下一步操作建议"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error("Error running governance audit:", error);
    res.status(500).json({ success: false, error: error.message || "AI 治理审核失败" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Corporate Governance AI Digital Employee server running on http://localhost:${PORT}`);
  });
}

startServer();
