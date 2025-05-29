import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/ui/sidebar";
import TopNav from "@/components/ui/top-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, LogOut } from "lucide-react";
import { signOutAction } from "@/app/actions";
import { getUserCredits } from "@/app/actions/credits";

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
        
        {/* 页面内容 */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* 页面标题 */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                账户设置
              </h1>
              <p className="text-muted-foreground mt-1">
                管理您的账户信息
              </p>
            </div>

            {/* 个人信息 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  个人信息
                </CardTitle>
                <CardDescription>
                  查看您的个人资料信息
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">邮箱地址</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={user.email || ''} 
                        disabled 
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        邮箱地址无法修改
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="userId">用户ID</Label>
                      <Input 
                        id="userId" 
                        value={user.id.slice(0, 8) + '...'} 
                        disabled 
                        className="mt-1 font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <Label>账户状态</Label>
                      <div className="mt-1">
                        <Badge variant={user.email_confirmed_at ? "default" : "secondary"}>
                          {user.email_confirmed_at ? "已验证" : "未验证"}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label>注册时间</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(user.created_at || '').toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 退出登录 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LogOut className="h-5 w-5" />
                  账户操作
                </CardTitle>
                <CardDescription>
                  退出当前账户登录
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">退出登录</Label>
                    <p className="text-xs text-muted-foreground">
                      安全退出当前账户，您需要重新登录才能访问
                    </p>
                  </div>
                  <form action={signOutAction}>
                    <Button type="submit" variant="outline" className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      退出登录
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
} 