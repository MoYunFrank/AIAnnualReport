import { PledgeSampleData, IRQuestionSample, CrossDeptTask } from "../types";

export const SAMPLE_PLEDGE_CASES: PledgeSampleData[] = [
  {
    id: "case-01",
    title: "控股股东股份质押公告 (中信证券质押1500万股)",
    shareholderName: "控股股东 张伟",
    pledgedShares: "15,000,000 股",
    pledgeeName: "中信证券股份有限公司",
    pledgePurpose: "支持下属子公司半导体高精芯片项目生产经营",
    startDate: "2026年8月1日",
    announcementType: "pledge",
    contractFile: `【股票质押式回购交易协议】
甲方（出质人）：张伟（身份证号：1101011978******12）
乙方（质权人）：中信证券股份有限公司
质押标的：科技股份有限公司（股票代码：002XXX）
质押股数：15,000,000股（无限售流通股）
质押用途：支持公司生产经营
初始交易日：2026年8月1日
到期购回日：2027年8月1日`,
    resolutionFile: `【董事会备案材料及股东持股说明】
股东姓名：张伟
截至2026年7月31日持股总数：81,967,213 股，占公司总股本比例 26.50%。
此前已质押股份：41,200,000 股。
一致行动人：张明（持股 12,000,000 股，未质押）。`,
    registerFile: `【中国证券登记结算有限责任公司 - 证券质押明细】
业务类型：初始质押登记
登记日期：2026年8月2日
质押股份状态：质押锁定中`
  },
  {
    id: "case-02",
    title: "控股股东解除股份质押公告 (国泰君安解除800万股)",
    shareholderName: "控股股东 张伟",
    pledgedShares: "8,000,000 股",
    pledgeeName: "国泰君安证券股份有限公司",
    pledgePurpose: "质押到期正常解除质押",
    startDate: "2025年7月15日",
    announcementType: "release",
    contractFile: `【股票质押解除登记通知书】
出质人：张伟
质权人：国泰君安证券股份有限公司
解质股数：8,000,000 股
解除质押登记日：2026年8月3日`,
    resolutionFile: `【股东持股及解除后质押状态】
股东名称：张伟
持股总数：81,967,213 股
本次解除质押前质押数：56,200,000 股
本次解除质押数：8,000,000 股
解除后剩余质押数：48,200,000 股（占其持股 58.80%，占总股本 15.58%）`,
    registerFile: `【中登公司质押解除确认单】
确认日期：2026年8月3日
业务状态：解除质押办结`
  }
];

export const SAMPLE_IR_QUESTIONS: IRQuestionSample[] = [
  {
    id: "ir-1",
    investorName: "深交所互动易投资者@ChipMaster",
    channel: "互动易 (深交所)",
    time: "2026-08-05 09:15",
    question: "请问董秘，公司半导体高精芯片二期募投项目目前进展如何？听说由于设备到货延迟，项目要推迟到明年下半年投产，请问是否属实？",
    categoryTag: "募投项目进展/谣言求证",
    hasSensitivity: true
  },
  {
    id: "ir-2",
    investorName: "上证e互动投资者@ValueTrader",
    channel: "上证e互动",
    time: "2026-08-04 16:30",
    question: "公司可转债即将到期，目前折股价格高于正股价，公司是否计划下修转股价？二季度利润增长能否超过50%？",
    categoryTag: "可转债下修/业绩预测",
    hasSensitivity: true
  },
  {
    id: "ir-3",
    investorName: "电话咨询记录（招商证券研究员）",
    channel: "电话问询记录",
    time: "2026-08-04 11:00",
    question: "请问公司控股股东本次质押1500万股的平仓线设置在多少？是否存在平仓爆仓风险？公司后续是否有定增扩产计划？",
    categoryTag: "股权质押风险/再融资意向",
    hasSensitivity: true
  },
  {
    id: "ir-4",
    investorName: "互动易投资者@散户老王",
    channel: "互动易 (深交所)",
    time: "2026-08-03 14:20",
    question: "请问截至2026年7月31日，公司的股东人数是多少？机构持股比例变动大吗？",
    categoryTag: "股东人数与持股结构",
    hasSensitivity: false
  }
];

export const SAMPLE_CROSS_DEPT_TASKS: CrossDeptTask[] = [
  {
    id: "task-1",
    targetDept: "财务部",
    taskName: "提供 2026 年半年度关联交易实际发生额及承诺额对比表",
    deadline: "2026-08-10",
    status: "incomplete",
    aiCheckNote: "AI 检测到缺少与前三关联方的审计对账单盖章件，需补充。",
    missingFiles: ["2026年Q2关联采购盖章汇总表", "审计委员会提前备案复核意见"]
  },
  {
    id: "task-2",
    targetDept: "法务部",
    taskName: "复核募投项目补充协议及重大诉讼仲裁最新进展说明",
    deadline: "2026-08-08",
    status: "ai-checked",
    aiCheckNote: "AI 校验通过：诉讼标的额未达到总资产 10% 强制披露红线，属自愿披露事项。"
  },
  {
    id: "task-3",
    targetDept: "生产运营部",
    taskName: "提交半导体二期项目厂房封顶与设备到货验收时间节点表",
    deadline: "2026-08-07",
    status: "pending",
    aiCheckNote: "正在进行格式与历史公告承诺节点一致性自动比对..."
  }
];
