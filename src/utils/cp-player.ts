import { NwBasePlayer, SourceType } from '@nativewaves/exp-core';

export class CpPlayer extends NwBasePlayer {
  private playerInstance: IPlayer.PlayerAPI;
  private sourceType: SourceType;

  constructor(
    videoContainer: HTMLElement,
    onStateUpdate: (state: any) => void,
    sourceType: SourceType,
  ) {
    super(videoContainer, onStateUpdate);

    this.playerInstance = new CyfrowyPlayer.Player({
      container: videoContainer as HTMLDivElement,
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

  public set currentTime(currentTime) {
    this.playerInstance.skip(currentTime);
    // alternative:
    // this.videoElement.currentTime = currentTime;
  }

  public get currentTime() {
    return this.playerInstance.getCurrentTime();
  }

  public ready() {
    return this.playerInstance.ready;
  }

  public load(src: string) {
    console.log('load', src);
    this.registerVideoEvents(this.videoElement);
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

  public destroy() {
    console.log('destroy');
    this.removeVideoEvents(this.videoElement);
    this.playerInstance.destroy();
  }
}
