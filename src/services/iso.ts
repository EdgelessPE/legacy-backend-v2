import { Result } from "ts-results";
import { BASE_PATH } from "../constants";
import { matchLatestVersion } from "./utils";

export interface Iso {
  name: string;
  version: string;
  url: string;
}
export async function serviceIso(): Promise<Result<Iso, string>> {
  return matchLatestVersion(BASE_PATH.iso, ".iso");
}

export async function serviceIsoVersion() {
  const res = await matchLatestVersion(BASE_PATH.iso, ".iso");
  return res.unwrap().version;
}

export async function serviceIsoAddr() {
  const res = await matchLatestVersion(BASE_PATH.iso, ".iso");
  return res.unwrap().url;
}

export async function serviceIsoName() {
  const res = await matchLatestVersion(BASE_PATH.iso, ".iso");
  return res.unwrap().name;
}
