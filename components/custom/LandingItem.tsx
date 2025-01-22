import Image from "next/image";
import './LandingItem.css'
import Link from "next/link";

function LandingItem({svg, title, desc, href}:{ [key: string]: string }) {
  return (
    <div className='landing-item'>
      <Image src={svg} alt='' height={56} width={56} />
      <h4>{title}</h4>
      <p>{desc}</p>
      <Link href={href}>
        <button>
          进入
        </button>
      </Link>
    </div>
  )
}

export default LandingItem;
