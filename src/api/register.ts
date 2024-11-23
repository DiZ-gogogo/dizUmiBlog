import { User } from '@/api/types/user';
import supabase, {
  fetchDataFromTable,
  handleError,
  responseHandler,
} from '@/prisma/supabase';
import { UmiApiRequest, UmiApiResponse } from 'umi';

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  try {
    const { nickname, password } = req.query;

    console.log(nickname, password);

    // 验证必要字段
    if (!nickname && !password) {
      return responseHandler(res, 4000, {}, '昵称和密码不能为空');
    }

    const tableName = 'user';
    const existingUsers: User[] = await fetchDataFromTable(tableName);

    // 检查用户名是否已存在
    const isNicknameExist = existingUsers.some(
      (user) => user.nickname === nickname,
    );
    if (isNicknameExist) {
      return responseHandler(res, 4001, {}, '用户名已存在');
    }

    // 创建新用户
    const newUser = {
      nickname,
      password,
      created_at: Date.now(),
      is_admin: 0,
      avater: null,
      uuid: crypto.randomUUID(), // 生成唯一UUID
    };

    // 插入数据到 Supabase
    const { data, error } = await supabase.from(tableName).insert([newUser]);

    if (error) {
      return responseHandler(res, 5000, {}, '注册失败');
    }

    // 返回成功响应，移除密码字段
    return responseHandler(res, 2000, data, '注册成功');
  } catch (err) {
    return handleError(err, res);
  }
}
