"use client";

// 导入UI组件和图标
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react"; // 主题图标
import { useTheme } from "next-themes"; // 主题管理hook
import { useEffect, useState } from "react";

/**
 * 主题切换器组件
 * 提供浅色、深色和系统主题的切换功能
 * 使用下拉菜单形式展示主题选项
 */
const ThemeSwitcher = () => {
  // 用于避免服务端渲染和客户端渲染不一致的状态
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect 只在客户端运行，确保可以安全显示UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // 在客户端挂载前不渲染任何内容，避免水合错误
  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16; // 图标统一尺寸

  return (
    <DropdownMenu>
      {/* 触发按钮：根据当前主题显示对应图标 */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"sm"}>
          {theme === "light" ? (
            <Sun
              key="light"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : theme === "dark" ? (
            <Moon
              key="dark"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : (
            <Laptop
              key="system"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      {/* 下拉菜单内容：主题选项列表 */}
      <DropdownMenuContent className="w-content" align="start">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => setTheme(e)}
        >
          {/* 浅色主题选项 */}
          <DropdownMenuRadioItem className="flex gap-2" value="light">
            <Sun size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>Light</span>
          </DropdownMenuRadioItem>
          
          {/* 深色主题选项 */}
          <DropdownMenuRadioItem className="flex gap-2" value="dark">
            <Moon size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>Dark</span>
          </DropdownMenuRadioItem>
          
          {/* 系统主题选项（跟随系统设置） */}
          <DropdownMenuRadioItem className="flex gap-2" value="system">
            <Laptop size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
