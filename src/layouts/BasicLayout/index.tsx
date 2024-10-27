"use client";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, theme } from "antd";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import { menus } from "../../../config/menu";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";

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
  const pathname = usePathname();
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
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          size: "small",
          title: "朱贝宁",
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
          return menus;
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
