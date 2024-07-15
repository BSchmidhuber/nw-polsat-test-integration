import {
  PlaybackContainer,
  VideoPlayerContainer,
  BaseLayoutDesktop,
  ExperiencePlayer,
} from "@nativewaves/exp-core";

type ExperienceProps = {
  manifestId: string;
  envType: string;
};

const Experience: React.FC<ExperienceProps> = ({ manifestId, envType }) => {
  return (
    <PlaybackContainer manifestId={manifestId} envType={envType as any}>
      <>
        <span>
          {manifestId}, {envType}
        </span>
        <VideoPlayerContainer>
          <ExperiencePlayer />
          <BaseLayoutDesktop templateProps={{ show: true }} />
        </VideoPlayerContainer>
      </>
    </PlaybackContainer>
  );
};

export default Experience;
