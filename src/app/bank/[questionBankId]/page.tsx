import Title from "antd/es/typography/Title";
import QuestionList from "@/components/QuestionList";
import { Avatar, Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import "./index.css";
import { getQuestionBankVoByIdUsingPost } from "@/api/questionBankController";

/**
 * 题库详情页面
 * @constructor
 */
export default async function BankPage(
  // @ts-ignore
  { params },
) {
  const { questionBankId } = params;

  let bank = undefined;

  try {
    const bankRes = await getQuestionBankVoByIdUsingPost({
      id: questionBankId,
      needQuestionQuery: true,
      pageSize: 200,
    });
    bank = bankRes.data;
    console.log(bank);
  } catch (e) {
    // @ts-ignore
    console.error("获取题库详情失败，" + e.message);
  }

  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }
  let firstQuestionId;

  if (
    // @ts-ignore
    bank.questionVOPage?.records.length > 0 &&
    // @ts-ignore
    bank.questionVOPage?.records[0]
  ) {
    // @ts-ignore
    firstQuestionId = bank.questionVOPage.records[0].id;
  }
  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          // @ts-ignore
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {
                // @ts-ignore
                bank.title
              }
            </Title>
          }
          description={
            <div>
              <Paragraph type="secondary">
                {
                  // @ts-ignore
                  bank.description
                }
              </Paragraph>
              <Button
                type="primary"
                shape="round"
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                target="_blank"
              >
                开始刷题
              </Button>
            </div>
          }
        ></Meta>
      </Card>
      <div style={{ marginBottom: 16 }} />

      <QuestionList
        questionList={
          // @ts-ignore
          bank.questionVOPage?.records || []
        }
        cardTitle={
          // @ts-ignore
          `题目列表(${bank.questionVOPage?.total || 0})`
        }
      />
    </div>
  );
}
