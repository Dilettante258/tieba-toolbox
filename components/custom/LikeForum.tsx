import {type Grade, HiddenLikeForum, type LikeForum} from "@utils/types";
import styles from './LikeForum.module.css'
import {RequestProps2} from "@type/common";
import Image from "next/image";
import NoData from "@custom/NoData";
import {getData} from "@utils/constants";
import clsx from "clsx";
import { type ErrorRes, isErrorData} from "@utils/typeTools";

async function getLikeForum({method,id}: RequestProps2) {
  return await getData('/user/likeForum', {method, id}) as LikeForum[]|HiddenLikeForum|ErrorRes;
}


export default async function LikeForum({method,id}: RequestProps2) {
  const data = await getLikeForum({method,id});
  console.log(data)


  if (Array.isArray(data))
    return (
      <div className={styles.forumsList}>
        {data.map((forum: LikeForum, index: number) => (
          <div key={index} className="forumItem">
            <Image src={forum.avatar} alt={forum.name} height={100} width={100} className={clsx(styles.forumAvatar, "shadow-nav")}/>
            <div className='mobile-only mr-auto'>
              <h4 className={styles.forumName}>{forum.name}</h4>
              <p className={styles.forumLevelP}><span className={styles.forumLevel}>{forum.level_id}</span> {forum.level_name}</p>
              <p className={styles.forumLevelP}><span>{forum.cur_score}/{forum.levelup_score}</span></p>
            </div>
            <div className={styles.forumItemInfo}>
              <div className='pc-only'>
                <h4>{forum.name}</h4>
                <p><span className={styles.forumLevel}>{forum.level_id}</span> {forum.level_name}
                  <span className='mx-1'>{forum.cur_score}/{forum.levelup_score}</span></p>
              </div>
              {forum.slogan !== "" && <p className={styles.forumSlogan}>{forum.slogan}</p>
              }
            </div>
          </div>
        ))}
      </div>
    )
  if (data && !isErrorData(data)) {
    return (
      <div className='text-lg'>
        <p>该用户隐藏了关注贴吧，只能通过获得部分关注的贴吧。</p>
        {Object.entries(data.grade as { [key: string]: Grade }).map(([key, value]) => (
          <div key={key}>
            <p>吧内等级为<span className='mx-0.5'>{key}级</span>的有<span className='mx-0.5'>{value.count}</span>个，可查询到的有
            </p>
            <ul className={styles.forumsList2}>
              {value.forum_list.map((forum, index) => (
                <li key={index}>{forum}吧</li>
              ))}
            </ul>
          </div>
        ))}
        {data.plain.length !== 0 &&
            <p>此外关注的贴吧有：{data.plain.map(
              (item) => {
                return (
                  <span className='mx-1 font-bold' key={item}>{item}吧</span>
                )
              }
            )}</p>
        }
      </div>
    )
  }
  else {
    return <NoData />
  }

}

