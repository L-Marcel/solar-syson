import { Box, BoxProps } from "@chakra-ui/react";
import Head from "next/head";
import { Brand } from "../Brand";
import { Clock } from "../Clock";
import { LoadingBar } from "./LoadingBar";

interface PageContainerProps extends BoxProps {
  title?: string;
  withoutClock?: boolean;
  withoutBrand?: boolean;
  brandText?: string;
};

function PageContainer({ 
  title = "", 
  withoutClock = false, 
  withoutBrand = true, 
  brandText, 
  children, 
  ...rest 
}: PageContainerProps) {
  return (
    <>
      <Head>
        <title>Solar Sys.on {title}</title>
      </Head>
      { !withoutClock && <Clock/> }
      <LoadingBar/>
      <Box 
        p={[6, 12, 24]}
        h="100vh"
        overflowY="auto"
        {...rest}
      >
        { !withoutBrand && <Brand text={brandText}/> }
        {children}
      </Box>
    </>
  );
};

export { PageContainer };