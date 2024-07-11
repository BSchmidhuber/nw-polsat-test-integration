"use client"

import { ExperienceBaseStandalone } from '@nativewaves/exp-default';
import { Env, PlaybackContainer, ThemeProvider } from '@nativewaves/exp-core';
import { useEffect, useState } from 'react';

type ExperienceProps = {
  manifestId: string;
  envType: Env;
}

const Experience: React.FC<ExperienceProps> = ({ manifestId, envType }) => {
  const [hasWindow, setHasWindow] = useState(false)

if (typeof window === 'undefined') {
  return <span>no window</span>
}

console.log('window', window)

return (
 
      <PlaybackContainer
        manifestId={manifestId}
        envType={envType}
      >
        <span>window</span>
        <span>{manifestId}, {envType}</span>
        <ExperienceBaseStandalone routePath={'/'} /> 
      </PlaybackContainer>
   
    
  );
};

export default Experience;
