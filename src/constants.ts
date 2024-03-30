export const PROXY_ROOT = "http://localhost:3000";
export const ALIST_ROOT = "https://zfile.edgeless.top";
export const BASE_PATH = {
  iso: "Socket",
  hub: "Socket/Hub",
  plugin: "插件包",
};
export const CACHE_INTERVAL = 60 * (60 * 1000);

export const API_PREFIX = "/api/v2";
export const HUB_UPDATE_INFO = {
  dependencies_requirement: "2.28",
  wide_gaps: ["2.28"],
};
export const ALPHA_TOKEN = "そうだよ";
export const HUB_NOTICE = [
  {
    id: "220723",
    channel: "Down",
    a_type: "info",
    show_icon: true,
    message: "Edgeless Hub 停止维护告示",
    description:
      "我们非常遗憾地通知各位，由于上游 npm 包更新导致屎山项目 Edgeless Hub 在经过数小时的抢救后依然无法正常编译一个可用的版本，因此我们不得不提前终止对其的更新维护（悲）；我们已经将新版的 Edgeless Hub 开发工作提前提上日程，在此期间 2.27 版本的 Edgeless Hub 依旧能够正常使用，只是我们无力为其提供新的功能更新。",
    close_text: "我知道了",
    lower_than: "0",
  },
  {
    id: "220723",
    channel: "Hub",
    a_type: "info",
    show_icon: true,
    message: "Edgeless Hub 停止维护告示",
    description:
      "我们非常遗憾地通知各位，由于上游 npm 包更新导致屎山项目 Edgeless Hub 在经过数小时的抢救后依然无法正常编译一个可用的版本，因此我们不得不提前终止对其的更新维护（悲）；我们已经将新版的 Edgeless Hub 开发工作提前提上日程，在此期间 2.27 版本的 Edgeless Hub 依旧能够正常使用，只是我们无力为其提供新的功能更新。",
    close_text: "点击默哀（悲）",
    lower_than: "2.28",
  },
];
