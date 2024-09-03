import { NwBasePlayer, SourceType } from '@nativewaves/exp-core';

export class CpPlayer extends NwBasePlayer {
  private playerInstance: IPlayer.PlayerAPI;
  private sourceType: SourceType;

  constructor(
    videoContainer: HTMLDivElement,
    onStateUpdate: (state: any) => void,
    sourceType: SourceType,
  ) {
    super(videoContainer, onStateUpdate);

    this.playerInstance = new CyfrowyPlayer.Player({
      container: videoContainer,
      load: {
        preload: false,
      },
      options: {
        forceCac: false,
        forceBasicShakaEngine: true,
        disableAutoPlayTest: true,
      },
      playback: {
        mute: true,
      },
    });

    this.sourceType = sourceType;
  }

  public get videoElement() {
    return this.playerInstance.getVideoTag();
  }

  public get currentTime() {
    return this.playerInstance.getCurrentTime();
  }

  public ready() {
    return this.playerInstance.ready;
  }

  public load(src: string) {
    console.log('load', src);
    this.playerInstance.load({ url: src, accessMethod: this.sourceType });
  }

  public async play() {
    console.log('play');
    await this.playerInstance.play();
  }

  public async pause() {
    console.log('pause');
    await this.playerInstance.pause();
  }

  public async seek(currentTime: number) {
    console.log('seek', currentTime);
    this.playerInstance.skip(currentTime);
    return { currentTime };
  }

  public async jump(value: number) {
    console.log('jump', value);
    const currentTime = this.currentTime + value;
    this.playerInstance.skip(currentTime);
    return { currentTime };
  }

  public destroy() {
    console.log('destroy');
    this.playerInstance.destroy();
  }
}
