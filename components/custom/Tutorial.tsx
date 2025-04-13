import styles from "./Tutorial.module.css";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { BorderedTabs } from "./tabs";
import { Fragment } from "react";

function Tutorial() {
  const tabs = [
    {
      label: "UID",
      content: (
        <Fragment>
          <Image src="/tutorial1.png" alt="uid" height={270} width={334} />
          <p>
            百度贴吧手机端用户个人主页uid，可直接复制，是获取最简单的身份标识。复制格式如
            <code>
              @🎀Admire😈@给你分享了贴吧号#3364447105#整段复制后打开贴吧即可找到Ta
            </code>
          </p>
        </Fragment>
      ),
    },
    {
      label: "ID",
      content: (
        <Fragment>
          <span>
            <pre>
              <code className={styles.languageJson}>
                <span className="line">
                  <span className="style1">&#123;</span>
                </span>
                <span className="line">
                  <span className="style2">
                    &nbsp;&nbsp;&nbsp;&nbsp;&#34;tbs&#34;
                  </span>
                  <span className="style1">:&nbsp;</span>
                  <span className="style3">&#34;a906665dd7a0c1c7&#34;</span>
                  <span className="style1">,</span>
                </span>
                <span className="line">
                  <span className="style2">
                    &nbsp;&nbsp;&nbsp;&nbsp;&#34;raw_name&#34;
                  </span>
                  <span className="style1">:&nbsp;</span>
                  <span className="style3">&#34;Admire_02&#34;</span>
                  <span className="style1">,</span>
                </span>
                <span className="line">
                  <span className="style2">
                    &nbsp;&nbsp;&nbsp;&nbsp;&#34;id&#34;
                  </span>
                  <span className="style1">:&nbsp;</span>
                  <span className="style4">5991323492</span>
                  <span className="style1">,</span>
                </span>
                <span className="line">
                  <span className="style2">
                    &nbsp;&nbsp;&nbsp;&nbsp;&#34;creator&#34;
                  </span>
                  <span className="style1">:&nbsp;</span>
                  <span className="style5">……</span>
                </span>
                <span className="line">
                  <span className="style1">&#125;</span>
                </span>
              </code>
            </pre>
          </span>

          <p>
            百度贴吧内部数据存储时通用的数字身份标识，不可直接获得，但是具有唯一性并可直接定位。广泛运用在在各接口中。
          </p>
        </Fragment>
      ),
    },
    {
      label: "用户名",
      content: (
        <Fragment>
          <Image src="/tutorial2.png" alt="uid" height={270} width={334} />
          <p>
            传统的身份标识，不可更改且唯一。但是19年时通过手机号快速注册的用户将没有百度用户名（空字符串）。有一定的获取难度。
          </p>
        </Fragment>
      ),
    },
  ];

  return (
    <div className={styles.tutorial}>
      <p className={styles.tutorialDescription}>
        <ChevronDown />
        一个百度账号有多种身份标识，本工具箱支持三种标识：
      </p>
      <BorderedTabs tabs={tabs} />
    </div>
  );
}

export default Tutorial;
