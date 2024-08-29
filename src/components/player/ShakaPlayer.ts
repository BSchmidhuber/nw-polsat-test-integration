import shaka from "shaka-player";

import type { PlayerConfig, PlayerState } from "./types";
import { NwBasePlayer } from "@nativewaves/exp-core";

export class ShakaPlayer extends NwBasePlayer {
  private shakaPlayer: shaka.Player;

  constructor(
    videoContainer: HTMLElement | string,
    onStateUpdate: (state: PlayerState) => void,
    isLiveMode: boolean,
    config?: PlayerConfig
  ) {
    super(videoContainer, onStateUpdate, config);
    this.videoElement = this.createVideoElement();

    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.shakaPlayer = new shaka.Player();
      this.shakaPlayer.attach(this.videoElement);
      if (isLiveMode) {
        this.shakaPlayer.configure({ streaming: { lowLatencyMode: true } });
      }
    } else {
      // This browser does not have the minimum set of APIs we need.
      throw new Error("Browser not supported!");
    }
  }

  public load = (src: string) => {
    this.shakaPlayer.load(src);
    super.load(src);
  };

  public destroy = () => {
    this.shakaPlayer.destroy();
    super.destroyVideoElement();
    super.destroy();
  };
}
