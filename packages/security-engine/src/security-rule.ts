import type { SecurityFinding } from './types.js';

export interface SecurityRule {
  id: string;
  analyze(input: string): SecurityFinding[];
}
