import type { PlayerConfig, PlayerState } from "./types";
import { INwPlayer } from "@nativewaves/exp-core";
import { ExternalAsyncPlayer } from "./ExternalAsyncPlayer";

export class PolsatPlayerWithoutBase implements INwPlayer {
  private playerInstance: ExternalAsyncPlayer;

  public videoElement: HTMLVideoElement;
  public onLoaded?: () => void;

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

  get playbackRate() {
    return this.videoElement.playbackRate;
  }

  set playbackRate(value: number) {
    const playbackRate = Math.min(Math.max(value, 0.5), 4);
    this.videoElement.playbackRate = playbackRate;
  }

  get buffered() {
    return this.videoElement.buffered;
  }

  get seekable() {
    return this.videoElement.seekable;
  }

  get currentTime() {
    return this.playerInstance.currentTime;
  }

  get duration() {
    return this.playerInstance.duration;
  }

  get isLive() {
    return this.playerInstance.isLive;
  }

  get volume() {
    return this.videoElement.volume;
  }

  set volume(value: number) {
    this.videoElement.volume = value;
  }

  get muted() {
    return this.videoElement.muted;
  }

  set muted(muted: boolean) {
    this.videoElement.muted = muted;
  }

  get paused() {
    return this.videoElement.paused;
    // or return this.playerInstance.isPaused;
  }

  get hasNetworkConnection() {
    // TODO your custom logic to check for network connection
    // you can also return just always true to not show any message
    return true;
  }

  public play() {
    this.playerInstance.play();
    // or this.videoElement.play()
  }

  public pause() {
    this.playerInstance.pause();
    // or this.videoElement.pause()
  }

  public async seek(currentTime: number) {
    // TODO your custom seek logic
    this.playerInstance.seek(currentTime);
    return { currentTime };
  }

  public async jump(value: number) {
    // TODO your custom jump logic
    const currentTime = this.currentTime + value;
    this.playerInstance.seek(currentTime);
    return { currentTime };
  }

  public load = (src: string) => {
    this.playerInstance.ready.then(() => {
      this.playerInstance.load({ url: src, accessMethod: "dash" });
    });
  };

  public destroy = () => {
    // TODO destroy interal stuff, like video element events, reset status, etc.
    this.playerInstance.destroy();
  };

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
