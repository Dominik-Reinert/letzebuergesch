import * as React from "react";
import { AbstractStore } from "./abstract_store";

export function useUpdateOnStoreChange(store: AbstractStore<any, any>): void {
  const [, setTs] = React.useState(new Date().getUTCMilliseconds());
  const updateCallback = React.useCallback(
    () => setTs(new Date().getUTCMilliseconds()),
    [setTs]
  );
  React.useEffect(() => {
    store.registerOnUpdateCallback(updateCallback);
    return () => store.removeOnUpdateCallback(updateCallback);
  }, [store, updateCallback]);
}
