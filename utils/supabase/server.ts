import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 创建Supabase服务端客户端
 * 用于在服务端组件、API路由和Server Actions中访问Supabase服务
 * 通过cookie管理用户会话状态，确保认证在服务端正确工作
 * 
 * @returns {Promise<SupabaseClient>} 配置好的Supabase服务端客户端实例
 */
export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // Supabase项目URL
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Supabase匿名访问密钥
    {
      cookies: {
        // 获取所有cookie，用于读取用户会话信息
        getAll() {
          return cookieStore.getAll();
        },
        // 设置cookie，用于保存用户会话状态
        setAll(cookiesToSet) {
          try {
            // 遍历设置每个cookie
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // 当从Server Component调用`set`方法时会抛出错误
            // 如果你有middleware刷新用户会话，可以忽略这个错误
          }
        },
      },
    },
  );
};
