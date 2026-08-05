import pptxgen from "pptxgenjs";
import { SLIDES_DATA, MANUAL_VS_AI_COMPARISON, THREE_CORE_VALUES, PHASED_ROADMAP_STEPS, IMPLEMENTATION_CHECKLIST } from "../data/presentationData";

/**
 * Exports the 6-slide presentation deck to a native Microsoft PowerPoint (.pptx) file.
 */
export async function exportToPptx(): Promise<void> {
  const pptx = new pptxgen();

  pptx.layout = "LAYOUT_16x9";
  pptx.author = "公司治理 AI 数字员工团队";
  pptx.company = "董秘与证券事务智能化解决方案";
  pptx.title = "公司治理 AI 数字员工方案宣讲演示 PPT";

  // Global styling constants
  const BG_WHITE = "FFFFFF";
  const BG_LIGHT = "F8F9FA";
  const COLOR_DARK = "1A1A1A";
  const COLOR_GRAY = "555555";
  const COLOR_MUTED = "777777";

  // Helper to add header on every slide
  const addSlideHeader = (slide: pptxgen.Slide, sectionNum: string, title: string, subtitle: string) => {
    // Top badge/number
    slide.addText(`SECTION ${sectionNum}  |  公司治理 AI 数字员工`, {
      x: 0.6,
      y: 0.4,
      w: 12.0,
      h: 0.3,
      fontSize: 10,
      fontFace: "Arial",
      bold: true,
      color: COLOR_MUTED,
      charSpacing: 1.5,
    });

    // Title
    slide.addText(title, {
      x: 0.6,
      y: 0.7,
      w: 12.0,
      h: 0.6,
      fontSize: 22,
      fontFace: "Georgia",
      bold: true,
      color: COLOR_DARK,
    });

    // Subtitle
    slide.addText(subtitle, {
      x: 0.6,
      y: 1.25,
      w: 12.0,
      h: 0.35,
      fontSize: 12,
      fontFace: "Arial",
      color: COLOR_GRAY,
    });

    // Divider line
    slide.addShape(pptx.ShapeType.line, {
      x: 0.6,
      y: 1.65,
      w: 12.133,
      h: 0,
      line: { color: COLOR_DARK, width: 1.5 },
    });
  };

  // Helper to add footer
  const addSlideFooter = (slide: pptxgen.Slide, takeaway: string, slideNum: number) => {
    slide.addShape(pptx.ShapeType.line, {
      x: 0.6,
      y: 6.8,
      w: 12.133,
      h: 0,
      line: { color: COLOR_DARK, width: 1 },
    });

    slide.addText(`核心要点：${takeaway}`, {
      x: 0.6,
      y: 6.9,
      w: 10.5,
      h: 0.3,
      fontSize: 10,
      fontFace: "Arial",
      bold: true,
      color: COLOR_DARK,
    });

    slide.addText(`${slideNum} / 6`, {
      x: 11.2,
      y: 6.9,
      w: 1.5,
      h: 0.3,
      fontSize: 10,
      fontFace: "Arial",
      align: "right",
      bold: true,
      color: COLOR_MUTED,
    });
  };

  // ==========================================
  // SLIDE 1: Executive Summary & Comparison
  // ==========================================
  const slide1 = pptx.addSlide();
  slide1.background = { color: BG_WHITE };
  addSlideHeader(slide1, "01", SLIDES_DATA[0].title, SLIDES_DATA[0].subtitle);

  // Concept box
  slide1.addShape(pptx.ShapeType.rect, {
    x: 0.6,
    y: 1.8,
    w: 12.133,
    h: 0.8,
    fill: { color: BG_LIGHT },
    line: { color: COLOR_DARK, width: 1 },
  });
  slide1.addText(
    "核心理念：方案不是为了重塑企业原有的治理体系，而是在现有工作流程中嵌入辅助审核、解答与风控的“公司治理 AI 数字员工”，明确赋能董秘与证券事务团队。",
    {
      x: 0.8,
      y: 1.9,
      w: 11.7,
      h: 0.6,
      fontSize: 11,
      fontFace: "Arial",
      color: COLOR_DARK,
      bold: true,
    }
  );

  // Comparison Grid header
  slide1.addText("人工作业传统方式 VS AI 数字员工全景对比", {
    x: 0.6,
    y: 2.75,
    w: 12.0,
    h: 0.3,
    fontSize: 11,
    fontFace: "Arial",
    bold: true,
    color: COLOR_DARK,
  });

  // Table comparison
  const tableRows: pptxgen.TableRow[] = [
    [
      { text: "业务场景", options: { bold: true, color: "FFFFFF", fill: { color: COLOR_DARK }, fontSize: 10 } },
      { text: "❌ 传统人工作业痛点", options: { bold: true, color: "FFFFFF", fill: { color: COLOR_DARK }, fontSize: 10 } },
      { text: "✅ AI 数字员工赋能", options: { bold: true, color: "FFFFFF", fill: { color: COLOR_DARK }, fontSize: 10 } },
    ],
    ...MANUAL_VS_AI_COMPARISON.map((item) => [
      { text: item.dimension, options: { bold: true, fontSize: 10, color: COLOR_DARK, fill: { color: BG_LIGHT } } },
      { text: item.manual, options: { fontSize: 9.5, color: "A00000", fill: { color: "FFF0F0" } } },
      { text: item.ai, options: { fontSize: 9.5, color: "006633", fill: { color: "F0FFF4" } } },
    ]),
  ];

  slide1.addTable(tableRows, {
    x: 0.6,
    y: 3.1,
    w: 12.133,
    colW: [2.0, 5.0, 5.133],
    border: { pt: 0.5, color: COLOR_DARK },
  });

  addSlideFooter(slide1, SLIDES_DATA[0].keyTakeaway, 1);

  // ==========================================
  // SLIDE 2: Three Core Value Pillars
  // ==========================================
  const slide2 = pptx.addSlide();
  slide2.background = { color: BG_WHITE };
  addSlideHeader(slide2, "02", SLIDES_DATA[1].title, SLIDES_DATA[1].subtitle);

  THREE_CORE_VALUES.forEach((val, idx) => {
    const cardX = 0.6 + idx * 4.1;

    // Card background box
    slide2.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: 1.85,
      w: 3.9,
      h: 4.6,
      fill: { color: BG_WHITE },
      line: { color: COLOR_DARK, width: 1.5 },
    });

    // Metric text
    slide2.addText(val.metric, {
      x: cardX + 0.2,
      y: 2.05,
      w: 3.5,
      h: 0.8,
      fontSize: 32,
      fontFace: "Georgia",
      bold: true,
      color: COLOR_DARK,
    });

    // Title
    slide2.addText(val.title, {
      x: cardX + 0.2,
      y: 2.9,
      w: 3.5,
      h: 0.4,
      fontSize: 14,
      fontFace: "Georgia",
      bold: true,
      color: COLOR_DARK,
    });

    // Subtext
    slide2.addText(val.subtext, {
      x: cardX + 0.2,
      y: 3.35,
      w: 3.5,
      h: 0.3,
      fontSize: 11,
      fontFace: "Arial",
      bold: true,
      color: COLOR_GRAY,
    });

    // Divider inside card
    slide2.addShape(pptx.ShapeType.line, {
      x: cardX + 0.2,
      y: 3.7,
      w: 3.5,
      h: 0,
      line: { color: COLOR_DARK, width: 0.8 },
    });

    // Desc
    slide2.addText(val.desc, {
      x: cardX + 0.2,
      y: 3.85,
      w: 3.5,
      h: 2.4,
      fontSize: 10,
      fontFace: "Arial",
      color: COLOR_DARK,
      valign: "top",
    });
  });

  addSlideFooter(slide2, SLIDES_DATA[1].keyTakeaway, 2);

  // ==========================================
  // SLIDE 3: Announcement Automation Case Study
  // ==========================================
  const slide3 = pptx.addSlide();
  slide3.background = { color: BG_WHITE };
  addSlideHeader(slide3, "03", SLIDES_DATA[2].title, SLIDES_DATA[2].subtitle);

  // 5 Steps Grid
  const steps = [
    { step: "01 文件读取", title: "多源格式解析", desc: "自动识别质押协议、解质证明、董事会决议及中登表格" },
    { step: "02 关键提取", title: "核心字段抽离", desc: "精准提取主体名称、质押股数、占持股及总股本比例" },
    { step: "03 模板匹配", title: "规则与规范核对", desc: "自动匹配上交所/深交所最新信披对应规范" },
    { step: "04 交叉校验", title: "风险与一致性", desc: "勾稽核算累计质押比例，排查窗口期禁质押及平仓红线" },
    { step: "05 结果生成", title: "格式化定稿辅助", desc: "生成标准定稿草稿，标记待确认事项供人工终审" },
  ];

  steps.forEach((st, idx) => {
    const boxX = 0.6 + idx * 2.45;
    slide3.addShape(pptx.ShapeType.rect, {
      x: boxX,
      y: 1.85,
      w: 2.3,
      h: 2.8,
      fill: { color: BG_LIGHT },
      line: { color: COLOR_DARK, width: 1 },
    });

    slide3.addText(st.step, {
      x: boxX + 0.1,
      y: 1.95,
      w: 2.1,
      h: 0.25,
      fontSize: 9,
      fontFace: "Arial",
      bold: true,
      color: COLOR_MUTED,
    });

    slide3.addText(st.title, {
      x: boxX + 0.1,
      y: 2.25,
      w: 2.1,
      h: 0.4,
      fontSize: 12,
      fontFace: "Georgia",
      bold: true,
      color: COLOR_DARK,
    });

    slide3.addText(st.desc, {
      x: boxX + 0.1,
      y: 2.7,
      w: 2.1,
      h: 1.8,
      fontSize: 9.5,
      fontFace: "Arial",
      color: COLOR_DARK,
    });
  });

  // Summary Benefits box
  slide3.addShape(pptx.ShapeType.rect, {
    x: 0.6,
    y: 4.8,
    w: 12.133,
    h: 1.8,
    fill: { color: "F0F4F8" },
    line: { color: COLOR_DARK, width: 1 },
  });

  slide3.addText("核心提升与实测收益：", {
    x: 0.8,
    y: 4.9,
    w: 11.7,
    h: 0.3,
    fontSize: 11,
    fontFace: "Arial",
    bold: true,
    color: COLOR_DARK,
  });

  slide3.addText(
    "• 耗时大幅缩短：传统人工作业需要 2 小时 → AI 自动解析生成只需 1 分钟，证券人员 3 分钟定稿。\n" +
    "• 杜绝数字勾稽计算错误：多源材料联动交叉计算，彻底消除因手工填报或算错比例导致更正公告的风险。\n" +
    "• 自动风控警戒：自动识别质押比例超过高危红线、窗口期违规及平仓风险，并自动出具预警分析提示。",
    {
      x: 0.8,
      y: 5.25,
      w: 11.7,
      h: 1.2,
      fontSize: 10,
      fontFace: "Arial",
      color: COLOR_DARK,
      lineSpacing: 18,
    }
  );

  addSlideFooter(slide3, SLIDES_DATA[2].keyTakeaway, 3);

  // ==========================================
  // SLIDE 4: IR Question Answering & Boundary Control
  // ==========================================
  const slide4 = pptx.addSlide();
  slide4.background = { color: BG_WHITE };
  addSlideHeader(slide4, "04", SLIDES_DATA[3].title, SLIDES_DATA[3].subtitle);

  // Pain points box (Left)
  slide4.addShape(pptx.ShapeType.rect, {
    x: 0.6,
    y: 1.85,
    w: 5.9,
    h: 4.7,
    fill: { color: "FFF5F5" },
    line: { color: "CC0000", width: 1 },
  });

  slide4.addText("❌ 现有人工处理 IR 问答的真实痛点 (日均20+提问)", {
    x: 0.8,
    y: 2.05,
    w: 5.5,
    h: 0.4,
    fontSize: 12,
    fontFace: "Georgia",
    bold: true,
    color: "990000",
  });

  slide4.addText(
    "1. 跨部门沟通繁琐：\n" +
    "提问大量涉及募投进度、业务指标与业绩预测，证券人员需频繁向财务、法务、业务部门催要答复，耗费大量协作精力。\n\n" +
    "2. 回复尺度难把控：\n" +
    "新员工缺乏经验，容易误将未公开细节披露给单个投资者，引发选择性披露违规或监管关注函。\n\n" +
    "3. 响应效率极低：\n" +
    "历史回复分散在各处，每次需翻阅数十份公告，答复迟缓导致投资者满意度低。",
    {
      x: 0.8,
      y: 2.55,
      w: 5.5,
      h: 3.8,
      fontSize: 10,
      fontFace: "Arial",
      color: COLOR_DARK,
      lineSpacing: 16,
    }
  );

  // Solution box (Right)
  slide4.addShape(pptx.ShapeType.rect, {
    x: 6.833,
    y: 1.85,
    w: 5.9,
    h: 4.7,
    fill: { color: "F0FFF4" },
    line: { color: "008844", width: 1 },
  });

  slide4.addText("✅ AI 数字员工精准解答与红线控制流程", {
    x: 7.033,
    y: 2.05,
    w: 5.5,
    h: 0.4,
    fontSize: 12,
    fontFace: "Georgia",
    bold: true,
    color: "006633",
  });

  slide4.addText(
    "1. 智能问题自动分类：\n" +
    "实时识别公开问询、预测性敏感数据、市场谣言澄清等类型，秒级归类。\n\n" +
    "2. 信息披露边界穿透审查：\n" +
    "严格比对已公开定期报告与公告，精准锁定合法公开信息与禁止答复红线。\n\n" +
    "3. 匹配企业知识库与规章：\n" +
    "调用历史答复口径与监管规范，自动生成专业得体、合规安全的推荐回复。\n\n" +
    "4. 回复规范沉淀累积：\n" +
    "自动丰富企业答复口径库，确保各期回复标准统一高度一致。",
    {
      x: 7.033,
      y: 2.55,
      w: 5.5,
      h: 3.8,
      fontSize: 10,
      fontFace: "Arial",
      color: COLOR_DARK,
      lineSpacing: 16,
    }
  );

  addSlideFooter(slide4, SLIDES_DATA[3].keyTakeaway, 4);

  // ==========================================
  // SLIDE 5: Phased Construction Roadmap
  // ==========================================
  const slide5 = pptx.addSlide();
  slide5.background = { color: BG_WHITE };
  addSlideHeader(slide5, "05", SLIDES_DATA[4].title, SLIDES_DATA[4].subtitle);

  PHASED_ROADMAP_STEPS.forEach((step, idx) => {
    const cardX = 0.6 + idx * 4.1;
    const isMainPhase = idx === 0;

    slide5.addShape(pptx.ShapeType.rect, {
      x: cardX,
      y: 1.85,
      w: 3.9,
      h: 4.7,
      fill: { color: isMainPhase ? BG_LIGHT : BG_WHITE },
      line: { color: COLOR_DARK, width: isMainPhase ? 2 : 1 },
    });

    slide5.addText(`PHASE 0${idx + 1}  |  ${step.timeframe}`, {
      x: cardX + 0.2,
      y: 2.05,
      w: 3.5,
      h: 0.3,
      fontSize: 9.5,
      fontFace: "Arial",
      bold: true,
      color: COLOR_MUTED,
    });

    slide5.addText(step.phase, {
      x: cardX + 0.2,
      y: 2.4,
      w: 3.5,
      h: 0.6,
      fontSize: 14,
      fontFace: "Georgia",
      bold: true,
      color: COLOR_DARK,
    });

    slide5.addText(step.status, {
      x: cardX + 0.2,
      y: 3.05,
      w: 3.5,
      h: 0.3,
      fontSize: 10,
      fontFace: "Arial",
      bold: true,
      color: isMainPhase ? "006633" : COLOR_GRAY,
    });

    slide5.addShape(pptx.ShapeType.line, {
      x: cardX + 0.2,
      y: 3.4,
      w: 3.5,
      h: 0,
      line: { color: COLOR_DARK, width: 0.8 },
    });

    const itemsText = step.items.map((it) => `• ${it}`).join("\n\n");
    slide5.addText(itemsText, {
      x: cardX + 0.2,
      y: 3.55,
      w: 3.5,
      h: 2.8,
      fontSize: 10,
      fontFace: "Arial",
      color: COLOR_DARK,
    });
  });

  addSlideFooter(slide5, SLIDES_DATA[4].keyTakeaway, 5);

  // ==========================================
  // SLIDE 6: Implementation & ROI Estimation
  // ==========================================
  const slide6 = pptx.addSlide();
  slide6.background = { color: BG_WHITE };
  addSlideHeader(slide6, "06", SLIDES_DATA[5].title, SLIDES_DATA[5].subtitle);

  // Checklist 3 Boxes
  IMPLEMENTATION_CHECKLIST.forEach((chk, idx) => {
    const boxX = 0.6 + idx * 4.1;

    slide6.addShape(pptx.ShapeType.rect, {
      x: boxX,
      y: 1.85,
      w: 3.9,
      h: 3.0,
      fill: { color: BG_WHITE },
      line: { color: COLOR_DARK, width: 1 },
    });

    slide6.addText(chk.category, {
      x: boxX + 0.2,
      y: 2.05,
      w: 3.5,
      h: 0.35,
      fontSize: 12,
      fontFace: "Georgia",
      bold: true,
      color: COLOR_DARK,
    });

    slide6.addShape(pptx.ShapeType.line, {
      x: boxX + 0.2,
      y: 2.45,
      w: 3.5,
      h: 0,
      line: { color: COLOR_DARK, width: 0.8 },
    });

    const chkText = chk.items.map((it) => `• ${it}`).join("\n");
    slide6.addText(chkText, {
      x: boxX + 0.2,
      y: 2.6,
      w: 3.5,
      h: 2.1,
      fontSize: 9.5,
      fontFace: "Arial",
      color: COLOR_DARK,
      lineSpacing: 16,
    });
  });

  // Disclaimer & Mouthpiece Note box
  slide6.addShape(pptx.ShapeType.rect, {
    x: 0.6,
    y: 5.0,
    w: 12.133,
    h: 1.6,
    fill: { color: BG_LIGHT },
    line: { color: COLOR_DARK, width: 1 },
  });

  slide6.addText("⚠️ 关于宣讲演示数据与测算口径的明确说明：", {
    x: 0.8,
    y: 5.15,
    w: 11.7,
    h: 0.3,
    fontSize: 10.5,
    fontFace: "Arial",
    bold: true,
    color: COLOR_DARK,
  });

  slide6.addText(
    "会议及宣讲中提及的“一小时处理一千份文件”、“效率提升约百分之四十”、“初期投入二十万元以内”、“约一个月完成训练”等数字，属于基于行业平均水平的建议性演示话术与经验评估。正式对外合同使用前，需通过企业真实数据量与规则复杂度进行实际测试，明确具体适用条件与测算口径，不直接作为固定硬性承诺。",
    {
      x: 0.8,
      y: 5.5,
      w: 11.7,
      h: 1.0,
      fontSize: 9.5,
      fontFace: "Arial",
      color: COLOR_GRAY,
      lineSpacing: 15,
    }
  );

  addSlideFooter(slide6, SLIDES_DATA[5].keyTakeaway, 6);

  // Write and download PPTX file
  await pptx.writeFile({ fileName: "公司治理AI数字员工_宣讲演示PPT.pptx" });
}

/**
 * Generates structured Markdown content suitable for pasting into Gamma / MindShow / Office 365 Copilot.
 */
export function generateMarkdownDeck(): string {
  return `# 公司治理 AI 数字员工方案宣讲演示

---

## Slide 1: 痛点剖析与“数字员工”定位升级
**副标题**：从传统手工复核向智能化数字员工协助演进

### 核心理念
方案不是为了重塑企业原有的治理体系，而是在现有工作流程中嵌入辅助审核、解答与风控的“公司治理 AI 数字员工”，明确赋能董秘与证券事务团队。

### 全景对比
1. **高频公告拟定**：
   - 传统：手动复制 Word 模板，反复校对，耗时 2-3 小时/份
   - AI 数字员工：自动读取合同及中登数据，1分钟生成合规初稿
2. **IR 投资者问答**：
   - 传统：跨部门频繁拉扯，口径难统一，易触碰未公开边界
   - AI 数字员工：秒级归类问询，比对信披边界，生成规范建议回复
3. **跨部门资料收集**：
   - 传统：表格样式不一，反复催要盖章件，漏交错交普遍
   - AI 数字员工：自动化任务分发、格式检测与缺失预警

---

## Slide 2: 方案的三大核心价值支撑
**副标题**：风险控制、效率跃升与全栈赋能

1. **核心价值 1：合规风控 (Zero Breach Risk)**
   - 杜绝信息披露错误与选择性披露红线
2. **核心价值 2：效率跃升 (80%+ Efficiency Boost)**
   - 释放专职证券事务人员重复体力劳动
3. **核心价值 3：知识沉淀 (Enterprise Knowledge Base)**
   - 形成企业固有的治理答复与审查标准库

---

## Slide 3: 实操场景 1 —— 质押/解除质押公告生成与多源材料核验
**副标题**：第一阶段董秘/证券事务高频突破

### 智能处理 5 步法：
1. **01 多源格式解析**：自动识别质押协议、解质证明、董事会决议及中登表格
2. **02 核心字段抽离**：精准提取主体名称、质押股数、占持股及总股本比例
3. **03 规则与规范核对**：自动匹配上交所/深交所最新信披对应规范
4. **04 风险与一致性**：勾稽核算累计质押比例，排查窗口期禁质押及平仓红线
5. **05 格式化定稿辅助**：生成标准定稿草稿，标记待确认事项供人工终审

### 实操效益：
- 耗时从 2 小时缩短至 1 分钟生成、3 分钟定稿
- 彻底消除手工填报及算错比例导致更正公告的风险

---

## Slide 4: 实操场景 2 —— IR 问答与敏感边界判定
**副标题**：日均处理 20+ 提问的高价值场景

### 传统痛点：
- 跨部门沟通繁琐、回复尺度难把握、响应时效低下

### AI 数字员工解法：
- 智能问题自动分类
- 信息披露边界穿透审查
- 匹配企业知识库与监管规范
- 回复规范沉淀与标准化

---

## Slide 5: 分阶段建设路线图
**副标题**：从部门内高频突破向全局风控中枢迈进

- **Phase 1（当前核心）**：董秘与证券事务部门内部高频突破（质押公告、IR问答）
- **Phase 2（阶段二）**：跨部门资料收集与定期报告自动化协同
- **Phase 3（阶段三）**：公司治理全域风险控制与多维看板

---

## Slide 6: 落地路线与投入测算
**副标题**：企业如何快速获得这项能力与经验评估

### 准备材料清单：
- 历史信息披露档案、公司内部治理制度、常见 IR 答复规范库、标准公告模板

### 测算说明：
宣讲中提及的“1小时处理1000份文件”、“效率提升40%”、“初期投入20万元以内”等为经验评估，正式合同前需基于实际业务体量实测确认。
`;
}
