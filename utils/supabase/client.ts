import { createBrowserClient } from "@supabase/ssr";

/**
 * 创建Supabase浏览器客户端
 * 用于在客户端组件中访问Supabase服务
 * 使用SSR包确保在浏览器环境中正确工作
 * 
 * @returns {SupabaseClient} 配置好的Supabase客户端实例
 */
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // Supabase项目URL
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Supabase匿名访问密钥
  );
