-- 创建用户积分表
CREATE TABLE public.user_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  current_credits INTEGER DEFAULT 5 NOT NULL CHECK (current_credits >= 0),
  total_earned_credits INTEGER DEFAULT 5 NOT NULL,
  total_spent_credits INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- 确保每个用户只有一条记录
  CONSTRAINT unique_user_credits UNIQUE (user_id),
  -- 确保邮箱唯一
  CONSTRAINT unique_email UNIQUE (email)
);

-- 创建索引优化查询性能
CREATE INDEX idx_user_credits_user_id ON public.user_credits(user_id);
CREATE INDEX idx_user_credits_email ON public.user_credits(email);
CREATE INDEX idx_user_credits_updated_at ON public.user_credits(updated_at);

-- ==========================================
-- 触发器函数定义
-- ==========================================

-- 创建更新时间戳函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 创建用户注册时自动初始化积分的函数
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- 在用户积分表中创建记录
  INSERT INTO public.user_credits (user_id, email, current_credits, total_earned_credits)
  VALUES (NEW.id, NEW.email, 5, 5);
  
  -- 在积分变动记录表中记录初始积分
  INSERT INTO public.credit_transactions (
    user_id, 
    transaction_type, 
    amount, 
    balance_before, 
    balance_after, 
    description
  ) VALUES (
    NEW.id, 
    'bonus', 
    5, 
    0, 
    5, 
    '新用户注册奖励'
  );
  
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- ==========================================
-- 触发器定义
-- ==========================================

-- 为用户积分表添加自动更新时间戳触发器
CREATE TRIGGER update_user_credits_updated_at
  BEFORE UPDATE ON public.user_credits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 创建触发器，在用户注册时自动执行
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ==========================================
-- 行级安全策略 (RLS)
-- ==========================================

-- 启用行级安全
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- 用户积分表的安全策略
CREATE POLICY "用户只能查看自己的积分信息" ON public.user_credits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户只能更新自己的积分信息" ON public.user_credits
  FOR UPDATE USING (auth.uid() = user_id);

-- 系统服务可以插入积分记录（通过服务端API）
CREATE POLICY "系统可以插入积分记录" ON public.user_credits
  FOR INSERT WITH CHECK (true);

-- ==========================================
-- 实用查询函数
-- ==========================================

-- 获取用户当前积分信息
CREATE OR REPLACE FUNCTION get_user_credits(target_user_id UUID DEFAULT NULL)
RETURNS TABLE(
  current_credits INTEGER,
  total_earned_credits INTEGER,
  total_spent_credits INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
  user_uuid UUID;
BEGIN
  -- 如果没有指定用户ID，使用当前登录用户
  user_uuid := COALESCE(target_user_id, auth.uid());
  
  -- 检查用户是否登录
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION '用户未登录';
  END IF;
  
  -- 如果查询其他用户，需要检查权限（这里简化为只能查询自己）
  IF target_user_id IS NOT NULL AND target_user_id != auth.uid() THEN
    RAISE EXCEPTION '无权限查询其他用户信息';
  END IF;
  
  RETURN QUERY
  SELECT 
    uc.current_credits,
    uc.total_earned_credits,
    uc.total_spent_credits,
    uc.created_at,
    uc.updated_at
  FROM public.user_credits uc
  WHERE uc.user_id = user_uuid;
END;
$$ language 'plpgsql' SECURITY DEFINER;