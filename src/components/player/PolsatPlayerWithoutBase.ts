import type { PlayerConfig, PlayerState } from "./types";
import { INwPlayer } from "@nativewaves/exp-core";
import { ExternalAsyncPlayer } from "./ExternalAsyncPlayer";

/**
 * This is the minimal implementation for a player
 * and a simulated external player using async loading.
 */
export class PolsatPlayerWithoutBase implements INwPlayer {
  private playerInstance: ExternalAsyncPlayer;

  public videoElement: HTMLVideoElement;
  public onLoaded?: () => void;

  /**
   * HTML video element and player instance should be created here
   */

  constructor(
    videoContainer: HTMLElement | string,
    onStateUpdate: (state: PlayerState) => void,
    isLiveMode: boolean,
    config?: PlayerConfig
  ) {
    this.videoElement = document.createElement("video");
    this.getVideoContainer(videoContainer).appendChild(this.videoElement);
    this.registerVideoEvents(onStateUpdate);

    this.playerInstance = new ExternalAsyncPlayer({
      videoElement: this.videoElement,
      lowLatencyMode: isLiveMode,
      customConfig: config,
    });
  }

  /**
   * you could use the value of the video element OR the value of the
   * player instance here, if it's offered by the player instance
   */
  get playbackRate() {
    return this.videoElement.playbackRate;
  }

  /**
   * you could use the value of the video element OR the value of the
   * player instance here, if it's offered by the player instance
   */
  set playbackRate(value: number) {
    const playbackRate = Math.min(Math.max(value, 0.5), 4);
    this.videoElement.playbackRate = playbackRate;
  }

  /**
   * you could use the value of the video element OR the value of the
   * player instance here, if it's offered by the player instance
   */
  get buffered() {
    return this.videoElement.buffered;
  }

  /**
   * you could use the value of the video element OR the value of the
   * player instance here, if it's offered by the player instance
   */
  get seekable() {
    return this.videoElement.seekable;
  }

  /**
   * you could use the value of the video element OR the value of the
   * player instance here, if it's offered by the player instance
   */
  get currentTime() {
    return this.playerInstance.currentTime;
  }

  /**
   * you could use the value of the video element OR the value of the
   * player instance here, if it's offered by the player instance
   */
  get duration() {
    return this.playerInstance.duration;
  }

  /**
   * you could use the value of the video element OR the value of the
   * player instance here, if it's offered by the player instance
   */
  get isLive() {
    return this.playerInstance.isLive;
  }

  /**
   * you could use the value of the video element OR the value of the
   * player instance here, if it's offered by the player instance
   */
  get volume() {
    return this.videoElement.volume;
  }

  /**
   * you could use the value of the video element OR the value of the
   * player instance here, if it's offered by the player instance
   */
  set volume(value: number) {
    this.videoElement.volume = value;
  }

  /**
   * you could use the value of the video element OR the value of the
   * player instance here, if it's offered by the player instance
   */
  get muted() {
    return this.videoElement.muted;
  }

  /**
   * you could use the value of the video element OR the value of the
   * player instance here, if it's offered by the player instance
   */
  set muted(muted: boolean) {
    this.videoElement.muted = muted;
  }

  /**
   * you could use the value of the video element OR the value of the
   * player instance here, if it's offered by the player instance
   */
  get paused() {
    return this.videoElement.paused;
  }

  /**
   * you can add a custom logic here to inform the experience player
   * about not working network connection. Can be set to true statically
   * to not use this feature.
   */
  get hasNetworkConnection() {
    return true;
  }

  /**
   * you could use the function of the video element OR the function of the
   * player instance here, if it's offered by the player instance
   */
  public play() {
    this.playerInstance.play();
  }

  /**
   * you could use the function of the video element OR the function of the
   * player instance here, if it's offered by the player instance
   */
  public pause() {
    this.playerInstance.pause();
  }

  /**
   * you could implement a custom seeking logic or use it from the player instance,
   * but it would be highly recommended to use the seek logic from the NwBasePlayer
   * class, since there is a lot of special seeking logic inside.
   */
  public async seek(currentTime: number) {
    this.playerInstance.seek(currentTime);
    return { currentTime };
  }

  /**
   * similar to the seek logic, just with calculating the current time value before
   */
  public async jump(value: number) {
    const currentTime = this.currentTime + value;
    this.playerInstance.seek(currentTime);
    return { currentTime };
  }

  /**
   * tell your player instance to load a specific stream source
   */
  public load = (src: string) => {
    this.playerInstance.load({ url: src, accessMethod: "dash" });
  };

  /**
   * will be called when the player isn't needed any more, you can destroy
   * you player instance, video element event handlers, reset status etc...
   */
  public destroy = () => {
    this.playerInstance.destroy();
  };

  /**
   * just a helper function to get the video container HTML element
   */
  private getVideoContainer(value: HTMLElement | string) {
    let videoContainer = null;

    if (typeof value === "string") {
      videoContainer = document.getElementById(value);
    } else {
      videoContainer = value;
    }

    if (!videoContainer) {
      throw new Error(
        "options.videoContainer is not a valid selector or DOM element."
      );
    }
    return videoContainer;
  }

  /**
   * registering video events to be able to send state updates to the
   * experience player. This would be important so the video controls
   * would update their state.
   */
  private registerVideoEvents(onStateUpdate: (state: PlayerState) => void) {
    this.videoElement.addEventListener("timeupdate", () => {
      onStateUpdate({
        currentTime: this.currentTime,
        duration: this.duration,
        isLive: this.isLive,
      });
    });

    this.videoElement.addEventListener("playing", () => {
      onStateUpdate({ isPlaying: true, isBuffering: false });
    });
    this.videoElement.addEventListener("pause", () => {
      onStateUpdate({ isPlaying: false });
    });
    this.videoElement.addEventListener("waiting", () => {
      onStateUpdate({ isPlaying: false, isBuffering: true });
    });
    this.videoElement.addEventListener("canplay", () => {
      onStateUpdate({ isBuffering: false });
    });
    this.videoElement.addEventListener("volumechange", () => {
      onStateUpdate({
        muted: this.muted,
        volume: this.volume,
      });
    });
    this.videoElement.addEventListener("loadeddata", () => {
      this.onLoaded?.();
    });
  }
}
