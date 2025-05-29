"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe, Check } from "lucide-react"

/**
 * 支持的语言配置
 */
export const languages = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  },
  zh: {
    code: 'zh', 
    name: '中文',
    flag: '🇨🇳'
  },
  ja: {
    code: 'ja',
    name: '日本語', 
    flag: '🇯🇵'
  }
} as const

export type LanguageCode = keyof typeof languages

/**
 * 语言切换组件属性接口
 */
interface LanguageSwitcherProps {
  /** 是否显示为紧凑模式（只显示图标） */
  compact?: boolean
  /** 自定义类名 */
  className?: string
}

/**
 * 语言切换组件
 * 提供多语言切换功能，支持本地存储
 */
export function LanguageSwitcher({ compact = false, className }: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('zh')
  const [mounted, setMounted] = useState(false)

  // 客户端挂载后初始化语言
  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem('language') as LanguageCode
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage)
    } else {
      // 检测浏览器语言
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'zh') {
        setCurrentLanguage('zh')
      } else if (browserLang === 'ja') {
        setCurrentLanguage('ja')
      } else {
        setCurrentLanguage('en')
      }
    }
  }, [])

  // 切换语言
  const handleLanguageChange = (langCode: LanguageCode) => {
    setCurrentLanguage(langCode)
    localStorage.setItem('language', langCode)
    
    // 触发自定义事件，通知其他组件语言已更改
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language: langCode } 
    }))
  }

  // 防止SSR不匹配
  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className={className}>
        <Globe className="h-4 w-4" />
      </Button>
    )
  }

  const current = languages[currentLanguage]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex items-center gap-2 ${className}`}
        >
          <Globe className="h-4 w-4" />
          {!compact && (
            <span className="hidden sm:inline-block">
              {current.flag} {current.name}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code as LanguageCode)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
            {currentLanguage === code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * 获取当前语言的Hook
 */
export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('zh')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as LanguageCode
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage)
    }

    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language)
    }

    window.addEventListener('languageChange', handleLanguageChange as EventListener)
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener)
    }
  }, [])

  return currentLanguage
} 