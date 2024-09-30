import { CreatePlayerFn } from '@nativewaves/exp-core';
import { CpPlayer } from './cp-player';

export const createPlayer: CreatePlayerFn = async (createPlayerConfig) => {
  const { mediaType, sourceType, videoContainer, onPlayerStateUpdate } = createPlayerConfig;
  console.log('New player instance is requested with the following details:', createPlayerConfig);

  if (mediaType === 'video') {
    const playerInstance = new CpPlayer(videoContainer, onPlayerStateUpdate, sourceType);
    await playerInstance.ready();

    return playerInstance;
  }

  return null;
};
