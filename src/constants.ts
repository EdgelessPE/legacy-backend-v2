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
    id: "240529",
    channel: "Down",
    a_type: "info",
    show_icon: true,
    message: "Edgeless Hub 更新告示",
    description:
      "由于服务器调整更新，请尽快将 Edgeless Hub 更新至 2.28 版本，以免影响使用。",
    close_text: "我知道了",
    lower_than: "0",
  },
  {
    id: "240529",
    channel: "Hub",
    a_type: "info",
    show_icon: true,
    message: "Edgeless Hub 更新告示",
    description:
      "由于服务器调整更新，请尽快将 Edgeless Hub 更新至 2.28 版本，以免影响使用。",
    close_text: "我知道了",
    lower_than: "2.28",
  },
];
