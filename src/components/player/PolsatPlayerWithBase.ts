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

  /**
   * HTML video element and player instance should be created here
   */
  constructor(
    videoContainer: HTMLElement | string,
    onStateUpdate: (state: PlayerState) => void,
    isLiveMode: boolean,
    config?: PlayerConfig
  ) {
    super(videoContainer, onStateUpdate, config);
    this.videoElement = this.createVideoElement();

    this.playerInstance = new ExternalAsyncPlayer({
      videoElement: this.videoElement,
      lowLatencyMode: isLiveMode,
      customConfig: config,
    });
  }

  /**
   * only needed if you want to override the default behaviour
   * (= reading current time value of the video element)
   */
  get currentTime() {
    return this.playerInstance.currentTime;
  }

  /**
   * only needed if you want to override the default behaviour
   * (= calling videoElement.play())
   */
  public play() {
    return this.playerInstance.play();
  }

  /**
   * only needed if you want to override the default behaviour
   * (= calling videoElement.pause())
   */
  public pause() {
    this.playerInstance.pause();
  }

  /**
   * tell your player instance to load a specific stream source
   */
  public load = (src: string) => {
    this.playerInstance.ready.then(() => {
      this.playerInstance.load({ url: src, accessMethod: "dash" });
    });
  };

  /**
   * will be called when the player isn't needed any more, you can destroy
   * you player instance, video element event handlers, reset status etc...
   */
  public destroy = () => {
    this.playerInstance.destroy();
    super.destroy();
  };
}
