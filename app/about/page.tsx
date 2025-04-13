import { BadgeInfo, ExternalLink, Icon, Clock } from "lucide-react";
import styles from "./about.module.css";

import { Calendar } from "lucide-react";
import {
  AdobeSVG,
  AuthJsSVG,
  DrizzleSvg,
  HonoSvg,
  PostgreSQLSVG,
} from "@/components/custom/Svg";
import Image from "next/image";

export default function ProjectCards() {
  const technologies = [
    {
      id: "nextjs",
      name: "Next.js",
      category: "前端框架",
      description:
        "React框架，提供服务器端渲染与静态生成功能，优化用户体验和SEO表现。",
      details:
        "在本项目中，我们利用Next.js的App Router架构，实现了高效的页面路由和数据获取。服务器组件的使用减少了客户端JavaScript的体积，提升了首屏加载速度。",
      icon: <Image src="/next.png" alt="Next.js" width={100} height={100} />,
    },
    {
      id: "hono",
      name: "Hono",
      category: "API框架",
      description:
        "轻量级Web框架，专为边缘计算环境设计，提供高性能的API处理能力。",
      details:
        "我们使用Hono处理API请求，其极小的体积和出色的性能使我们能够在云函数上部署关键功能，显著降低了运维成本。",
      icon: <HonoSvg />,
    },
    {
      id: "drizzle",
      name: "Drizzle ORM",
      category: "数据库工具",
      description:
        "TypeScript优先的ORM，提供类型安全的查询构建器，简化数据库操作。",
      details:
        "Drizzle ORM为我们提供了类型安全的数据库操作，消除了运行时错误，并通过其高效的查询生成器优化了数据库性能。",
      icon: <DrizzleSvg />,
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      category: "数据库",
      description:
        "强大的开源关系型数据库系统，提供高级数据类型和强大的扩展能力。",
      details:
        "我们选择PostgreSQL作为主数据库，为应用提供了强大而灵活的数据存储解决方案。",
      icon: <PostgreSQLSVG />,
    },
    {
      id: "reactaria",
      name: "React Aria",
      category: "UI工具库",
      description:
        "无障碍UI原语库，提供可访问性组件钩子，确保应用符合WCAG标准。",
      details:
        "通过React Aria，我们确保了应用的无障碍性，同时其支持module css的无头模式，让该项目中的css含量达到了30%！",
      icon: <AdobeSVG />,
    },
    {
      id: "authjs",
      name: "Auth.js",
      category: "认证解决方案",
      description: "完整的认证方案，支持多种认证提供商，简化用户认证流程开发。",
      details:
        "Auth.js为我们提供了安全、灵活的用户认证系统，支持社交登录、多因素认证和基于角色的访问控制，大大简化了认证流程的开发。",
      icon: <AuthJsSVG />,
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>关于此项目</h1>
            <span className={styles.version}>v0.1.0</span>
          </div>
          <div className={styles.projectInfo}>
            <div className={styles.infoItem}>
              <Calendar />
              <span>开始: 2024年11月</span>
            </div>
            <div className={styles.infoItem}>
              <Clock />
              <span>完成: 2025年3月</span>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.description}>
        <BadgeInfo />
        <p>
          本项目旨在开发一套现代化的Web应用解决方案，集成最新的前端技术和后端架构，
          提供高性能、可扩展的用户体验。项目采用模块化设计，确保系统的可维护性和扩展性。
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>技术栈</h2>
        <div className={styles.techGrid}>
          {technologies.map((tech) => (
            <div key={tech.id} className={styles.techCard}>
              <div className={styles.techHeader}>
                <div className={styles.techIconWrapper}>{tech.icon}</div>
                <div className={styles.techInfo}>
                  <h3 className={styles.techName}>{tech.name}</h3>
                  <span className={styles.techCategory}>{tech.category}</span>
                </div>
              </div>

              <div className={styles.techContent}>
                <div className={styles.separator} />
                <p className={styles.techDescription}>{tech.description}</p>
                <div className={styles.techDetails}>
                  <h4 className={styles.detailsTitle}>项目应用</h4>
                  <p className={styles.detailsText}>{tech.details}</p>
                </div>
                <button className={styles.learnMoreButton}>
                  了解更多
                  <ExternalLink className={styles.externalIcon} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>开发时间线</h2>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDate}>2024年11月</div>
            <div className={styles.timelineContent}>
              <h3 className={styles.timelineTitle}>项目启动</h3>
              <p className={styles.timelineDescription}>
                确定技术栈和项目架构，完成初步需求分析和设计规划
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDate}>2024年12月</div>
            <div className={styles.timelineContent}>
              <h3 className={styles.timelineTitle}>核心功能开发</h3>
              <p className={styles.timelineDescription}>
                实现基础架构和核心功能模块，完成数据库设计和API规范
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDate}>2025年1月</div>
            <div className={styles.timelineContent}>
              <h3 className={styles.timelineTitle}>功能整合与测试</h3>
              <p className={styles.timelineDescription}>
                整合各功能模块，进行系统测试和性能优化
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDate}>2025年2月</div>
            <div className={styles.timelineContent}>
              <h3 className={styles.timelineTitle}>用户测试与反馈</h3>
              <p className={styles.timelineDescription}>
                进行用户测试，收集反馈并进行迭代优化
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDate}>2025年3月</div>
            <div className={styles.timelineContent}>
              <h3 className={styles.timelineTitle}>正式发布</h3>
              <p className={styles.timelineDescription}>
                完成最终优化，准备正式发布和部署
              </p>
            </div>
          </div>
        </div>
      </section>
      <iframe
        src="https://umami-yzbptegx.sealosbja.site/share/h3VAm5GN50MHgPiZ/www.eztb.org"
        className="w-full h-[300px]"
        title="umami"
      />
      <footer className={styles.footer}>
        <p>© 2023-2025 Dilettante258 · 保留所有权利</p>
      </footer>
    </div>
  );
}
