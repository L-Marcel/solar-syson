import { useContextSelector } from "use-context-selector";
import { appContext } from "../context/AppProvider";

function useIsLoading() {
  const isLoading = useContextSelector(appContext, c => c.isLoading);
  const setIsLoading = useContextSelector(appContext, c => c.setIsLoading);

  return {
    isLoading,
    setIsLoading
  }; 
};

export { useIsLoading };