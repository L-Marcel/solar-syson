import { Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { PageContainer } from "../../components/PageContainer";

export default function Success() {
  const router = useRouter();

  return (
    <PageContainer 
      withoutBrand
      withoutClock
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Icon fontSize={20} icon="sun" color="primary.500"/>
      <Heading
        color="primary.600"
      >
        Obrigado!
      </Heading>
      <Text
        my={5}
        maxW={["80%", "50%"]}
        textAlign="center"
      >
        Seu plano foi vinculado a sua conta com sucesso!
        Estamos muito felizes que tenha se interessado em nossos serviços!
      </Text>
      <Button onClick={() => router.push("/app/dashboard")}>
        Continuar
      </Button>
    </PageContainer>
  );
};