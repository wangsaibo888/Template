/**
 * 定价页面组件
 * 展示产品的定价方案
 */
export default function PricingPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12 items-center">
      <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
        <h1 className="font-bold text-2xl">定价方案</h1>
      </div>
      <div className="flex flex-col gap-2 items-center text-center max-w-lg">
        <h2 className="font-bold text-xl mb-4">即将推出</h2>
        <p className="text-muted-foreground">
          我们正在准备灵活的定价方案，以满足不同规模项目的需求。
          敬请期待！
        </p>
      </div>
    </div>
  );
} 