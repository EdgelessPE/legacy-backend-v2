import { getRedirectUrl } from "../utils";
import { matchLatestVersion } from "./utils";

export async function serviceVentoyPluginAddr() {
  return getRedirectUrl("/Socket/Hub/ventoy_wimboot.img");
}

export async function serviceVentoyAddr() {
  const match = await matchLatestVersion("Socket/Ventoy", ".zip");
  return match.unwrap().url;
}

export async function serviceVentoyName() {
  const match = await matchLatestVersion("Socket/Ventoy", ".zip");
  return match.unwrap().name;
}
