import { Ok, Result } from "ts-results";
import { CACHE_INTERVAL } from "./constants";
import { AxiosResponse } from "axios";
import { Content } from "./AList";

// 缓存逻辑封装
function cacheFactory<T>() {
  const map: Map<string, [Result<T, string>, number]> = new Map();

  const get = async (
    key: string,
    fetchWith: (key: string) => Promise<Result<T, string>>,
  ): Promise<Result<T, string>> => {
    const [cached, timestamp = 0] = map.get(key) ?? [];
    if (!cached || Date.now() - timestamp > CACHE_INTERVAL) {
      const freshRes = await fetchWith(key);
      map.set(key, [freshRes, Date.now()]);
      return freshRes;
    }
    return cached;
  };
  const set = (key: string, val: T) => {
    map.set(key, [new Ok(val), Date.now()]);
  };

  return [get, set] as const;
}

// 实例化的缓存封装
export const [getRedirectCache] = cacheFactory<string>();
export const [getAListSign, setAListSign] = cacheFactory<string>();
export const [getFSListCache] = cacheFactory<
  AxiosResponse<{
    code: number;
    data: {
      content: Content[];
      provider: string;
      readme: string;
      total: number;
      write: boolean;
    };
    message: string;
  }>
>();
export const [getFSGetCache] = cacheFactory<
  AxiosResponse<{
    code: number;
    data: {
      is_dir: boolean;
      modified: string;
      name: string;
      provider: string;
      raw_url: string;
      readme: string;
      related: null;
      sign: string;
      size: number;
      thumb: string;
      type: number;
    };
    message: string;
  }>
>();
