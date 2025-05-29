"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, Users, Activity, CreditCard } from "lucide-react";
import { useLanguage } from "@/components/ui/language-switcher";
import { useTranslation } from "@/lib/i18n";

interface ProtectedPageClientProps {
  user: {
    id: string;
    email?: string;
    created_at?: string;
    email_confirmed_at?: string;
    last_sign_in_at?: string;
  } | null;
  userCredits: {
    current_credits: number;
    total_earned_credits: number;
    total_spent_credits: number;
  } | null;
}

/**
 * 受保护页面（仪表板）客户端组件
 * 处理多语言翻译和用户交互
 */
export default function ProtectedPageClient({ user, userCredits }: ProtectedPageClientProps) {
  const currentLanguage = useLanguage();
  const { t } = useTranslation(currentLanguage);

  if (!user) return null;

  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* 欢迎信息 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('welcomeBack')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t('dashboardDescription')}
            </p>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            {t('activeUser')}
          </Badge>
        </div>
        
        {/* 状态提示 */}
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-100">
                {t('accountVerified')}
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                {t('accountVerifiedDescription')}
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
                {t('currentCredits')}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userCredits?.current_credits || 5}</div>
              <p className="text-xs text-muted-foreground">
                {t('totalEarned')}: {userCredits?.total_earned_credits || 5} | {t('totalSpent')}: {userCredits?.total_spent_credits || 0}
              </p>
            </CardContent>
          </Card>

          {/* 使用统计卡片 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('monthlyUsage')}
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userCredits?.total_spent_credits || 0}</div>
              <p className="text-xs text-muted-foreground">
                {t('creditUsageStats')}
              </p>
            </CardContent>
          </Card>

          {/* 套餐信息卡片 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('currentPlan')}
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{t('freePlan')}</div>
              <p className="text-xs text-muted-foreground">
                {t('upgradeForMoreFeatures')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 用户详细信息 */}
        <Card>
          <CardHeader>
            <CardTitle>{t('userInfo')}</CardTitle>
            <CardDescription>
              {t('userInfoDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {t('emailAddress')}
                  </label>
                  <p className="text-sm text-foreground mt-1">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {t('userId')}
                  </label>
                  <p className="text-sm text-foreground mt-1 font-mono">
                    {user.id.slice(0, 8)}...
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {t('lastLogin')}
                  </label>
                  <p className="text-sm text-foreground mt-1">
                    {new Date(user.last_sign_in_at || '').toLocaleString(
                      currentLanguage === 'en' ? 'en-US' : 
                      currentLanguage === 'ja' ? 'ja-JP' : 'zh-CN'
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {t('emailVerificationStatus')}
                  </label>
                  <div className="mt-1">
                    <Badge variant={user.email_confirmed_at ? "default" : "secondary"}>
                      {user.email_confirmed_at ? t('verified') : t('unverified')}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 