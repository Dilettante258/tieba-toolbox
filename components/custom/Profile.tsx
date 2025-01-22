import {UserPanel, UserPost} from "@utils/types";
import './Profile.css'
import {AlignVerticalSpaceAround} from "lucide-react";
import {type RequestProps2} from "@type/common";


async function getProfileData({method,id}: RequestProps2):Promise<UserPanel> {
  const res = await fetch(`http://localhost:3001/user/panel?${method}=${id}`)
  return res.json()
}


export default async function Profile({method,id}: RequestProps2) {
  const data = await getProfileData({method,id});

  if (data)
    return (
      <div className="profile-container">
        {data.name}
        {data.show_nickname}
        <div className='basic-info'>
          <h3 className='user-info-title'>基本信息</h3>

          <div>百度ID：{}</div>

          昵称：【🧊】虚环加强阿梓
          吧龄：13.4年
          粉丝数：9550
          发帖量：61990
          回帖数：60984
          主题数：1006
          关注贴吧数：41
          点赞数：164654
          关注数：197
          群组数：3
          T豆数：0
          礼物数：1
          访客数：0
          最后活跃时间：暂不开放

        </div>
        <div className='augment-info'>

        </div>
        <div className='vip-info'>

        </div>
        <div className='vip-info'>

        </div>

      </div>
    )
}

