import img1 from '../assets/1.jpg';
import {Code} from "@nextui-org/react";

let code = `{
  "tbs": "a906665dd7a0c1c7",
  "raw_name": "Admire_02",
  "id": 5991323492,
  //...
  "creator": {
    "name": "Admire_02",
    "name_show": "Admire_02",
    "show_nickname": "🎀Admire😈",
    "portrait": "tb.1.1e1bb5f8._oTizPuMkZjpdOI6Dr4GDg",
    "id": 5991323492,
    //...
  }
}`;


function Tutorial() {
  return (
    <article>
      <div className="py-3">
        <h1>使用教程</h1>
        <i className="text-default">2024年3月29日更新</i>
      </div>
      <img src={img1} alt="1"/>
      <p>在电脑端，可以使用开发者调试工具获取用户的用户名<Code>username</Code>，这一字段可以真正地定位用户对象。</p>

      查询用户基本信息的一个接口后台返回的数据格式如下：
      <pre className="p-3 bg-slate-800 rounded-2xl mx-5">
        {code}
      </pre>
      <p>这个接口的链接是<Code>tieba.baidu.com/i/sys/user_json?un=【username】&ie=utf-8</Code>，借助这个接口可以定位<Code>id</Code>，
        再将id与其他请求参数打包post到百度的接口，就能获取数据啦！这一步已经帮你们做了。我也更加推荐用<Code>username</Code>去查询数据。</p>
      <p><span className="text-red-500">请注意！</span>百度贴吧手机端个人主页的那个id好像比较特立独行，
        目前我还没有找到用它来定位用户的方法。<span className="text-red-500">所以，不要使用它！</span></p>



    </article>
  )
}

export default Tutorial;