import { Box, Divider, Heading, List, ListIcon, ListItem, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { MdCheck } from "react-icons/md";
import { Brand } from "../components/Brand";
import { Button } from "../components/Button";
import { Clock } from "../components/Clock";
import { Icon } from "../components/Icon";
import { api } from "../service/api";
import { boxShadow } from "../theme/effects/shadow";

const planIcon = [
  "moon",
  "sunWithCloud",
  "sun"
];

const planTitle = [
  "Usuário",
  "Empresas",
  "Ultimate"
];

interface PlansProps {
  subscriptions: Subscription[]
};

function Plans({ subscriptions }: PlansProps) {
  console.log(subscriptions);
  return (
    <>
      <Head>
        <title>Solar Sys.on - Escolha seu plano</title>
      </Head>
      <Box
        p={[6, 12, 24]}
      >
        <Clock/>
        <Brand text="-> Escolha seu plano"/>
        <SimpleGrid
          minChildWidth={250}
          columns={[1, 1, 1, 3]}
          spacing={5}
          m={5}
          maxH="100%"
          overflowY="auto"
        >
          {subscriptions.map((s, i) => {
            const descritionItems = s.product.description.split("; ");
            return (
              <VStack
                spacing={5}
                key={s.id}
                bg={i < 1? "primary.700":"white"}
                borderWidth={1}
                borderColor="primary.500"
                borderRadius={8}
                p={[5, 8, 8, 8, 10]}
                color={i < 1? "white":"primary.700"} 
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                {...boxShadow(true)}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon
                    mr={4}
                    ml={-4}
                    fontSize={i === 1? 34:30}
                    icon={planIcon[i]}
                  />
                  <Heading
                    fontSize={[18, 20, 20, 20, 20, 30]}
                    fontWeight="normal"
                  >
                    {planTitle[i]}
                  </Heading>
                </Box>
                <Divider
                  h={2} 
                  w="40%" 
                  borderColor="currentcolor"
                />
                <List align="center" spacing={2}>
                  {descritionItems.map((d, i) => {
                    return (
                      <ListItem key={s.id+d}>
                        <ListIcon as={MdCheck} color='green.500' />
                        {d}{(i+1) === descritionItems.length? "":";"}
                      </ListItem>
                    );
                  })}
                </List>
                <Divider
                  h={2} 
                  w="40%" 
                  borderColor="currentcolor"
                />
                <Box textAlign="center">
                  <Text
                    fontWeight="semibold"
                    fontSize={[16, 24]}
                  >
                    {s.price.formatted}
                  </Text>
                  <Text>{s.frequency}</Text>
                </Box>
                <Button>
                  Escolher
                </Button>
              </VStack>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async() => {
  const subscriptions = await api.get("/subscription/prices").then(res => res.data).catch(() => []);

  return {
    props: {
      subscriptions
    },
    revalidate: 60 * 12
  };
};

export default Plans;