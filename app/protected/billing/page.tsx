import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/ui/sidebar";
import TopNav from "@/components/ui/top-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Check, X } from "lucide-react";

/**
 * 账单页面组件
 * 显示用户的账单信息和套餐管理
 */
export default async function BillingPage() {
  const supabase = await createClient();

  // 获取当前登录用户信息
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 如果用户未登录，重定向到登录页面
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="h-screen bg-background">
      {/* 侧边栏导航 */}
      <Sidebar />
      
      {/* 主内容区域 */}
      <div className="ml-64 flex flex-col h-full">
        {/* 顶部导航栏 */}
        <TopNav user={user} />
        
        {/* 页面内容 */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-6 space-y-6">
            {/* 页面标题 */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                账单与套餐
              </h1>
              <p className="text-muted-foreground mt-1">
                管理您的订阅和账单信息
              </p>
            </div>

            {/* 当前套餐 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  当前套餐
                </CardTitle>
                <CardDescription>
                  您目前使用的套餐详情
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">免费版</h3>
                    <p className="text-muted-foreground">每月 5 个免费点数</p>
                  </div>
                  <Badge variant="secondary">当前套餐</Badge>
                </div>
              </CardContent>
            </Card>

            {/* 套餐选择 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 免费版 */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle>免费版</CardTitle>
                  <CardDescription>适合个人用户尝试</CardDescription>
                  <div className="text-3xl font-bold">¥0<span className="text-sm font-normal">/月</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      每月 5 个点数
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      基础功能
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="h-4 w-4 text-muted-foreground" />
                      优先支持
                    </li>
                  </ul>
                  <Button variant="secondary" className="w-full mt-4" disabled>
                    当前套餐
                  </Button>
                </CardContent>
              </Card>

              {/* 专业版 */}
              <Card className="relative border-primary">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Badge>推荐</Badge>
                </div>
                <CardHeader>
                  <CardTitle>专业版</CardTitle>
                  <CardDescription>适合专业用户</CardDescription>
                  <div className="text-3xl font-bold">¥29<span className="text-sm font-normal">/月</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      每月 100 个点数
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      所有功能
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      优先支持
                    </li>
                  </ul>
                  <Button className="w-full mt-4">
                    升级到专业版
                  </Button>
                </CardContent>
              </Card>

              {/* 企业版 */}
              <Card>
                <CardHeader>
                  <CardTitle>企业版</CardTitle>
                  <CardDescription>适合团队和企业</CardDescription>
                  <div className="text-3xl font-bold">¥99<span className="text-sm font-normal">/月</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      无限点数
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      所有功能
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      专属支持
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    联系销售
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* 账单历史 */}
            <Card>
              <CardHeader>
                <CardTitle>账单历史</CardTitle>
                <CardDescription>
                  查看您的付款记录
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>暂无账单记录</p>
                  <p className="text-sm">升级到付费套餐后，您的账单记录将显示在这里。</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
} 