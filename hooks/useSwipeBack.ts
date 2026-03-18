import { useRef, useEffect } from 'react';
import { PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';

interface UseSwipeBackProps {
  onSwipeBack: () => void;
  minDistance?: number;
  maxVerticalDeviation?: number;
}

export function useSwipeBack({ onSwipeBack, minDistance = 100, maxVerticalDeviation = 50 }: UseSwipeBackProps) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt: GestureResponderEvent, state: PanResponderGestureState) => {
        const { dx, dy } = state;

        // Swipe right with minimal vertical deviation
        if (dx > minDistance && Math.abs(dy) < maxVerticalDeviation) {
          onSwipeBack();
        }
      },
    })
  ).current;

  return panResponder.panHandlers;
}
