import { Box, BoxProps } from "@chakra-ui/react";
import Head from "next/head";
import { Brand } from "../Brand";
import { Clock } from "../Clock";

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
      <Box 
        p={[6, 12, 24]}
        {...rest}
      >
        { !withoutBrand && <Brand text={brandText}/> }
        {children}
      </Box>
    </>
  );
};

export { PageContainer };