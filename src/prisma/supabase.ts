import { createClient } from '@supabase/supabase-js';
import { UmiApiResponse } from 'umi';

// 配置 Supabase 客户端
const supabaseUrl = 'https://qjfhlavwpqapvoyztkaz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZmhsYXZ3cHFhcHZveXp0a2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxNzg4MDEsImV4cCI6MjA0Nzc1NDgwMX0.9_Z8SJtBUZfL9yfM1KmIanMYqyID68KULNUO-ul15bU';
const supabase = createClient(supabaseUrl, supabaseKey);

// 封装查询函数，增加更多查询条件
export async function fetchDataFromTable(
  tableName: string,
  options?: {
    where?: Record<string, any>; // 可选的 where 条件
    limit?: number; // 可选的 limit 限制
    orderBy?: { column: string; ascending?: boolean };
  },
) {
  let query = supabase.from(tableName).select('*');

  // 添加 where 条件
  if (options?.where) {
    query = query.match(options.where);
  }

  // 添加 limit 条件
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  // 添加排序条件
  if (options?.orderBy) {
    const { column, ascending = true } = options.orderBy;
    query = query.order(column, { ascending });
  }

  // 执行查询
  const { data, error } = await query;

  if (error) {
    throw new Error(
      `Error fetching data from table ${tableName}: ${error.message}`,
    );
  }

  return data;
}

// 错误处理函数，封装统一的错误逻辑
export function handleError(err: unknown, res: UmiApiResponse) {
  if (err instanceof Error) {
    console.error('Unexpected error:', err.message);
    return res
      .status(500)
      .json({ error: err.message || 'Internal Server Error' });
  } else {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const responseHandler = (
  res: UmiApiResponse,
  statusCode: number,
  data: any = {},
  message: string = 'Network Error',
) => {
  // 格式化返回的数据
  const response = {
    status: statusCode,
    message: message,
    data: data,
  };

  return res.status(200).json(response);
};

export default supabase;
