import '../css/globals.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { QueryClientProvider as QCP, QueryClient as QC } from '@tanstack/react-query';
import Experience from '../components/Experience';

const queryClient = new QueryClient();

const qc = new QC()

const App = () => {

  return (
    <QCP client={qc}>
    <QueryClientProvider client={queryClient}>
      <Experience
        manifestId='j7r31vhy8pp4w97m'
        envType='test'
      ></Experience>
    </QueryClientProvider></QCP>
  );
};

export default App;
