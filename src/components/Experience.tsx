import { Experience } from "@nativewaves/exp-default";
import {
  CreatePlayerFn,
  Env,
  INwPlayer,
  PlaybackContainer,
} from "@nativewaves/exp-core";

import {
  useFootballSidebarRoutes,
  useFootballVideoControlsProps,
} from "@nativewaves/nw-exp-football";

import {
  useVolleyballSidebarRoutes,
  useVolleyballVideoControlsProps,
} from "@nativewaves/nw-exp-volleyball";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCallback } from "react";
import { PolsatPlayerWithBase } from "./player/PolsatPlayerWithBase";
import { ExternalAsyncPlayer } from "./player/ExternalAsyncPlayer";

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
      // Example: http://localhost:3000/exp/prod/football/z6y2woadq1wygj7e
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

  const createPlayer: CreatePlayerFn = useCallback(
    async (createPlayerConfig) => {
      const {
        mediaType,
        sourceType,
        isLiveMode,
        videoContainer,
        onPlayerStateUpdate,
      } = createPlayerConfig;

      console.log(
        "New player instance is requested with the following details:",
        createPlayerConfig
      );

      if (mediaType === "video" && sourceType === "dash") {
        const playerInstance = new ExternalAsyncPlayer(createPlayerConfig);
        await playerInstance.ready;

        // return video-specific dash player
        return new PolsatPlayerWithBase(
          videoContainer,
          onPlayerStateUpdate,
          isLiveMode
        );
      }

      // fallback to default NW player
      return null;
    },
    []
  );

  return <Experience {...expProps} createPlayerFn={createPlayer} />;
};

export default ExperienceComponent;
