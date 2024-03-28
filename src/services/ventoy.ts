import { getRedirectUrl } from "../utils";

export async function serviceVentoyPluginAddr() {
  return getRedirectUrl("/Socket/Hub/ventoy_wimboot.img");
}
