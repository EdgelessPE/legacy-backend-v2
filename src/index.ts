import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import { API_PREFIX } from "./constants";
import { serviceRedirect } from "./services/redirect";
import { Result } from "ts-results";
import {
  serviceIso,
  serviceIsoAddr,
  serviceIsoName,
  serviceIsoVersion,
} from "./services/iso";
import {
  serviceHub,
  serviceHubAddr,
  serviceHubNotice,
  serviceHubVersion,
} from "./services/hub";
import {
  serviceAlphaAddr,
  serviceAlphaData,
  serviceAlphaVersion,
} from "./services/alpha";
import {
  serviceVentoyAddr,
  serviceVentoyName,
  serviceVentoyPluginAddr,
} from "./services/ventoy";

const PORT = 3000;

const app = new Koa();
const router = new Router();

const define = (
  path: string,
  service: (
    ctx: RouterContext,
  ) => Promise<Result<unknown, string> | string | undefined>,
) => {
  router.get(path, service);
};

define(`${API_PREFIX}/redirect`, serviceRedirect);

define(`${API_PREFIX}/info/iso_version`, serviceIsoVersion);
define(`${API_PREFIX}/info/iso_addr`, serviceIsoAddr);
define(`${API_PREFIX}/info/iso_name`, serviceIsoName);
define(`${API_PREFIX}/info/iso`, serviceIso);
define(`${API_PREFIX}/info/hub_version`, serviceHubVersion);
define(`${API_PREFIX}/info/hub_addr`, serviceHubAddr);
define(`${API_PREFIX}/info/hub`, serviceHub);
define(`${API_PREFIX}/info/notice`, serviceHubNotice);
define(`${API_PREFIX}/info/ventoy_plugin_addr`, serviceVentoyPluginAddr);
define(`${API_PREFIX}/info/ventoy_addr`, serviceVentoyAddr);
define(`${API_PREFIX}/info/ventoy_name`, serviceVentoyName);

define(`${API_PREFIX}/alpha/version`, serviceAlphaVersion);
define(`${API_PREFIX}/alpha/addr`, serviceAlphaAddr);
define(`${API_PREFIX}/alpha/data`, serviceAlphaData);

// Result 类型中间件
app.use(async (ctx, next) => {
  const result: Result<unknown, string> | string | undefined = await next();

  const handleString = (str: string) => {
    if (str.startsWith("http")) {
      ctx.redirect(str);
    } else {
      ctx.body = str;
    }
  };

  // 直接处理 string
  if (typeof result === "string") {
    handleString(result);
    return;
  }

  // 处理 Result 类型
  if (result) {
    if (result.ok) {
      // 处理 Ok
      const res = result.val;
      if (typeof res === "string") {
        handleString(res);
      } else {
        ctx.body = res;
      }
    } else {
      // 处理 Err
      ctx.response.status = 500;
      ctx.body = {
        msg: result.val,
      };
    }
  } else {
    ctx.response.status = 404;
    ctx.body = {
      msg: "Error:Service matching this path not found",
    };
  }
});
app.use(router.routes());

console.log(`Listening on port ${PORT}`);
app.listen(PORT);
