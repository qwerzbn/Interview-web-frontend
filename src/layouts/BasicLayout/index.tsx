"use client";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, message, theme } from "antd";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import { menus } from "../../../config/menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import getMenuAccess from "@/access/menuAccess";
import { userLogoutUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import { DEFAULT_USER } from "@/constants/userConstants";
import "./index.css";
import SearchInput from "@/layouts/BasicLayout/SearchInput";

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("退出登录成功");
      dispatch(setLoginUser(DEFAULT_USER));
      router.push("/user/login");
    } catch (e) {
      message.error("退出登录失败" + e);
    }
  };
  return (
    <div
      id="BasicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        token={{
          sider: {
            colorTextMenu: "rgba(168,61,61,0.85)",
          },
        }}
        layout={"top"}
        title={"面试大师"}
        logo={
          <Image src={"/logo.png"} width={52} height={32} alt={"面试大师"} />
        }
        location={{
          pathname,
        }}
        menu={{
          collapsedShowGroupTitle: true,
        }}
        avatarProps={{
          src: loginUser.userAvatar || "assets/userAvatar.jpg",
          size: "small",
          title: loginUser.userName || "匿名用户",
          render: (props, dom) => {
            if (!loginUser.id) {
              return (
                <div
                  onClick={() => {
                    router.push("/user/login");
                  }}
                >
                  {dom}
                </div>
              );
            }
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                    {
                      key: "userCenter",
                      icon: <UserOutlined />,
                      label: "用户中心",
                    },
                  ],
                  onClick: async ({ key }) => {
                    if (key === "logout") {
                      await userLogout();
                    } else if (key === "userCenter") {
                      router.push("/user/center");
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <SearchInput key="search" />,
            <a
              href="https://github.com/qwerzbn/Interview-web"
              target="_blank"
              key="github"
            >
              <GithubFilled key="GithubFilled" />
            </a>,
          ];
        }}
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        footerRender={(props) => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuDataRender={() => {
          return getMenuAccess(loginUser, menus);
        }}
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target} key={item.path}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}
