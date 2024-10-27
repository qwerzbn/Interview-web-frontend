import React from "react";
import "./index.css";

export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <div
      className="global-footer"
      style={{
        textAlign: "center",
        paddingBlockStart: 12,
      }}
    >
      <div>© {currentYear} 面试大师</div>
      <div>
        <a href="https://github.com/qwerzbn" target="_blank">
          作者： zbn
        </a>
      </div>
    </div>
  );
}
