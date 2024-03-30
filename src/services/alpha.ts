import { matchLatestVersion } from "./utils";
import { RouterContext } from "koa-router";
import { ALPHA_TOKEN } from "../constants";
import { Err, Ok } from "ts-results";
import { getRedirectUrl } from "../utils";

export async function serviceAlphaVersion(ctx: RouterContext) {
  if (ctx.request.query.token !== ALPHA_TOKEN) {
    return new Err(`Invalid token : ${ctx.request.query.token}`);
  }
  const res = await matchLatestVersion("Socket/Alpha", ".wim");
  return res.unwrap().version;
}
export async function serviceAlphaAddr(ctx: RouterContext) {
  if (ctx.request.query.token !== ALPHA_TOKEN) {
    return new Err(`Invalid token : ${ctx.request.query.token}`);
  }
  const res = await matchLatestVersion("Socket/Alpha", ".wim");
  return res.unwrap().url;
}

export async function serviceAlphaData(ctx: RouterContext) {
  if (ctx.request.query.token !== ALPHA_TOKEN) {
    return new Err(`Invalid token : ${ctx.request.query.token}`);
  }
  const res = await matchLatestVersion("Socket/Alpha", ".wim");
  const { version, name, url } = res.unwrap();

  return new Ok({
    version,
    name,
    url,
    iso_version: version,
    iso_name: name,
    iso_url: url,
    pack_require: "4.1.0",
    pack_name: "Edgeless.7z",
    pack_url: getRedirectUrl("Socket/Alpha/Edgeless.7z"),
  });
}
