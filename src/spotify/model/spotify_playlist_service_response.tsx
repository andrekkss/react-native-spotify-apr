import type IPlaylist from "./spotify_playlist";

export default interface IPlaylistResponse {
    href: string;
    items: IPlaylist[];
}