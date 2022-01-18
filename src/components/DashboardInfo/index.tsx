import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerOverlay, IconButton, SlideFade, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
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

  return (
    <>
      { !isOpen && <IconButton
        position="absolute"
        top={0}
        right={0}
        m={[4, 6]}
        ref={btnRef}
        onClick={onOpen}
        aria-label="dashboard-info"
        colorScheme="primary"
        icon={<Icon icon="graph"/>}
        {...boxShadow(true)}
      /> }
      <Drawer
        isOpen={isOpen}
        placement="right"
        size={!isWideOrNormalVersion? "xl":"md"}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>
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

export { DashboardInfo };