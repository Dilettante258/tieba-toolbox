import {CondenseProfile, Manager} from "@utils/types";
import styles from './Profile.module.css'
import {type RequestProps2} from "@type/common";

import Image from "next/image";
import {getData} from "@utils/constants";
import { type ErrorRes, isErrorData} from "@utils/typeTools";
import NoData from "@custom/NoData";

async function getProfileData({method,id}: RequestProps2) {
  return await getData('/user/condenseProfile', {method, id}) as CondenseProfile|ErrorRes;
}

const Male = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#37B8D5" viewBox="0 0 256 256" className='mx-auto'>
    <path
      d="M216,32H168a8,8,0,0,0,0,16h28.69L154.62,90.07a80,80,0,1,0,11.31,11.31L208,59.32V88a8,8,0,0,0,16,0V40A8,8,0,0,0,216,32ZM149.24,197.29a64,64,0,1,1,0-90.53A64.1,64.1,0,0,1,149.24,197.29Z"></path>
  </svg>)
}

const Female = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FF7F7F" viewBox="0 0 256 256" className='mx-auto'>
    <path
      d="M208,96a80,80,0,1,0-88,79.6V200H88a8,8,0,0,0,0,16h32v24a8,8,0,0,0,16,0V216h32a8,8,0,0,0,0-16H136V175.6A80.11,80.11,0,0,0,208,96ZM64,96a64,64,0,1,1,64,64A64.07,64.07,0,0,1,64,96Z"></path>
  </svg>)
}

export default async function Profile({method, id}: RequestProps2) {
  const data = await getProfileData({method, id});
  if (data&&!isErrorData(data)){
    const vipTime = new Date(data.vip.expireTime * 1000)
    const avatarTime = new Date(parseInt(data.portrait.slice(data.portrait.lastIndexOf('=')+1))*1000)
    return (
      <div className={styles.container}>
        <Image
          src={`http://gss0.baidu.com/7Ls0a8Sm2Q5IlBGlnYG/sys/portraith/item/${data.portrait}`}
          width={160} height={160}
          alt='' className={styles.userAvatar}/>
        <div className={styles.profileTitle}>
          {data.sex === 1 ? <Male/> : <Female/>}
          <span className={styles.userUname}>{data.name}</span>
          <span className={styles.userTbage}>{data.tbAge}</span>
        </div>

        <div>
          <h3 className={styles.userInfoTitle}>基本信息</h3>
          <div className={styles.userInfoGrid}>
            <div>百度ID：{data.id}</div>
            <div>主页UID：{data.uid}</div>
            <div>昵称：{data.nickname}</div>
            <div>吧龄：{data.tbAge}年</div>
            <div>粉丝数：{data.fan}</div>
            <div>关注数：{data.follow}</div>
            <div>回帖数：{data.postNum}</div>
            <div>点赞数：{data.totalAgreeNum}</div>
            <div className="col-span-2">头像上传时间：{avatarTime.toLocaleString()}</div>
          </div>
        </div>
        {
          data.vip.level!=="0" &&
          (
            <div>
              <h3 className={styles.userInfoTitle}>基本信息</h3>
              <div className={styles.userInfoGrid}>
                <div>会员等级：{data.vip.level}</div>
                <div>会员类型：{data.vip.status}</div>
                <div>过期时间：{vipTime.toLocaleString()}
                  ({
                    vipTime < new Date() ?
                      <span>已过期{Math.round((new Date().getTime()/1000-data.vip.expireTime)/(3600*24))}天</span> :
                      <span>还剩余{Math.round((data.vip.expireTime-new Date().getTime()/1000)/(3600*24))}</span>
                  })
                </div>
              </div>
            </div>
          )
        }
        {
          Object.keys(data.manager??{}).length !== 0 &&
          (
            <div>
              <h3 className={styles.userInfoTitle}>吧务信息</h3>
              <div className={styles.userInfoGrid}>
                {
                  Object.keys(data.manager).map((key) => {
                    return (
                      <div key={key}>
                        {key==="manager"?"吧主":"小吧主"}
                        ：{(data.manager[key as keyof Manager] ?? {})?.forum_list?.[0]}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        }
      </div>
    )
  } else return <NoData/>
}

