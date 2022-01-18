import { Divider, Heading, HStack, Text } from "@chakra-ui/react";

interface BrandProps {
  withoutDivider?: boolean;
  text?: string;
  menu?: JSX.Element;
};

function Brand({ withoutDivider = false, text, menu }: BrandProps) {
  return (
    <>
      <HStack spacing={2}>
        {menu}
        <Heading
          color="primary.700"
        >
          Solar <span>Sys</span>.on
        </Heading>
      </HStack>
      { !withoutDivider && <Divider w={300} h={2} color="primary.600"/> }
      { text && <Text
        mt={2}
        fontSize={22}
        color="primary.600"
      >
        {text}
      </Text> }
    </>
  );
};

export { Brand };