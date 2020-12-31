import * as React from 'react';

import { StyleSheet, View} from 'react-native';
import type Spotify from 'react-native-spotify-apr';
import APR from 'react-native-spotify-apr';
import type IPlaylist from 'src/spotify/model/spotify_playlist';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useEffect } from 'react';

const MCard = (props) => (
  <Card onPress={() => {props.callback(props.id)}}>
    <Card.Cover source={{ uri: props.image }} />
    <Card.Content>
      <Title>{props.title}</Title>
      <Paragraph>by: {props.by}</Paragraph>
    </Card.Content>
  </Card>
);

export default function App() {
  const [spotify, setSpotify] = React.useState<Spotify | undefined>();
  const [token, setToken] = React.useState<string | undefined>();
  const [playlists, setPlaylists] = React.useState<IPlaylist[]>();

  const clientID = "459ca320939b4fa28d2fda69ea23e0fa"
  const clientCallbackUrl = "http://com.example.reactnativespotifyapr/callback"

  useEffect(() => {
    async function connect() {
      const spotify = new APR(clientID, clientCallbackUrl);
      spotify.connect((message: string) => console.log(message));
      await spotify?.auth()
      setSpotify(spotify);
      spotify?.getToken().then((value: string) => {
        console.log(token)
        setToken(value)
      })
      spotify?.getPlaylist().then((playlists: IPlaylist[]) => {
        setPlaylists(playlists);
      })
    }
    connect()
  }, [])

  function play(id: string){
    console.log(id);
    spotify?.play(id);
  }

  return (
    <View style={styles.container}>
      {playlists?.map((playlist: IPlaylist) => {
        return <MCard 
          id={playlist.id} 
          name={playlist.name} 
          image={playlist.images[0].url} 
          by={playlist.owner.display_name} 
          callback={play} />
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
