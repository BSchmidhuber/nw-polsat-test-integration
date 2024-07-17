import { Experience as NwExperience } from "@nativewaves/exp-default";
import { Env, PlaybackContainer } from "@nativewaves/exp-core";
import { Suspense } from "react";

type ExperienceProps = {
  manifestId: string;
  envType: Env;
};

const Experience: React.FC<ExperienceProps> = ({ manifestId, envType }) => {
  return (
    <PlaybackContainer manifestId={manifestId} envType={envType}>
      <Suspense fallback={<div>Loading... </div>}>
        <NwExperience routePath={"/"} />
      </Suspense>
    </PlaybackContainer>
  );
};

export default Experience;
