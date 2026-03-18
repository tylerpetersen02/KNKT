import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, useWindowDimensions } from 'react-native';

export function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const availableHeight = screenHeight - keyboardHeight;

  return {
    keyboardHeight,
    screenHeight,
    availableHeight,
    isKeyboardVisible: keyboardHeight > 0,
  };
}
