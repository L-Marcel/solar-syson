import { Button, Input as ChakraInput, InputGroup, InputLeftElement, InputProps as ChakraInputProps, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { boxShadow } from "../../theme/effects/shadow";
import { Icon } from "../Icon";

interface InputProps extends ChakraInputProps {
  errors?: ValidationError[]
};

function Input({ children, errors = [], type = "text", ...rest }: InputProps) {
  const [show, setShow] = useState(false);
  
  const error = errors.find(v => v.id === rest.id);

  return (
    <>
      <InputGroup size="md">
        <InputLeftElement
          pointerEvents="none"
        >
          <Icon icon={rest.id} color={error? "red.500":"primary.500"}/>
        </InputLeftElement>
        <ChakraInput
          pr={type === "password" && "6rem"}
          bg="white" 
          name={rest.id} 
          type={!show && type === "password"? "password":"text"}
          isInvalid={!!error}
          _invalid={{
            borderColor: "red.500",
            color: "red.400"
          }}
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
            colorScheme={error? "red":"primary"}
            variant="outline"
          >
            {show ? "Esconder" : "Mostrar"}
          </Button>
        </InputRightElement> }
      </InputGroup>
      { error && <Text mt={1} fontSize={14} color="red.500">{error.message}</Text> }
    </>
  );
};

export { Input };