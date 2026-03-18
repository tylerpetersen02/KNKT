import { useEffect, useState } from 'react';
import { Platform, Alert } from 'react-native';
import NfcManager, { NativeEvents } from 'react-native-nfc-manager';

export function useNFC() {
  const [nfcSupported, setNfcSupported] = useState<boolean | null>(null);
  const [nfcEnabled, setNfcEnabled] = useState<boolean>(false);
  const [nfcPermissionGranted, setNfcPermissionGranted] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeNFC = async () => {
      try {
        // Check if NFC is supported
        const supported = await NfcManager.isSupported();
        setNfcSupported(supported);

        if (!supported) {
          setNfcEnabled(false);
          setIsInitialized(true);
          return;
        }

        // Start NFC manager
        await NfcManager.start();

        // Check if NFC is enabled on device
        if (Platform.OS === 'android') {
          const androidNfcEnabled = await NfcManager.isEnabled();
          setNfcEnabled(androidNfcEnabled);
          setNfcPermissionGranted(true); // Android permissions handled by NfcManager.start()
        } else {
          // iOS always has NFC enabled if supported
          setNfcEnabled(true);
          setNfcPermissionGranted(true);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('NFC initialization error:', error);
        setNfcSupported(false);
        setIsInitialized(true);
      }
    };

    initializeNFC();

    return () => {
      NfcManager.stop();
    };
  }, []);

  const startNFC = async () => {
    if (!nfcSupported) {
      Alert.alert('NFC Not Supported', 'Your device does not support NFC');
      return;
    }

    if (!nfcEnabled) {
      Alert.alert('NFC Disabled', 'Please enable NFC in your device settings');
      return;
    }

    if (!nfcPermissionGranted) {
      Alert.alert('Permission Denied', 'NFC permission is required');
      return;
    }

    try {
      // Start NFC listening
      await NfcManager.registerTagEvent();
      return true;
    } catch (error) {
      console.error('NFC start error:', error);
      Alert.alert('NFC Error', 'Failed to start NFC communication');
      return false;
    }
  };

  const stopNFC = async () => {
    try {
      await NfcManager.unregisterTagEvent();
    } catch (error) {
      console.error('NFC stop error:', error);
    }
  };

  return {
    nfcSupported,
    nfcEnabled,
    nfcPermissionGranted,
    isInitialized,
    startNFC,
    stopNFC,
  };
}
