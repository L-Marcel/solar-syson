import { Link, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { PageContainer } from "../components/PageContainer";

function Register() {
  return (
    <PageContainer withoutBrand={false} brandText="-> Criar novo usuário">
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
    </PageContainer>
  );
};

export default Register;