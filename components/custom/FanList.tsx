import './FollowList.css'
import {RequestProps2} from "@type/common";
import Image from "next/image";
import {getData} from "@utils/constants";
import {FanRes, FollowRes} from "@type/User";
import { Info, Link as LinkIcon } from 'lucide-react';
import NoData from "@custom/NoData";

async function getFanData({method,id}: RequestProps2):Promise<FanRes> {
  return await getData('/user/fan', {method, id, page: 'needAll'});
}

export default async function FanList({method,id}: RequestProps2) {
  const data = await getFanData({method,id}).then(d=>d.user_list);

  if (Array.isArray(data)&&data.length>0) {
    const brilliantList = data.filter((item) => (
      Object.keys(item?.new_god_data??{}).length>0 ||
      Object.keys(item.bazhu_grade??{}).length>0
      )
    );
    return (
      <div className='follow-list-wrapper'>
        <h3>
          名人(吧务、领域大神)：
        </h3>
        <div className="follow-list">
          { brilliantList.length > 0 ?
            brilliantList.map((userItem, index: number) => (
              <div key={index} className="user-item user-item-spec">
                <Image src={"http://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/"+userItem.portrait} alt={""} width={80} height={80} />
                <p className="user-item-name">{userItem.name??userItem.name_show}</p>
                <p className="user-item-name_show">{userItem.name_show}</p>
                <a href={`https://tieba.baidu.com/home/main?id=${userItem.portrait}`} target="_blank" className='user-item-link'><LinkIcon size={12} /></a>
                <div className='user-item-spec-info'>
                  {
                    Boolean(userItem.new_god_data?.field_name) !== Boolean(userItem.bazhu_grade!==undefined) && <Info size={12}/>
                  }
                  {
                    Boolean(userItem.new_god_data?.field_name) && <span>{userItem.new_god_data?.field_name+"领域大神"}</span>
                  }
                  {
                    Boolean(userItem.bazhu_grade!==undefined) && <span>{userItem!.bazhu_grade!.desc as string}</span>
                  }
                </div>
              </div>
            ))
            :
            <div>无</div>
          }
        </div>
        <h3>
          整体数据（按关注时间排序）：<span className='text-sm'>共有{data.length}人</span>
        </h3>
        <div className="follow-list">
          {data.map((userItem, index: number) => (
            <div key={index} className="user-item">
              <Image src={"http://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/"+userItem.portrait} alt={""} width={80} height={80} />
              <p className="user-item-name">{userItem.name??userItem.name_show}</p>
              <p className="user-item-name_show">{userItem.name_show}</p>
              <a href={`https://tieba.baidu.com/home/main?id=${userItem.portrait}`} target="_blank" className='user-item-link'><LinkIcon size={12} /></a>
            </div>
          ))}
        </div>
      </div>
    )
  } else
    return (
      <NoData />
    )
}

