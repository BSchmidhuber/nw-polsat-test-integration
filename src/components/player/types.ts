import { VideoHTMLAttributes } from "react";

export type PlayerState = Partial<{
  isPlaying: boolean;
  isLive: boolean;
  isBuffering: boolean;
  muted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isSeeking: boolean;
  fullscreen: boolean;
}>;

export type DRMConfig = {
  provider: string;
  licenseUrl: string;
};

export type LiveEdges = {
  /** how much before the duration value is the video played when live? */
  offset: number;
  /** how much time before the live value is considered as "live"? */
  threshold: number;
};

export type SeekData = {
  accurate?: boolean;
  counter?: number;
  duration?: number;
  delay?: number;
  currentTime: number;
};

export type SeekOptions = {
  isInitial?: boolean;
  timestamp?: number;
};

export type ISeekable = Pick<
  HTMLVideoElement,
  "currentTime" | "playbackRate" | "seekable" | "buffered" | "paused"
>;

export interface SeekStrategy<T = ISeekable> {
  validate: (delay: number) => {
    isAccurate: boolean;
    isApproximate: boolean;
  };
  algorythm: (player: T, delay: number) => void;
}

export type PlayerConfig = {
  mode?: "native" | "default";
  videoAttributes?: Partial<VideoHTMLAttributes<HTMLVideoElement>>;
  seekStrategy?: SeekStrategy;
  liveEdges?: LiveEdges;
};
