import { BaseLayoutDesktop, ExperiencePlayer, PlaybackContainer, VideoPlayerContainer } from '@nativewaves/exp-core';

type ExperienceProps = {
  manifestId: string;
  envType: string;
}

const Experience: React.FC<ExperienceProps> = ({ manifestId, envType }) => {
  return (
    <PlaybackContainer
      manifestId={manifestId}
      envType={envType}
    >
      <p>envType: <strong>{envType}</strong></p>
      <p>manifestId: <strong>{manifestId}</strong></p>

      <VideoPlayerContainer>
        <ExperiencePlayer />
        <BaseLayoutDesktop templateProps={{ show: true }} />
      </VideoPlayerContainer>
    </PlaybackContainer>
  );
};

export default Experience;
