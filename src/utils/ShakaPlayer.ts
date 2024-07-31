import { IBasePlayer, IExternalPlayer } from '@nativewaves/exp-core'
import logger from 'debug'
import shaka from 'shaka-player'

// eslint-disable-next-line no-console
logger.log = console.log.bind(console)
const log = logger('ShakaPlayer')

export class ShakaPlayer implements IExternalPlayer {
  private _nwPlayer?: IBasePlayer
  private shakaPlayer: any

  private get nwPlayer() {
    if (!this._nwPlayer) throw new Error('No NW player found')
    return this._nwPlayer
  }

  public init = (basePlayer: IBasePlayer) => {
    log('init', basePlayer)

    this._nwPlayer = basePlayer

    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll()

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.initPlayer()
    } else {
      // This browser does not have the minimum set of APIs we need.
      // eslint-disable-next-line no-console
      console.error('Browser not supported!')
    }
  }

  private initPlayer = async () => {
    // Create a Player instance.
    this.shakaPlayer = new shaka.Player()
    this.shakaPlayer.attach(this.nwPlayer.videoElement)
    log('init done', this.nwPlayer.videoElement)
  }

  public load = (src: string) => {
    log('load', src)
    this.shakaPlayer.load(src)
  }

  public destroy = () => {
    log('destroy')
    this.shakaPlayer.destroy()
  }
}
