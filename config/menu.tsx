import { MenuDataItem } from "@ant-design/pro-layout";
import React from "react";
import { CrownOutlined } from "@ant-design/icons";

export const menus = [
  {
    path: "/",
    name: "首页",
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    path: "/admin",
    name: "管理",
    icon: <CrownOutlined />,
    children: [
      {
        path: "/admin/users",
        name: "用户管理",
      },
    ],
  },
] as MenuDataItem[];
