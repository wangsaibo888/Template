import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/ui/sidebar";
import TopNav from "@/components/ui/top-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, LogOut, Globe } from "lucide-react";
import { signOutAction } from "@/app/actions";
import { getUserCredits } from "@/app/actions/credits";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import SettingsPageClient from "@/components/settings-page-client";

/**
 * 设置页面组件
 * 显示用户的账户设置和配置选项
 */
export default async function SettingsPage() {
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
        <SettingsPageClient user={user} />
      </div>
    </div>
  );
} 