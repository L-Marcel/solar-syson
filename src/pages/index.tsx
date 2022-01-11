import Head from "next/head";
import { Box, Link, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { Brand } from "../components/Brand";
import { Input } from "../components/Input";
import { Clock } from "../components/Clock";
import Router from "next/router";
import { Button } from "../components/Button";

function Login() {
  return (
    <>
      <Head>
        <title>Solar Sys.on</title>
      </Head>
      <Clock/>
      <Box 
        p={[6, 12, 24]}
      >
        <Brand/>
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
            onClick={() => Router.push("/plans")}
          >
            Entrar
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default Login;