import type { ProfileUserData } from "@/utils/getUserData";
import styles from "./colorful.module.css";
import Image from "next/image";
import { Female, Male } from "@/components/custom/Profile";

export default async function ColorfulProfileCard(data: ProfileUserData) {
  const { profile, avatar, avatarTime, vip, manager } = data;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          <Image
            src={avatar}
            alt="用户头像"
            width={120}
            height={120}
            className={styles.avatar}
          />
        </div>
        <div className={styles.userMeta}>
          <h2 className={styles.username}>{profile.name}</h2>
          <div className={styles.userTags}>
            <span className={styles.genderTag} style={{backgroundColor: profile.sex === 1 ? "#77aee9" : "#F8BBD0"}}>
              {profile.sex === 1 ? <Male /> : <Female />}
            </span>
            <span className={styles.scoreTag}>{profile.tbAge}年</span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <div>{profile.fan}</div>
            <div>粉丝</div>
          </div>
          <div className={styles.statItem}>
            <div>{profile.follow}</div>
            <div>关注</div>
          </div>
          <div className={styles.statItem}>
            <div>{profile.postNum}</div>
            <div>回帖</div>
          </div>
          <div className={styles.statItem}>
            <div>{profile.totalAgreeNum}</div>
            <div>获赞量</div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>基本信息</h3>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span>🆔</span>
              <span>百度ID:</span>
              <span>{profile.id}</span>
            </div>
            <div className={styles.infoItem}>
              <span>🔑</span>
              <span>主页UID:</span>
              <span>{profile.uid}</span>
            </div>
            <div className={styles.infoItem}>
              <span>👤</span>
              <span>昵称:</span>
              <span>{profile.nickname}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span>⏱️</span>
              <span>吧龄:</span>
              <span>{profile.tbAge}年</span>
            </div>
            <div className={styles.infoItem}>
              <span>📅</span>
              <span>头像上传:</span>
              <span>
                {avatarTime.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {vip && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>会员信息</h3>
            <div className={styles.membershipInfo}>
              <div className={styles.memberLevel}>
                <span className={styles.levelLabel}>LV</span>
                <span className={styles.levelValue}>{profile.vip.level}</span>
              </div>
              <div className={styles.memberDetails}>
                <div className={styles.memberType}>
                  会员类型: {profile.vip.status}
                </div>
                <div className={styles.expireDate}>
                  过期时间: {vip.vipTime}
                  <span className={styles.remainingDays}>
                    ({vip.expiredHint})
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {manager && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>吧务信息</h3>
            {manager.map((item) => (
              <div className={styles.adminInfo} key={item.name}>
                <span className={styles.adminIcon}>👑</span>
                <span className={styles.adminLabel}>{item.name}:</span>
                <span className={styles.adminValue}>
                  {item.list.join(", ")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
