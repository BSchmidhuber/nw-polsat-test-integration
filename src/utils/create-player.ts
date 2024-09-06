import { CreatePlayerConfig, INwPlayer } from '@nativewaves/exp-core';
import { CpPlayer } from './cp-player';

// Temporary solution: videoContainer type override
type NewCreatePlayerConfig = CreatePlayerConfig & { videoContainer: any };
type NewCreatePlayerFn = (config: NewCreatePlayerConfig) => Promise<INwPlayer | null>;

export const createPlayer: NewCreatePlayerFn = async (createPlayerConfig) => {
  const { mediaType, sourceType, videoContainer, onPlayerStateUpdate } = createPlayerConfig;
  console.log('New player instance is requested with the following details:', createPlayerConfig);

  if (mediaType === 'video') {
    const playerInstance = new CpPlayer(videoContainer, onPlayerStateUpdate, sourceType);
    await playerInstance.ready();

    return playerInstance;
  }

  return null;
};
