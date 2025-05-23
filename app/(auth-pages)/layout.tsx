import { Demo } from "@/components/demo"; // 导航栏组件

/**
 * 认证页面布局组件
 * 为认证相关页面（登录、注册、忘记密码等）提供统一的布局结构
 * 包含固定悬顶导航栏和页面内容容器
 */
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 固定悬顶导航栏 */}
      <Demo />
      
      {/* 页面内容 - 增加顶部间距，让页面更加美观 */}
      <div className="max-w-7xl flex flex-col gap-12 items-start pt-32 md:pt-40 lg:pt-48 px-4">
        {children}
      </div>
    </>
  );
}
