import { useContextSelector } from "use-context-selector";
import { appContext } from "../context/AppProvider";

function useLogin() {
  return useContextSelector(appContext, c => c.login);
};

export { useLogin };