import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { DashboardInfo } from "../../components/DashboardInfo";
import { PageContainer } from "../../components/PageContainer";

function Dashboard() {
  return (
    <PageContainer 
      withoutClock
      display="flex"
      p={[6, 12, 12, 0]}
    >
      <Box w="100%" display="flex" justifyContent="flex-end">

      </Box>
      <DashboardInfo/>
    </PageContainer>
  );
};

export default Dashboard;