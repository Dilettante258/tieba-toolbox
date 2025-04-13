import styles from './Brand.module.css';
import buttonStyles from './Button.module.css';
import Link from "next/link";
import {ArrowRight, ArrowUpRight, Sparkles} from "lucide-react";
import clsx from "clsx";
function Brand() {
  return (
    <div className={styles.section}>
      <Link href='/about' className={styles.news}>
        <div className={styles.newsTip}>
          <Sparkles size={16}/>
          了解最近更新！
          <ArrowRight size={16}/>
        </div>
        </Link>
      <div className={styles.textContainer}>
        <span>To</span>
        <span>Easy</span>
        <span>贴吧</span>
        <span>工具箱</span>
        <br />
        <span>为</span>
        <span>更</span>
        <span>方便</span>
        <span>调查</span>
        <span>成分</span>
        <span>而生</span>
      </div>
      <div>
        <p className={styles.description}>现代化UI，便捷的操作，丰富的功能，为你带来最好的体验</p>
      </div>
      <div className={styles.btnContainer}>
        <Link href='/about' className={clsx(buttonStyles.solid, buttonStyles.large)}>关于本项目<ArrowRight /></Link>
        <Link href='/help' className={clsx(buttonStyles.bordered, buttonStyles.large)}>阅读文档<ArrowUpRight /></Link>
      </div>
    </div>
  )
}

export default Brand;
