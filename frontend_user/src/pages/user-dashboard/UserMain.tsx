import { PageMain, Navbar, PageContent } from "../../components";
import { UserMainDataProvider } from "./UserMainDataProvider";
import { TaskCard } from "./components";
import { useContext } from "react";
import { UserMainDataContext } from "./UserMainDataProvider";

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

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm">
      <div className="p-4">{children}</div>
    </div>
  );
};

export const UserDashContent = () => {
  const { tasks } = useContext(UserMainDataContext);

  return (
    <Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks.map((t) => (
          <TaskCard measure={t} />
        ))}
      </div>
    </Card>
  );
};
