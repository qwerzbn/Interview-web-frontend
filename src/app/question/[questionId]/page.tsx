import { Flex, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import { Content } from "antd/es/layout/layout";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import { getQuestionBankVoByIdUsingPost } from "@/api/questionBankController";
import Link from "next/link";
import QuestionCard from "@/components/QuestionCard";

export default async function QuestionPage({
  // @ts-ignore
  params,
}) {
  const { questionId } = params;

  let question = undefined;
  try {
    const questionRes = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = questionRes.data;
  } catch (e) {
    // @ts-ignore
    console.error("获取题目详情失败，" + e.message);
  }
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }
  return (
    <div id="questionPage">
        <Content>
          <QuestionCard
            // @ts-ignore
            question={question}
          />
        </Content>
    </div>
  );
}