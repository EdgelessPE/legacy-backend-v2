import { Err, Result } from "ts-results";
import { RouterContext } from "koa-router";
import { getRedirectCache } from "../cache";
import { createController } from "../AList";

const controllerPromise = createController("");
async function fetch(path: string): Promise<Result<string, string>> {
  // 初始化控制器
  const controller = await controllerPromise;
  return controller.fetchFile(path);
}

export async function serviceRedirect(
  ctx: RouterContext,
): Promise<Result<string, string>> {
  const { path } = ctx.request.query as {
    path?: string;
  };
  if (!path) {
    return new Err("Error:Missing query field 'path' in request url");
  }

  return getRedirectCache(path, fetch);
}
