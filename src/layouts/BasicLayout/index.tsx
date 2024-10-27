"use client";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, theme } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import { menus } from "../../../config/menu";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import getMenuAccess from "@/access/menuAccess";
import MdViewer from "@/components/MdViewer";
import MdEditor from "@/components/MdEditor";

const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 32,
        width: 300,
        marginRight: 120,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  listQuestionVoByPageUsingPost({}).then((res) => {
    console.log(res);
  });
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const pathname = usePathname();
  const [text, setText] = useState<string>("");

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
          src: loginUser.userAvatar,
          size: "small",
          title: loginUser.userName,
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
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
          <MdEditor value={text} onChange={setText} />
          <MdViewer value={text} />
        {children}
      </ProLayout>
    </div>
  );
}
