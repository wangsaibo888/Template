import { Hero7 } from "@/components/ui/modern-hero"; // 现代化Hero组件
import { Faq3 } from "@/components/ui/faq3"; // FAQ组件

/**
 * 应用主页组件
 * 展示现代化的Hero区域和常见问题解答
 */
export default async function Home() {
  return (
    <>
      {/* 现代化Hero区域 */}
      <Hero7 />
      
      {/* 常见问题解答区域 */}
      <Faq3 />
    </>
  );
} 