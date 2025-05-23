import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * 更新用户会话的中间件函数
 * 处理用户认证状态、会话刷新和路由保护
 * 
 * @param {NextRequest} request - Next.js请求对象
 * @returns {NextResponse} 处理后的响应对象
 */
export const updateSession = async (request: NextRequest) => {
  // 这个try/catch块主要用于交互式教程
  // 连接Supabase后可以自由移除
  try {
    // 创建一个未修改的响应对象
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // 创建Supabase服务端客户端，配置cookie处理
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          // 从请求中获取所有cookie
          getAll() {
            return request.cookies.getAll();
          },
          // 设置cookie到请求和响应中
          setAll(cookiesToSet) {
            // 先设置到请求对象中
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            // 创建新的响应对象
            response = NextResponse.next({
              request,
            });
            // 设置cookie到响应对象中
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // 刷新过期的会话 - 这对Server Components是必需的
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser();

    // 保护受限路由：如果访问/protected路径但用户未登录，重定向到登录页
    if (request.nextUrl.pathname.startsWith("/protected") && user.error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // 如果用户已登录且访问首页，重定向到受保护页面
    if (request.nextUrl.pathname === "/" && !user.error) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }

    return response;
  } catch (e) {
    // 如果到达这里，说明无法创建Supabase客户端！
    // 这通常是因为没有设置环境变量
    // 查看 http://localhost:3000 获取下一步操作指南
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
