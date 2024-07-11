"use client"

import { ExperienceBaseStandalone } from '@nativewaves/exp-default';
import { Env, PlaybackContainer, ThemeProvider } from '@nativewaves/exp-core';

type ExperienceProps = {
  manifestId: string;
  envType: Env;
}

const Experience: React.FC<ExperienceProps> = ({ manifestId, envType }) => {
  return (
    <ThemeProvider>
      <PlaybackContainer
        manifestId={manifestId}
        envType={envType}
      >
        <ExperienceBaseStandalone routePath={'/'} />
      </PlaybackContainer>
    </ThemeProvider>
  );
};

export default Experience;
