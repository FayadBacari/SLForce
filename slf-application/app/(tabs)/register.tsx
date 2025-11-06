// import of the different libraries
import { View, ScrollView, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import of the different components
import AuthForm from '../../components/authForm';

// import of the different assets
const logo = require('../../assets/images/logo.png');

// import CSS styles
import styles from '../../styles/register';


export default function Register() {
  return (
    <SafeAreaView style={styles.register__safeArea}>
      <ScrollView
        style={styles.register__scroll}
        contentContainerStyle={styles.register__scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.register__header}>
          <View style={styles.register__logoBackground}>
            <Image source={logo} style={styles.register__logoImage} />
          </View>
          <Text style={styles.register__title}>Créer un compte</Text>
          <Text style={styles.register__subtitle}>Rejoins la communauté 💪</Text>
        </View>

        {/* FORM */}
        <AuthForm defaultTab="register" />
      </ScrollView>
    </SafeAreaView>
  );
}
