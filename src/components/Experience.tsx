import { ExperienceBaseStandalone } from '@nativewaves/exp-default';
import { Env, PlaybackContainer, ThemeProvider } from '@nativewaves/exp-core';
import { Suspense } from 'react';

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
        <Suspense fallback={<div>Loading... </div>}>
          <ExperienceBaseStandalone routePath={'/'} />
        </Suspense>
      </PlaybackContainer>
    </ThemeProvider>
  );
};

export default Experience;
