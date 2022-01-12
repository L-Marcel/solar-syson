import { Link, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { Input } from "../components/Input";
import Router from "next/router";
import { Button } from "../components/Button";
import { PageContainer } from "../components/PageContainer";

function Login() {
  return (
    <PageContainer withoutBrand={false}>
      <VStack maxW={["80%", "60%", "40%", "25%"]}
        mt={5}
        spacing={3}
        alignItems="left"
      >
        <Input id="user" type="text" placeholder="Usuário"/>
        <Input id="password" type="password" placeholder="Senha"/>
        <NextLink href="/register" passHref>
          <Link color="primary.600">Ainda não tem uma conta?</Link>
        </NextLink>
        <Button
          onClick={() => Router.push("/app/dashboard")}
        >
          Entrar
        </Button>
      </VStack>
    </PageContainer>
  );
};

export default Login;