import { useCallback, useEffect, useState } from "react";

interface UseFetchOptions<T> {
  fetchFunction: () => Promise<T>;
  immediate?: boolean;
  dependencies?: any[];
}

 function useFetch<T>({
  fetchFunction,
  immediate = true,
  dependencies = [],
}: UseFetchOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute, immediate, ...dependencies]);

  return { data, loading, error, refetch: execute };
}

export default useFetch;