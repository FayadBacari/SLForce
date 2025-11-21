// import of different libraries
import { View, ScrollView, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import component 
import AuthForm from '../../components/authForm';

// import css 
import styles from '../../styles/register';

// import asset images.
const logo = require('../../assets/images/logo.png');


export default function Register() {
  return (
    <SafeAreaView style={styles.register__safeArea}>
      <ScrollView
        style={styles.register__scroll}
        contentContainerStyle={styles.register__scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.register__header}>
          <View style={styles.register__logoBackground}>
            <Image source={logo} style={styles.register__logoImage} />
          </View>
          <Text style={styles.register__title}>Créer un compte</Text>
          <Text style={styles.register__subtitle}>Rejoins la communauté 💪</Text>
        </View>

        <AuthForm defaultTab="register" />
      </ScrollView>
    </SafeAreaView>
  );
}
