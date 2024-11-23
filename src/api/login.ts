import { User } from '@/api/types/user';
import {
  fetchDataFromTable,
  handleError,
  responseHandler,
} from '@/prisma/supabase';
import { UmiApiRequest, UmiApiResponse } from 'umi';

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  try {
    // console.log('req.query:', req.query.nickname);
    const tableName = 'user';
    const data: User[] = await fetchDataFromTable(tableName);

    // 判断是否传入了 nickname 和 password 作为查询条件
    if (req.query.nickname && req.query.password) {
      // 根据 nickname 和 password 进行筛选
      const filteredData = data.filter((item: any) => {
        return (
          item.nickname === req.query.nickname &&
          item.password === req.query.password
        );
      });

      // 如果没有找到匹配的用户
      if (filteredData.length === 0) {
        return responseHandler(res, 4000, {}, 'token is invalid');
      }

      // 删除 password 属性后返回结果
      const user = filteredData[0];
      const { password, ...rest } = user; // 移除 password 属性
      console.log(password);

      return responseHandler(res, 2000, rest, 'success');
    } else {
      return responseHandler(res, 4000);
    }
  } catch (err) {
    // 调用封装的错误处理函数
    return handleError(err, res);
  }
}
