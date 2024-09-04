import { Experience } from "@nativewaves/exp-default";
import { Env, PlaybackContainer } from "@nativewaves/exp-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createPlayer } from "../utils/create-player";
import { useExpAppConfig } from "@nativewaves/exp-app-config-loader";
import { useExpProps } from "@nativewaves/exp-app-experiences-loader";
import { ThemeProvider } from "styled-components";

type ExperienceProps = {
  manifestId: string;
  envType: Env;
};

const queryClient = new QueryClient();

const getConfigIdByEnvType = (envType: Env) => {
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
  const expAppConfig = useExpAppConfig(envType, manifestId, configId);

  if (!expAppConfig.configReady) {
    return <>EXP App Config loading...</>;
  }

  return (
    <PlaybackContainer manifestId={manifestId} envType={envType}>
      <QueryClientProvider client={queryClient}>
        <NativeWavesExperience
          expHandlerId={expAppConfig.expHandlerId}
          theme={expAppConfig.theme}
        />
      </QueryClientProvider>
    </PlaybackContainer>
  );
};

const NativeWavesExperience: React.FC<any> = ({ expHandlerId, theme }) => {
  const expProps = useExpProps({ expHandlerId });
  return (
    <ThemeProvider theme={theme}>
      <Experience
        createPlayerFn={createPlayer}
        sourceTypes={["dash"]}
        layout="polsat"
        {...expProps}
      />
    </ThemeProvider>
  );
};

export default ExperienceComponent;
