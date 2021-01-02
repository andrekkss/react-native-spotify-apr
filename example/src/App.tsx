import * as React from 'react';

import Spotify from 'react-native-spotify-apr';

import { StyleSheet, Text, View, Button} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useEffect } from 'react';

import type IPlaylist from 'src/spotify/model/spotify_playlist';
import type IDevice from 'src/spotify/model/spotify_device';

export default function App() {
  const [spotify] = React.useState<typeof Spotify>(Spotify);
  const [playlists, setPlaylists] = React.useState<IPlaylist[]>();
  const [volume, setVolume] = React.useState<number>()
  const [devices, setDevices] = React.useState<IDevice[]>();

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
    spotify.play(id)
      .setObserverVolume((value: number) => setVolume(value))
      .getDevices().then((devices: IDevice[]) => setDevices(devices))
  }

  function switchDevice() {
    spotify.setDevicePlay("5b40d4292a84cc4e13b941991de3b61f884bb063")
  }

  return (
    <View style={styles.container}>
      <Text>Current volume: {volume} </Text>
      <Text>Current device: {devices?.find((value: IDevice) => value.is_active == true)?.name}</Text>
      <Button
        onPress={switchDevice}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      { playlists != undefined ?
        <Card onPress={() => {play(playlists[0].id)}}>
          <Card.Cover source={{ uri: playlists[0].images[0].url }} />
          <Card.Content>
            <Title>{playlists[0].name}</Title>
            <Paragraph>by: {playlists[0].owner.display_name}</Paragraph>
          </Card.Content>
        </Card>
        : <View/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
