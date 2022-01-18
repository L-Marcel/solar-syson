import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuDivider,
  IconButton,
  MenuButtonProps
} from "@chakra-ui/react"
import { useRouter } from "next/router";
import { KeyboardEvent, useEffect, useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import { boxShadow } from "../../theme/effects/shadow";
import { Icon } from "../Icon";
import { MenuItem } from "./MenuItem";

interface MenuProps extends MenuButtonProps {};

function Menu({ ...rest }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();
  const router = useRouter();

  function onExit() {
    logout();
  };

  useEffect(() => {
    document.addEventListener("keydown", (ev: any) => {
      const e: KeyboardEvent = ev;
      
      if(e) {
        if (e.altKey) {
          setIsOpen(true);
        }
        
        if (e.altKey && e.key.toLowerCase() == "e") { //crtl + del
          e.preventDefault();
          onExit();
        };
      };

      return {} as any;
    });
  }, []);

  return (
    <ChakraMenu isOpen={isOpen}>
      <MenuButton
        onClick={() => setIsOpen(isOpen => !isOpen)}
        p={2}
        borderRadius={8}
        top={0}
        left={0}
        color="primary.700"
        display="flex"
        zIndex={100}
        bgColor="white"
        as={IconButton}
        aria-label="Options"
        icon={<Icon icon="list"/>}
        variant="outline"
        {...rest}
        {...boxShadow(true)}
      />
      <MenuList 
        color="primary.700"
        {...boxShadow(true)}
        open
      >
        <MenuItem 
          command="alt + e"
          i="exit"
          onClick={onExit}
        >
          Sair
        </MenuItem>
      </MenuList>
    </ChakraMenu>
  );
};

export { Menu };