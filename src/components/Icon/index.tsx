import { Icon as ChakraIcon, IconProps as ChakraIconProps } from "@chakra-ui/react";
import i from "./icons";

const icons = {
  "login": i.AiOutlineUser,
  "user": i.AiOutlineUser,
  "username": i.AiOutlineUser,
  "email": i.MdAlternateEmail,
  "password": i.GoLock,
  "checkPassword": i.GoLock,
  "moon": i.BsMoonStars,
  "sun": i.FiSun,
  "sunWithCloud": i.BsCloudSun,
  "graph": i.MdAutoGraph,
  "success": i.FiCheckCircle,
  "error": i.BiError,
  "info": i.VscInfo,
  "warning": i.MdNearbyError,
  "list": i.AiOutlineUnorderedList,
  "exit": i.ImExit,
  "home": i.IoHome
};

interface IconProps extends ChakraIconProps {
  icon: string;
};

function Icon({ icon, ...rest }: IconProps) {
  return (
    <ChakraIcon display="block" as={icons[icon]} {...rest}/>
  );
};

export { Icon };