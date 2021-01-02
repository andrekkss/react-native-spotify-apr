import SpotifyConfig from "./model/spotify_config";
import SpotifyAPR from '../module/index';
import spotify_service from "./service/spotify_service";

import type IPlaylistResponse from "./model/spotify_playlist_service_response";
import type IPlaylist from "./model/spotify_playlist";
import type IDevice from "./model/spotify_device";
import type IDeviceResponse from "./model/spotify_device_response";

import {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_CALLBACK} from "@env"

class Spotify {
    config: SpotifyConfig;

    constructor(){
        this.checkIfClientIdAndClientCallbackExists()
        const config = new SpotifyConfig(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_CALLBACK);
        this.setConfig(config);
        this.config = config;
    }

    connect(callback: Function): Spotify {
        SpotifyAPR.connect(callback);
        return this;
    }

    auth(): Promise<string> {
       return SpotifyAPR.auth()
    }

    getToken(): Promise<string> {
        return SpotifyAPR.getToken()
    }

    play(playlist: string): Spotify {
        SpotifyAPR.play(playlist)
        return this
    }

    disconnect(): Spotify {
        SpotifyAPR.disconnect()
        return this
    }

    switchToLocalDevice(): Spotify {
        SpotifyAPR.switchToLocalDevice()
        return this
    }

    descrease(): void {
        SpotifyAPR.descrease()
    }

    increase(): void { 
        SpotifyAPR.increase()
    }

    setVolumeByValue(value: number): void {
        SpotifyAPR.setVolumeByValue(value)
    }

    setObserverVolume(callback: Function): Spotify {
        SpotifyAPR.setObserverVolume(callback)
        return this
    }

    getDevices(): Promise<IDevice[]> {
        return new Promise<IDevice[]>((resolve, reject) => {
            spotify_service.getDevices().then((result: IDeviceResponse) => {
                resolve(result.devices)
            })
            .catch((response: any) => {
                reject(response)
            })
        })
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

    setDevicePlay(id: string, isPlay: boolean = true): Promise<any>{
        return new Promise<any>((resolve, reject) => {
            spotify_service.switchDevice(id, isPlay).then((result: any) => {
                resolve(result)
            })
            .catch((response: any) => {
                reject(response)
            })
        })
    }

    async setConfig(config: SpotifyConfig){
        await SpotifyAPR.setConfig(config.clientId, config.urlCallback)
    }

    private checkIfClientIdAndClientCallbackExists(){
        if(SPOTIFY_CLIENT_ID === undefined)
            throw new ClientIDNotFoundFailure()
        else if (SPOTIFY_CLIENT_CALLBACK === undefined)
            throw new SPOTIFY_CLIENT_CALLBACK()
    }
}

export default new Spotify();