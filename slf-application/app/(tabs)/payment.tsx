// import of the different libraries
import { Stack } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import CSS styles
import styles from '../../styles/payment';


export default function Payments() {
  return (
    <SafeAreaView style={styles.payments__safeArea}>
      <ScrollView style={styles.payments__container} showsVerticalScrollIndicator={false}>
        <Stack.Screen options={{ headerShown: false }} />
        {/* HEADER */}
        <View style={styles.payments__header}>
          <Text style={styles.payments__title}>Paiements</Text>
          <Text style={styles.payments__subtitle}>Gérer tes abonnements 💳</Text>
        </View>

        {/* METHOD OF PAYMENT */}
        <View style={styles.payments__section}>
          <Text style={styles.payments__sectionTitle}>Moyen de paiement</Text>
          <View style={styles.payments__card}>
            <View style={styles.payments__cardLeft}>
              <View style={styles.payments__coachAvatar}>
                <Text style={styles.payments__coachIcon}>🙎</Text>
              </View>
              <View>
                <Text style={styles.payments__cardText}>yousef.beast@email.com</Text>
                <Text style={styles.payments__verified}>✅ Vérifié</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.payments__edit}>Modifier</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ACTIVE SUBSCRIPTIONS */}
        <View style={styles.payments__section}>
          <Text style={styles.payments__sectionTitle}>Abonnements actifs</Text>

          <View style={styles.payments__subscription}>
            <View style={styles.payments__coachInfo}>
              <View style={styles.payments__coachAvatar}>
                <Text style={styles.payments__coachIcon}>🦍</Text>
              </View>
              <View>
                <Text style={styles.payments__coachName}>Coach Malik</Text>
                <Text style={styles.payments__coachType}>Coaching mensuel</Text>
                <Text style={styles.payments__coachStatus}>🟢 Actif — Depuis le 15 Mars 2024</Text>
              </View>
            </View>
            <Text style={styles.payments__price}>49.99€ /mois</Text>
            <View style={styles.payments__buttons}>
              <TouchableOpacity style={styles.payments__pause}>
                <Text>Mettre en pause</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.payments__cancel}>
                <Text style={styles.payments__cancelText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.payments__subscription}>
            <View style={styles.payments__coachInfo}>
              <View style={styles.payments__coachAvatar}>
                <Text style={styles.payments__coachIcon}>🦊</Text>
              </View>
              <View>
                <Text style={styles.payments__coachName}>Coach Sarah</Text>
                <Text style={styles.payments__coachType}>Coaching mensuel</Text>
                <Text style={styles.payments__coachStatus}>🟢 Actif — Depuis le 20 Avril 2024</Text>
              </View>
            </View>
            <Text style={styles.payments__price}>39.99€ /mois</Text>
            <View style={styles.payments__buttons}>
              <TouchableOpacity style={styles.payments__pause}>
                <Text>Mettre en pause</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.payments__cancel}>
                <Text style={styles.payments__cancelText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* MONTHLY TOTAL */}
        <View style={styles.payments__total}>
          <Text style={styles.payments__totalLabel}>Total mensuel</Text>
          <Text style={styles.payments__totalAmount}>89.98€</Text>
          <Text style={styles.payments__totalSub}>2 abonnements actifs</Text>
        </View>

        {/* PAYMENT HISTORY */}
        <View style={styles.payments__section}>
          <Text style={styles.payments__sectionTitle}>Historique des paiements</Text>
          {['15 Oct 2024', '20 Sept 2024', '15 Sept 2024', '20 Août 2024', '15 Août 2024'].map(
            (date, index) => (
              <View key={index} style={styles.payments__historyItem}>
                <Text style={styles.payments__historyCoach}>
                  {index % 2 === 0 ? 'Coach Malik' : 'Coach Sarah'}
                </Text>
                <Text style={styles.payments__historyDate}>{date}</Text>
                <Text style={styles.payments__historyPrice}>
                  {index % 2 === 0 ? '49.99€' : '39.99€'} —{' '}
                  <Text style={styles.payments__paid}>Payé</Text>
                </Text>
              </View>
            ),
          )}
        </View>

        {/* SECURITY MESSAGE */}
        <View style={styles.payments__footer}>
          <Text style={styles.payments__footerTitle}>Paiements 100% sécurisés</Text>
          <Text style={styles.payments__footerText}>
            Tous tes paiements sont protégés par PayPal. Tes informations bancaires ne sont jamais
            stockées sur nos serveurs.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
