import React from 'react';
import { Image, Text, View } from 'react-native';

import { styles } from './ui/about';

export default function About() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')} // ton icône de l’ours
          style={styles.logo}
        />
      </View>

      {/* Titre + version */}
      <Text style={styles.title}>BearLift v1.0.0</Text>
      <Text style={styles.subtitle}>© 2024 BearLift. Tous droits réservés.</Text>
    </View>
  );
}
