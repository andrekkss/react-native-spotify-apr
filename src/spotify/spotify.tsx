import SpotifyConfig from "./model/spotify_config";
import SpotifyAPR from '../module/index';
import type IPlaylist from "./model/spotify_playlist";
import spotify_service from "./service/spotify_service";
import type IPlaylistResponse from "./model/spotify_playlist_service_response";

export default class Spotify {
    config: SpotifyConfig;

    constructor(clientID: string, clientUrlCallback: string){
        const config = new SpotifyConfig(clientID, clientUrlCallback);
        this.setConfig(config);
        this.config = config;
    }

    connect(callback: Function): Spotify {
        SpotifyAPR.connect(callback);
        return this;
    }

    async auth(){
       await SpotifyAPR.auth()
    }

    getToken(): Promise<string> {
        return SpotifyAPR.getToken()
    }

    getPlaylist(): Promise<IPlaylist[]> {
        return new Promise<IPlaylist[]>((resolve, reject) => {
            spotify_service.getPlaylist().then((result: IPlaylistResponse) => {
                resolve(result.items)
            })
            .catch((response: any) => {
                reject(response)
            })
        })
    }

    play(playlist: string): Spotify {
        SpotifyAPR.play(playlist)
        return this
    }

    disconnect(): Spotify {
        SpotifyAPR.disconnect()
        return this
    }

    async setConfig(config: SpotifyConfig){
        await SpotifyAPR.setConfig(config.clientId, config.urlCallback)
    }
}
