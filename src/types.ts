export type ActiveTab = 'presentation' | 'announcement-demo' | 'ir-demo' | 'collaboration-preview' | 'landing-calculator';

export interface SlideContent {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  keyTakeaway: string;
  type: 'pain-points' | 'three-values' | 'case-announcement' | 'case-ir' | 'phased-roadmap' | 'landing-implementation';
}

export interface PledgeSampleData {
  id: string;
  title: string;
  shareholderName: string;
  pledgedShares: string;
  pledgeeName: string;
  pledgePurpose: string;
  startDate: string;
  contractFile: string;
  resolutionFile: string;
  registerFile: string;
  announcementType: 'pledge' | 'release';
}

export interface IRQuestionSample {
  id: string;
  investorName: string;
  channel: '互动易 (深交所)' | '上证e互动' | '电话问询记录' | '机构调研';
  time: string;
  question: string;
  categoryTag: string;
  hasSensitivity: boolean;
}

export interface CrossDeptTask {
  id: string;
  targetDept: '财务部' | '法务部' | '战略投资部' | '生产运营部';
  taskName: string;
  deadline: string;
  status: 'pending' | 'ai-checked' | 'incomplete' | 'completed';
  aiCheckNote?: string;
  missingFiles?: string[];
}

export interface ROICalculationInput {
  annualAnnouncements: number;
  dailyIRQuestions: number;
  securitiesStaffCount: number;
  crossDeptRequestsPerMonth: number;
}

export interface ROICalculationResult {
  hoursSavedPerYear: number;
  manualCostSavingsRmb: number;
  efficiencyBoostPercent: number;
  errorRiskReductionRate: number;
  estimatedSetupDays: number;
  estimatedBudget: string;
  dataCheckVolumeBenchmark: string;
}
