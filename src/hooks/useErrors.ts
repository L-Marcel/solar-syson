import { useContextSelector } from "use-context-selector";
import { appContext } from "../context/AppProvider";

function useErrors() {
  const errors = useContextSelector(appContext, c => c.errors);
  const onClearError = useContextSelector(appContext, c => c.onClearError);
  const onResetErrors = useContextSelector(appContext, c => c.onResetErrors);

  return {
    errors,
    onClearError,
    onResetErrors
  };
};

export { useErrors };