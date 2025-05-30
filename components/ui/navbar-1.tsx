"use client" 

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher, useLanguage } from "@/components/ui/language-switcher"
import { useTranslation } from "@/lib/i18n"
import { MenuItem, Menu as NavMenu, ProductItem, HoveredLink } from "@/components/ui/navbar-menu"

/**
 * 顶部导航栏组件
 * 提供响应式导航菜单，包含桌面端和移动端布局
 * 支持动画效果和固定悬顶定位
 */
const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const currentLanguage = useLanguage()
  const { t } = useTranslation(currentLanguage)

  const toggleMenu = () => setIsOpen(!isOpen)

  // 处理鼠标进入菜单项
  const handleMouseEnter = (item: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActive(item)
  }

  // 处理鼠标离开菜单区域，添加延迟
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActive(null)
    }, 150) // 150ms延迟
  }

  // 清理timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // 导航菜单项配置（移动端用）
  const navItems = [
    { name: t('home'), href: "/" },
    { name: t('product'), href: "#" },
    { name: t('pricing'), href: "/pricing" }
  ]

  return (
    // 固定定位容器 - 常驻悬顶
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full py-6 px-4 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg w-full max-w-3xl relative z-10">
        {/* Logo区域 */}
        <div className="flex items-center">
          <motion.div
            className="w-8 h-8 mr-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/logos/logo.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          </motion.div>
        </div>
        
        {/* 桌面端导航菜单 */}
        <div className="hidden md:flex items-center">
          <div 
            className="flex justify-center space-x-8"
            onMouseLeave={handleMouseLeave}
          >
            {/* Home 菜单项 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link 
                href="/" 
                className="text-sm text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-medium"
              >
                {t('home')}
              </Link>
            </motion.div>

            {/* Product 菜单项 - 带悬停菜单 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div 
                onMouseEnter={() => handleMouseEnter(t('product'))} 
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <span className="cursor-pointer text-sm text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-medium">
                  {t('product')}
                </span>
                {active === t('product') && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      mass: 0.5,
                      damping: 11.5,
                      stiffness: 100,
                      restDelta: 0.001,
                      restSpeed: 0.001,
                    }}
                  >
                    <div className="absolute top-[calc(100%_+_0.2rem)] left-1/2 transform -translate-x-1/2 pt-1">
                      <motion.div
                        transition={{
                          type: "spring",
                          mass: 0.5,
                          damping: 11.5,
                          stiffness: 100,
                          restDelta: 0.001,
                          restSpeed: 0.001,
                        }}
                        layoutId="active"
                        className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl"
                      >
                        <motion.div
                          layout
                          className="w-max h-full p-4"
                        >
                          <div className="text-sm grid grid-cols-2 gap-4 p-2 min-w-[400px]">
                            <ProductItem
                              title="AI 助手"
                              href="/products/ai-assistant"
                              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTE1IDM1SDg1TDEwMCA1MEwxMTUgNjVIODVMMTAwIDUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K"
                              description="基于最新AI技术的智能助手，提升工作效率"
                            />
                            <ProductItem
                              title="数据分析平台"
                              href="/products/analytics"
                              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkJGQ0ZEIi8+CjxwYXRoIGQ9Ik04MCA3MFY0MEg5MFY3MEg4MFpNMTAwIDcwVjMwSDExMFY3MEgxMDBaTTEyMCA3MFY1MEgxMzBWNzBIMTIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K"
                              description="强大的数据可视化和分析工具"
                            />
                            <ProductItem
                              title="项目管理系统"
                              href="/products/project-management"
                              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjlGQUZCIi8+CjxyZWN0IHg9IjcwIiB5PSIzMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K"
                              description="团队协作和项目管理一体化解决方案"
                            />
                            <ProductItem
                              title="自动化工具"
                              href="/products/automation"
                              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjUwIiByPSIyMCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KPC9zdmc+Cg=="
                              description="简化重复任务，释放团队创造力"
                            />
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Pricing 菜单项 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link 
                href="/pricing" 
                className="text-sm text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-medium"
              >
                {t('pricing')}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* 桌面端右侧按钮组 */}
        <div className="hidden md:flex items-center space-x-3">
          {/* 语言切换器 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <LanguageSwitcher compact />
          </motion.div>
          
          {/* 开始使用按钮 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center px-5 py-2 text-sm text-white bg-black dark:bg-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              {t('getStarted')}
            </Link>
          </motion.div>
        </div>

        {/* 移动端菜单按钮 */}
        <motion.button className="md:hidden flex items-center" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
          <Menu className="h-6 w-6 text-gray-900 dark:text-gray-100" />
        </motion.button>
      </div>

      {/* 移动端菜单覆盖层 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white dark:bg-gray-900 z-[60] pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* 关闭按钮 */}
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-gray-900 dark:text-gray-100" />
            </motion.button>
            
            {/* 移动端菜单项 */}
            <div className="flex flex-col space-y-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Link 
                    href={item.href} 
                    className="text-base text-gray-900 dark:text-gray-100 font-medium" 
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* 移动端语言切换器 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                exit={{ opacity: 0, x: 20 }}
                className="pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base text-gray-900 dark:text-gray-100 font-medium">
                    {t('language')}
                  </span>
                  <LanguageSwitcher />
                </div>
              </motion.div>

              {/* 移动端开始使用按钮 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
              >
                <Link
                  href="/sign-in"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-white bg-black dark:bg-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  onClick={toggleMenu}
                >
                  {t('getStarted')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Navbar1 }