import Image from "next/image";
import './LandingItem.css'
import Link from "next/link";

function LandingItem() {
  return (
    <div className='landing-item'>
      <Image src={'/itemIcon1.svg'} alt={''} height={56} width={56} />
      <h4>
        查询用户发言
      </h4>
      <p>
        最基础的用户发言查询功能。支持使用ID、UID或用户名进行查询。
      </p>
      <Link href={'/userpost'}>
        <button>
          进入
        </button>
      </Link>
    </div>
  )
}

export default LandingItem;
