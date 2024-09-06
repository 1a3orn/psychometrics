import { PageMain, Navbar, PageContent } from "../../components";
import { UserMainDataProvider } from "./UserMainDataProvider";
import { TaskCard } from "./components";
import { useContext } from "react";
import { UserMainDataContext } from "./UserMainDataProvider";
import { CardBase } from "../../components";

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
  const { tasks } = useContext(UserMainDataContext);
  return (
    <CardBase>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks.map((t) => (
          <TaskCard measure={t} />
        ))}
      </div>
    </CardBase>
  );
};
