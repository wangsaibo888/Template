"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-switcher";
import { useTranslation } from "@/lib/i18n";

/**
 * FAQ项目的接口定义
 */
interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * FAQ3组件的属性接口
 * 所有属性都是可选的，因为组件提供了默认值
 */
interface Faq3Props {
  heading?: string;
  description?: string;
  items?: FaqItem[];
  supportHeading?: string;
  supportDescription?: string;
  supportButtonText?: string;
  supportButtonUrl?: string;
}

/**
 * FAQ3组件
 * 常见问题解答组件，包含折叠式问答列表和客服支持区域
 * 支持多语言国际化
 */
const Faq3 = () => {
  const currentLanguage = useLanguage();
  const { t } = useTranslation(currentLanguage);

  // 动态生成FAQ项目数据
  const faqItems = [
    {
      id: "faq-1",
      question: t('faqQuestion1'),
      answer: t('faqAnswer1'),
    },
    {
      id: "faq-2",
      question: t('faqQuestion2'),
      answer: t('faqAnswer2'),
    },
    {
      id: "faq-3",
      question: t('faqQuestion3'),
      answer: t('faqAnswer3'),
    },
    {
      id: "faq-4",
      question: t('faqQuestion4'),
      answer: t('faqAnswer4'),
    },
    {
      id: "faq-5",
      question: t('faqQuestion5'),
      answer: t('faqAnswer5'),
    },
    {
      id: "faq-6",
      question: t('faqQuestion6'),
      answer: t('faqAnswer6'),
    },
    {
      id: "faq-7",
      question: t('faqQuestion7'),
      answer: t('faqAnswer7'),
    },
  ];

  // 客服头像alt文本
  const getAvatarAlt = (index: number) => {
    if (currentLanguage === 'en') return `Support Agent ${index}`;
    if (currentLanguage === 'ja') return `サポートエージェント ${index}`;
    return `客服 ${index}`;
  };

  return (
    <section className="py-32">
      <div className="container space-y-16">
        {/* FAQ标题和描述 */}
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            {t('faqTitle')}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{t('faqDescription')}</p>
        </div>
        
        {/* FAQ列表 */}
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {/* 客服支持区域 */}
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-accent p-4 text-center md:rounded-xl md:p-6 lg:p-8">
          {/* 客服头像组 */}
          <div className="relative">
            <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" />
              <AvatarFallback>{getAvatarAlt(1)}</AvatarFallback>
            </Avatar>
            <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face" />
              <AvatarFallback>{getAvatarAlt(2)}</AvatarFallback>
            </Avatar>
            <Avatar className="mb-4 size-16 border md:mb-5">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" />
              <AvatarFallback>{getAvatarAlt(3)}</AvatarFallback>
            </Avatar>
          </div>
          
          {/* 支持信息 */}
          <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
            {currentLanguage === 'en' ? "Need more support?" :
             currentLanguage === 'ja' ? "さらなるサポートが必要ですか？" :
             "需要更多支持？"}
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            {currentLanguage === 'en' ? "Our professional support team is here to answer any questions or concerns. Contact us for personalized assistance." :
             currentLanguage === 'ja' ? "私たちのプロフェッショナルサポートチームが、ご質問や懸念にお答えします。個別のサポートについては、お気軽にお問い合わせください。" :
             "我们专业的支持团队随时为您解答任何问题或疑虑。联系我们获得个性化帮助。"}
          </p>
          
          {/* 联系按钮 */}
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto" asChild>
              <a href="/protected">
                {currentLanguage === 'en' ? "Contact Support" :
                 currentLanguage === 'ja' ? "サポートに連絡" :
                 "联系客服"}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Faq3 }; 