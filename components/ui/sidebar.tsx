"use client"

import { cn } from "@/lib/utils"
import { Home, CreditCard, Settings } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/ui/language-switcher"
import { useTranslation } from "@/lib/i18n"

/**
 * 导航项接口定义
 */
interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  current?: boolean
}

/**
 * 侧边栏导航组件
 * 提供主要功能的导航入口
 */
export default function Sidebar() {
  const pathname = usePathname()
  const currentLanguage = useLanguage()
  const { t } = useTranslation(currentLanguage)
  
  // 导航项配置
  const navigation: NavItem[] = [
    {
      name: t('home'),
      href: "/protected",
      icon: Home,
      current: pathname === "/protected",
    },
    {
      name: t('billing'),
      href: "/protected/billing",
      icon: CreditCard,
      current: pathname === "/protected/billing",
    },
    {
      name: t('settings'),
      href: "/protected/settings", 
      icon: Settings,
      current: pathname === "/protected/settings",
    },
  ]

  return (
    <div className="flex h-full w-64 flex-col fixed inset-y-0 z-50 lg:z-50">
      <div className="flex min-h-0 flex-1 flex-col border-r border-border bg-background">
        {/* 顶部Logo区域 */}
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <div className="flex items-center">
              <div className="w-8 h-8 mr-3">
                <Image
                  src="/logos/logo.svg"
                  alt="Logo"
                  width={32}
                  height={32}
                />
              </div>
              <span className="text-xl font-semibold text-foreground">{t('dashboard')}</span>
            </div>
          </div>
          
          {/* 导航菜单 */}
          <nav className="mt-8 flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                    item.current
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      item.current
                        ? "text-accent-foreground"
                        : "text-muted-foreground group-hover:text-accent-foreground"
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
} 