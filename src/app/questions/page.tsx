import Title from "antd/es/typography/Title";
import QuestionTable from "@/components/QuestionTable";
import {listQuestionVoByPageUsingPost, searchQuestionVoByPageUsingPost} from "@/api/questionController";
import "./index.css";

/**
 * 题目列表页面
 * @constructor
 */
export default async function QuestionsPage(
  // @ts-ignore
  { searchParams },
) {
  const { q: searchText } = searchParams;
  let questionList = [];
  let total = 0;

  try {
    const questionRes = await searchQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
      searchText,
    });
    // @ts-ignore
    questionList = questionRes.data.records ?? [];
    // @ts-ignore
    total = questionRes.data.total ?? 0;
  } catch (e) {
    // @ts-ignore
    console.error("获取题目列表失败，" + e.message);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={{
          title: searchText,
        }}
      />
    </div>
  );
}
