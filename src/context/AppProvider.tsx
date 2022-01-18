
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import createPersistedState from "use-persisted-state";
import { api } from "../service/api";
interface AppProviderProps {
  children: ReactNode;
};

export const appContext = createContext({} as AppContext);

const useUserState = createPersistedState('user');

function AppProvider ({ children }: AppProviderProps) {
  const router = useRouter();
  
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [user, setUser] = useUserState<User | false>(false);
  const [token, setToken] = useState<string | false>(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cookies = parseCookies();

    if(cookies["token"] && !token) {
      setIsLoading(true);
      api.get(`${process.env.NEXT_PUBLIC_API_URL}/user/subscription`, {
        headers: {
          "Authorization": "Bearer " + cookies["token"]
        }
      }).then(res => {
        setToken(cookies["token"]);
      }).catch(() => {
        setCookie(null, "token", undefined);
        setToken(false);
      });
    };
  }, [token]);

  useEffect(() => {
    api.interceptors.response.use(res => res, (err: AxiosError) => {
      if(err.response.status === 401) {
        if(err.request.responseURL.includes("login")){
          setErrors(e => {
            return [ ...new Set<ValidationError>([ ...e, {
              id: "login",
              message: err.response.data.message
            }])];
          });  
        };

        if(token && Boolean(token)) {
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

  const _setToken = useCallback((token: string | false) => setToken(token), [
    setToken
  ]);

  const _setIsLoading = useCallback((isLoading: boolean) => setIsLoading(isLoading), [
    setIsLoading
  ]);

  const login = useCallback(async(credentials: Credentials) => {
    setIsLoading(true);
    const canRedirect = await api.post("/user/login", credentials).then(({ data }) => {
      api.defaults.headers["authorization"] = "Bearer " + data.token;
      setCookie(null, "token", data.token);
      setToken(data.token);
      setUser(data.user);
      return true;
    }).catch(() => {
      return false;
    });
    
    if(canRedirect) {
      router.push("/app/dashboard").then(() => {
        setIsLoading(false);
      });
    };
  }, [token, setUser]);

  const logout = useCallback(async() => {
    router.push("/").then(() => {
      api.defaults.headers["authorization"] = undefined;
      setCookie(null, "token", undefined);
      setToken(false);
      setUser(false);
      console.log("f");
    });
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