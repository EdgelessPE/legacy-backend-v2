import { Ok } from "ts-results";
import { getRedirectUrl } from "../utils";
import { BASE_PATH, HUB_UPDATE_INFO } from "../constants";
import { matchLatestVersion } from "./utils";

export async function serviceHub() {
  const matchRes = await matchLatestVersion(BASE_PATH.hub, ".7z");
  const { version, url } = matchRes.unwrap();
  return new Ok({
    miniupdate_pack_addr: getRedirectUrl("/Socket/Hub/Update/miniupdate.7z"),
    update_pack_addr: getRedirectUrl("/Socket/Hub/Update/update.7z"),
    full_update_redirect: "https://down.edgeless.top",
    update_info: HUB_UPDATE_INFO,
    version,
    address: url,
  });
}

export async function serviceHubVersion() {
  const res = await matchLatestVersion(BASE_PATH.hub, ".7z");
  return res.unwrap().version;
}

export async function serviceHubAddr() {
  const res = await matchLatestVersion(BASE_PATH.hub, ".7z");
  return res.unwrap().url;
}
