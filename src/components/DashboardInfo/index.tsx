import { Drawer, DrawerBody, DrawerContent, DrawerFooter, IconButton, SlideFade, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { boxShadow } from "../../theme/effects/shadow";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { DashboardInfoContent } from "./dashboardInfoContent";

function DashboardInfo() {
  const btnRef = useRef();
  const isWideOrNormalVersion = useBreakpointValue({
    base: false,
    lg: true,
    xl: true
  });

  const { isOpen, onClose, onOpen } = useDisclosure({
    defaultIsOpen: isWideOrNormalVersion
  });

  if(!isWideOrNormalVersion) {
    return (
      <>
        { !isOpen && <IconButton
          position="absolute"
          top={0}
          right={0}
          m={2}
          ref={btnRef}
          onClick={onOpen}
          aria-label="dashboard-info"
          colorScheme="primary"
          icon={<Icon icon="graph"/>}
        /> }
        <Drawer
          isOpen={isOpen}
          placement="right"
          size="xl"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerContent>
            <DrawerBody p={0} overflow="hidden">
              <DashboardInfoContent isOpen={isOpen}/>
            </DrawerBody>
            <DrawerFooter borderWidth={0} bgColor="primary.700" mt={-1}>
              <Button variant="outline" onClick={onClose} mb={2}>
                Voltar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  };

  return (
    <>
      <IconButton
        ref={btnRef}
        onClick={isOpen? onClose:onOpen}
        position="absolute"
        top={0}
        right={0}
        m={7}
        aria-label="dashboard-info"
        colorScheme="primary"
        icon={<Icon icon="graph"/>}
        zIndex={50}
        {...boxShadow()}
      />
      <DashboardInfoContent isOpen={isOpen}/>
    </>
  );
};

export { DashboardInfo };