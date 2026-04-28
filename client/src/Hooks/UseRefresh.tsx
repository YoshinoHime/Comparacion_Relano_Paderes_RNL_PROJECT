import { useCallback, useState } from "react";

export const useRefresh = (initialState: boolean = false) => {
  const [refresh, setRefresh] = useState(initialState);

  const handleRefresh = useCallback(() => { 
    setRefresh((prev) => !prev);
  }, []);

  return { refresh, handleRefresh };
};
