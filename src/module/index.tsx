import { NativeModules } from 'react-native';

const { SpotifyApr } = NativeModules;

type SpotifyAprType = {
  setConfig(clientId: string, clientIdUrfCallback: string): string
  connect(callback: Function): void
  play(playlist: string): void 
  disconnect(): void
  auth(): Promise<string>
  getToken(): Promise<string>
  switchToLocalDevice(): void
  descrease(): void
  increase(): void
  setVolumeByValue(value: number): void
  setObserverVolume(callback: Function): void
};

export default SpotifyApr as SpotifyAprType