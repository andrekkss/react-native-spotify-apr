import * as React from 'react';

import { StyleSheet, View} from 'react-native';
import Spotify from 'react-native-spotify-apr';
import type IPlaylist from 'src/spotify/model/spotify_playlist';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useEffect } from 'react';

export default function App() {
  const [spotify] = React.useState<typeof Spotify>(Spotify);
  const [playlists, setPlaylists] = React.useState<IPlaylist[]>();

  useEffect(() => {
    function connect() {
      spotify
        .connect((message: string) => console.log(message))
        .auth()
        .then((_: string) => {
          spotify?.getPlaylist().then((playlists: IPlaylist[]) => {
            setPlaylists(playlists);
          }).catch((err: any) => {
            console.log(err);
          })
        })
    }
    connect()
  }, [])

  function play(id: string){
    spotify.play(id);
  }

  return (
    <View style={styles.container}>
      {playlists?.map((playlist: IPlaylist, _: number) => {
        return <Card onPress={() => {play(playlist.id)}}>
          <Card.Cover source={{ uri: playlist.images[0].url }} />
          <Card.Content>
            <Title>{playlist.name}</Title>
            <Paragraph>by: {playlist.owner.display_name}</Paragraph>
          </Card.Content>
        </Card>
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
