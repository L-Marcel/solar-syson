
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import createPersistedState from "use-persisted-state";
import { api } from "../service/api";
interface AppProviderProps {
  children: ReactNode;
};

export const appContext = createContext({} as AppContext);

const useTokenState = createPersistedState('token');

function AppProvider ({ children }: AppProviderProps) {
  const router = useRouter();
  
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useTokenState<string | boolean>(false);

  useEffect(() => {
    api.interceptors.response.use(res => res, (error: AxiosError) => {
      if(error.response.status === 401) {
        if(token) {
          api.defaults.headers["authorization"] = "Bearer " + token;
          return new Promise((resolve, reject) => {
            error.request.headers["authorization"] = "Bearer " + token;
            return resolve(api(error.config));
          });
        };
      };
  
      return Promise.reject(error);
    });
  }, [api]);

  const _setToken = useCallback((token: string | boolean) => setToken(token), [
    setToken
  ]);

  const checkIsAuth = useCallback(() => {
    if(!user) {
      if(token) {
        api.defaults.headers["authorization"] = "Bearer " + token;
        token && api.get("/user").then(({ data }) => { 
          setUser(data.user);
          setIsLoading(false);
          router.asPath === "/" && router.push("/dashboard");
        }).catch(() => {
          setIsLoading(false);
          router.asPath !== "/" && router.push("/");
        });
      } else {
        setIsLoading(false);
        router.asPath !== "/" && router.push("/");
      };
    };
  }, [token, setIsLoading, setUser, user, token]);

  const login = useCallback(async(credentials: Credentials, onError: (message: string) => void) => {
    setIsLoading(true);
    await api.post("/login", credentials).then(({ data }) => {
      api.defaults.headers["authorization"] = "Bearer " + data.token;
      setToken(data.token);
      setUser(data.user);
      router.asPath === "/" && router.push("/dashboard");
      setIsLoading(false);
    }).catch((err: AxiosError) => {
      onError(err.response.data.message);
      setIsLoading(false);
    });
  }, [token, setIsLoading, setUser]);

  useEffect(() => {
    checkIsAuth();
  }, []);

  return (
    <appContext.Provider 
      value={{
        user,
        login,
        checkIsAuth,
        isLoading,
        token,
        setToken: _setToken
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export { AppProvider };