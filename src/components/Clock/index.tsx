import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Icon } from "../Icon";

function Clock() {
  const [date, setDate] = useState<ClockTimer>();

  function formatDate(date: Date): ClockTimer {
    return { 
      time: new Intl.DateTimeFormat("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
        }).format(date),
      hours: date.getHours()
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(formatDate(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, [date])

  if(!date) {
    return null;
  };

  return (
    <Box
      position="absolute"
      p={[6, 12, 24]}
      top={[null,0]}
      bottom={[0, null]}
      right={0}
      color="primary.700"
      display="flex"
    >
      <Heading>
        {date.time}
      </Heading>
      <Icon
        ml={4}
        fontSize={40}
        icon={date.hours >= 18 || date.hours < 6 ? "moon":"sun"}
      />
    </Box>
  );
};

export { Clock };