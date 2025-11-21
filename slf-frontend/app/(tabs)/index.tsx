// import of different libraries
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, Image, Text  } from 'react-native';

// import component 
import AuthForm from '../../components/authForm';

// import css 
import styles from '../../styles/home';

// import asset images. 
const logo = require('../../assets/images/logo.png');


export default function Home() {
  return (
    <SafeAreaView style={styles.home__safeArea}>
      <ScrollView
        style={styles.home__scroll}
        contentContainerStyle={styles.home__scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.home__header}>
          <View style={styles.home__logoBackground}>
            <Image source={logo} style={styles.home__logoImage} />
          </View>
          <Text style={styles.home__title}>SLForce</Text>
          <Text style={styles.home__subtitle}>Street Workout Community</Text>
        </View>

        <AuthForm />
      </ScrollView>
    </SafeAreaView>
  );
}
