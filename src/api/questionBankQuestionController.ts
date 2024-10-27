// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** addQuestionBankQuestion POST /api/questionBank_question/add */
export async function addQuestionBankQuestionUsingPost(
  body: API.QuestionBankQuestionAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/questionBank_question/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteQuestionBankQuestion DELETE /api/questionBank_question/delete */
export async function deleteQuestionBankQuestionUsingDelete(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>(
    "/api/questionBank_question/delete",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** removeQuestionBankQuestion DELETE /api/questionBank_question/remove */
export async function removeQuestionBankQuestionUsingDelete(
  body: API.QuestionBankQuestionRemoveRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>(
    "/api/questionBank_question/remove",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}
