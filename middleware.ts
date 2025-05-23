import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

/**
 * Next.js中间件函数
 * 在每个请求处理之前运行，用于处理用户认证和会话管理
 * 
 * @param {NextRequest} request - Next.js请求对象
 * @returns {Promise<NextResponse>} 处理后的响应
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// 中间件配置：定义哪些路径需要经过中间件处理
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了以下内容：
     * - _next/static (静态文件)
     * - _next/image (图像优化文件)
     * - favicon.ico (网站图标文件)
     * - 图片文件 - .svg, .png, .jpg, .jpeg, .gif, .webp
     * 可以自由修改此模式以包含更多路径
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
