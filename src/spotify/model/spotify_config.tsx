class SpotifyConfig { 
    clientId: string;
    urlCallback: string;

    constructor(clientId: string, urlCallback: string){
        this.clientId = clientId;
        this.urlCallback = urlCallback;
    }
}

export default SpotifyConfig;