"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleAuthButton } from "@/components/ui/google-auth-button";
import { useLanguage } from "@/components/ui/language-switcher";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { useSearchParams } from "next/navigation";

export default function Signup() {
  const searchParams = useSearchParams();
  const currentLanguage = useLanguage();
  const { t } = useTranslation(currentLanguage);
  
  // 从URL查询参数中获取错误、成功或其他消息
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

  // 如果有任何消息，显示消息页面
  if (messageObj) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={messageObj} />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">{t('signUp')}</h1>
        <p className="text-sm text text-foreground">
          {t('alreadyHaveAccount')}{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            {t('loginNow')}
          </Link>
        </p>
        
        {/* 邮箱密码注册表单 */}
        <form className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">{t('email')}</Label>
          <Input name="email" placeholder="your@example.com" required />
          <Label htmlFor="password">{t('password')}</Label>
          <Input
            type="password"
            name="password"
            placeholder={
              currentLanguage === 'en' ? "Enter password (at least 6 characters)" :
              currentLanguage === 'ja' ? "パスワードを入力（6文字以上）" :
              "请输入密码（至少6位）"
            }
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText={t('registering')}>
            {t('emailRegister')}
          </SubmitButton>
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

        {/* Google 一键注册 */}
        <div>
          <GoogleAuthButton />
        </div>
      </div>
      <SmtpMessage />
    </>
  );
}
