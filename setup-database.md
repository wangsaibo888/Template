# 数据库设置指南

## 概述
此项目包含了完整的用户积分系统，需要在 Supabase 数据库中运行相关的 SQL 脚本来创建必要的表和函数。

## 设置步骤

### 1. 登录 Supabase Dashboard
访问 [Supabase Dashboard](https://supabase.com/dashboard) 并登录您的账户。

### 2. 选择您的项目
选择与此应用关联的 Supabase 项目。

### 3. 打开 SQL Editor
在左侧导航栏中，点击 "SQL Editor"。

### 4. 运行 SQL 脚本

按以下顺序运行脚本：

#### 第一步：创建用户积分表
1. 打开 `sql/public.user_credits.sql` 文件
2. 复制所有内容
3. 在 SQL Editor 中粘贴并运行

#### 第二步：创建积分交易记录表
1. 打开 `sql/public.credit_transactions.sql` 文件
2. 复制所有内容
3. 在 SQL Editor 中粘贴并运行

### 5. 验证设置
运行以下查询来验证表已正确创建：

```sql
-- 检查表是否存在
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('user_credits', 'credit_transactions');

-- 检查 RLS 是否启用
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('user_credits', 'credit_transactions');
```

## 功能说明

### 用户积分表 (user_credits)
- 存储每个用户的积分信息
- 包含当前积分、总获得积分、总消耗积分等字段
- 新用户注册时自动获得5个积分

### 积分交易记录表 (credit_transactions)
- 记录所有积分变动历史
- 支持获得、消耗、退款、奖励、惩罚等交易类型
- 包含完整的审计跟踪

### 可用函数
- `spend_credits(amount, description, reference_id, metadata)` - 消耗积分
- `earn_credits(amount, description, reference_id, metadata)` - 获得积分
- `get_credit_history(page_size, page_offset, filter_type)` - 获取积分历史
- `get_user_credits(target_user_id)` - 获取用户积分信息

## 安全特性
- 启用了行级安全 (RLS)
- 用户只能查看和操作自己的积分数据
- 所有积分变动都有完整的审计记录
- 防止积分余额为负数

## 测试功能
登录后，您可以在仪表板顶部看到：
- 当前积分显示
- "消耗点数" 按钮 - 测试消耗1个积分
- "重置" 按钮 - 将积分重置为5点

所有操作都会实时更新页面显示并同步到数据库。 