import './TechItem.css'
import React from "react";

function TechItem({svg, name, href}: { svg: React.ReactNode, name: string, href: string }) {
  return (
    <a href={href} target="_blank" className="tech-item">
      <div className="tech-item-icon">
        {svg}
      </div>
      <div className="tech-item-name">
        <p>{name}</p>
        <span>➜</span>
      </div>
    </a>
  )
}

export default TechItem;
