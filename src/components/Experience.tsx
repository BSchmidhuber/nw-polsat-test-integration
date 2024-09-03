import { Experience } from "@nativewaves/exp-default";
import { Env, PlaybackContainer } from "@nativewaves/exp-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createPlayer } from "../utils/create-player";

type EventType = "default" | "football" | "volleyball";

type ExperienceProps = {
  manifestId: string;
  envType: Env;
  eventType: EventType;
};

const queryClient = new QueryClient();

const ExperienceComponent: React.FC<ExperienceProps> = ({
  manifestId,
  envType,
}) => {
  return (
    <PlaybackContainer manifestId={manifestId} envType={envType}>
      <QueryClientProvider client={queryClient}>
        <Experience createPlayerFn={createPlayer} />
      </QueryClientProvider>
    </PlaybackContainer>
  );
};

export default ExperienceComponent;
