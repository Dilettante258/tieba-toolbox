'use client'

import './PageButton.css'

function PageButton({page, href} :{page: number, href: string}) {
  return (
    <div className='page-button'>
      <button className='pg-btn' disabled={page<2} onClick={()=>location.replace(`${href}/${page-1}`)}>上一页</button>
      <button className='pg-btn' onClick={()=>location.replace(`${href}/${page+1}`)}>下一页</button>
    </div>
  )
}

export default PageButton;
