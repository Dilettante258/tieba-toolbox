import clsx from "clsx";
import styles from "./Skeleton.module.css";

export function Skeleton({className}:{className?: string}) {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.avatar}></div>
      <div className={styles.text}></div>
      <div className={styles.button}></div>
    </div>
  );
}

export function CardSkeleton({className}:{className?: string}) {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.text}></div>
      <div className={styles.text}></div>
      <div className={styles.text}></div>
    </div>
  );
}
