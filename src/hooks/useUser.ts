import { useContextSelector } from "use-context-selector";
import { appContext } from "../context/AppProvider";

function useUser() {
  return useContextSelector(appContext, c => c.user);
};

export { useUser };