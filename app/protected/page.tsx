import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/ui/sidebar";
import TopNav from "@/components/ui/top-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, Users, Activity, CreditCard } from "lucide-react";
import { getUserCredits } from "@/app/actions/credits";

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
        
        {/* 页面内容 */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* 欢迎信息 */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  欢迎回来！
                </h1>
                <p className="text-muted-foreground mt-1">
                  这是您的个人仪表板，查看您的账户概览和活动。
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                活跃用户
              </Badge>
            </div>
            
            {/* 状态提示 */}
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 dark:text-blue-100">
                    账户已验证
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    您的账户已成功验证，可以使用所有功能。
                  </p>
                </div>
              </div>
            </div>

            {/* 数据卡片网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 积分信息卡片 */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    当前积分
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userCredits?.current_credits || 5}</div>
                  <p className="text-xs text-muted-foreground">
                    总获得: {userCredits?.total_earned_credits || 5} | 总消耗: {userCredits?.total_spent_credits || 0}
                  </p>
                </CardContent>
              </Card>

              {/* 使用统计卡片 */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    本月使用
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userCredits?.total_spent_credits || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    积分消耗统计
                  </p>
                </CardContent>
              </Card>

              {/* 套餐信息卡片 */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    当前套餐
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">免费版</div>
                  <p className="text-xs text-muted-foreground">
                    升级以获得更多功能
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 用户详细信息 */}
            <Card>
              <CardHeader>
                <CardTitle>用户信息</CardTitle>
                <CardDescription>
                  您的账户详细信息和配置
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        邮箱地址
                      </label>
                      <p className="text-sm text-foreground mt-1">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        用户ID
                      </label>
                      <p className="text-sm text-foreground mt-1 font-mono">
                        {user.id.slice(0, 8)}...
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        最后登录
                      </label>
                      <p className="text-sm text-foreground mt-1">
                        {new Date(user.last_sign_in_at || '').toLocaleString('zh-CN')}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        邮箱验证状态
                      </label>
                      <div className="mt-1">
                        <Badge variant={user.email_confirmed_at ? "default" : "secondary"}>
                          {user.email_confirmed_at ? "已验证" : "未验证"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
