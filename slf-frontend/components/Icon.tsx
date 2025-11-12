import React from 'react';
import { Text } from 'react-native';

interface IconProps {
  emoji: string;
  size?: number;
  style?: any;
}

export default function Icon({ emoji, size = 24, style }: IconProps) {
  return <Text style={[{ fontSize: size }, style]}>{emoji}</Text>;
}
