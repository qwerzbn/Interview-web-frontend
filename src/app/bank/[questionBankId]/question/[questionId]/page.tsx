import { Flex, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import { Content } from "antd/es/layout/layout";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import { getQuestionBankVoByIdUsingPost } from "@/api/questionBankController";
import Link from "next/link";
import QuestionCard from "@/components/QuestionCard";

export default async function BankQuestionPage({
  // @ts-ignore
  params,
}) {
  const { questionBankId, questionId } = params;

  let bank = undefined;
  try {
    const bankRes = await getQuestionBankVoByIdUsingPost({
      id: questionBankId,
      needQuestionQuery: true,
      pageSize: 200,
    });
    bank = bankRes.data;
  } catch (e) {
    // @ts-ignore
    console.error("获取题库详情失败，" + e.message);
  }
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

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
  // @ts-ignore
  const questionMenuItemList = (bank.questionVOPage?.records || []).map((q) => {
    return {
      label: (
        <Link
          // @ts-ignore
          href={`/bank/${bank.id}/question/${q.id}`}
          prefetch={false}
        >
          {
            // @ts-ignore
            q.title
          }
        </Link>
      ),
      key: q.id,
    };
  });

  return (
    <div id="bankQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
          <Title level={4} style={{ padding: "0 20px" }}>
            {
              // @ts-ignore
              bank.title
            }
          </Title>
          <Menu
            items={questionMenuItemList}
            selectedKeys={
              // @ts-ignore
              [question.id]
            }
          />
        </Sider>
        <Content>
          <QuestionCard
            // @ts-ignore
            question={question}
          />
        </Content>
      </Flex>
    </div>
  );
}
