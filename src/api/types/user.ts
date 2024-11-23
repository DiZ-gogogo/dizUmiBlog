const handler = {}; // 或者其他占位逻辑
export default handler;

export interface User {
  id: number;
  created_at: number;
  nickname: string;
  avater: string | null; // 更明确的类型定义
  uuid: string; // UUID 应该是字符串
  is_admin: number; // 或者可以用 boolean
  password: string;
}

// 可以添加其他相关的类型定义
export type UserWithoutPassword = Omit<User, 'password'>;

// 用于创建用户的接口
export interface CreateUserDTO {
  nickname: string;
  password: string;
}

// 用于登录的接口
export interface LoginDTO {
  nickname: string;
  password: string;
}
