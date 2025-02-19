import Image from "next/image";

function NoData() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Image src={'/no-data.webp'} alt={'无数据'} width={350} height={350} />
      <p className='text-xl text-gray-600'>无数据！</p>
      <p className='text-[12px] text-gray-600'>请检查输入是否正确!</p>
    </div>
  )
}

export default NoData;
