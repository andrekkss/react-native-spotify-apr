import HttpClient from '../../core/service/HttpClient';
import IHttpClientRequestParameters from '../../core/service/IHttpClientRequestParameters';
import IPlaylistResponse from '../model/spotify_playlist_service_response';

class SpotifyService {
    private PLAYLIST_ENDPOINT: string = '/me/playlists';

    getPlaylist(): Promise<IPlaylistResponse> {
        const params: IHttpClientRequestParameters = {
          endPoint: this.PLAYLIST_ENDPOINT,
          requiresToken: true
        }

        return HttpClient.get<IPlaylistResponse>(params);
    }
}

export default new SpotifyService()
