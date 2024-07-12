import '../css/globals.css';


import Experience from '../components/Experience';



const App = () => {
if(typeof window === 'undefined') {
  return <span>window</span>
}
  return (
      <Experience
        manifestId='p78x43h3mgom6klx'
        envType='test'
      ></Experience>
  );
};

export default App;
