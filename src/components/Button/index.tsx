import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import { boxShadow } from "../../theme/effects/shadow";

function Button({ children, ...rest }: ButtonProps) {
  return (
    <ChakraButton
      colorScheme="primary"
      variant="outline"
      bg="white"
      w="min"
      {...boxShadow()}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};

export { Button };