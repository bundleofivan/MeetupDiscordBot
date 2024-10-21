/**
 * Cache interface. The Cache name is taken, so we have to use a different name
 */

export interface KeyValueCache {
  exclusive_set(key: string, value: string): Promise<boolean>;
  get(key: string): Promise<string | undefined>;
  remove(key: string): Promise<void>;
  set(key: string, value: string): Promise<void>;
}
