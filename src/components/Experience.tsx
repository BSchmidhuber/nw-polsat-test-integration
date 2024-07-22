import { Experience as NwExperience } from "@nativewaves/exp-default";
import { Env, PlaybackContainer } from "@nativewaves/exp-core";
import { Suspense } from "react";

import {
  useFootballSidebarRoutes,
  useFootballVideoControlsProps,
} from "@nativewaves/nw-exp-football";

import {
  useVolleyballSidebarRoutes,
  useVolleyballVideoControlsProps
} from "@nativewaves/nw-exp-volleyball";

type EventType = "default" | "football" | "volleyball";

type ExperienceProps = {
  manifestId: string;
  envType: Env;
  eventType: EventType;
};

const useExpProps = (eventType: EventType) => {
  const fbSR = useFootballSidebarRoutes()
  const vbSR = useVolleyballSidebarRoutes()
  
  const fbVCP = useFootballVideoControlsProps()
  const vbVCP = useVolleyballVideoControlsProps()
  
  switch (eventType) {
    case "default":
      return {};
    case "football":
      return { fbSR, ...fbVCP };
    case "volleyball":
      return { vbSR, ...vbVCP };
  }
};

const Experience: React.FC<ExperienceProps> = ({
  manifestId,
  envType,
  eventType,
}) => {
  const expProps = useExpProps(eventType);
  console.log('BS expProps', expProps)

  return (
    <PlaybackContainer manifestId={manifestId} envType={envType}>
      <Suspense fallback={<div>Loading... </div>}>
        <NwExperience routePath={"/"} {...expProps} />
      </Suspense>
    </PlaybackContainer>
  );
};

export default Experience;
