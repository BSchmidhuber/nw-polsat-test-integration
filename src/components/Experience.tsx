import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createPlayer } from "../utils/create-player";
import { Experience } from "@nativewaves/exp-app-config-loader";
import { experienceHooks } from "@nativewaves/exp-app-experiences-loader";

type EnvType = "prod" | "test" | "dev";

type ExperienceProps = {
  manifestId: string;
  envType: EnvType;
};

const queryClient = new QueryClient();

const getConfigIdByEnvType = (envType: EnvType) => {
  switch (envType) {
    case "dev":
      return "5z2ed7df33m7m0nz";
    case "test":
      return "vlkqw3s38j6jn0lo";
    case "prod":
      return "27zdl0c1zmld926q";
  }
};

const ExperienceComponent: React.FC<ExperienceProps> = ({
  manifestId,
  envType,
}) => {
  const configId = getConfigIdByEnvType(envType);

  return (
    <QueryClientProvider client={queryClient}>
      <Experience
        manifestId={manifestId}
        envType={envType}
        appConfigId={configId}
        expHooks={experienceHooks}
        createPlayerFn={createPlayer}
        sourceTypes={["dash", "hls", "mp4"]}
      />
    </QueryClientProvider>
  );
};

export default ExperienceComponent;
