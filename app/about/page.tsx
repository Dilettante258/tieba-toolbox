import TechItem from "@custom/TechItem";
import {AdobeSVG, AuthJsSVG, DrizzleSvg, HonoSvg, NextJsSvg, PostgreSQLSVG} from "@custom/Svg";

export default function About() {

  return (
    <div className="typography lg:w-3/5 mx-auto">
      <h1>关于此项目</h1>
      <p>本工具箱开始重写于2024年11月，到2025年3月正式完结。</p>
      <h2>技术栈</h2>

      <div className="stack-list">
        <TechItem svg={<NextJsSvg />} name={"Next.js"} href={"https://nextjs.org/"}/>
        <TechItem svg={<HonoSvg />} name={"Hono"} href={"https://hono.dev/"}/>
        <TechItem svg={<DrizzleSvg />} name={"Drizzle ORM"} href={"https://orm.drizzle.team/"}/>
        <TechItem svg={<PostgreSQLSVG />} name={"PostgreSQL"} href={"https://www.postgresql.org/"}/>
        <TechItem svg={<AdobeSVG />} name={"React Aria"} href={"https://react-spectrum.adobe.com/react-aria/index.html"}/>
        <TechItem svg={<AuthJsSVG />} name={"Auth.js"} href={"https://authjs.dev/"}/>




      </div>






    </div>
  )
}
