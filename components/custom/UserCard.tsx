import Image from "next/image";
import { ExternalLink } from "lucide-react";

import styles from "./userCard.module.css";

interface UserCardProps {
  avatar: string;
  username: string;
  nickname: string;
  category?: string;
  extraTag?: string;
}

export function UserCard({
  avatar,
  username,
  nickname,
  category,
  extraTag,
}: UserCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.userInfo}>
          <div className={styles.avatarContainer}>
            <Image
              src={avatar}
              alt={username}
              width={60}
              height={60}
              className={styles.avatar}
            />
          </div>
          <div className={styles.userDetails}>
            <div className={styles.username}>{username}</div>
            <div className={styles.nickname}>{nickname}</div>
          </div>
        </div>
      </div>
      <div className={styles.cardFooter}>
        {category && <div className={styles.category}>{category}领域大神</div>}
        {extraTag && <div className={styles.extraTag}>{extraTag}</div>}
        <a
          className={styles.linkButton}
          href={`https://tieba.baidu.com/home/main?id=${avatar}`}
          target="_blank"
        >
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}

interface UserCardSimpleProps {
  avatar: string;
  username: string;
  nickname: string;
}

export function UserCardSimple({ avatar, username, nickname }: UserCardSimpleProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.userInfo}>
          <div className={styles.avatarContainer}>
            <Image
              src={`http://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/${avatar}`}
              alt={username}
              width={60}
              height={60}
              className={styles.avatar}
            />
          </div>
          <div className={styles.userDetails}>
            <div className={styles.username}>{username}</div>
            <div className={styles.nickname}>{nickname}</div>
          </div>
        </div>
        <a
          className={styles.linkButton}
          href={`https://tieba.baidu.com/home/main?id=${avatar}`}
          target="_blank"
        >
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
