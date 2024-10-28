"use server";
import Title from "antd/es/typography/Title";
import { Divider } from "antd";
import "./index.css";

/**
 * 主页
 * @constructor
 */
export default async function HomePage() {
    return <div id="homePage">
        <Title level={3}>
            最新题库
        </Title>
        <div>
            题库列表
        </div>
        <Divider />
        <Title level={3}>
            最新题目
        </Title>
        <div>
            题目列表
        </div>
    </div>;
}
