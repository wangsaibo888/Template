import { Demo } from "@/components/demo"; // 导航栏组件

/**
 * 营销页面布局组件
 * 为营销相关页面（首页、定价等）提供统一的布局结构
 * 包含固定悬顶导航栏和适当间距的页面内容容器
 */
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* 固定悬顶导航栏 */}
      <Demo />
      
      {/* 页面内容 - 增加顶部间距，让页面更加美观 */}
      <div className="flex flex-col gap-20 max-w-5xl p-5 w-full pt-32 md:pt-40 lg:pt-48">
        {children}
      </div>
    </>
  );
}
