import type { ProfileUserData } from "@/utils/getUserData";
import styles from "./minimalist.module.css";
import Image from "next/image";
import { Female, Male } from "@/components/custom/Profile";
import { Fragment } from "react";

export default function MinimalistProfileCard(data: ProfileUserData) {
  const { profile, avatar, avatarTime, vip, manager } = data;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <Image
            src={avatar}
            alt="用户头像"
            width={100}
            height={100}
            className={styles.avatar}
          />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.nameRow}>
            <h2 className={styles.username}>{profile.name}</h2>
            <span
              className={styles.gender}
              style={{
                backgroundColor: profile.sex === 1 ? "#77aee9" : "#F8BBD0",
              }}
            >
              {profile.sex === 1 ? <Male /> : <Female />}
            </span>
          </div>
          <div className={styles.scoreRow}>
            <span>{profile.tbAge}年</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>基本信息</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <span>百度ID</span>
              <span>{profile.id}</span>
            </div>
            <div className={styles.infoRow}>
              <span>主页UID</span>
              <span>{profile.uid}</span>
            </div>
            <div className={styles.infoRow}>
              <span>昵称</span>
              <span>{profile.nickname}</span>
            </div>
            <div className={styles.infoRow}>
              <span>吧龄</span>
              <span>{profile.tbAge}年</span>
            </div>
            <div className={styles.infoRow}>
              <span>粉丝数</span>
              <span>{profile.fan}</span>
            </div>
            <div className={styles.infoRow}>
              <span>关注数</span>
              <span>{profile.follow}</span>
            </div>
            <div className={styles.infoRow}>
              <span>回帖数</span>
              <span>{profile.postNum}</span>
            </div>
            <div className={styles.infoRow}>
              <span>点赞数</span>
              <span>{profile.totalAgreeNum}</span>
            </div>
            <div className={styles.infoRow}>
              <span>头像上传时间</span>
              <span>{avatarTime.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {vip && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>会员信息</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoRow}>
                <span>会员等级</span>
                <span>{profile.vip.level}</span>
              </div>
              <div className={styles.infoRow}>
                <span>会员类型</span>
                <span>{profile.vip.status}</span>
              </div>
              <div className={styles.infoRow}>
                <span>过期时间</span>
                <span>
                  {vip.vipTime}
                  <span className={styles.remaining}>({vip.expiredHint})</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {manager && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>吧务信息</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoRow}>
                {manager.map((item) => (
                  <Fragment key={item.name}>
                    <span>{item.name}</span>
                    <span>{item.list.join(", ")}</span>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
