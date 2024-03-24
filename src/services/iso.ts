import { Ok, Result } from "ts-results";
import { createController } from "../AList";
import { BASE_PATH } from "../constants";
import { compareVersions } from "compare-versions";
import { getRedirectUrl, path_join } from "../utils";

const VERSION_REGEX = /[0-9]+\.[0-9]+\.[0-9]+/;
export interface Iso {
  name: string;
  version: string;
  url: string;
}
export async function serviceIso(): Promise<Result<Iso, string>> {
  const controller = await createController(BASE_PATH.iso);

  // 读出 Socket 目录中的 iso 列表
  const socketDirRes = await controller.readDir("");
  if (socketDirRes.err) {
    return socketDirRes;
  }
  const isoList = socketDirRes
    .unwrap()
    .filter((node) => node.name.endsWith(".iso"));

  // 取版本号最高的
  const { name } = isoList.sort((a, b) => {
    const versionA = a.name.match(VERSION_REGEX)?.[0];
    const versionB = b.name.match(VERSION_REGEX)?.[0];
    if (versionA && versionB) {
      return compareVersions(versionA, versionB);
    } else {
      return 0;
    }
  })[0];

  return new Ok({
    name,
    version: name.match(VERSION_REGEX)![0],
    url: getRedirectUrl(path_join(BASE_PATH.iso, name)),
  });
}
