export type SecuritySeverity = 'info' | 'low' | 'medium' | 'high' | 'critical';

export type SecurityCategory =
  | 'prompt-injection'
  | 'data-leakage'
  | 'authorization'
  | 'output-validation'
  | 'tool-security';

export interface SecurityFinding {
  ruleId: string;
  title: string;
  description: string;
  severity: SecuritySeverity;
  category: SecurityCategory;
  matchedText?: string;
}

export interface SecurityScanResult {
  findings: SecurityFinding[];
  duration: number;
  score: number;
}
