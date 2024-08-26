import { PageMain, Navbar, PageContent, List, BasicCard } from "../../components";
import { ALL_MEASURES } from "../measures/measures";
import { UserMainProvider } from "./UserMainContext";

export const UserDashbooardPage = () => {
  return (
    <PageMain>
      <Navbar title="Main" />
      <PageContent>
        <UserMainProvider>
          <UserDashContent />
        </UserMainProvider>
      </PageContent>
    </PageMain>
  );
};

export const UserDashContent = () => {
  return (
    <BasicCard title="Possible Measures">
      <List elements={ALL_MEASURES} />
    </BasicCard>
  );
};
