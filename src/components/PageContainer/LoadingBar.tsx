import { Progress } from "@chakra-ui/react";
import { useIsLoading } from "../../hooks/useIsLoading";

function LoadingBar() {
  const { isLoading } = useIsLoading();
  console.log(isLoading);
  if(isLoading) {
    return (
      <Progress 
        isIndeterminate
        colorScheme="primary"
        w="100%"
        h={2}
        position="absolute"
        top={0}
      />
    );
  };
  
  return null;
};

export { LoadingBar };