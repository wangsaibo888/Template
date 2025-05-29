"use client";

import { Star } from "lucide-react";
import React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-switcher";
import { useTranslation } from "@/lib/i18n";

/**
 * Hero7组件的属性接口定义
 */
interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

/**
 * 现代化Hero组件
 * 包含标题、描述、行动按钮和用户评价展示
 * 适用于产品展示页面的头部区域，已优化以适应固定导航栏
 * 支持多语言国际化
 */
const Hero7 = () => {
  const currentLanguage = useLanguage();
  const { t } = useTranslation(currentLanguage);

  // 用户头像数据
  const avatars = [
    {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      alt: currentLanguage === 'en' ? "User Avatar 1" : 
           currentLanguage === 'ja' ? "ユーザーアバター 1" : "用户头像 1",
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      alt: currentLanguage === 'en' ? "User Avatar 2" : 
           currentLanguage === 'ja' ? "ユーザーアバター 2" : "用户头像 2",
    },
    {
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      alt: currentLanguage === 'en' ? "User Avatar 3" : 
           currentLanguage === 'ja' ? "ユーザーアバター 3" : "用户头像 3",
    },
    {
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      alt: currentLanguage === 'en' ? "User Avatar 4" : 
           currentLanguage === 'ja' ? "ユーザーアバター 4" : "用户头像 4",
    },
    {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      alt: currentLanguage === 'en' ? "User Avatar 5" : 
           currentLanguage === 'ja' ? "ユーザーアバター 5" : "用户头像 5",
    },
  ];

  return (
    <section className="pt-16 pb-32 md:pt-20 md:pb-32">
      <div className="container text-center">
        {/* 主要内容区域 */}
        <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
          {/* 主标题 */}
          <h1 className="text-3xl font-extrabold lg:text-6xl">
            {t('heroHeading')}
          </h1>
          {/* 描述文字 */}
          <p className="text-balance text-muted-foreground lg:text-lg">
            {t('heroDescription')}
          </p>
        </div>
        
        {/* 行动按钮 */}
        <Button asChild size="lg" className="mt-10">
          <a href="/sign-up">{t('heroButtonText')}</a>
        </Button>
        
        {/* 用户评价和头像展示区域 */}
        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          {/* 用户头像列表 */}
          <span className="mx-4 inline-flex items-center -space-x-4">
            {avatars.map((avatar, index) => (
              <Avatar key={index} className="size-14 border">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </span>
          
          {/* 评分和评价数量 */}
          <div>
            {/* 五星评分 */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="size-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            {/* 评价统计 */}
            <p className="text-left font-medium text-muted-foreground">
              {t('heroReviewsText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero7 }; 