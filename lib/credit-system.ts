/**
 * 积分系统服务类
 * 用于在前端调用Supabase中的积分相关函数
 */

import { createClient } from '@/utils/supabase/client';
import type {
  UserCredits,
  CreditTransaction,
  SpendCreditsParams,
  EarnCreditsParams,
  GetCreditHistoryParams,
  CreditSystemService,
} from '@/types/credit-system';
import { CreditSystemError } from '@/types/credit-system';

export class CreditSystem implements CreditSystemService {
  private supabase;

  constructor() {
    this.supabase = createClient();
  }

  /**
   * 获取用户当前积分信息
   */
  async getUserCredits(): Promise<UserCredits> {
    const { data, error } = await this.supabase.rpc('get_user_credits');

    if (error) {
      throw new CreditSystemError(
        `获取积分信息失败: ${error.message}`,
        error.code,
        error.details
      );
    }

    if (!data || data.length === 0) {
      throw new CreditSystemError('用户积分记录不存在');
    }

    return data[0] as UserCredits;
  }

  /**
   * 消耗积分
   */
  async spendCredits(params: SpendCreditsParams): Promise<boolean> {
    const { data, error } = await this.supabase.rpc('spend_credits', {
      spend_amount: params.spend_amount,
      spend_description: params.spend_description || '积分消耗',
      reference_id: params.reference_id || null,
      metadata_json: params.metadata_json || {},
    });

    if (error) {
      throw new CreditSystemError(
        `消耗积分失败: ${error.message}`,
        error.code,
        error.details
      );
    }

    return data === true;
  }

  /**
   * 获得积分
   */
  async earnCredits(params: EarnCreditsParams): Promise<boolean> {
    const { data, error } = await this.supabase.rpc('earn_credits', {
      earn_amount: params.earn_amount,
      earn_description: params.earn_description || '积分获得',
      reference_id: params.reference_id || null,
      metadata_json: params.metadata_json || {},
    });

    if (error) {
      throw new CreditSystemError(
        `获得积分失败: ${error.message}`,
        error.code,
        error.details
      );
    }

    return data === true;
  }

  /**
   * 查询积分历史记录
   */
  async getCreditHistory(params: GetCreditHistoryParams = {}): Promise<CreditTransaction[]> {
    const { data, error } = await this.supabase.rpc('get_credit_history', {
      page_size: params.page_size || 20,
      page_offset: params.page_offset || 0,
      filter_type: params.filter_type || null,
    });

    if (error) {
      throw new CreditSystemError(
        `查询积分历史失败: ${error.message}`,
        error.code,
        error.details
      );
    }

    return (data || []) as CreditTransaction[];
  }

  /**
   * 检查积分余额是否足够
   */
  async hasEnoughCredits(amount: number): Promise<boolean> {
    try {
      const credits = await this.getUserCredits();
      return credits.current_credits >= amount;
    } catch (error) {
      return false;
    }
  }

  /**
   * 尝试消耗积分（带余额检查）
   */
  async trySpendCredits(params: SpendCreditsParams): Promise<{
    success: boolean;
    currentCredits?: number;
    error?: string;
  }> {
    try {
      // 先检查余额
      const hasEnough = await this.hasEnoughCredits(params.spend_amount);
      if (!hasEnough) {
        const credits = await this.getUserCredits();
        return {
          success: false,
          currentCredits: credits.current_credits,
          error: `积分余额不足，当前余额: ${credits.current_credits}，需要: ${params.spend_amount}`,
        };
      }

      // 执行消耗
      await this.spendCredits(params);
      const updatedCredits = await this.getUserCredits();

      return {
        success: true,
        currentCredits: updatedCredits.current_credits,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '未知错误',
      };
    }
  }

  /**
   * 格式化积分数量显示
   */
  static formatCredits(amount: number): string {
    return `${amount.toLocaleString()} 积分`;
  }

  /**
   * 格式化交易类型显示
   */
  static formatTransactionType(type: string): string {
    const typeMap: Record<string, string> = {
      earn: '获得',
      spend: '消耗',
      refund: '退款',
      bonus: '奖励',
      penalty: '扣除',
    };
    return typeMap[type] || type;
  }

  /**
   * 获取交易类型对应的颜色类名
   */
  static getTransactionTypeColor(type: string): string {
    const colorMap: Record<string, string> = {
      earn: 'text-green-600',
      spend: 'text-red-600',
      refund: 'text-blue-600',
      bonus: 'text-green-500',
      penalty: 'text-red-500',
    };
    return colorMap[type] || 'text-gray-600';
  }
}

// 创建单例实例
export const creditSystem = new CreditSystem();

// 导出便捷的Hook函数（如果使用React）
export const useCreditSystem = () => {
  return creditSystem;
};

// 导出工具函数
export const { formatCredits, formatTransactionType, getTransactionTypeColor } = CreditSystem; 