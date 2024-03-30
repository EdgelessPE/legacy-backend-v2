import { createController } from "../AList";
import { Err, Ok } from "ts-results";
import { RouterContext } from "koa-router";
import { getRedirectUrl, path_join } from "../utils";
import { BASE_PATH } from "../constants";

export async function serviceCateData() {
  const controller = await createController("插件包");
  const dir = await controller.readDir("");
  return new Ok({
    payload: dir
      .unwrap()
      .filter((node) => node.isDir)
      .map((node) => node.name),
  });
}

export async function serviceListData(ctx: RouterContext) {
  const category = ctx.request.query.name;
  if (typeof category !== "string") {
    return new Err("Query name must be string");
  }
  const controller = await createController(BASE_PATH.plugin);
  const dir = await controller.readDir(category);
  if (dir.err) {
    return dir;
  }
  return new Ok({
    payload: dir
      .unwrap()
      .filter((node) => !node.isDir)
      .map(({ name, size }) => ({
        name,
        size,
        node_type: "FILE",
        url: getRedirectUrl(path_join(BASE_PATH.plugin, category, name)),
      })),
  });
}
