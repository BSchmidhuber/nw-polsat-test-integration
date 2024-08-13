import { Experience } from "@nativewaves/exp-default";
import { Env, PlaybackContainer } from "@nativewaves/exp-core";

import {
  useFootballSidebarRoutes,
  useFootballVideoControlsProps,
} from "@nativewaves/nw-exp-football";

import {
  useVolleyballSidebarRoutes,
  useVolleyballVideoControlsProps,
} from "@nativewaves/nw-exp-volleyball";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type EventType = "default" | "football" | "volleyball";

type ExperienceProps = {
  manifestId: string;
  envType: Env;
  eventType: EventType;
};

const useExpProps = (eventType: EventType) => {
  const footballSidebarRoutes = useFootballSidebarRoutes();
  const volleyballSidebarRoutes = useVolleyballSidebarRoutes();

  const footballVideoControlsProps = useFootballVideoControlsProps();
  const volleyballVideoControlsProps = useVolleyballVideoControlsProps();

  switch (eventType) {
    case "default":
      return {};
    case "football":
      // Example: http://localhost:3000/exp/test/football/p78x43h3mgom6klx
      return {
        sidebarRoutes: footballSidebarRoutes,
        ...footballVideoControlsProps,
      };
    case "volleyball":
      // Example: http://localhost:3000/exp/prod/volleyball/k7pzw2cpyldnm1vo
      return {
        sidebarRoutes: volleyballSidebarRoutes,
        ...volleyballVideoControlsProps,
      };
  }
};

const queryClient = new QueryClient();

const ExperienceComponent: React.FC<ExperienceProps> = ({
  manifestId,
  envType,
  eventType,
}) => {
  return (
    <PlaybackContainer manifestId={manifestId} envType={envType}>
      <QueryClientProvider client={queryClient}>
        <NativeWavesExperience eventType={eventType} />
      </QueryClientProvider>
    </PlaybackContainer>
  );
};

const NativeWavesExperience: React.FC<any> = ({ eventType }) => {
  const expProps = useExpProps(eventType);
  return <Experience {...expProps} />;
};

export default ExperienceComponent;
