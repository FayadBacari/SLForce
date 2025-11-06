import { useRouter } from 'expo-router';
import React, { ReactNode } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import { navState } from '../utils/navigationState';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SwipeBackLayoutProps {
  children: ReactNode;
  enabled?: boolean;
}

export const SwipeBackLayout: React.FC<SwipeBackLayoutProps> = ({ children, enabled = true }) => {
  const router = useRouter();
  const translateX = useSharedValue(0);

  const triggerGestureBack = () => {
    navState.gestureBack = true;
    router.back();
  };

  const gesture = Gesture.Pan()
    .enabled(enabled)
    // Trigger only from the left edge to avoid false positives
    .hitSlop({ left: 0, width: 24 })
    .onUpdate((event) => {
      // Swipe only from left to right
      if (event.translationX > 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      const shouldGoBack = event.translationX > 100 || event.velocityX > 800;
      if (shouldGoBack) {
        // Continue the animation to the right, then navigate back
        translateX.value = withTiming(SCREEN_WIDTH, { duration: 180 }, (finished) => {
          if (finished) runOnJS(triggerGestureBack)();
        });
      } else {
        // Return to the initial position
        translateX.value = withTiming(0, { duration: 150 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6FF', // avoid black screen during the animation
  },
});
