import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './ui/sectionCardSettings.styles';

interface SectionCardSettingsProps {
  title: string;
  children: React.ReactNode;
}

export const SectionCardSettings: React.FC<SectionCardSettingsProps> = ({ title, children }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};
