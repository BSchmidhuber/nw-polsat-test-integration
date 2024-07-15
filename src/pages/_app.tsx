import "../css/globals.css";
import { QueryClientProvider, QueryClient } from "react-query";
import dynamic from "next/dynamic";

const queryClient = new QueryClient();

const Experience = dynamic(() => import("../components/Experience"), {
  ssr: false,
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Experience manifestId="p78x43h3mgom6klx" envType="test"></Experience>
    </QueryClientProvider>
  );
};

export default App;
