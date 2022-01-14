import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { boxShadow } from "../../theme/effects/shadow";
import { Icon } from "../Icon";

interface ToastProps {
  title: string;
  status: "success" | "info" | "warning" | "error";
  description?: string;
};

const colors = {
  "success": { primary: "green.500", secondary: "green.50" },
  "info": { primary: "blue.500", secondary: "blue.50" },
  "warning": { primary: "orange.500", secondary: "orange.50" },
  "error": { primary: "red.500", secondary: "red.50" },
};

function CustomToast({ title, description = "", status }: ToastProps) {
  return (
    <Box
      className="container"
      m={4}
      bgColor={colors[status].secondary}
      p={3}
      py={4}
      borderRadius={8}
      display="flex"
      borderLeftWidth={3}
      borderLeftColor={colors[status].primary}
      {...boxShadow()}
    >
      <Icon 
        icon={status}
        fontSize={25}
        mr={2}
        color={colors[status].primary}
      />
      <VStack
        spacing={"1px"}
        alignItems="left"
      >
        <Heading
          fontSize={20}
          color={colors[status].primary}
        >
          {title}
        </Heading>
        { description && <Text fontSize={13}>{description}</Text>}
      </VStack>
    </Box>
  );
};

export { CustomToast };