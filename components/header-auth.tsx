import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

/**
 * 头部认证按钮组件
 * 根据用户登录状态和环境变量配置显示不同的UI：
 * - 如果环境变量未配置：显示配置提示和禁用的按钮
 * - 如果用户已登录：显示用户邮箱和登出按钮
 * - 如果用户未登录：显示登录和注册按钮
 */
export default async function AuthButton() {
  const supabase = await createClient();

  // 获取当前用户信息
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 如果环境变量未配置，显示配置提示
  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            {/* 环境变量配置提示徽章 */}
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            {/* 禁用状态的登录按钮 */}
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            {/* 禁用状态的注册按钮 */}
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  
  // 根据用户登录状态渲染不同的UI
  return user ? (
    // 用户已登录时的UI
    <div className="flex items-center gap-4">
      Hey, {user.email}! {/* 显示用户邮箱 */}
      {/* 登出表单 */}
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    // 用户未登录时的UI
    <div className="flex gap-2">
      {/* 登录按钮 */}
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      {/* 注册按钮 */}
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
