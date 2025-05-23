import { redirect } from "next/navigation";

/**
 * 重定向到指定路径，并将编码的消息作为查询参数
 * @param {('error' | 'success')} type - 消息类型，可以是 'error' 或 'success'
 * @param {string} path - 要重定向到的路径
 * @param {string} message - 要编码并添加为查询参数的消息
 * @returns {never} 此函数不会返回值，因为它会触发重定向
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}
