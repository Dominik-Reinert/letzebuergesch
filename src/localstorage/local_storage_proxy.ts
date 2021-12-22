import { proxy } from "valtio";

function canUseLocalStorage(): boolean {
  return typeof localStorage !== "undefined";
}

interface LocalStorageProxyOptions {
  allowMismatchingKeys?: boolean;
}

export function localStorageProxy<D extends object>(
  key: string,
  initialData: D,
  options?: LocalStorageProxyOptions
): D {
  let data: D = { ...initialData };
  if (canUseLocalStorage()) {
    const storedData = localStorage.getItem(key);
    console.log(`Found localstorage data for key: ${key}`);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (options?.allowMismatchingKeys) {
        data = { ...data, ...parsedData };
      } else {
        const dataKeys = Object.keys(data);

        Object.entries(parsedData).forEach(([key, value]) => {
          if (dataKeys.includes(key)) {
            (data as any)[key] = value;
          } else {
            console.warn(`Key ${key} not found in initial data!`);
          }
        });
      }
    }

    const saveToLocalStorageHandler = () =>
      localStorage.setItem(key, JSON.stringify(result));

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        saveToLocalStorageHandler();
      }
    });

    window.addEventListener("unload", saveToLocalStorageHandler);
  } else {
    console.warn("localStorage unavailable!");
  }
  const result = proxy(data);

  return result;
}
