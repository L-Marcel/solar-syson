import { Box } from "@chakra-ui/react";
import { Button } from "../../components/Button";
import { DashboardInfo } from "../../components/DashboardInfo";
import { PageContainer } from "../../components/PageContainer";
import { useLogout } from "../../hooks/useLogout";

function Dashboard() {
  const logout = useLogout();

  return (
    <PageContainer 
      withoutClock
      display="flex"
      p={[6, 12, 12, 0]}
    >
      <Box w="100%" display="flex" justifyContent="flex-end">
        <Button onClick={logout}>
          Sair
        </Button>
      </Box>
      <DashboardInfo/>
    </PageContainer>
  );
};

export default Dashboard;