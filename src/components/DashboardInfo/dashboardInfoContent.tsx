import { Box, BoxProps, CircularProgress, CircularProgressLabel, SlideFade } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Icon } from "../Icon";
import { LineChart } from "../LineChart";

interface DashboardInfoContent extends BoxProps {
  isOpen?: boolean;
};

function DashboardInfoContent({ isOpen, ...rest }: DashboardInfoContent) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if(!isOpen && show) {
      setShow(false);
    };
  }, [isOpen, show])

  useEffect(() => {
    if(!show) {
      let interval = setInterval(() => {
        setShow(true);
        clearInterval(interval);
      }, 500);
    };
  }, [show, setShow]);

  return (
    <Box
      display={!isOpen? "none":null}
      minW={500} 
      h="100vh" 
      bgColor="whitesmoke" 
      pt={6}
      {...rest}
    >
      <Box 
        w="100%" 
        minH={160} 
        mb={-1} 
        bgColor="whitesmoke"
      >
        { !show && <CircularProgress isIndeterminate color="primary.600" ml={8}>
          <CircularProgressLabel>
            <Icon icon="sun" fontSize={20} color="primary.600" mt={1}/>
          </CircularProgressLabel>
        </CircularProgress>}
        <SlideFade in={show} offsetX="0px" offsetY="20px" >
          <LineChart/>
        </SlideFade>
      </Box>
      <Box
        bgColor="primary.700"
        w="100%"
        h="100%"
      >

      </Box>
    </Box>
  );
};

export { DashboardInfoContent };