"use client"

import { useState, useTransition } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { RotateCcw, Coins, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { spendOneCredit, resetCredits } from "@/app/actions/credits"
import { toast } from "sonner"
import { useLanguage } from "@/components/ui/language-switcher"
import { useTranslation } from "@/lib/i18n"

/**
 * 顶部导航栏组件属性接口
 */
interface TopNavProps {
  user?: {
    email?: string
    user_metadata?: {
      avatar_url?: string
      full_name?: string
    }
  } | null
  credits?: number // 当前积分数量
}

/**
 * 顶部导航栏组件
 * 显示点数、消耗点数按钮、重置按钮和用户头像
 * 支持多语言国际化
 */
export default function TopNav({ user, credits = 5 }: TopNavProps) {
  const [isSpending, startSpending] = useTransition()
  const [isResetting, startResetting] = useTransition()
  const currentLanguage = useLanguage()
  const { t } = useTranslation(currentLanguage)

  // 消耗1个积分
  const handleSpendCredit = () => {
    startSpending(async () => {
      try {
        await spendOneCredit()
        toast.success(t('spendCreditSuccess'))
      } catch (error: any) {
        toast.error(error.message || t('spendCreditError'))
      }
    })
  }

  // 重置积分
  const handleResetCredits = () => {
    startResetting(async () => {
      try {
        await resetCredits()
        toast.success(t('resetCreditSuccess'))
      } catch (error: any) {
        toast.error(error.message || t('resetCreditError'))
      }
    })
  }

  // 获取用户显示名称
  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return t('user')
  }

  // 获取用户头像初始字母
  const getUserInitials = () => {
    const name = getUserDisplayName()
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="bg-background border-b border-border px-4 py-3 md:px-6">
      <div className="flex items-center justify-between">
        {/* 左侧留空，可以放置面包屑导航等 */}
        <div className="flex-1" />
        
        {/* 右侧：点数显示、操作按钮、用户头像 */}
        <div className="flex items-center space-x-4">
          {/* 点数显示和操作按钮 */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-accent/50 rounded-full px-3 py-1">
              <Coins className="h-4 w-4 text-amber-500" />
              <Badge variant="secondary" className="text-sm font-medium">
                {credits} {t('points')}
              </Badge>
            </div>
            
            {/* 消耗积分按钮 */}
            <Button
              variant="destructive"
              size="sm"
              onClick={handleSpendCredit}
              disabled={isSpending || credits <= 0}
              className="h-8 px-3"
            >
              <Minus className="h-3 w-3 mr-1" />
              {isSpending ? t('spending') : t('spendCredits')}
            </Button>
            
            {/* 重置按钮 */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetCredits}
              disabled={isResetting}
              className="h-8 px-3"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              {isResetting ? t('resetting') : t('reset')}
            </Button>
          </div>
          
          {/* 分隔线 */}
          <div className="h-6 w-px bg-border" />
          
          {/* 用户头像和信息 */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {getUserDisplayName()}
              </p>
              <p className="text-xs text-muted-foreground">
                {user?.email}
              </p>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage 
                src={user?.user_metadata?.avatar_url} 
                alt={getUserDisplayName()} 
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-medium">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  )
} 