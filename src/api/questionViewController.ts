// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** doView POST /api/question_view/ */
export async function doViewUsingPost(
  body: API.QuestionViewAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseInt_>("/api/question_view/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
