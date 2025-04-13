import type { CondenseProfile, Manager } from '@utils/types';
import type { RequestProps2 } from '@type/common';
import { getData } from '@utils/constants';
import { type ErrorRes, isErrorData } from '@utils/typeTools';

export interface ProfileUserData {
  profile: CondenseProfile;
  avatar: string;
  avatarTime: Date;
  vip?: {
    vipTime: string;
    expiredHint: string;
  };
  manager?: {
    name: string;
    list: string[];
  }[];
}

export async function getUserData({
  method,
  id,
}: RequestProps2): Promise<ProfileUserData> {
  const data = (await getData('/user/condenseProfile', { method, id })) as
    | CondenseProfile
    | ErrorRes;

  if (!data || isErrorData(data)) {
    throw new Error('获取用户数据失败');
  }

  (data);
  const vipTime = new Date(data.vip.expireTime * 1000);
  const avatar = `http://gss0.baidu.com/7Ls0a8Sm2Q5IlBGlnYG/sys/portraith/item/${data.portrait}`;
  const avatarTime = new Date(
    Number.parseInt(data.portrait.slice(data.portrait.lastIndexOf('=') + 1)) *
      1000,
  );

  const expired: boolean = vipTime < new Date();

  const difference = Math.abs(
    Math.round(
      (new Date().getTime() / 1000 - data.vip.expireTime) / (3600 * 24),
    ),
  );

  const res: ProfileUserData = {
    profile: data,
    avatar,
    avatarTime,
  };

  if (data.vip.level !== "0") {
    Object.assign(res, {
      vip: {
        vipTime: vipTime.toLocaleString(),
        expiredHint: expired
          ? `已过期${difference}天`
          : `还剩余${difference}天`,
      },
    });
  }

  if (Object.keys(data.manager ?? {}).length !== 0) {
    Object.keys(data.manager).map((key) => {
      const name = key === 'manager' ? '吧主' : '小吧主';
      // biome-ignore lint/style/noNonNullAssertion:
      const list = data.manager[key as keyof Manager]!.forum_list;
      res.manager = [...(res.manager ?? []), { name, list }];
    });
  }

  return res;
}
