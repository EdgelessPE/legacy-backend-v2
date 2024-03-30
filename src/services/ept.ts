import { serviceCateData } from "./plugin";
import { createController } from "../AList";
import { BASE_PATH } from "../constants";
import { Ok } from "ts-results";
import { RouterContext } from "koa-router";
import { getRedirectUrl } from "../utils";
export async function serviceEptIndex(ctx: RouterContext) {
  const cateRes = await serviceCateData();
  const records: string[] = [];
  const controller = await createController(BASE_PATH.plugin);
  for (const cate of cateRes.unwrap().payload) {
    const dirRes = await controller.readDir(cate);
    if (dirRes.err) {
      return dirRes;
    }
    const list = dirRes.unwrap();
    list.forEach((node) => {
      if (!node.isDir) {
        records.push(`${node.name.slice(0, -3)}_${cate}`);
      }
    });
  }
  ctx.type = "text/html; charset=gbk";
  return new Ok(records.join("\r\n"));
}

export async function serviceEptRedirect(ctx: RouterContext) {
  const { cate, name, version, author } = ctx.request.query as {
    cate: string;
    name: string;
    version: string;
    author: string;
  };
  return getRedirectUrl(
    `${BASE_PATH.plugin}/${cate}/${name}_${version}_${author}.7z`,
  );
}
