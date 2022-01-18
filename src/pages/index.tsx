import { Link, useToast, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { Input } from "../components/Input";
import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { PageContainer } from "../components/PageContainer";
import { ChangeEvent, useEffect, useState } from "react";
import { CustomToast } from "../components/Toast/CustomToast";
import { useErrors } from "../hooks/useErrors";
import { useLogin } from "../hooks/useLogin";
import { parseCookies } from "nookies";
import { useIsLoading } from "../hooks/useIsLoading";

function Login() {
  const [credentials, setCredentials] = useState<Credentials>({
    login: "",
    password: ""
  });

  const { errors, onClearError } = useErrors();
  const { setIsLoading } = useIsLoading();

  const { isLoading } = useIsLoading();
  const router = useRouter();
  const toast = useToast();
  const login = useLogin();
 
  function onChangeCredentials(e: ChangeEvent<HTMLInputElement>) {
    setCredentials(c => {
      onClearError(e.target.id);
      return {
        ...c,
        [e.target.id]: e.target.value
      };
    });
  };

  useEffect(() => {
    if(router.query["toast"] === "created") {
      toast({
        duration: 2000,
        position: "top-right",
        render: () => <CustomToast 
          title="Usuário criado!"
          status="success"
        />
      });
    };

    const token = parseCookies(null, "token");

    if(token["token"] && Boolean(token["token"])) {
      router.push("/app/dashboard").then(() => {
        setIsLoading(false);
      });
    };

    setIsLoading(false);
  }, [router]);

  return (
    <PageContainer withoutBrand={false}>
      <VStack maxW={["80%", "60%", "40%", "25%"]}
        mt={5}
        spacing={3}
        alignItems="left"
      >
        <Input 
          id="login"
          value={credentials.login}
          placeholder="Usuário"
          onChange={onChangeCredentials}
          errors={errors}
        />
        <Input
          value={credentials.password}
          id="password" 
          type="password" 
          placeholder="Senha"
          onChange={onChangeCredentials}
          errors={errors}
        />
        <NextLink href="/register" passHref>
          <Link color="primary.600">Ainda não tem uma conta?</Link>
        </NextLink>
        <Button
          disabled={isLoading}
          onClick={() => login(credentials)}
        >
          Entrar
        </Button>
      </VStack>
    </PageContainer>
  );
};

export default Login;