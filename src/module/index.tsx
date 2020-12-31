import { NativeModules } from 'react-native';

const { SpotifyApr } = NativeModules;

type SpotifyAprType = {
  multiply(a: number, b: number): Promise<number>;
  setConfig(clientId: string, clientIdUrfCallback: string): string
  connect(callback: Function): void
  play(playlist: string): void 
  disconnect(): void
  auth(): void
  getToken(): Promise<string>
};

export default SpotifyApr as SpotifyAprType