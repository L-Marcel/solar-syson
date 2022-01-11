import { Button, Input as ChakraInput, InputGroup, InputLeftElement, InputProps, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { boxShadow } from "../../theme/effects/shadow";
import { Icon } from "../Icon";

function Input({ children, type = "text", ...rest }: InputProps) {
  const [show, setShow] = useState(false);
  return (
    <InputGroup size="md">
      <InputLeftElement
        pointerEvents="none"
      >
        <Icon icon={rest.id} color="primary.500"/>
      </InputLeftElement>
      <ChakraInput
        pr={type === "password" && "6rem"}
        bg="white" 
        name={rest.id} 
        type={!show && type === "password"? "password":"text"}
        {...rest}
        {...boxShadow()}
      >
        {children}
      </ChakraInput>
      { type === "password" && <InputRightElement w="auto" right={0}>
        <Button 
          h="1.75rem" 
          size="sm"
          minW="min-content"
          mr="0.4rem"
          fontSize={12}
          onClick={() => setShow(s => !s)}
          colorScheme="primary"
          variant="outline"
        >
          {show ? "Esconder" : "Mostrar"}
        </Button>
      </InputRightElement> }
    </InputGroup>
  );
};

export { Input };