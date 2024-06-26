import path from "path";
import { Err, Ok, Result } from "ts-results";
import { API_PREFIX, PROXY_ROOT } from "./constants";

// 将 Promise 转换为 Result 类型，捕获 reject 导致的抛出
export async function promise2Result<T>(
  p: Promise<T>,
): Promise<Result<T, string>> {
  return new Promise((resolve) => {
    p.then((r) => resolve(new Ok(r))).catch((e) =>
      resolve(new Err(e.toString())),
    );
  });
}
export function path_join(...arr: string[]) {
  return path.join(...arr).replace(/\\/g, "/");
}
export function getRedirectUrl(rawPath: string) {
  return `${PROXY_ROOT}${API_PREFIX}/redirect?path=${rawPath}`;
}
