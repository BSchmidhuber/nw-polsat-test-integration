// Player types uncompleted
declare global {
  declare let CyfrowyPlayer: {
    VERSION: string;
    Player: {
      new (config: IPlayer.PlayerConfigObject): IPlayer.PlayerAPI;
    };
    CPError: any;
  };

  declare namespace IPlayer {
    interface PlayerConfigObject {
      container: HTMLDivElement | null;
      videoTag?: HTMLVideoElement | null;
      load?: any;
      playback?: any;
      options?: any;
    }

    class PlayerAPI {
      ready: Promise<void>;
      load(media: any, params?: any): Promise<void>;
      play(): Promise<void>;
      pause(): Promise<void>;
      seek(secondsToSeek: number): void;
      skip(skipToSeconds: number): void;
      getCurrentTime(): number;
      mute(): any;
      unmute(): any;
      destroy(): Promise<void>;
      enterFullscreen(): any;
      exitFullscreen(): any;
      getVideoTag(): HTMLVideoElement;
      onError: { attach: any };
      onStateChange: any;
      onPhaseChange: any;
      onPlaybackReady: any;
    }
  }
}

export {};
