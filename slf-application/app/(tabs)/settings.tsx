// Import of the different libraries
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Import of the different components
import About from '../../components/About';
import { SettingCard } from '../../components/SettingCard';
import { SectionCardSettings } from '../../components/SectionCardSettings';

// Import CSS styles
import { styles } from '../../styles/settings';


export default function Settings() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFF6FF' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 96 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Réglages</Text>
            <Text style={styles.headerSubtitle}>Personnalise ton expérience</Text>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.profileInfo}>
              <View style={styles.iconContainerProfil}>
                <Text style={styles.iconText}>👤</Text>
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileName}>Youssef</Text>
                <Text style={styles.profileUsername}>@youssef_beast</Text>
                <View style={styles.membershipContainer}>
                  <Text style={styles.membershipText}>🔥 Membre depuis Mars 2024</Text>
                </View>
              </View>
            </View>
          </View>

          <SectionCardSettings title="COMPTE">
            <SettingCard
              logo="👤"
              title="Profil"
              description="Modifier tes infos personnelles"
              hasChevron
              onPress={() => router.push('/settingProfil')}
            />
            <SettingCard
              logo="🔒"
              title="Confidentialité"
              description="Contrôle qui peut te voir"
              hasChevron
              onPress={() => console.log('test ouverture')}
            />
            <SettingCard
              logo="🛡️"
              title="Sécurité"
              description="Mot de passe et authentification"
              hasChevron
              onPress={() => router.push('/privacy')}
            />
          </SectionCardSettings>

          <SectionCardSettings title="PRÉFÉRENCES">
            <SettingCard
              logo="🔔"
              title="Notifications"
              description="Reçois les messages importants"
              hasSwitch
              onPress={() => console.log('Toggle notifications')}
            />
            <SettingCard
              logo="🔊"
              title="Sons"
              description="Sons des messages et appels"
              hasSwitch
              onPress={() => console.log('test ouverture')}
            />
            <SettingCard
              logo="🌙"
              title="Mode sombre"
              description="Thème actuel"
              hasSwitch
              onPress={() => console.log('test ouverture')}
            />
            <SettingCard
              logo="🌐"
              title="Langue"
              description="Français"
              hasChevron
              onPress={() => console.log('test ouverture')}
            />
          </SectionCardSettings>

          <SectionCardSettings title="ABONNEMENT">
            <SettingCard
              logo="💳"
              title="Paiements"
              description="Gérer tes abonnements"
              hasChevron
              onPress={() => console.log('test ouverture')}
            />
            <SettingCard
              logo="⭐"
              title="BearLift Premium"
              description="Passe en mode Pro 🔥"
              hasChevron
              onPress={() => console.log('test ouverture')}
            />
          </SectionCardSettings>

          <SectionCardSettings title="SUPPORT">
            <SettingCard
              logo="❓"
              title="Aide & Support"
              description="FAQ et contact"
              hasChevron
              onPress={() => router.push('/support')}
            />
            <SettingCard
              logo="👁️"
              title="Conditions d'utilisation"
              description="CGU et politique"
              hasChevron
              onPress={() => router.push('/gpu')}
            />
          </SectionCardSettings>

          <View style={styles.section}>
            <Text style={styles.warningTitle}>ZONE DANGEREUSE</Text>

            <View style={styles.deleteAccountContainer}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconTrash}>🗑️</Text>
              </View>

              <View style={styles.deleteAccountTextContainer}>
                <Text style={styles.deleteAccountTitle}>Supprimer mon compte</Text>
                <Text style={styles.deleteAccountSubtitle}>Cette action est irréversible</Text>
              </View>

              <View style={styles.arrowContainer}>
                <Text style={styles.arrowText}>›</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButtonRed}>
            <Text style={styles.logoutButtonRedText}>Se déconnecter</Text>
          </TouchableOpacity>

          <About />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
