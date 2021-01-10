# react-native-spotify-apr

library for use spotify sdk in React Native app

## Installation

```sh
npm install react-native-spotify-apr
```

## Usage

### First step

This library use react-native-dotenv, for store clientID and client callback of Spotify SDK

For this configure .env file 

```
  SPOTIFY_CLIENT_ID=
  SPOTIFY_CLIENT_CALLBACK=
```

### Second step 

Use!

```js
import Spotify from "react-native-spotify-apr";

// ...

const result = Spotify.connect((message: string) => console.log(message));
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
