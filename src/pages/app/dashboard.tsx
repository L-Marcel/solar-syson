import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Button } from "../../components/Button";
import { DashboardInfo } from "../../components/DashboardInfo";
import { PageContainer } from "../../components/PageContainer";
import { useLogout } from "../../hooks/useLogout";

function Dashboard() {
  const router = useRouter();
  const logout = useLogout();

  return (
    <PageContainer 
      withoutClock
      display="flex"
      p={[6, 12, 12, 0]}
    >
      <Box w="100%" display="flex" justifyContent="flex-end">
        <Button onClick={async() => {
          const canRedirect = await logout();
          if(canRedirect) {
            router.push("/");
          };
        }}>
          Sair
        </Button>
      </Box>
      <DashboardInfo/>
    </PageContainer>
  );
};

export default Dashboard;