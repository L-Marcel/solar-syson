import { useContextSelector } from "use-context-selector";
import { appContext } from "../context/AppProvider";

function useToken() {
  return useContextSelector(appContext, c => c.token);
};

export { useToken };