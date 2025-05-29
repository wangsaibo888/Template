"use client";

import { useLanguage } from "@/components/ui/language-switcher";
import { useTranslation } from "@/lib/i18n";

/**
 * 定价页面组件
 * 展示产品的定价方案
 * 支持多语言国际化
 */
export default function PricingPage() {
  const currentLanguage = useLanguage();
  const { t } = useTranslation(currentLanguage);

  return (
    <div className="flex-1 w-full flex flex-col gap-12 items-center">
      <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
        <h1 className="font-bold text-2xl">{t('pricingPlans')}</h1>
      </div>
      <div className="flex flex-col gap-2 items-center text-center max-w-lg">
        <h2 className="font-bold text-xl mb-4">{t('comingSoon')}</h2>
        <p className="text-muted-foreground">
          {t('pricingDescription')}
        </p>
      </div>
    </div>
  );
} 