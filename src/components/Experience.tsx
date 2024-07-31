import { Experience as NwExperience } from "@nativewaves/exp-default";
import { Env, PlaybackContainer } from "@nativewaves/exp-core";
import { Suspense, useMemo } from "react";
import { ShakaPlayer } from "../utils/ShakaPlayer";

type ExperienceProps = {
  manifestId: string;
  envType: Env;
};

const Experience: React.FC<ExperienceProps> = ({ manifestId, envType }) => {
  const polsatPlayer = useMemo(() => {
    return new ShakaPlayer();
  }, []);

  return (
    <PlaybackContainer manifestId={manifestId} envType={envType}>
      <Suspense fallback={<div>Loading... </div>}>
        <NwExperience routePath={"/"} player={polsatPlayer} />
      </Suspense>
    </PlaybackContainer>
  );
};

export default Experience;
