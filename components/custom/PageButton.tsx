'use client'

import styles from './PageButton.module.css'

function PageButton({page, href} :{page: number, href: string}) {
  return (
    <div className={styles.pageButton}>
      <button className={styles.pgBtn} disabled={page<2} onClick={()=>location.replace(`${href}/${page-1}`)}>上一页</button>
      <button className={styles.pgBtn} onClick={()=>location.replace(`${href}/${page+1}`)}>下一页</button>
    </div>
  )
}

export default PageButton;
