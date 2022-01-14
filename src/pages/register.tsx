import { Link, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { PageContainer } from "../components/PageContainer";
import { ChangeEvent, useState } from "react";
import { api } from "../service/api";
import Router from "next/router";

function Register() {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    email: "",
    password: "",
    username: "",
    checkPassword: ""
  });

  async function handleSubmit() {
    await api.post("/user", credentials).then(() => {
      Router.push("/?toast=created");
    }).catch(err => {
      if(err.response.status === 406) {
        setErrors(e => {
          return [ ...new Set<ValidationError>([ ...e, ...
            (err.response.data ?? [])
          ])];
        });
      };
    });
  };

  function onChangeCredentials(e: ChangeEvent<HTMLInputElement>) {
    setCredentials(c => {
      setErrors(err => {
        return err.filter(v => v.id !== e.target.id);
      });

      return {
        ...c,
        [e.target.id]: e.target.value
      };
    });
  };

  return (
    <PageContainer withoutBrand={false} brandText="-> Criar novo usuário">
      <VStack maxW={["80%", "60%", "40%", "25%"]}
        mt={5}
        spacing={3}
        alignItems="left"
      >
        <Input 
          id="username"
          value={credentials.username} 
          placeholder="Usuário" 
          onChange={onChangeCredentials}
          errors={errors}
        />
        <Input 
          id="email"
          value={credentials.email} 
          placeholder="E-mail"
          onChange={onChangeCredentials}
          errors={errors}
        />
        <Input 
          id="password"
          value={credentials.password}
          type="password"
          placeholder="Senha"
          onChange={onChangeCredentials}
          errors={errors}
        />
        <Input 
          id="checkPassword"
          value={credentials.checkPassword}
          type="password"
          placeholder="Confirmação da senha"
          onChange={onChangeCredentials}
          errors={errors}
        />
        <NextLink href="/" passHref>
          <Link color="primary.600">Já possui uma conta?</Link>
        </NextLink>
        <Button onClick={handleSubmit} disabled={errors.length >= 1}>
          Registrar
        </Button>
      </VStack>
    </PageContainer>
  );
};

export default Register;