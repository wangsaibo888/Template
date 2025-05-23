import { Star } from "lucide-react";
import React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
 */
const Hero7 = ({
  heading = "使用 Next.js 和 Supabase 构建应用的最快方式",
  description = "精心制作的启动器模板，集成了 React、Tailwind 和 Shadcn UI。开发者可以直接复制粘贴这些组件到他们的项目中。",
  button = {
    text: "开始使用",
    url: "/sign-up",
  },
  reviews = {
    count: 200,
    avatars: [
      {
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        alt: "用户头像 1",
      },
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        alt: "用户头像 2",
      },
      {
        src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        alt: "用户头像 3",
      },
      {
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        alt: "用户头像 4",
      },
      {
        src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        alt: "用户头像 5",
      },
    ],
  },
}: Hero7Props) => {
  return (
    <section className="pt-16 pb-32 md:pt-20 md:pb-32">
      <div className="container text-center">
        {/* 主要内容区域 */}
        <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
          {/* 主标题 */}
          <h1 className="text-3xl font-extrabold lg:text-6xl">{heading}</h1>
          {/* 描述文字 */}
          <p className="text-balance text-muted-foreground lg:text-lg">
            {description}
          </p>
        </div>
        
        {/* 行动按钮 */}
        <Button asChild size="lg" className="mt-10">
          <a href={button.url}>{button.text}</a>
        </Button>
        
        {/* 用户评价和头像展示区域 */}
        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          {/* 用户头像列表 */}
          <span className="mx-4 inline-flex items-center -space-x-4">
            {reviews.avatars.map((avatar, index) => (
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
              来自 {reviews.count}+ 用户评价
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero7 }; 