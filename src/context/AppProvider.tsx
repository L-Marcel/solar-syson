
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import createPersistedState from "use-persisted-state";
import { api } from "../service/api";
interface AppProviderProps {
  children: ReactNode;
};

export const appContext = createContext({} as AppContext);

const useTokenState = createPersistedState('token');
const useUserState = createPersistedState('user');

function AppProvider ({ children }: AppProviderProps) {
  const router = useRouter();
  
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [user, setUser] = useUserState<User>();
  const [token, setToken] = useTokenState<string | boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(token) {
      setCookie(null, "token", token);
    };
  }, [token]);

  useEffect(() => {
    api.interceptors.response.use(res => res, (err: AxiosError) => {
      if(err.response.status === 401) {
        if(token) {
          api.defaults.headers["authorization"] = "Bearer " + token;
          return new Promise((resolve, reject) => {
            err.request.headers["authorization"] = "Bearer " + token;
            return resolve(api(err.config));
          });
        };
        setIsLoading(false);
      } else if(err.response.status === 406) {
        setErrors(e => {
          return [ ...new Set<ValidationError>([ ...e, ...
            (err.response.data ?? [])
          ])];
        });
        setIsLoading(false);
      } else if(err.response.status === 401) {
        setErrors(e => {
          return [ ...new Set<ValidationError>([ ...e, {
            id: "login",
            message: err.response.data.message
          }])];
        });
        setIsLoading(false);
      };
  
      return Promise.reject(err);
    });
  }, [api, token]);

  useEffect(() => {
    onResetErrors();
    if(router.asPath === "/" && token) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    };
  }, [router]);

  const onClearError = useCallback((id: string) => 
    setErrors(err => {
      return err.filter(v => v.id !== id);
    })
  , [setErrors]);

  const onResetErrors = useCallback(() => 
    setErrors([])
  , [setErrors]);

  const _setToken = useCallback((token: string | boolean) => setToken(token), [
    setToken
  ]);

  const _setIsLoading = useCallback((isLoading: boolean) => setIsLoading(isLoading), [
    setIsLoading
  ]);

  const login = useCallback(async(credentials: Credentials) => {
    setIsLoading(true);
    await api.post("/user/login", credentials).then(({ data }) => {
      api.defaults.headers["authorization"] = "Bearer " + data.token;
      setToken(data.token);
      setUser(data.user);
      router.asPath === "/" && router.push("/app/dashboard");
      setIsLoading(false);
    }).catch(() => {});
  }, [token, setUser]);

  const logout = useCallback(async() => {
    api.defaults.headers["authorization"] = null;
    destroyCookie(null, "token");
    setToken(null);
    setUser(null);
  }, [token, setUser]);

  return (
    <appContext.Provider 
      value={{
        user,
        login,
        logout,
        isLoading,
        token,
        setToken: _setToken,
        setIsLoading: _setIsLoading,
        onClearError,
        errors,
        onResetErrors
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export { AppProvider };