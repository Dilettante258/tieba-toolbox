import type { ProfileUserData } from "@/utils/getUserData";
import styles from "./dark.module.css";
import Image from "next/image";
import { Female, Male } from "@/components/custom/Profile";
import { Fragment } from "react";

export default function DarkProfileCard(data: ProfileUserData) {
  const { profile, avatar, avatarTime, vip, manager } = data;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <Image
            src={avatar}
            alt="用户头像"
            width={110}
            height={110}
            className={styles.avatar}
          />
        </div>
        <div className={styles.headerContent}>
          <div className={styles.nameWrapper}>
            <h2 className={styles.username}>{profile.name}</h2>
            <span className={styles.gender} style={{backgroundColor: profile.sex === 1 ? "#77aee9" : "#F8BBD0"}}>
              {profile.sex === 1 ? <Male /> : <Female />}
            </span>
          </div>
          <div className={styles.badgeWrapper}>
            <div className={styles.badge}>
              <span className={styles.badgeValue}>{profile.tbAge}</span>
            </div>
            {vip && (
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>👑</span>
                <span className={styles.badgeLabel}>
                  LV {profile.vip.level}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <div>{profile.fan}</div>
          <div>粉丝</div>
        </div>
        <div className={styles.divider} />
        <div className={styles.statItem}>
          <div>{profile.follow}</div>
          <div>关注</div>
        </div>
        <div className={styles.divider} />
        <div className={styles.statItem}>
          <div>{profile.postNum}</div>
          <div>回帖</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>基本信息</h3>
          <div className={styles.infoTable}>
            <div className={styles.infoRow}>
              <div className={styles.infoCell}>
                <span>百度ID</span>
                <span>{profile.id}</span>
              </div>
              <div className={styles.infoCell}>
                <span>主页UID</span>
                <span>{profile.uid}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoCell}>
                <span>昵称</span>
                <span>{profile.nickname}</span>
              </div>
              <div className={styles.infoCell}>
                <span>吧龄</span>
                <span>{profile.tbAge}年</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoCell}>
                <span>点赞数</span>
                <span>{profile.totalAgreeNum}</span>
              </div>
              <div className={styles.infoCell}>
                <span>会员类型</span>
                <span>{vip ? profile.vip.status : "无"}</span>
              </div>
            </div>
          </div>
        </div>

        {vip && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>会员状态</h3>
            <div className={styles.membershipStatus}>
              <div className={styles.expiryInfo}>
                <div className={styles.expiryDate}>{vip.vipTime}</div>
                <div className={styles.expiryRemaining}>
                  ({vip.expiredHint})
                </div>
              </div>
              <div className={styles.progressWrapper}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <div className={styles.footerItem}>
            <span className={styles.footerLabel}>头像上传时间</span>
            <span className={styles.footerValue}>
              {avatarTime.toLocaleString()}
            </span>
          </div>
          {manager && (
            <div className={styles.footerItem}>
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
  );
}
