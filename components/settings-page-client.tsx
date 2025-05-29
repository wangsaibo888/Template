"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, LogOut, Globe } from "lucide-react";
import { signOutAction } from "@/app/actions";
import { LanguageSwitcher, useLanguage } from "@/components/ui/language-switcher";
import { useTranslation } from "@/lib/i18n";

interface SettingsPageClientProps {
  user: {
    id: string;
    email?: string;
    created_at?: string;
    email_confirmed_at?: string;
  } | null;
}

/**
 * 设置页面客户端组件
 * 处理多语言翻译和用户交互
 */
export default function SettingsPageClient({ user }: SettingsPageClientProps) {
  const currentLanguage = useLanguage();
  const { t } = useTranslation(currentLanguage);

  if (!user) return null;

  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('accountSettings')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('manageAccountInfo')}
          </p>
        </div>

        {/* 个人信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t('personalInfo')}
            </CardTitle>
            <CardDescription>
              {t('viewPersonalInfo')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">{t('emailAddress')}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={user.email || ''} 
                    disabled 
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('emailCannotModify')}
                  </p>
                </div>
                <div>
                  <Label htmlFor="userId">{t('userId')}</Label>
                  <Input 
                    id="userId" 
                    value={user.id.slice(0, 8) + '...'} 
                    disabled 
                    className="mt-1 font-mono"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <Label>{t('accountStatus')}</Label>
                  <div className="mt-1">
                    <Badge variant={user.email_confirmed_at ? "default" : "secondary"}>
                      {user.email_confirmed_at ? t('verified') : t('unverified')}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>{t('registrationTime')}</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(user.created_at || '').toLocaleDateString(
                      currentLanguage === 'en' ? 'en-US' : 
                      currentLanguage === 'ja' ? 'ja-JP' : 'zh-CN'
                    )}
                  </p>
                </div>
                <div>
                  <Label>{t('interfaceLanguage')}</Label>
                  <div className="mt-1">
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 语言和偏好设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t('languageAndPreferences')}
            </CardTitle>
            <CardDescription>
              {t('customizeLanguagePreferences')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">{t('interfaceLanguage')}</Label>
                  <p className="text-xs text-muted-foreground">
                    {t('selectPreferredLanguage')}
                  </p>
                </div>
                <LanguageSwitcher />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">{t('timezone')}</Label>
                  <p className="text-xs text-muted-foreground">
                    {t('setTimezonePreference')}
                  </p>
                </div>
                <Badge variant="outline">GMT+8</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">{t('theme')}</Label>
                  <p className="text-xs text-muted-foreground">
                    {t('selectDarkOrLightTheme')}
                  </p>
                </div>
                <Badge variant="outline">{t('followSystem')}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 退出登录 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogOut className="h-5 w-5" />
              {t('accountActions')}
            </CardTitle>
            <CardDescription>
              {t('logoutCurrentAccount')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">{t('logout')}</Label>
                <p className="text-xs text-muted-foreground">
                  {t('logoutDescription')}
                </p>
              </div>
              <form action={signOutAction}>
                <Button type="submit" variant="outline" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  {t('logout')}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 