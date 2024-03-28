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
