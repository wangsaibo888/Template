# Next.js & Supabase 启动器模板

<div align="center">
  <img alt="Next.js和Supabase启动器套件 - 使用Next.js和Supabase构建应用的最快方式" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
</div>

<p align="center">
 使用 Next.js 和 Supabase 构建应用的最快方式
</p>

## 🌟 特性

- 🚀 **完整的 Next.js 技术栈支持**
  - App Router（应用路由）
  - Pages Router（页面路由）
  - Middleware（中间件）
  - Client Components（客户端组件）
  - Server Components（服务端组件）
  - 开箱即用！

- 🔐 **认证系统**
  - 基于 Cookie 的用户会话管理
  - 用户注册、登录、登出
  - 密码重置功能
  - 路由保护

- 🎨 **现代化 UI**
  - 使用 [Tailwind CSS](https://tailwindcss.com) 进行样式设计
  - 集成 [shadcn/ui](https://ui.shadcn.com/) 组件库
  - 支持明暗主题切换

- ☁️ **一键部署**
  - 集成 Supabase Vercel 部署
  - 环境变量自动配置

## 📁 项目结构

```
Template-main/
├── app/                    # Next.js App Router
│   ├── (auth-pages)/      # 认证相关页面
│   ├── protected/         # 受保护的页面
│   ├── actions.ts         # Server Actions
│   ├── layout.tsx         # 根布局
│   └── page.tsx          # 首页
├── components/            # React 组件
│   ├── ui/               # UI 基础组件
│   ├── header-auth.tsx   # 头部认证组件
│   ├── hero.tsx          # 英雄区组件
│   └── theme-switcher.tsx # 主题切换器
├── utils/                # 工具函数
│   └── supabase/         # Supabase 相关工具
│       ├── client.ts     # 客户端配置
│       ├── server.ts     # 服务端配置
│       └── middleware.ts # 中间件配置
└── middleware.ts         # Next.js 中间件
```

## 🚀 快速开始

### 1. 创建 Supabase 项目

首先在 [Supabase Dashboard](https://database.new) 创建一个新项目。

### 2. 克隆项目

```bash
# 使用 npm
npx create-next-app --example with-supabase my-app

# 使用 yarn  
yarn create next-app --example with-supabase my-app

# 使用 pnpm
pnpm create next-app --example with-supabase my-app
```

### 3. 进入项目目录

```bash
cd my-app
```

### 4. 配置环境变量

将 `.env.example` 重命名为 `.env.local` 并更新以下内容：

```env
NEXT_PUBLIC_SUPABASE_URL=你的_SUPABASE_项目_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_SUPABASE_项目_API_ANON_密钥
```

这两个值可以在 [Supabase 项目的 API 设置](https://app.supabase.com/project/_/settings/api) 中找到。

### 5. 启动开发服务器

```bash
npm run dev
```

项目现在应该在 [localhost:3000](http://localhost:3000/) 上运行。

## 📝 主要功能说明

### 🔐 认证流程

项目实现了完整的用户认证流程：

1. **用户注册** (`/sign-up`) - 用户填写邮箱和密码进行注册
2. **邮箱验证** - 系统发送验证邮件到用户邮箱
3. **用户登录** (`/sign-in`) - 验证用户凭据并建立会话
4. **受保护页面** (`/protected`) - 只有已登录用户可访问
5. **密码重置** (`/forgot-password`) - 发送重置密码邮件
6. **用户登出** - 清除会话并重定向到登录页

### 🔒 路由保护

中间件自动处理路由保护：
- 未登录用户访问 `/protected` 路径会被重定向到登录页
- 已登录用户访问首页会被重定向到受保护页面

### 🎨 主题系统

支持三种主题模式：
- **浅色主题** - 明亮的界面风格
- **深色主题** - 护眼的深色界面
- **系统主题** - 跟随系统设置自动切换

## 🛠️ 技术栈

- **框架**: [Next.js 15](https://nextjs.org/) (App Router)
- **后端服务**: [Supabase](https://supabase.com/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **UI组件**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **图标**: [Lucide React](https://lucide.dev/)
- **主题**: [next-themes](https://github.com/pacocoursey/next-themes)
- **语言**: [TypeScript](https://www.typescriptlang.org/)

## 🔧 配置说明

### Supabase 配置

项目使用 `supabase-ssr` 包来配置 Supabase 认证使用 Cookie，使用户会话在整个 Next.js 应用中可用：
- Client Components（客户端组件）
- Server Components（服务端组件） 
- Route Handlers（路由处理器）
- Server Actions（服务端操作）
- Middleware（中间件）

### 主题配置

如果你想使用不同的 shadcn/ui 样式，可以：
1. 删除 `components.json` 文件
2. [重新安装 shadcn/ui](https://ui.shadcn.com/docs/installation/next)

---

<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Supabase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-supabase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app --example with-supabase with-supabase-app
   ```

   ```bash
   yarn create next-app --example with-supabase with-supabase-app
   ```

   ```bash
   pnpm create next-app --example with-supabase with-supabase-app
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd with-supabase-app
   ```

4. Rename `.env.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

6. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
