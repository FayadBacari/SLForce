import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './ui/authForm';

interface AuthFormProps {
  defaultTab?: 'login' | 'register';
}

export default function AuthForm({ defaultTab = 'login' }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [role, setRole] = useState<'eleve' | 'coach'>('eleve');
  const router = useRouter();

  return (
    <View style={styles.auth__container}>
      {/* Tabs */}
      <View style={styles.auth__tabs}>
        <TouchableOpacity
          style={[styles.auth__tab, activeTab === 'login' && styles.auth__tabActive]}
          onPress={() => setActiveTab('login')}
        >
          <Text style={[styles.auth__tabText, activeTab === 'login' && styles.auth__tabTextActive]}>
            Connexion
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.auth__tab, activeTab === 'register' && styles.auth__tabActive]}
          onPress={() => setActiveTab('register')}
        >
          <Text
            style={[styles.auth__tabText, activeTab === 'register' && styles.auth__tabTextActive]}
          >
            Inscription
          </Text>
        </TouchableOpacity>
      </View>

      {/* LOGIN FORM */}
      {activeTab === 'login' ? (
        <>
          {/* Email */}
          <View style={styles.auth__inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="grey" />
            <TextInput
              style={styles.auth__input}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Password */}
          <View style={styles.auth__inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="grey" />
            <TextInput
              style={styles.auth__input}
              placeholder="Mot de passe"
              secureTextEntry
              placeholderTextColor="#94a3b8"
            />
          </View>

          <TouchableOpacity style={styles.auth__button} onPress={() => router.push('/(tabs)/chat')}>
            <Text style={styles.auth__buttonText}>Se connecter 🔥</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* REGISTER FORM */}

          {/* First Name */}
          <View style={styles.auth__inputWrapper}>
            <Ionicons name="person-outline" size={20} color="grey" />
            <TextInput
              style={styles.auth__input}
              placeholder="Prénom"
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Last Name */}
          <View style={styles.auth__inputWrapper}>
            <Ionicons name="person-outline" size={20} color="grey" />
            <TextInput
              style={styles.auth__input}
              placeholder="Nom"
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Email */}
          <View style={styles.auth__inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="grey" />
            <TextInput
              style={styles.auth__input}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Password */}
          <View style={styles.auth__inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="grey" />
            <TextInput
              style={styles.auth__input}
              placeholder="Mot de passe"
              secureTextEntry
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Confirm Password */}
          <View style={styles.auth__inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="grey" />
            <TextInput
              style={styles.auth__input}
              placeholder="Confirmer le mot de passe"
              secureTextEntry
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Role selector */}
          <View style={styles.auth__roleSection}>
            <Text style={styles.auth__roleLabel}>Je suis un...</Text>
            <View style={styles.auth__roleContainer}>
              <TouchableOpacity
                style={[styles.auth__roleButton, role === 'eleve' && styles.auth__roleButtonActive]}
                onPress={() => setRole('eleve')}
              >
                <Text
                  style={[
                    styles.auth__roleButtonText,
                    role === 'eleve' && styles.auth__roleButtonTextActive,
                  ]}
                >
                  🙎 ÉLÈVE
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.auth__roleButton, role === 'coach' && styles.auth__roleButtonActive]}
                onPress={() => setRole('coach')}
              >
                <Text
                  style={[
                    styles.auth__roleButtonText,
                    role === 'coach' && styles.auth__roleButtonTextActive,
                  ]}
                >
                  🏋️‍♂️ COACH
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.auth__button}>
            <Text style={styles.auth__buttonText}>Créer un compte 💪</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
