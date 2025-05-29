import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/ui/sidebar";
import TopNav from "@/components/ui/top-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, Users, Activity, CreditCard } from "lucide-react";
import { getUserCredits } from "@/app/actions/credits";
import ProtectedPageClient from "@/components/protected-page-client";

/**
 * 受保护的仪表板页面组件
 * 只有已认证的用户可以访问此页面
 * 显示仪表板布局，包含侧边栏导航和主内容区域
 */
export default async function ProtectedPage() {
  const supabase = await createClient();

  // 获取当前登录用户信息
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 如果用户未登录，重定向到登录页面
  if (!user) {
    return redirect("/sign-in");
  }

  // 获取用户积分信息
  let userCredits = null;
  try {
    userCredits = await getUserCredits();
  } catch (error) {
    console.error("获取积分失败:", error);
    // 如果获取积分失败，使用默认值
    userCredits = { current_credits: 5, total_earned_credits: 5, total_spent_credits: 0 };
  }

  return (
    <div className="fixed inset-0 bg-background flex">
      {/* 侧边栏导航 */}
      <Sidebar />
      
      {/* 主内容区域 */}
      <div className="ml-64 flex flex-col flex-1 overflow-hidden">
        {/* 顶部导航栏 */}
        <TopNav user={user} credits={userCredits?.current_credits || 5} />
        
        {/* 页面内容 - 使用客户端组件处理翻译 */}
        <ProtectedPageClient user={user} userCredits={userCredits} />
      </div>
    </div>
  );
}
