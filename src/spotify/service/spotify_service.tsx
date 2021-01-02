import HttpClient from '../../core/service/HttpClient';
import type IHttpClientRequestParameters from '../../core/service/IHttpClientRequestParameters';
import type IPlaylistResponse from '../model/spotify_playlist_service_response';
import type IDeviceResponse from '../model/spotify_device_response';
import type IDevicePutPayload from '../model/spotify_device_put_payload';

import { Enpoints } from './spotify_endpoints';

class SpotifyService {
    getPlaylist(): Promise<IPlaylistResponse> {
        const params: IHttpClientRequestParameters = {
          endPoint: Enpoints.PLAYLIST_ENDPOINT,
        }

        return HttpClient.get<IPlaylistResponse>(params);
    }


    getDevices(): Promise<IDeviceResponse> {
      const params: IHttpClientRequestParameters = {
        endPoint: Enpoints.DEVICE_ENDPOINT,
      }

      return HttpClient.get<IDeviceResponse>(params);
    }

    switchDevice(deviceId: string, isPlay: boolean){
      const params: IHttpClientRequestParameters<IDevicePutPayload> = {
        endPoint: Enpoints.DEVICE_ENDPOINT,
        payload: { 
          device_ids: [deviceId],
          play: isPlay
        }
      }

      return HttpClient.put<any>(params);
    }
}

export default new SpotifyService()
