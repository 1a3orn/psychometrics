import { PageMain, Navbar, PageContent, List, BasicCard } from "../../components";
import { ALL_MEASURES } from "../measures/measures";
import { UserMainDataProvider } from "./UserMainDataProvider";

export const UserDashbooardPage = () => {
  return (
    <UserMainDataProvider>
      <PageMain>
        <Navbar title="Main" />
        <PageContent>
          <UserDashContent />
        </PageContent>
      </PageMain>
    </UserMainDataProvider>
  );
};

export const UserDashContent = () => {
  return (
    <BasicCard title="Possible Measures">
      <List elements={ALL_MEASURES} />
    </BasicCard>
  );
};
