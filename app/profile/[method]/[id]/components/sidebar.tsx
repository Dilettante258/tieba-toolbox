import type { ProfileUserData } from "@/utils/getUserData";
import styles from "./sidebar.module.css";
import Image from "next/image";
import { Female, Male } from "@/components/custom/Profile";
import { Fragment } from "react";

export default function SidebarProfileCard(data: ProfileUserData) {
  const { profile, avatar, avatarTime, vip, manager } = data;

  return (
    <div className={styles.card}>
      <div className={styles.sidebar}>
        <div className={styles.avatarSection}>
          <Image
            src={avatar}
            alt="用户头像"
            width={140}
            height={140}
            className={styles.avatar}
          />
        </div>

        <div className={styles.userInfo}>
          <h2 className={styles.username}>{profile.name}</h2>
          <div className={styles.userMeta}>
            <span className={styles.gender}>
              {profile.sex === 1 ? <Male /> : <Female />}
            </span>
            <span>{profile.tbAge}年</span>
          </div>
        </div>

        <div className={styles.quickStats}>
          <div className={styles.statItem}>
            <div>{profile.fan}</div>
            <div>粉丝</div>
          </div>
          <div className={styles.statItem}>
            <div>{profile.follow}</div>
            <div>关注</div>
          </div>
        </div>

        {vip && (
          <div className={styles.memberBadge}>
            <div>LV {profile.vip.level}</div>
            <div>会员类型: {profile.vip.status}</div>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>基本信息</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span>百度ID</span>
              <span>{profile.id}</span>
            </div>
            <div className={styles.infoItem}>
              <span>主页UID</span>
              <span>{profile.uid}</span>
            </div>
            <div className={styles.infoItem}>
              <span>昵称</span>
              <span>{profile.nickname}</span>
            </div>
            <div className={styles.infoItem}>
              <span>吧龄</span>
              <span>{profile.tbAge}年</span>
            </div>
            <div className={styles.infoItem}>
              <span>回帖数</span>
              <span>{profile.postNum}</span>
            </div>
            <div className={styles.infoItem}>
              <span>点赞数</span>
              <span>{profile.totalAgreeNum}</span>
            </div>
          </div>
        </div>

        {vip && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>会员信息</h3>
            <div className={styles.membershipInfo}>
              <div className={styles.expiryDate}>
                <span>过期时间:</span>
                <span>{vip.vipTime}</span>
                <span className={styles.expiryRemaining}>
                  ({vip.expiredHint})
                </span>
              </div>
            </div>
          </div>
        )}

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>其他信息</h3>
          <div className={styles.otherInfo}>
            <div className={styles.infoItem}>
              <span>头像上传时间</span>
              <span>{avatarTime.toLocaleString()}</span>
            </div>
            {manager && (
              <div className={styles.infoItem}>
                {manager.map((item) => (
                  <Fragment key={item.name}>
                    <span className={styles.footerLabel}>{item.name}</span>
                    <span className={styles.footerValue}>
                      {item.list.join(", ")}
                    </span>
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
