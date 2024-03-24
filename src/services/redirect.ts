import { Err, Result, Ok } from "ts-results";
import { RouterContext } from "koa-router";
import { getRedirectCache } from "../cache";
import { ControllerCtx, IProxyController } from "../AList/type";
import { ALIST_ROOT } from "../constants";
import { AListControllerFactory } from "../AList";

async function createController(
  basePath: string,
): Promise<Result<Omit<IProxyController, "init">, string>> {
  const ctx: ControllerCtx = {
    rootUrl: ALIST_ROOT,
    basePath,
  };
  const controller = AListControllerFactory(ctx);
  await controller.init();
  return new Ok(controller);
}

const controllerPromise = createController("");
async function fetch(path: string): Promise<Result<string, string>> {
  // 初始化控制器
  const controllerRes = await controllerPromise;
  if (controllerRes.err) {
    return controllerRes;
  }
  const controller = controllerRes.unwrap();

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
