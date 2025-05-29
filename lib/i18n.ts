import { LanguageCode } from "@/components/ui/language-switcher"

/**
 * 翻译文本类型定义
 */
export interface Translations {
  // 导航栏
  home: string
  pricing: string
  getStarted: string
  language: string
  
  // 认证页面
  signIn: string
  signUp: string
  email: string
  password: string
  forgotPassword: string
  dontHaveAccount: string
  alreadyHaveAccount: string
  registerNow: string
  loginNow: string
  emailLogin: string
  emailRegister: string
  useGoogleLogin: string
  loggingIn: string
  registering: string
  or: string
  
  // Hero组件
  heroHeading: string
  heroDescription: string
  heroButtonText: string
  heroReviewsText: string
  
  // FAQ组件 
  faqTitle: string
  faqDescription: string
  faqQuestion1: string
  faqAnswer1: string
  faqQuestion2: string
  faqAnswer2: string
  faqQuestion3: string
  faqAnswer3: string
  faqQuestion4: string
  faqAnswer4: string
  faqQuestion5: string
  faqAnswer5: string
  faqQuestion6: string
  faqAnswer6: string
  faqQuestion7: string
  faqAnswer7: string
  
  // 价格页面
  pricingPlans: string
  comingSoon: string
  pricingDescription: string
  
  // TopNav组件
  points: string
  spendCredits: string
  reset: string
  spending: string
  resetting: string
  user: string
  spendCreditSuccess: string
  spendCreditError: string
  resetCreditSuccess: string
  resetCreditError: string
  
  // 设置页面
  accountSettings: string
  manageAccountInfo: string
  personalInfo: string
  viewPersonalInfo: string
  emailAddress: string
  emailCannotModify: string
  userId: string
  accountStatus: string
  verified: string
  unverified: string
  registrationTime: string
  interfaceLanguage: string
  languageAndPreferences: string
  customizeLanguagePreferences: string
  selectPreferredLanguage: string
  timezone: string
  setTimezonePreference: string
  theme: string
  selectDarkOrLightTheme: string
  followSystem: string
  accountActions: string
  logoutCurrentAccount: string
  logout: string
  logoutDescription: string
  
  // 受保护页面 - 仪表板
  dashboard: string
  welcomeBack: string
  dashboardDescription: string
  activeUser: string
  accountVerified: string
  accountVerifiedDescription: string
  currentCredits: string
  totalEarned: string
  totalSpent: string
  monthlyUsage: string
  creditUsageStats: string
  currentPlan: string
  upgradeForMoreFeatures: string
  userInfo: string
  userInfoDescription: string
  lastLogin: string
  emailVerificationStatus: string
  
  // 账单和套餐页面
  billing: string
  billingAndPlans: string
  manageBillingInfo: string
  currentPlanTitle: string
  currentPlanDescription: string
  freePlan: string
  proPlan: string
  enterprisePlan: string
  freeDescription: string
  proDescription: string
  enterpriseDescription: string
  monthlyCredits5: string
  monthlyCredits100: string
  unlimitedCredits: string
  basicFeatures: string
  allFeatures: string
  prioritySupport: string
  dedicatedSupport: string
  recommended: string
  currentPlanBadge: string
  upgradeToProPlan: string
  contactSales: string
  billingHistory: string
  billingHistoryDescription: string
  noBillingRecords: string
  noBillingRecordsDescription: string
  perMonth: string
  
  // 通用
  loading: string
  error: string
  success: string
  cancel: string
  confirm: string
  save: string
  settings: string
}

/**
 * 翻译数据
 */
export const translations: Record<LanguageCode, Translations> = {
  zh: {
    // 导航栏
    home: "首页",
    pricing: "价格",
    getStarted: "开始使用",
    language: "语言",
    
    // 认证页面
    signIn: "登录",
    signUp: "注册",
    email: "邮箱",
    password: "密码",
    forgotPassword: "忘记密码？",
    dontHaveAccount: "还没有账户？",
    alreadyHaveAccount: "已有账户？",
    registerNow: "立即注册",
    loginNow: "立即登录",
    emailLogin: "邮箱登录",
    emailRegister: "邮箱注册",
    useGoogleLogin: "使用 Google 登录",
    loggingIn: "登录中...",
    registering: "注册中...",
    or: "或",
    
    // Hero组件
    heroHeading: "使用 Next.js 和 Supabase 构建应用的最快方式",
    heroDescription: "精心制作的启动器模板，集成了 React、Tailwind 和 Shadcn UI。开发者可以直接复制粘贴这些组件到他们的项目中。",
    heroButtonText: "开始使用",
    heroReviewsText: "来自 200+ 用户评价",
    
    // FAQ组件
    faqTitle: "常见问题",
    faqDescription: "找到您关于我们产品和服务的常见问题答案",
    faqQuestion1: "这个模板包含哪些功能？",
    faqAnswer1: "我们的模板包含完整的用户认证系统、现代化的UI组件、响应式设计、深色模式支持、国际化支持等开箱即用的功能。",
    faqQuestion2: "如何开始使用这个模板？",
    faqAnswer2: "您可以直接克隆我们的GitHub仓库，按照README文档的说明进行配置，几分钟内就能启动您的项目。",
    faqQuestion3: "是否支持自定义主题？",
    faqAnswer3: "是的，我们使用Tailwind CSS和shadcn/ui，您可以轻松自定义颜色、字体和其他样式来匹配您的品牌。",
    faqQuestion4: "支持哪些数据库？",
    faqAnswer4: "默认集成了Supabase，但您也可以轻松切换到其他数据库如PostgreSQL、MySQL或MongoDB。",
    faqQuestion5: "是否提供技术支持？",
    faqAnswer5: "我们提供文档支持和社区论坛。付费用户可以享受优先邮件支持和专业咨询服务。",
    faqQuestion6: "可以用于商业项目吗？",
    faqAnswer6: "是的，我们的许可证允许您在个人和商业项目中使用这个模板，没有任何限制。",
    faqQuestion7: "如何升级到最新版本？",
    faqAnswer7: "我们会定期发布更新，您可以通过Git合并或手动应用补丁来升级到最新版本。",
    
    // 价格页面
    pricingPlans: "定价方案",
    comingSoon: "即将推出",
    pricingDescription: "我们正在准备灵活的定价方案，以满足不同规模项目的需求。敬请期待！",
    
    // TopNav组件
    points: "点",
    spendCredits: "消耗点数",
    reset: "重置",
    spending: "消耗中...",
    resetting: "重置中...",
    user: "用户",
    spendCreditSuccess: "成功消耗1个积分",
    spendCreditError: "消耗积分失败",
    resetCreditSuccess: "积分已重置为5点",
    resetCreditError: "重置积分失败",
    
    // 设置页面
    accountSettings: "账户设置",
    manageAccountInfo: "管理您的账户信息",
    personalInfo: "个人信息",
    viewPersonalInfo: "查看您的个人资料信息",
    emailAddress: "邮箱地址",
    emailCannotModify: "邮箱地址无法修改",
    userId: "用户ID",
    accountStatus: "账户状态",
    verified: "已验证",
    unverified: "未验证",
    registrationTime: "注册时间",
    interfaceLanguage: "界面语言",
    languageAndPreferences: "语言和偏好设置",
    customizeLanguagePreferences: "自定义您的界面语言和使用偏好",
    selectPreferredLanguage: "选择您偏好的界面显示语言",
    timezone: "时区",
    setTimezonePreference: "设置您的时区偏好",
    theme: "主题",
    selectDarkOrLightTheme: "选择深色或浅色主题",
    followSystem: "跟随系统",
    accountActions: "账户操作",
    logoutCurrentAccount: "退出当前账户登录",
    logout: "退出登录",
    logoutDescription: "安全退出当前账户，您需要重新登录才能访问",
    
    // 受保护页面 - 仪表板
    dashboard: "控制台",
    welcomeBack: "欢迎回来！",
    dashboardDescription: "这是您的个人仪表板，查看您的账户概览和活动。",
    activeUser: "活跃用户",
    accountVerified: "账户已验证",
    accountVerifiedDescription: "您的账户已成功验证，可以使用所有功能。",
    currentCredits: "当前积分",
    totalEarned: "总获得",
    totalSpent: "总消耗",
    monthlyUsage: "本月使用",
    creditUsageStats: "积分消耗统计",
    currentPlan: "当前套餐",
    upgradeForMoreFeatures: "升级以获得更多功能",
    userInfo: "用户信息",
    userInfoDescription: "您的账户详细信息和配置",
    lastLogin: "最后登录",
    emailVerificationStatus: "邮箱验证状态",
    
    // 账单和套餐页面
    billing: "账单",
    billingAndPlans: "账单与套餐",
    manageBillingInfo: "管理您的订阅和账单信息",
    currentPlanTitle: "当前套餐",
    currentPlanDescription: "您目前使用的套餐详情",
    freePlan: "免费版",
    proPlan: "专业版",
    enterprisePlan: "企业版",
    freeDescription: "适合个人用户尝试",
    proDescription: "适合专业用户",
    enterpriseDescription: "适合团队和企业",
    monthlyCredits5: "每月 5 个点数",
    monthlyCredits100: "每月 100 个点数",
    unlimitedCredits: "无限点数",
    basicFeatures: "基础功能",
    allFeatures: "所有功能",
    prioritySupport: "优先支持",
    dedicatedSupport: "专属支持",
    recommended: "推荐",
    currentPlanBadge: "当前套餐",
    upgradeToProPlan: "升级到专业版",
    contactSales: "联系销售",
    billingHistory: "账单历史",
    billingHistoryDescription: "查看您的付款记录",
    noBillingRecords: "暂无账单记录",
    noBillingRecordsDescription: "升级到付费套餐后，您的账单记录将显示在这里。",
    perMonth: "/月",
    
    // 通用
    loading: "加载中...",
    error: "错误",
    success: "成功",
    cancel: "取消",
    confirm: "确认",
    save: "保存",
    settings: "设置",
  },
  
  en: {
    // 导航栏
    home: "Home",
    pricing: "Pricing",
    getStarted: "Get Started",
    language: "Language",
    
    // 认证页面
    signIn: "Sign In",
    signUp: "Sign Up",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot Password?",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    registerNow: "Register Now",
    loginNow: "Login Now",
    emailLogin: "Email Login",
    emailRegister: "Email Register",
    useGoogleLogin: "Sign in with Google",
    loggingIn: "Signing In...",
    registering: "Registering...",
    or: "or",
    
    // Hero组件
    heroHeading: "The fastest way to build apps with Next.js and Supabase",
    heroDescription: "Beautifully crafted starter template with React, Tailwind, and Shadcn UI. Copy paste components that developers can use directly in their projects.",
    heroButtonText: "Get Started",
    heroReviewsText: "From 200+ user reviews",
    
    // FAQ组件
    faqTitle: "Frequently Asked Questions",
    faqDescription: "Find answers to common questions about our products and services",
    faqQuestion1: "What features are included in this template?",
    faqAnswer1: "Our template includes a complete user authentication system, modern UI components, responsive design, dark mode support, internationalization, and many other out-of-the-box features.",
    faqQuestion2: "How do I get started with this template?",
    faqAnswer2: "You can directly clone our GitHub repository and follow the README documentation for configuration. You can start your project within minutes.",
    faqQuestion3: "Does it support custom themes?",
    faqAnswer3: "Yes, we use Tailwind CSS and shadcn/ui. You can easily customize colors, fonts, and other styles to match your brand.",
    faqQuestion4: "Which databases are supported?",
    faqAnswer4: "Supabase is integrated by default, but you can easily switch to other databases like PostgreSQL, MySQL, or MongoDB.",
    faqQuestion5: "Is technical support provided?",
    faqAnswer5: "We provide documentation support and community forums. Paid users can enjoy priority email support and professional consulting services.",
    faqQuestion6: "Can it be used for commercial projects?",
    faqAnswer6: "Yes, our license allows you to use this template in personal and commercial projects without any restrictions.",
    faqQuestion7: "How do I upgrade to the latest version?",
    faqAnswer7: "We regularly release updates. You can upgrade to the latest version through Git merge or by manually applying patches.",
    
    // 价格页面
    pricingPlans: "Pricing Plans",
    comingSoon: "Coming Soon",
    pricingDescription: "We are preparing flexible pricing plans to meet the needs of different scale projects. Stay tuned!",
    
    // TopNav组件
    points: "pts",
    spendCredits: "Spend Credits",
    reset: "Reset",
    spending: "Spending...",
    resetting: "Resetting...",
    user: "User",
    spendCreditSuccess: "Successfully spent 1 credit",
    spendCreditError: "Failed to spend credit",
    resetCreditSuccess: "Credits reset to 5 points",
    resetCreditError: "Failed to reset credits",
    
    // 设置页面
    accountSettings: "Account Settings",
    manageAccountInfo: "Manage your account information",
    personalInfo: "Personal Information",
    viewPersonalInfo: "View your personal profile information",
    emailAddress: "Email Address",
    emailCannotModify: "Email address cannot be modified",
    userId: "User ID",
    accountStatus: "Account Status",
    verified: "Verified",
    unverified: "Unverified",
    registrationTime: "Registration Time",
    interfaceLanguage: "Interface Language",
    languageAndPreferences: "Language and Preferences",
    customizeLanguagePreferences: "Customize your interface language and usage preferences",
    selectPreferredLanguage: "Select your preferred interface language",
    timezone: "Timezone",
    setTimezonePreference: "Set your timezone preference",
    theme: "Theme",
    selectDarkOrLightTheme: "Select dark or light theme",
    followSystem: "Follow System",
    accountActions: "Account Actions",
    logoutCurrentAccount: "Logout from current account",
    logout: "Logout",
    logoutDescription: "Safely logout from current account, you will need to login again to access",
    
    // 受保护页面 - 仪表板
    dashboard: "Dashboard",
    welcomeBack: "Welcome Back!",
    dashboardDescription: "This is your personal dashboard to view your account overview and activity.",
    activeUser: "Active User",
    accountVerified: "Account Verified",
    accountVerifiedDescription: "Your account has been successfully verified and you can use all features.",
    currentCredits: "Current Credits",
    totalEarned: "Total Earned",
    totalSpent: "Total Spent",
    monthlyUsage: "Monthly Usage",
    creditUsageStats: "Credit Usage Statistics",
    currentPlan: "Current Plan",
    upgradeForMoreFeatures: "Upgrade for more features",
    userInfo: "User Information",
    userInfoDescription: "Your account details and configuration",
    lastLogin: "Last Login",
    emailVerificationStatus: "Email Verification Status",
    
    // 账单和套餐页面
    billing: "Billing",
    billingAndPlans: "Billing & Plans",
    manageBillingInfo: "Manage your subscription and billing information",
    currentPlanTitle: "Current Plan",
    currentPlanDescription: "Details of your current subscription plan",
    freePlan: "Free Plan",
    proPlan: "Pro Plan",
    enterprisePlan: "Enterprise Plan",
    freeDescription: "Perfect for personal users to try",
    proDescription: "Perfect for professional users",
    enterpriseDescription: "Perfect for teams and enterprises",
    monthlyCredits5: "5 credits per month",
    monthlyCredits100: "100 credits per month",
    unlimitedCredits: "Unlimited credits",
    basicFeatures: "Basic features",
    allFeatures: "All features",
    prioritySupport: "Priority support",
    dedicatedSupport: "Dedicated support",
    recommended: "Recommended",
    currentPlanBadge: "Current Plan",
    upgradeToProPlan: "Upgrade to Pro",
    contactSales: "Contact Sales",
    billingHistory: "Billing History",
    billingHistoryDescription: "View your payment records",
    noBillingRecords: "No billing records",
    noBillingRecordsDescription: "After upgrading to a paid plan, your billing records will be displayed here.",
    perMonth: "/month",
    
    // 通用
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    settings: "Settings",
  },
  
  ja: {
    // 导航栏
    home: "ホーム",
    pricing: "料金",
    getStarted: "始める",
    language: "言語",
    
    // 认证页面
    signIn: "サインイン",
    signUp: "サインアップ",
    email: "メール",
    password: "パスワード",
    forgotPassword: "パスワードを忘れた？",
    dontHaveAccount: "アカウントをお持ちでない？",
    alreadyHaveAccount: "既にアカウントをお持ちですか？",
    registerNow: "今すぐ登録",
    loginNow: "今すぐログイン",
    emailLogin: "メールログイン",
    emailRegister: "メール登録",
    useGoogleLogin: "Googleでサインイン",
    loggingIn: "サインイン中...",
    registering: "登録中...",
    or: "または",
    
    // Hero组件
    heroHeading: "Next.jsとSupabaseでアプリを構築する最速の方法",
    heroDescription: "React、Tailwind、Shadcn UIを統合した美しく作られたスターターテンプレート。開発者がプロジェクトで直接使用できるコピーペーストコンポーネント。",
    heroButtonText: "始める",
    heroReviewsText: "200人以上のユーザーレビューから",
    
    // FAQ组件
    faqTitle: "よくある質問",
    faqDescription: "製品やサービスに関するよくある質問の回答をご覧ください",
    faqQuestion1: "このテンプレートにはどのような機能が含まれていますか？",
    faqAnswer1: "完全なユーザー認証システム、モダンなUIコンポーネント、レスポンシブデザイン、ダークモードサポート、国際化対応など、すぐに使える機能が含まれています。",
    faqQuestion2: "このテンプレートを使い始めるには？",
    faqAnswer2: "GitHubリポジトリを直接クローンし、READMEドキュメントの設定手順に従ってください。数分でプロジェクトを開始できます。",
    faqQuestion3: "カスタムテーマはサポートされていますか？",
    faqAnswer3: "はい、Tailwind CSSとshadcn/uiを使用しているため、色、フォント、その他のスタイルを簡単にカスタマイズしてブランドに合わせることができます。",
    faqQuestion4: "どのデータベースがサポートされていますか？",
    faqAnswer4: "デフォルトでSupabaseが統合されていますが、PostgreSQL、MySQL、MongoDBなど他のデータベースに簡単に切り替えることもできます。",
    faqQuestion5: "技術サポートは提供されますか？",
    faqAnswer5: "ドキュメントサポートとコミュニティフォーラムを提供しています。有料ユーザーは優先メールサポートと専門コンサルティングサービスをご利用いただけます。",
    faqQuestion6: "商用プロジェクトで使用できますか？",
    faqAnswer6: "はい、私たちのライセンスでは個人および商用プロジェクトでこのテンプレートを制限なく使用することができます。",
    faqQuestion7: "最新バージョンにアップグレードするには？",
    faqAnswer7: "定期的にアップデートをリリースしています。Gitマージまたは手動でパッチを適用することで最新バージョンにアップグレードできます。",
    
    // 价格页面
    pricingPlans: "料金プラン",
    comingSoon: "近日公開",
    pricingDescription: "さまざまな規模のプロジェクトのニーズに対応する柔軟な料金プランを準備しています。お楽しみに！",
    
    // TopNav组件
    points: "pt",
    spendCredits: "クレジット消費",
    reset: "リセット",
    spending: "消費中...",
    resetting: "リセット中...",
    user: "ユーザー",
    spendCreditSuccess: "1クレジットの消費に成功",
    spendCreditError: "クレジット消費に失敗",
    resetCreditSuccess: "クレジットを5ポイントにリセット",
    resetCreditError: "クレジットリセットに失敗",
    
    // 设置页面
    accountSettings: "アカウント設定",
    manageAccountInfo: "アカウント情報を管理",
    personalInfo: "個人情報",
    viewPersonalInfo: "プロフィール情報を表示",
    emailAddress: "メールアドレス",
    emailCannotModify: "メールアドレスは変更できません",
    userId: "ユーザーID",
    accountStatus: "アカウント状態",
    verified: "認証済み",
    unverified: "未認証",
    registrationTime: "登録日時",
    interfaceLanguage: "インターフェース言語",
    languageAndPreferences: "言語と設定",
    customizeLanguagePreferences: "インターフェース言語と使用設定をカスタマイズ",
    selectPreferredLanguage: "希望するインターフェース言語を選択",
    timezone: "タイムゾーン",
    setTimezonePreference: "タイムゾーンの設定",
    theme: "テーマ",
    selectDarkOrLightTheme: "ダークまたはライトテーマを選択",
    followSystem: "システムに従う",
    accountActions: "アカウント操作",
    logoutCurrentAccount: "現在のアカウントからログアウト",
    logout: "ログアウト",
    logoutDescription: "現在のアカウントから安全にログアウトします。再度アクセスするにはログインが必要です",
    
    // 受保护页面 - 仪表板
    dashboard: "ダッシュボード",
    welcomeBack: "おかえりなさい！",
    dashboardDescription: "あなたの個人ダッシュボードで、アカウント概要とアクティビティを確認できます。",
    activeUser: "アクティブユーザー",
    accountVerified: "アカウント認証済み",
    accountVerifiedDescription: "アカウントが正常に認証され、すべての機能を使用できます。",
    currentCredits: "現在のクレジット",
    totalEarned: "総獲得",
    totalSpent: "総消費",
    monthlyUsage: "月間使用量",
    creditUsageStats: "クレジット使用統計",
    currentPlan: "現在のプラン",
    upgradeForMoreFeatures: "アップグレードでより多くの機能を",
    userInfo: "ユーザー情報",
    userInfoDescription: "アカウントの詳細情報と設定",
    lastLogin: "最終ログイン",
    emailVerificationStatus: "メール認証状態",
    
    // 账单和套餐页面
    billing: "請求",
    billingAndPlans: "請求とプラン",
    manageBillingInfo: "サブスクリプションと請求情報を管理",
    currentPlanTitle: "現在のプラン",
    currentPlanDescription: "現在ご利用中のプランの詳細",
    freePlan: "無料プラン",
    proPlan: "プロプラン",
    enterprisePlan: "エンタープライズプラン",
    freeDescription: "個人ユーザーのお試しに最適",
    proDescription: "プロフェッショナルユーザーに最適",
    enterpriseDescription: "チームや企業に最適",
    monthlyCredits5: "月5クレジット",
    monthlyCredits100: "月100クレジット",
    unlimitedCredits: "無制限クレジット",
    basicFeatures: "基本機能",
    allFeatures: "すべての機能",
    prioritySupport: "優先サポート",
    dedicatedSupport: "専用サポート",
    recommended: "おすすめ",
    currentPlanBadge: "現在のプラン",
    upgradeToProPlan: "プロにアップグレード",
    contactSales: "営業に連絡",
    billingHistory: "請求履歴",
    billingHistoryDescription: "お支払い記録を表示",
    noBillingRecords: "請求記録がありません",
    noBillingRecordsDescription: "有料プランにアップグレード後、請求記録がここに表示されます。",
    perMonth: "/月",
    
    // 通用
    loading: "読み込み中...",
    error: "エラー",
    success: "成功",
    cancel: "キャンセル",
    confirm: "確認",
    save: "保存",
    settings: "設定",
  },
}

/**
 * 获取翻译文本的Hook
 */
export function useTranslation(language: LanguageCode = 'zh') {
  const t = (key: keyof Translations): string => {
    return translations[language][key] || translations.zh[key] || key
  }
  
  return { t, translations: translations[language] }
} 