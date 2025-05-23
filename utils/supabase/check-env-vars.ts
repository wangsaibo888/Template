// 环境变量检查工具
// 这个检查可以在生产环境中移除，主要用于教程目的

/**
 * 检查Supabase必需的环境变量是否已配置
 * 包括：
 * - NEXT_PUBLIC_SUPABASE_URL: Supabase项目URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Supabase匿名密钥
 * 
 * @returns {boolean} 如果两个环境变量都存在则返回true，否则返回false
 */
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
