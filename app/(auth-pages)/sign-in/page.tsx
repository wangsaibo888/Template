"use client";

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleAuthButton } from "@/components/ui/google-auth-button";
import { useLanguage } from "@/components/ui/language-switcher";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const searchParams = useSearchParams();
  const currentLanguage = useLanguage();
  const { t } = useTranslation(currentLanguage);

  // 从URL查询参数中获取错误或成功消息
  const error = searchParams?.get('error');
  const success = searchParams?.get('success');
  const message = searchParams?.get('message');

  // 构建消息对象
  let messageObj: Message | undefined;
  if (error) {
    messageObj = { error };
  } else if (success) {
    messageObj = { success };
  } else if (message) {
    messageObj = { message };
  }

  return (
    <div className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">{t('signIn')}</h1>
      <p className="text-sm text-foreground">
        {t('dontHaveAccount')}{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          {t('registerNow')}
        </Link>
      </p>
      
      {/* 邮箱密码登录表单 */}
      <form className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">{t('email')}</Label>
        <Input name="email" placeholder="your@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">{t('password')}</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            {t('forgotPassword')}
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder={t('password')}
          required
        />
        <SubmitButton pendingText={t('loggingIn')} formAction={signInAction}>
          {t('emailLogin')}
        </SubmitButton>
        {messageObj && <FormMessage message={messageObj} />}
      </form>

      {/* 分割线 */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">{t('or')}</span>
        </div>
      </div>

      {/* Google 一键登录 */}
      <div>
        <GoogleAuthButton />
      </div>
    </div>
  );
}
