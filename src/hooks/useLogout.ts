import { useContextSelector } from "use-context-selector";
import { appContext } from "../context/AppProvider";

function useLogout() {
  return useContextSelector(appContext, c => c.logout);
};

export { useLogout };