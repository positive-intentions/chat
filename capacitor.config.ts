import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.positiveintentions',
  appName: 'chat',
  webDir: 'Frontend',
  server: {
    androidScheme: 'https'
  }
};

export default config;
