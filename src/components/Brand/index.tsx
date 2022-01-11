import { Divider, Heading, Text } from "@chakra-ui/react";

interface BrandProps {
  withoutDivider?: boolean;
  text?: string;
};

function Brand({ withoutDivider = false, text }: BrandProps) {
  return (
    <>
      <Heading
        color="primary.700"
      >
        Solar <span>Sys</span>.on
      </Heading>
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