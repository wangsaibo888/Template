import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

/**
 * FAQ项目的接口定义
 */
interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * FAQ3组件的属性接口
 * 所有属性都是可选的，因为组件提供了默认值
 */
interface Faq3Props {
  heading?: string;
  description?: string;
  items?: FaqItem[];
  supportHeading?: string;
  supportDescription?: string;
  supportButtonText?: string;
  supportButtonUrl?: string;
}

/**
 * 默认FAQ项目数据
 */
const faqItems = [
  {
    id: "faq-1",
    question: "什么是退款政策？",
    answer:
      "您可以在购买后30天内退回任何商品以获得全额退款，前提是商品处于原始状态。",
  },
  {
    id: "faq-2",
    question: "如何跟踪我的订单？",
    answer:
      "订单发货后，您将收到一封包含跟踪号码的邮件。您可以在我们的网站上使用此号码跟踪您的订单。",
  },
  {
    id: "faq-3",
    question: "是否提供国际运输？",
    answer:
      "是的，我们向全球大多数国家运输。运费和配送时间因目的地而异。",
  },
  {
    id: "faq-4",
    question: "下单后可以更改订单吗？",
    answer:
      "您可以在下单后24小时内联系我们的客服团队更改订单。",
  },
  {
    id: "faq-5",
    question: "接受哪些付款方式？",
    answer: "我们接受所有主要信用卡、PayPal和Apple Pay。",
  },
  {
    id: "faq-6",
    question: "如何联系客服？",
    answer:
      "您可以通过邮件support@example.com或拨打电话1-800-123-4567联系我们的客服团队。",
  },
  {
    id: "faq-7",
    question: "批量购买有折扣吗？",
    answer:
      "是的，我们为批量购买提供折扣。请联系我们的销售团队了解更多信息。",
  },
];

/**
 * FAQ3组件
 * 常见问题解答组件，包含折叠式问答列表和客服支持区域
 * 支持自定义问题、标题和支持信息
 */
const Faq3 = ({
  heading = "常见问题解答",
  description = "查找关于我们产品的常见问题答案。找不到您要找的内容？请联系我们的支持团队。",
  items = faqItems,
  supportHeading = "需要更多支持？",
  supportDescription = "我们专业的支持团队随时为您解答任何问题或疑虑。联系我们获得个性化帮助。",
  supportButtonText = "联系客服",
  supportButtonUrl = "/protected", // 指向受保护页面
}: Faq3Props) => {
  return (
    <section className="py-32">
      <div className="container space-y-16">
        {/* FAQ标题和描述 */}
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>
        
        {/* FAQ列表 */}
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {/* 客服支持区域 */}
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-accent p-4 text-center md:rounded-xl md:p-6 lg:p-8">
          {/* 客服头像组 */}
          <div className="relative">
            <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" />
              <AvatarFallback>客服</AvatarFallback>
            </Avatar>
            <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face" />
              <AvatarFallback>客服</AvatarFallback>
            </Avatar>
            <Avatar className="mb-4 size-16 border md:mb-5">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" />
              <AvatarFallback>客服</AvatarFallback>
            </Avatar>
          </div>
          
          {/* 支持信息 */}
          <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
            {supportHeading}
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            {supportDescription}
          </p>
          
          {/* 联系按钮 */}
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto" asChild>
              <a href={supportButtonUrl}>
                {supportButtonText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Faq3 }; 