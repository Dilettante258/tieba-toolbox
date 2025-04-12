import NoData from "@custom/NoData";
import { RequestProps2 } from "@type/common";
import { FanRes } from "@type/User";
import { getData } from "@utils/constants";
import styles from "./FollowList.module.css";
import { UserCard, UserCardSimple } from "./UserCard";

async function getFanData({ method, id }: RequestProps2): Promise<FanRes> {
  return await getData("/user/fan", { method, id, page: "needAll" });
}

export default async function FanList({ method, id }: RequestProps2) {
  const data = await getFanData({ method, id }).then((d) => d.user_list);

  if (Array.isArray(data) && data.length > 0) {
    const brilliantList = data.filter(
      (item) =>
        Object.keys(item?.new_god_data ?? {}).length > 0 ||
        Object.keys(item.bazhu_grade ?? {}).length > 0
    );
    return (
      <div className={styles.followListWrapper}>
        <h3>名人(吧务、领域大神)：</h3>
        <div className={styles.followList}>
          {brilliantList.length > 0 ? (
            brilliantList.map((userItem, index: number) => (
              <UserCard
                key={index}
                avatar={
                  "http://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/" +
                  userItem.portrait
                }
                username={userItem.name}
                nickname={userItem.name_show}
                category={userItem.new_god_data?.field_name ?? ""}
                extraTag={userItem.bazhu_grade?.desc}
              />
            ))
          ) : (
            <p className="text-left w-3/4">无</p>
          )}
        </div>
        <h3>
          整体数据（按关注时间排序）：
          <span className="text-sm">共有{data.length}人</span>
        </h3>
        <div className={styles.followList}>
          {data.map((userItem, index: number) => (
            <UserCardSimple
              key={index}
              avatar={userItem.portrait}
              username={userItem.name}
              nickname={userItem.name_show}
            />
          ))}
        </div>
      </div>
    );
  } else return <NoData />;
}
