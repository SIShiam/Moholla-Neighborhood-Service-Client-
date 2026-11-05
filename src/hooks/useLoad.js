"use client";
import { useCallback, useEffect, useState } from "react";

// Small data loader. Keeps old data on screen while reloading so lists do not flash.
export function useLoad(loader, deps = [], { enabled = true } = {}) {
  const [state, setState] = useState({ data: null, error: null, loading: true });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await loader();
      setState({ data, error: null, loading: false });
    } catch (err) {
      setState({ data: null, error: err.message, loading: false });
    }
  }, deps);

  useEffect(() => {
    if (enabled) run();
  }, [run, enabled]);

  return { ...state, reload: run };
}
