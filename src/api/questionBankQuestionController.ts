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

/** addBatchQuestionBankQuestion POST /api/questionBank_question/add/batch */
export async function addBatchQuestionBankQuestionUsingPost(
  body: API.QuestionBankQuestionBatchAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>(
    "/api/questionBank_question/add/batch",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
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

/** listQuestionBankByQuestion POST /api/questionBank_question/list/questionBank */
export async function listQuestionBankByQuestionUsingPost(
  body: API.QuestionBankQuestionQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListQuestionBank_>(
    "/api/questionBank_question/list/questionBank",
    {
      method: "POST",
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

/** removeBatchQuestionBankQuestion DELETE /api/questionBank_question/remove/batch */
export async function removeBatchQuestionBankQuestionUsingDelete(
  body: API.QuestionBankQuestionBatchRemoveRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>(
    "/api/questionBank_question/remove/batch",
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
