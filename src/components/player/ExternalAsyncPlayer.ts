/**
 * This should simulate an external player!
 * It should not be implemented anywhere!
 */
export class ExternalAsyncPlayer {
  constructor(config?: any) {
    console.log("external async player created with config" + { config });
  }

  public get currentTime() {
    return Date.now().valueOf();
  }

  public get duration() {
    return 1000;
  }

  public get isLive() {
    return true;
  }

  public get ready() {
    return new Promise(res => setTimeout(res, 100));
  }

  public load = ({
    url,
    accessMethod,
  }: {
    url: string;
    accessMethod: string;
  }) => {
    console.log("external async player load " + { url, accessMethod });
  };

  public play = async () => {
    console.log("external async player plays");
  };

  public pause = () => {
    console.log("external async player pauses");
  };

  public seek = (currentTime: number) => {
    console.log("external async player seeking to " + currentTime);
  };

  public destroy = () => {
    console.log("external async player destroyed");
  };
}
