-- 创建积分变动记录表
CREATE TABLE public.credit_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('earn', 'spend', 'refund', 'bonus', 'penalty')),
  amount INTEGER NOT NULL CHECK (amount > 0),
  balance_before INTEGER NOT NULL CHECK (balance_before >= 0),
  balance_after INTEGER NOT NULL CHECK (balance_after >= 0),
  description TEXT,
  reference_id UUID, -- 可以关联其他业务表
  metadata JSONB DEFAULT '{}', -- 存储额外的业务数据
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- 确保积分变动逻辑正确
  CONSTRAINT valid_balance_change CHECK (
    (transaction_type IN ('earn', 'refund', 'bonus') AND balance_after = balance_before + amount) OR
    (transaction_type IN ('spend', 'penalty') AND balance_after = balance_before - amount)
  )
);

-- 创建索引优化查询性能
CREATE INDEX idx_credit_transactions_user_id ON public.credit_transactions(user_id);
CREATE INDEX idx_credit_transactions_created_at ON public.credit_transactions(created_at);
CREATE INDEX idx_credit_transactions_type ON public.credit_transactions(transaction_type);
CREATE INDEX idx_credit_transactions_user_created ON public.credit_transactions(user_id, created_at DESC);

-- ==========================================
-- 触发器函数定义
-- ==========================================

-- 创建积分变动时自动更新用户余额的函数
CREATE OR REPLACE FUNCTION update_user_credits_balance()
RETURNS TRIGGER AS $$
BEGIN
  -- 更新用户积分表中的余额和统计信息
  UPDATE public.user_credits 
  SET 
    current_credits = NEW.balance_after,
    total_earned_credits = total_earned_credits + CASE 
      WHEN NEW.transaction_type IN ('earn', 'refund', 'bonus') THEN NEW.amount 
      ELSE 0 
    END,
    total_spent_credits = total_spent_credits + CASE 
      WHEN NEW.transaction_type IN ('spend', 'penalty') THEN NEW.amount 
      ELSE 0 
    END,
    updated_at = NOW()
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- ==========================================
-- 触发器定义
-- ==========================================

-- 创建触发器，在积分变动时自动更新余额
CREATE TRIGGER on_credit_transaction_created
  AFTER INSERT ON public.credit_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_user_credits_balance();

-- ==========================================
-- 行级安全策略 (RLS)
-- ==========================================

-- 启用行级安全
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

-- 积分变动记录表的安全策略
CREATE POLICY "用户只能查看自己的积分记录" ON public.credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- 系统服务可以插入积分记录（通过服务端API）
CREATE POLICY "系统可以插入积分记录" ON public.credit_transactions
  FOR INSERT WITH CHECK (true);

-- ==========================================
-- 业务函数定义
-- ==========================================

-- 创建消耗积分的函数
CREATE OR REPLACE FUNCTION spend_credits(
  spend_amount INTEGER,
  spend_description TEXT DEFAULT '积分消耗',
  reference_id UUID DEFAULT NULL,
  metadata_json JSONB DEFAULT '{}'
)
RETURNS BOOLEAN AS $$
DECLARE
  current_balance INTEGER;
  user_uuid UUID;
BEGIN
  -- 获取当前用户ID
  user_uuid := auth.uid();
  
  -- 检查用户是否登录
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION '用户未登录';
  END IF;
  
  -- 检查消耗数量是否有效
  IF spend_amount <= 0 THEN
    RAISE EXCEPTION '消耗数量必须大于0';
  END IF;
  
  -- 获取当前积分余额
  SELECT current_credits INTO current_balance
  FROM public.user_credits
  WHERE user_id = user_uuid;
  
  -- 检查用户积分记录是否存在
  IF current_balance IS NULL THEN
    RAISE EXCEPTION '用户积分记录不存在';
  END IF;
  
  -- 检查余额是否足够
  IF current_balance < spend_amount THEN
    RAISE EXCEPTION '积分余额不足，当前余额: %, 需要: %', current_balance, spend_amount;
  END IF;
  
  -- 插入积分变动记录
  INSERT INTO public.credit_transactions (
    user_id,
    transaction_type,
    amount,
    balance_before,
    balance_after,
    description,
    reference_id,
    metadata
  ) VALUES (
    user_uuid,
    'spend',
    spend_amount,
    current_balance,
    current_balance - spend_amount,
    spend_description,
    reference_id,
    metadata_json
  );
  
  RETURN TRUE;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- 创建增加积分的函数
CREATE OR REPLACE FUNCTION earn_credits(
  earn_amount INTEGER,
  earn_description TEXT DEFAULT '积分获得',
  reference_id UUID DEFAULT NULL,
  metadata_json JSONB DEFAULT '{}'
)
RETURNS BOOLEAN AS $$
DECLARE
  current_balance INTEGER;
  user_uuid UUID;
BEGIN
  -- 获取当前用户ID
  user_uuid := auth.uid();
  
  -- 检查用户是否登录
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION '用户未登录';
  END IF;
  
  -- 检查获得数量是否有效
  IF earn_amount <= 0 THEN
    RAISE EXCEPTION '获得数量必须大于0';
  END IF;
  
  -- 获取当前积分余额
  SELECT current_credits INTO current_balance
  FROM public.user_credits
  WHERE user_id = user_uuid;
  
  -- 检查用户积分记录是否存在
  IF current_balance IS NULL THEN
    RAISE EXCEPTION '用户积分记录不存在';
  END IF;
  
  -- 插入积分变动记录
  INSERT INTO public.credit_transactions (
    user_id,
    transaction_type,
    amount,
    balance_before,
    balance_after,
    description,
    reference_id,
    metadata
  ) VALUES (
    user_uuid,
    'earn',
    earn_amount,
    current_balance,
    current_balance + earn_amount,
    earn_description,
    reference_id,
    metadata_json
  );
  
  RETURN TRUE;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- 获取用户积分变动历史
CREATE OR REPLACE FUNCTION get_credit_history(
  page_size INTEGER DEFAULT 20,
  page_offset INTEGER DEFAULT 0,
  filter_type TEXT DEFAULT NULL
)
RETURNS TABLE(
  id UUID,
  transaction_type TEXT,
  amount INTEGER,
  balance_before INTEGER,
  balance_after INTEGER,
  description TEXT,
  reference_id UUID,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
  user_uuid UUID;
BEGIN
  -- 获取当前用户ID
  user_uuid := auth.uid();
  
  -- 检查用户是否登录
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION '用户未登录';
  END IF;
  
  -- 检查分页参数
  IF page_size <= 0 OR page_size > 100 THEN
    RAISE EXCEPTION '每页数量必须在1-100之间';
  END IF;
  
  IF page_offset < 0 THEN
    RAISE EXCEPTION '页面偏移量不能为负数';
  END IF;
  
  RETURN QUERY
  SELECT 
    ct.id,
    ct.transaction_type,
    ct.amount,
    ct.balance_before,
    ct.balance_after,
    ct.description,
    ct.reference_id,
    ct.metadata,
    ct.created_at
  FROM public.credit_transactions ct
  WHERE ct.user_id = user_uuid
    AND (filter_type IS NULL OR ct.transaction_type = filter_type)
  ORDER BY ct.created_at DESC
  LIMIT page_size
  OFFSET page_offset;
END;
$$ language 'plpgsql' SECURITY DEFINER;