"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layouts/BasicLayout";
import React, { useCallback, useEffect } from "react";
import "./globals.css";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import AccessLayout from "@/access/accessLayout";
import { getLoginUserUsingGet } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import { usePathname } from "next/navigation";

/**
 * 执行初始化逻辑的布局（多封装一层）
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const doInitLoginUser = useCallback(async () => {
    console.log("hello 欢迎来到我的项目");
    const res = await getLoginUserUsingGet();
    console.log("初始化用户信息", res);
    if (res.data) {
      // @ts-ignore
      dispatch(setLoginUser(res.data));
    } else {
    }
  }, []);

  // 只执行一次
  useEffect(() => {
    doInitLoginUser();
  }, []);

  return <>{children}</>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLogin = pathname.startsWith("/user");
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              {isLogin && <AccessLayout>{children}</AccessLayout>}
              {!isLogin && (
                <BasicLayout>
                  <AccessLayout>{children}</AccessLayout>
                </BasicLayout>
              )}
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
