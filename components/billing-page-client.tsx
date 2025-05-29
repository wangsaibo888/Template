"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Check, X } from "lucide-react";
import { useLanguage } from "@/components/ui/language-switcher";
import { useTranslation } from "@/lib/i18n";

/**
 * 账单页面客户端组件
 * 处理多语言翻译和用户交互
 */
export default function BillingPageClient() {
  const currentLanguage = useLanguage();
  const { t } = useTranslation(currentLanguage);

  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('billingAndPlans')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('manageBillingInfo')}
          </p>
        </div>

        {/* 当前套餐 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              {t('currentPlanTitle')}
            </CardTitle>
            <CardDescription>
              {t('currentPlanDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{t('freePlan')}</h3>
                <p className="text-muted-foreground">{t('monthlyCredits5')}</p>
              </div>
              <Badge variant="secondary">{t('currentPlanBadge')}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* 套餐选择 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 免费版 */}
          <Card className="relative">
            <CardHeader>
              <CardTitle>{t('freePlan')}</CardTitle>
              <CardDescription>{t('freeDescription')}</CardDescription>
              <div className="text-3xl font-bold">
                ¥0<span className="text-sm font-normal">{t('perMonth')}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  {t('monthlyCredits5')}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  {t('basicFeatures')}
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-muted-foreground" />
                  {t('prioritySupport')}
                </li>
              </ul>
              <Button variant="secondary" className="w-full mt-4" disabled>
                {t('currentPlanBadge')}
              </Button>
            </CardContent>
          </Card>

          {/* 专业版 */}
          <Card className="relative border-primary">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <Badge>{t('recommended')}</Badge>
            </div>
            <CardHeader>
              <CardTitle>{t('proPlan')}</CardTitle>
              <CardDescription>{t('proDescription')}</CardDescription>
              <div className="text-3xl font-bold">
                ¥29<span className="text-sm font-normal">{t('perMonth')}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  {t('monthlyCredits100')}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  {t('allFeatures')}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  {t('prioritySupport')}
                </li>
              </ul>
              <Button className="w-full mt-4">
                {t('upgradeToProPlan')}
              </Button>
            </CardContent>
          </Card>

          {/* 企业版 */}
          <Card>
            <CardHeader>
              <CardTitle>{t('enterprisePlan')}</CardTitle>
              <CardDescription>{t('enterpriseDescription')}</CardDescription>
              <div className="text-3xl font-bold">
                ¥99<span className="text-sm font-normal">{t('perMonth')}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  {t('unlimitedCredits')}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  {t('allFeatures')}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  {t('dedicatedSupport')}
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4">
                {t('contactSales')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 账单历史 */}
        <Card>
          <CardHeader>
            <CardTitle>{t('billingHistory')}</CardTitle>
            <CardDescription>
              {t('billingHistoryDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{t('noBillingRecords')}</p>
              <p className="text-sm">{t('noBillingRecordsDescription')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 