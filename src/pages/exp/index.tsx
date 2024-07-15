import dynamic from 'next/dynamic';

const DynamicExperience = dynamic(() => import('../../components/Experience'), {
  ssr: false,
});

const Exp = () => {
  return (
    <>
      <h1>Experience</h1>
      <DynamicExperience
        manifestId=''
        envType='test'
      />
    </>
  );
}

export default Exp;
