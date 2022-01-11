import { Box, Link, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { Brand } from "../components/Brand";
import NextLink from "next/link";
import { Input } from "../components/Input";
import { Clock } from "../components/Clock";
import { Button } from "../components/Button";

function Register() {
  return (
    <>
      <Head>
        <title>Solar Sys.on - Registrar nova conta</title>
      </Head>
      <Box
        p={[6, 12, 24]}
      >
        <Clock/>
        <Brand text="-> Criar novo usuário"/>
        <VStack maxW={["80%", "60%", "40%", "25%"]}
          mt={5}
          spacing={3}
          alignItems="left"
        >
          <Input id="user" placeholder="Usuário"/>
          <Input id="email" placeholder="E-mail"/>
          <Input id="password" type="password" placeholder="Senha"/>
          <Input id="checkPassword" type="password" placeholder="Confirmação da senha"/>
          <NextLink href="/" passHref>
            <Link color="primary.600">Já possui uma conta?</Link>
          </NextLink>
          <Button>
            Registrar
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default Register;