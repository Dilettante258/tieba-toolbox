import './FollowList.css'
import {RequestProps2} from "@type/common";
import Image from "next/image";
import {getData} from "@utils/constants";
import {FollowRes} from "@type/User";

async function getFollowData({method,id}: RequestProps2):Promise<FollowRes> {
  return await getData('/user/follow', {method, id});
}


export default async function FollowList({method,id}: RequestProps2) {
  const data = await getFollowData({method,id}).then(d=>d.follow_list);

  if (Array.isArray(data))
    return (
      <div className="follow-list">
        {data.map((userItem, index: number) => (
          <div key={index} className="user-item">
            <div>
              <Image src={"http://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/"+userItem.portrait} alt={""} width={80} height={80} />
              <p className="user-item-name">{userItem.name??userItem.name_show}</p>
              <p className="user-item-name_show">{userItem.name_show}</p>
            </div>
            {/*<p>{userItem?.bazhu_grade.toString()}</p>*/}
            {/*<p>{userItem?.new_god_data?.toString()}</p>*/}
            {/*<p>{userItem.has_concerned}</p>*/}
          </div>
        ))}
        {data.filter((item) => item.new_god_data).map((userItem, index: number) => (
          <div key={index} className="user-item">
            <div>
              <Image src={"http://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/"+userItem.portrait} alt={""} width={80} height={80} />
              <p className="user-item-name">{userItem.name??userItem.name_show}</p>
              <p className="user-item-name_show">{userItem.name_show}</p>
            </div>
          </div>
        ))}
      </div>
    )
}

