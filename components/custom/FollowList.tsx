import styles from './FollowList.module.css'
import {RequestProps2} from "@type/common";
import Image from "next/image";
import {getData} from "@utils/constants";
import {FollowRes} from "@type/User";
import { Info, Link as LinkIcon } from 'lucide-react';
import NoData from "@custom/NoData";
import clsx from "clsx";


async function getFollowData({method,id}: RequestProps2):Promise<FollowRes> {
  return await getData('/user/follow', {method, id, page: 'needAll'});
}


export default async function FollowList({method,id}: RequestProps2) {
  const data = await getFollowData({method,id}).then(d=>d.follow_list);

  if (Array.isArray(data)&&data.length>0) {
    const brilliantList = data.filter((item) => Object.keys(item.new_god_data??{}).length>0);
    return (
      <div className={styles.followListWrapper}>
        <h3>
          名人(吧务、领域大神)：
        </h3>
        <div className={styles.followList}>
          { brilliantList.length > 0 ?
            brilliantList.map((userItem, index: number) => (
              <div key={index} className={clsx(styles.userItem, styles.userItemSpec)}>
                <Image src={"http://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/"+userItem.portrait} alt={""} width={80} height={80} />
                <p className={styles.userItemName}>{userItem.name??userItem.name_show}</p>
                <p className={styles.userItemNameShow}>{userItem.name_show}</p>
                <a href={`https://tieba.baidu.com/home/main?id=${userItem.portrait}`} target="_blank" className={styles.userItemLink}><LinkIcon size={12} /></a>
                <div className={styles.userItemSpecInfo}>
                  {
                    Boolean(userItem.new_god_data?.field_name) !== Boolean(userItem.bazhu_grade?.desc) && <Info size={12}/>
                  }
                  {
                    Boolean(userItem.new_god_data?.field_name) && <span>{userItem.new_god_data?.field_name+"领域大神"}</span>
                  }
                  {
                    Boolean(userItem.bazhu_grade?.desc) && <span>{userItem.bazhu_grade.desc}</span>
                  }
                </div>
              </div>
            ))
            :
            <p className='text-left w-3/4'>无</p>
          }
        </div>
        <h3>
          整体数据（按关注时间排序）：<span className='text-sm'>共有{data.length}人</span>
        </h3>
        <div className={styles.followList}>
          {data.map((userItem, index: number) => (
            <div key={index} className={styles.userItem}>
              <Image src={"http://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/"+userItem.portrait} alt={""} width={80} height={80} />
              <p className={styles.userItemName}>{userItem.name??userItem.name_show}</p>
              <p className={styles.userItemNameShow}>{userItem.name_show}</p>
              <a href={`https://tieba.baidu.com/home/main?id=${userItem.portrait}`} target="_blank" className={styles.userItemLink}><LinkIcon size={12} /></a>
            </div>
          ))}
        </div>
      </div>
    )
  } else
    return <NoData />
}

