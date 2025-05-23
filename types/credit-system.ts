/**
 * 积分系统相关的TypeScript类型定义
 */

// 积分变动类型
export type TransactionType = 'earn' | 'spend' | 'refund' | 'bonus' | 'penalty';

// 用户积分信息
export interface UserCredits {
  current_credits: number;
  total_earned_credits: number;
  total_spent_credits: number;
  created_at: string;
  updated_at: string;
}

// 积分变动记录
export interface CreditTransaction {
  id: string;
  transaction_type: TransactionType;
  amount: number;
  balance_before: number;
  balance_after: number;
  description: string;
  reference_id?: string;
  metadata: Record<string, any>;
  created_at: string;
}

// 消耗积分参数
export interface SpendCreditsParams {
  spend_amount: number;
  spend_description?: string;
  reference_id?: string;
  metadata_json?: Record<string, any>;
}

// 获得积分参数
export interface EarnCreditsParams {
  earn_amount: number;
  earn_description?: string;
  reference_id?: string;
  metadata_json?: Record<string, any>;
}

// 查询积分历史参数
export interface GetCreditHistoryParams {
  page_size?: number;
  page_offset?: number;
  filter_type?: TransactionType;
}

// Supabase RPC 响应类型
export interface SupabaseRpcResponse<T> {
  data: T | null;
  error: {
    message: string;
    details?: string;
    hint?: string;
    code?: string;
  } | null;
}

// 积分系统错误类型
export class CreditSystemError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: string
  ) {
    super(message);
    this.name = 'CreditSystemError';
  }
}

// 积分系统服务类型定义
export interface CreditSystemService {
  // 获取用户当前积分
  getUserCredits(): Promise<UserCredits>;
  
  // 消耗积分
  spendCredits(params: SpendCreditsParams): Promise<boolean>;
  
  // 获得积分
  earnCredits(params: EarnCreditsParams): Promise<boolean>;
  
  // 查询积分历史
  getCreditHistory(params?: GetCreditHistoryParams): Promise<CreditTransaction[]>;
  
  // 检查积分余额是否足够
  hasEnoughCredits(amount: number): Promise<boolean>;
} 