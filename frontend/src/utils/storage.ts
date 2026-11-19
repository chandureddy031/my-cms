// Browser storage throws in private mode or when blocked; these never do.

type Store = "local" | "session";

const storeOf = (store: Store) => (store === "local" ? localStorage : sessionStorage);

export function readStorage(key: string, store: Store = "local") {
  try {
    return storeOf(store).getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string, store: Store = "local") {
  try {
    storeOf(store).setItem(key, value);
  } catch {}
}
