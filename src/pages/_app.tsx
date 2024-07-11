import '../css/globals.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import Experience from '../components/Experience';

const queryClient = new QueryClient();

const App = () => {
  if (!window) return <></>
  
  return (
    <QueryClientProvider client={queryClient}>
      <Experience
        manifestId=''
        envType='test'
      ></Experience>
    </QueryClientProvider>
  );
};

export default App;
