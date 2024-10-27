import { MenuDataItem } from "@ant-design/pro-layout";
import React from "react";
import { CrownOutlined } from "@ant-design/icons";
import AccessEnum from "@/access/accessEnum";

export const menus = [
  {
    path: "/",
    name: "首页",
  },
  {
    path: "/user",
    name: "用户",
    hideInMenu: true,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        hideInMenu: true,
      },
      {
        path: "/user/register",
        name: "用户注册",
        hideInMenu: true,
      },
    ],
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    path: "/banks",
    name: "题库",
    access: AccessEnum.USER,
  },
  {
    path: "/admin",
    name: "管理",
    access: AccessEnum.ADMIN,
    icon: <CrownOutlined />,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
        access: AccessEnum.ADMIN,
      },
    ],
  },
] as MenuDataItem[];
export const findAllMenuByPath = (path: string): MenuDataItem | null => {
  return findMenuByPath(menus, path);
};
export const findMenuByPath = (
  menuItems: MenuDataItem[],
  path: string,
): MenuDataItem | null => {
  for (const menuItem of menuItems) {
    if (menuItem.path === path) {
      return menuItem;
    }
    if (menuItem.children) {
      const childMenu = findMenuByPath(menuItem.children, path);
      if (childMenu) return childMenu;
    }
  }
  return null;
};
