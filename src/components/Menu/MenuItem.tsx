import { HStack, Kbd, MenuItem as ChakraMenuItem, MenuItemProps as ChakraMenuItemProps, Text } from "@chakra-ui/react";
import { Icon } from "../Icon";

interface MenuItemProps extends ChakraMenuItemProps {
  i: string;
};

function MenuItem({ children, i, command, ...rest }: MenuItemProps) {
  return (
    <ChakraMenuItem
      icon={<Icon 
        icon={i} 
        fontSize="1.2rem"
        ml={1}
      />}
      iconSpacing={1}
      _hover={{
        bgColor: "whitesmoke"
      }}
      {...rest}
      command=""
    >
      <HStack mb="1px" justifyContent="space-between" spacing={8}>
        <Text>{children}</Text>
        <Text pb="2px">
          {command.split(" + ").map((c, i) => {
            return (
              <>
                {i > 0 && " + "}
                <Kbd bgColor="primary.600" color="white" borderColor="primary.700">{c}</Kbd>
              </>
            );
          })}
        </Text>
      </HStack>
    </ChakraMenuItem>
  );
};

export { MenuItem };