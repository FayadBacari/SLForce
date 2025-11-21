// import of different libraries
import { Image, Text, View } from 'react-native';

// import css 
import { styles } from './ui/about';


export default function About() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>BearLift v1.0.0</Text>
      <Text style={styles.subtitle}>© 2024 BearLift. Tous droits réservés.</Text>
    </View>
  );
}
