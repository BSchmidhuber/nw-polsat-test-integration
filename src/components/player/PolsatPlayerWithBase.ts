import type { PlayerConfig, PlayerState } from "./types";
import { NwBasePlayer } from "@nativewaves/exp-core";
import { ExternalAsyncPlayer } from "./ExternalAsyncPlayer";

/**
 * This is the minimal implementation for a player
 * with using our NwBasePlayer class and a simulated
 * external player using async loading.
 */
export class PolsatPlayerWithBase extends NwBasePlayer {
  private playerInstance: ExternalAsyncPlayer;

  constructor(
    videoContainer: HTMLElement | string,
    onStateUpdate: (state: PlayerState) => void,
    isLiveMode: boolean,
    config?: PlayerConfig
  ) {
    super(videoContainer, onStateUpdate, config)
    this.videoElement = this.createVideoElement()

    this.playerInstance = new ExternalAsyncPlayer({
      videoElement: this.videoElement,
      lowLatencyMode: isLiveMode,
      customConfig: config,
    });
  }

  get currentTime() {
    // only needed if you want to override the default behaviour
    // (reading of the video element)
    return this.playerInstance.currentTime;
  }

  public play() {
    // only needed if you want to override the default behaviour
    // (reading of the video element)
    this.playerInstance.play();
    return super.play()
  }

  public pause() {
    // only needed if you want to override the default behaviour
    // (reading of the video element)
    this.playerInstance.pause();

    // call functionality of base class
    super.pause()
  }

  public load = (src: string) => {
    this.playerInstance.ready.then(() => {
      this.playerInstance.load({ url: src, accessMethod: "dash" });
    });

    // call functionality of base class
    super.load(src)
  };

  public destroy = () => {
    this.playerInstance.destroy();
    super.destroy()
  };
}
