import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/ui/sidebar";
import TopNav from "@/components/ui/top-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, User, Bell, Shield, Trash2 } from "lucide-react";
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
                管理您的账户信息和偏好设置
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
                  更新您的个人资料信息
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

            {/* 通知设置 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  通知设置
                </CardTitle>
                <CardDescription>
                  管理您接收通知的方式
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">邮件通知</Label>
                      <p className="text-xs text-muted-foreground">
                        接收重要更新和通知邮件
                      </p>
                    </div>
                    <Badge variant="outline">已启用</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">营销邮件</Label>
                      <p className="text-xs text-muted-foreground">
                        接收产品更新和优惠信息
                      </p>
                    </div>
                    <Badge variant="secondary">已禁用</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">安全通知</Label>
                      <p className="text-xs text-muted-foreground">
                        账户安全相关的重要通知
                      </p>
                    </div>
                    <Badge variant="outline">已启用</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 安全设置 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  安全设置
                </CardTitle>
                <CardDescription>
                  管理您的账户安全
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">密码</Label>
                      <p className="text-xs text-muted-foreground">
                        最后更新：{new Date(user.updated_at || '').toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      修改密码
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">两步验证</Label>
                      <p className="text-xs text-muted-foreground">
                        为您的账户添加额外安全保护
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      启用
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">会话管理</Label>
                      <p className="text-xs text-muted-foreground">
                        管理您的登录会话
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      查看会话
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 偏好设置 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  偏好设置
                </CardTitle>
                <CardDescription>
                  自定义您的使用体验
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">主题</Label>
                      <p className="text-xs text-muted-foreground">
                        选择您喜欢的界面主题
                      </p>
                    </div>
                    <Badge variant="outline">自动</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">语言</Label>
                      <p className="text-xs text-muted-foreground">
                        设置界面显示语言
                      </p>
                    </div>
                    <Badge variant="outline">中文简体</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">时区</Label>
                      <p className="text-xs text-muted-foreground">
                        设置您的时区
                      </p>
                    </div>
                    <Badge variant="outline">GMT+8</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 危险操作 */}
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Trash2 className="h-5 w-5" />
                  危险操作
                </CardTitle>
                <CardDescription>
                  这些操作是不可逆的，请谨慎操作
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">注销登录</Label>
                      <p className="text-xs text-muted-foreground">
                        退出当前账户登录
                      </p>
                    </div>
                    <form action={signOutAction}>
                      <Button type="submit" variant="outline" size="sm">
                        注销
                      </Button>
                    </form>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-destructive">删除账户</Label>
                      <p className="text-xs text-muted-foreground">
                        永久删除您的账户和所有数据
                      </p>
                    </div>
                    <Button variant="destructive" size="sm" disabled>
                      删除账户
                    </Button>
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