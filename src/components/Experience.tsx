import { ExperienceBaseStandalone } from "@nativewaves/exp-default";
import { PlaybackContainer } from "@nativewaves/exp-core";
import { Suspense } from "react";

type ExperienceProps = {
  manifestId: string;
  envType: string;
};

const Experience: React.FC<ExperienceProps> = ({ manifestId, envType }) => {
  return (
    <PlaybackContainer manifestId={manifestId} envType={envType}>
      <Suspense fallback={<div>Loading... </div>}>
        <ExperienceBaseStandalone routePath={"/"} />
      </Suspense>
    </PlaybackContainer>
  );
};

export default Experience;
