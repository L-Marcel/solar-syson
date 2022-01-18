import { Box, BoxProps, IconButton } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useToken } from "../../hooks/useToken";
import { boxShadow } from "../../theme/effects/shadow";
import { Brand } from "../Brand";
import { Clock } from "../Clock";
import { Icon } from "../Icon";
import { Menu } from "../Menu";
import { LoadingBar } from "./LoadingBar";

interface PageContainerProps extends BoxProps {
  title?: string;
  withoutClock?: boolean;
  withoutBrand?: boolean;
  withoutRootButton?: boolean;
  brandText?: string;
};

function PageContainer({ 
  title = "", 
  withoutClock = false, 
  withoutBrand = true,
  withoutRootButton = true,
  brandText, 
  children, 
  ...rest 
}: PageContainerProps) {
  const router = useRouter();
  const token = useToken();

  return (
    <>
      <Head>
        <title>Solar Sys.on {title}</title>
      </Head>
      { !withoutClock && <Clock/> }
      <LoadingBar/>
      {
        token && withoutBrand && <Menu
          position="absolute"
          m={[4, 6]}
        />
      }
      <Box 
        p={[6, 12, 24]}
        h="100vh"
        overflowY="auto"
        {...rest}
      >
        { !withoutBrand && <Brand text={brandText} menu={withoutRootButton? null:token? 
          <Menu
            mx={0}
            mt={[0, "1px"]}
          />:<IconButton
            color="primary.700"
            aria-label="Return to root"
            bgColor="white"
            icon={<Icon icon="home"/>}
            variant="outline"
            onClick={() => router.push("/")}
            {...boxShadow(true)}
          />
        }/> }
        {children}
      </Box>
    </>
  );
};

export { PageContainer };