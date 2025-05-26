"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * 获取当前用户的积分信息
 */
export async function getUserCredits() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error("用户未登录");
  }

  // 查询用户积分
  const { data: credits, error } = await supabase
    .from("user_credits")
    .select("current_credits, total_earned_credits, total_spent_credits")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("获取积分失败:", error);
    throw new Error("获取积分失败");
  }

  return credits;
}

/**
 * 消耗1个积分
 */
export async function spendOneCredit() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error("用户未登录");
  }

  try {
    // 调用数据库函数来消耗积分
    const { data, error } = await supabase.rpc("spend_credits", {
      spend_amount: 1,
      spend_description: "测试消耗积分",
      reference_id: null,
      metadata_json: { source: "test_button" }
    });

    if (error) {
      console.error("消耗积分失败:", error);
      throw new Error(error.message || "消耗积分失败");
    }

    // 重新验证页面以更新显示
    revalidatePath("/protected");
    
    return { success: true };
  } catch (error) {
    console.error("消耗积分错误:", error);
    throw error;
  }
}

/**
 * 重置用户积分到5点
 */
export async function resetCredits() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error("用户未登录");
  }

  try {
    // 先获取当前积分
    const { data: currentCredits, error: fetchError } = await supabase
      .from("user_credits")
      .select("current_credits")
      .eq("user_id", user.id)
      .single();

    if (fetchError) {
      throw new Error("获取当前积分失败");
    }

    const currentAmount = currentCredits?.current_credits || 0;
    const targetAmount = 5;

    if (currentAmount !== targetAmount) {
      // 计算需要增加的积分
      const diffAmount = targetAmount - currentAmount;

      if (diffAmount > 0) {
        // 增加积分
        await supabase.rpc("earn_credits", {
          earn_amount: diffAmount,
          earn_description: "管理员重置积分",
          reference_id: null,
          metadata_json: { source: "admin_reset" }
        });
      } else {
        // 减少积分（使用消耗）
        await supabase.rpc("spend_credits", {
          spend_amount: Math.abs(diffAmount),
          spend_description: "管理员重置积分",
          reference_id: null,
          metadata_json: { source: "admin_reset" }
        });
      }
    }

    // 重新验证页面
    revalidatePath("/protected");
    
    return { success: true };
  } catch (error) {
    console.error("重置积分错误:", error);
    throw error;
  }
} 