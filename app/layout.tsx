// 导入各种组件和工具
import DeployButton from "@/components/deploy-button"; // 部署按钮组件
import { EnvVarWarning } from "@/components/env-var-warning"; // 环境变量警告组件
import HeaderAuth from "@/components/header-auth"; // 头部认证组件
import { ThemeSwitcher } from "@/components/theme-switcher"; // 主题切换器组件
import { hasEnvVars } from "@/utils/supabase/check-env-vars"; // 检查环境变量的工具函数
import { Geist } from "next/font/google"; // 谷歌字体 Geist
import { ThemeProvider } from "next-themes"; // 主题提供器
import { Toaster } from "sonner"; // Toast 通知组件
import "./globals.css"; // 全局CSS样式

// 设置默认URL，优先使用Vercel URL，否则使用本地开发地址
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// 页面元数据配置
export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit", // 页面标题
  description: "The fastest way to build apps with Next.js and Supabase", // 页面描述
};

// 配置Geist字体
const geistSans = Geist({
  display: "swap", // 字体交换策略
  subsets: ["latin"], // 字符子集
});

/**
 * 根布局组件
 * 为整个应用提供基础布局结构，包括主题提供器、字体配置和全局样式
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        {/* 主题提供器，支持系统主题自动切换 */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 主要内容区域 */}
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              {/* 页面内容 - 现在由各个布局组件负责具体结构 */}
                {children}

              {/* 页脚区域 */}
              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <p>
                  Powered by{" "}
                  <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    Supabase
                  </a>
                </p>
                {/* 主题切换器 */}
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
          
          {/* Toast 通知组件 */}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
