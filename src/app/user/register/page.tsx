"use client";
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from "@ant-design/icons";
import {
  LoginFormPage,
  ProConfigProvider,
  ProForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Divider, Space, Tabs, message, theme } from "antd";
import type { CSSProperties } from "react";
// @ts-ignore
import { useState } from "react";
import Link from "next/link";
import { AppDispatch } from "@/stores";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {userLoginUsingPost, userRegisterUsingPost} from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";

const iconStyles: CSSProperties = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};
const Page = () => {
  const { token } = theme.useToken();
  const [form] = ProForm.useForm();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * 提交
   * @param values
   */
  const doSubmit = async (values: any) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功！");
        // @ts-ignore
        router.replace("/user/login");
        form.resetFields();
      }
    } catch (e: any) {
      message.error("注册失败，" + e.message);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <LoginFormPage
        form={form}
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="面试大师"
        subTitle="注册账号"
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0,0.65)",
          backdropFilter: "blur(4px)",
        }}
        onFinish={doSubmit}
        submitter={{
          searchConfig: {
            submitText: "注册",
          },
        }}
        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          ></div>
        }
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: (
              <UserOutlined
                style={{
                  color: token.colorText,
                }}
                className={"prefixIcon"}
              />
            ),
          }}
          placeholder={"请输入用户名"}
          rules={[
            {
              required: true,
              message: "请输入用户名!",
            },
            //用户名不能少于四位
            {
              min: 4,
              message: "用户名不能少于四位",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: (
              <LockOutlined
                style={{
                  color: token.colorText,
                }}
                className={"prefixIcon"}
              />
            ),
          }}
          placeholder={"请输入密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
            {
              min: 8,
              message: "密码不能少于8位",
            },
            // 不能包含特殊字符
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: "密码不能包含特殊字符",
            },
          ]}
        />
        <ProFormText.Password
          name="checkPassword"
          fieldProps={{
            size: "large",
            prefix: (
              <LockOutlined
                style={{
                  color: token.colorText,
                }}
                className={"prefixIcon"}
              />
            ),
          }}
          placeholder={"请再次输入密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
            //与注册密码相同
            {
              validator: (_, value) =>
                value === form.getFieldValue("userPassword")
                  ? Promise.resolve()
                  : Promise.reject(new Error("两次输入的密码不一致！")),
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          已有账号
          <Link prefetch={false} href={"/user/login"}>
            去登录
          </Link>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};
