interface ExternalUrls {
    spotify: string;
}

interface Image {
    height?: any;
    url: string;
    width?: any;
}

interface ExternalUrls2 {
    spotify: string;
}

interface Owner {
    display_name: string;
    external_urls: ExternalUrls2;
    href: string;
    id: string;
    type: string;
    uri: string;
}

interface Tracks {
    href: string;
    total: number;
}

export default interface IPlaylist {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner;
    primary_color?: any;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
}

