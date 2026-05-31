import { ErrorConfirmation } from "@/04.widgets";

interface IAppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<IAppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen mx-auto w-full">
      {children}
      <ErrorConfirmation />
    </div>
  );
};

export default AppLayout;
