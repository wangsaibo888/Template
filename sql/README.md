# Supabase 积分系统数据库设置

## 📋 执行顺序

在 Supabase Dashboard 的 SQL 编辑器中，请按照以下顺序执行SQL文件：

### 1. 执行用户积分表 (必须先执行)
```sql
-- 文件: sql/public.user_credits.sql
-- 包含: 表创建、触发器、函数、安全策略
```

### 2. 执行积分变动记录表
```sql
-- 文件: sql/public.credit_transactions.sql  
-- 包含: 表创建、触发器、函数、安全策略
```

## 🔧 系统功能说明

### 自动化功能
- ✅ **用户注册时自动获得5个积分**
- ✅ **积分变动时自动更新用户余额**
- ✅ **自动记录所有积分变动历史**
- ✅ **自动更新时间戳**

### 安全策略
- 🔒 **行级安全 (RLS)** - 用户只能查看自己的数据
- 🔒 **权限控制** - 防止用户直接修改积分余额
- 🔒 **数据完整性** - 确保积分变动逻辑正确

### 业务函数

#### 1. 消耗积分
```sql
SELECT spend_credits(
  3,                    -- 消耗数量
  '购买商品',            -- 描述
  'product-uuid',       -- 关联ID (可选)
  '{"product_id": 123}' -- 元数据 (可选)
);
```

#### 2. 获得积分
```sql
SELECT earn_credits(
  10,                   -- 获得数量
  '完成任务',            -- 描述
  'task-uuid',          -- 关联ID (可选)
  '{"task_id": 456}'    -- 元数据 (可选)
);
```

#### 3. 查询当前积分
```sql
SELECT * FROM get_user_credits();
```

#### 4. 查询积分历史
```sql
-- 获取最近20条记录
SELECT * FROM get_credit_history();

-- 获取第2页，每页10条
SELECT * FROM get_credit_history(10, 10);

-- 只查看消耗记录
SELECT * FROM get_credit_history(20, 0, 'spend');
```

## 📊 表结构详解

### user_credits 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| user_id | UUID | 关联 auth.users |
| email | TEXT | 用户邮箱 |
| current_credits | INTEGER | 当前积分余额 |
| total_earned_credits | INTEGER | 累计获得积分 |
| total_spent_credits | INTEGER | 累计消耗积分 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### credit_transactions 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| user_id | UUID | 关联 auth.users |
| transaction_type | TEXT | 交易类型 (earn/spend/refund/bonus/penalty) |
| amount | INTEGER | 变动数量 |
| balance_before | INTEGER | 变动前余额 |
| balance_after | INTEGER | 变动后余额 |
| description | TEXT | 描述 |
| reference_id | UUID | 关联业务ID |
| metadata | JSONB | 额外数据 |
| created_at | TIMESTAMP | 创建时间 |

## 🧪 测试功能

执行完SQL后，您可以：

1. **注册新用户** - 自动获得5个积分
2. **在应用中调用积分函数** - 测试消耗和获得积分
3. **查看积分变动历史** - 确认记录正确
4. **测试安全策略** - 确认用户只能查看自己的数据

## ⚠️ 注意事项

1. **执行顺序很重要** - 必须先执行 user_credits.sql
2. **备份数据** - 在生产环境执行前请备份
3. **测试环境** - 建议先在测试环境验证功能
4. **权限检查** - 确认RLS策略按预期工作

## 🔗 与前端集成

前端可以通过以下方式调用：

```typescript
// 消耗积分
const { data, error } = await supabase.rpc('spend_credits', {
  spend_amount: 3,
  spend_description: '购买商品'
});

// 获得积分  
const { data, error } = await supabase.rpc('earn_credits', {
  earn_amount: 10,
  earn_description: '完成任务'
});

// 查询积分
const { data, error } = await supabase.rpc('get_user_credits');

// 查询历史
const { data, error } = await supabase.rpc('get_credit_history', {
  page_size: 10,
  page_offset: 0
});
``` 