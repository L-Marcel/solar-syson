import { Icon as ChakraIcon, IconProps as ChakraIconProps } from "@chakra-ui/react";
import i from "./icons";

const icons = {
  "user": i.AiOutlineUser,
  "email": i.MdAlternateEmail,
  "password": i.GoLock,
  "checkPassword": i.GoLock,
  "moon": i.BsMoonStars,
  "sun": i.FiSun,
  "sunWithCloud": i.BsCloudSun,
  "graph": i.MdAutoGraph
};

interface IconProps extends ChakraIconProps {
  icon: string;
};

function Icon({ icon, ...rest }: IconProps) {
  return (
    <ChakraIcon as={icons[icon]} {...rest}/>
  );
};

export { Icon };