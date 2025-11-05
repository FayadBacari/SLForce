// import of the different libraries
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Image, Linking, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import of the different components
import { SwipeBackLayout } from '../../components/SwipeBackLayout';

// import CSS styles
import styles from '../../styles/gpu';


export default function CGU() {

  // the mail adress for request
  const handleEmail = () => Linking.openURL('mailto:legal@bearlift.com');

  return (
    <SwipeBackLayout>
      <SafeAreaView style={styles.cgu__safeArea}>
        <Stack.Screen options={{ headerShown: false }} />
        <ScrollView
          style={styles.cgu__scroll}
          contentContainerStyle={styles.cgu__scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.cgu__header}>
            <Text style={styles.cgu__title}>CGU</Text>
            <Text style={styles.cgu__subtitle}>Conditions d'utilisation 📜</Text>
          </View>

          <View style={styles.cgu__card}>
            <View style={styles.cgu__introHeader}>
              <View style={styles.cgu__logoWrapper}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={styles.cgu__logoImage}
                />
              </View>
              <View style={styles.cgu__introContent}>
                <Text style={styles.cgu__introTitle}>Conditions Générales</Text>
                <Text style={styles.cgu__introText}>SLForce - Street Workout Community</Text>
              </View>
            </View>

            <View style={styles.cgu__introFooter}>
              <Text style={styles.cgu__introLabel}>Dernière mise à jour :</Text>
              <Text style={styles.cgu__introDate}>15 Octobre 2024</Text>
            </View>
          </View>

          {/* Warning */}
          <View style={styles.cgu__alertBox}>
            <Ionicons name="alert-circle-outline" size={20} color="#DC2626" />
            <Text style={styles.cgu__alertText}>
              En utilisant SLForce, tu acceptes automatiquement ces conditions. Prends le temps de
              les lire attentivement.
            </Text>
          </View>

          <View style={styles.cgu__section}>
            <Text style={styles.cgu__sectionTitle}>1. Acceptation des Conditions</Text>
            <Text style={styles.cgu__text}>
              En utilisant SLForce, tu acceptes ces conditions d'utilisation. Si tu n'es pas
              d'accord avec ces termes, merci de ne pas utiliser notre application.
            </Text>
          </View>

          <View style={styles.cgu__section}>
            <Text style={styles.cgu__sectionTitle}>2. Utilisation du Service</Text>
            <Text style={styles.cgu__text}>
              SLForce est une plateforme de coaching sportif en ligne. Tu t'engages à utiliser
              l'application de manière responsable et à respecter les autres utilisateurs. Tout
              abus, harcèlement ou comportement inapproprié entraînera la suspension immédiate de
              ton compte.
            </Text>
          </View>

          <View style={styles.cgu__section}>
            <Text style={styles.cgu__sectionTitle}>3. Compte Utilisateur</Text>
            <Text style={styles.cgu__text}>
              Tu es responsable de la confidentialité de ton compte et de ton mot de passe. Tu
              t'engages à ne pas partager ton compte avec d'autres personnes.
            </Text>
          </View>

          <View style={styles.cgu__section}>
            <Text style={styles.cgu__sectionTitle}>4. Paiements et Abonnements</Text>
            <Text style={styles.cgu__text}>
              Les paiements pour les services de coaching sont effectués via PayPal. Les abonnements
              sont mensuels et se renouvellent automatiquement sauf annulation.
            </Text>
          </View>

          <View style={styles.cgu__section}>
            <Text style={styles.cgu__sectionTitle}>5. Contenu Utilisateur</Text>
            <Text style={styles.cgu__text}>
              Tu conserves tous les droits sur le contenu que tu écris sur SLForce. Cependant, tu
              nous accordes une licence pour l'utiliser dans le cadre du fonctionnement de
              l'application.
            </Text>
          </View>

          <View style={styles.cgu__section}>
            <Text style={styles.cgu__sectionTitle}>6. Propriété Intellectuelle</Text>
            <Text style={styles.cgu__text}>
              SLForce, son logo et tous les éléments de design sont la propriété de notre
              entreprise. Toute reproduction sans autorisation est interdite.
            </Text>
          </View>

          <View style={styles.cgu__section}>
            <Text style={styles.cgu__sectionTitle}>7. Confidentialité des Données</Text>
            <Text style={styles.cgu__text}>
              Nous prenons la protection de tes données très au sérieux. Consulte notre politique de
              confidentialité pour plus d’informations.
            </Text>
          </View>

          <View style={styles.cgu__section}>
            <Text style={styles.cgu__sectionTitle}>8. Limitation de Responsabilité</Text>
            <Text style={styles.cgu__text}>
              SLForce est fourni "tel quel". Nous ne garantissons pas que le service soit disponible
              24/7.
            </Text>
          </View>

          <View style={styles.cgu__section}>
            <Text style={styles.cgu__sectionTitle}>9. Modification des Conditions</Text>
            <Text style={styles.cgu__text}>
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les
              utilisateurs seront notifiés de tout changement important.
            </Text>
          </View>

          <View style={styles.cgu__section}>
            <Text style={styles.cgu__sectionTitle}>10. Résiliation</Text>
            <Text style={styles.cgu__text}>
              Tu peux fermer ton compte à tout moment. Nous nous réservons également le droit de le
              suspendre en cas de non-respect de ces conditions.
            </Text>
          </View>

          <View style={styles.cgu__section}>
            <Text style={styles.cgu__sectionTitle}>11. Loi Applicable</Text>
            <Text style={styles.cgu__text}>
              Ces conditions sont régies par le droit français. Tout litige sera soumis aux
              tribunaux compétents de Lyon, France.
            </Text>
          </View>

          <View style={styles.cgu__section}>
            <Text style={styles.cgu__sectionTitle}>12. Contact</Text>
            <Text style={styles.cgu__text}>
              Pour toute question, contacte-nous à{' '}
              <Text style={styles.cgu__link} onPress={handleEmail}>
                legal@slforce.com
              </Text>
              .
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SwipeBackLayout>
  );
}
