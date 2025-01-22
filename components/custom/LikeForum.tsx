import {type Grade, type LikeForum, type UserPanel} from "@utils/types";
import './LikeForum.css'
import {AlignVerticalSpaceAround} from "lucide-react";
import {RequestProps2} from "@type/common";
import Image from "next/image";

async function getLikeForum({method,id}: RequestProps2) {
  const res = await fetch(`http://localhost:3001/user/likeForum?${method}=${id}`)
  const temp1 = await res.json() as LikeForum[];
  if(temp1.length === 0) {
    const res2 = await fetch(`http://localhost:3001/user/panel?${method}=${id}`);
    const temp2 = await res2.json() as UserPanel;
    return temp2.honor.grade;
  } else {
    return temp1;
  }
}


export default async function LikeForum({method,id}: RequestProps2) {
  const data = await getLikeForum({method,id});

  if (Array.isArray(data))
    return (
      <div className="forums-list">
        {data.map((forum: LikeForum, index: number) => (
          <div key={index} className="forum-item">
            <Image src={forum.avatar} alt={forum.name} height={100} width={100} className={"forum-avatar shadow-nav"}/>
            <div className='mobile-only mr-auto'>
              <h4 className='forum-name'>{forum.name}</h4>
              <p><span className='forum-level'>{forum.level_id}</span> {forum.level_name}</p>
              <p><span>{forum.cur_score}/{forum.levelup_score}</span></p>
            </div>
            <div className="forum-item-info">
              <div className='pc-only'>
                <h4>{forum.name}</h4>
                <p><span className='forum-level'>{forum.level_id}</span> {forum.level_name}
                  <span className='mx-1'>{forum.cur_score}/{forum.levelup_score}</span></p>
              </div>
              {forum.slogan !== "" && <p className='forum-slogan'>{forum.slogan}</p>
              }
            </div>
          </div>
        ))}
      </div>
    )
  if (data)
    console.log(data)
    return (
      <div className='text-lg'>
        <p>该用户隐藏了关注贴吧，只能通过其他API获得部分关注贴吧。</p>
        {Object.entries(data as { [key: string]: Grade }).map(([key, value]) => (
            <div key={key}>
              <p>吧内等级为<span className='mx-0.5'>{key}级</span>的有<span className='mx-0.5'>{value.count}</span>个，可查询到的有
              </p>
              <ul className="forums-list-2">
                {value.forum_list.map((forum, index) => (
                  <li key={index}>{forum}吧</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    )
}

