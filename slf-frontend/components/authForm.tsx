// import of the different libraries
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { apiFetch } from '../services/auth';
// Import CSS styles
import styles from './ui/authForm';

interface AuthFormProps {
  defaultTab?: 'login' | 'register';
}

export default function AuthForm({ defaultTab = 'login' }: AuthFormProps) {
  // Use UseState
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'eleve' | 'coach'>('eleve');

  // Use router for Navigation.
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Merci de remplir tous les champs obligatoires 🤔');
      return;
    }

    // Utilise le client API mock (aucun appel réseau réel)
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const { token, user } = res as any;
    if (token) {
      await SecureStore.setItemAsync('token', token);
    }
    if (user?.role) {
      await SecureStore.setItemAsync('role', user.role);
    }

    router.push('/(tabs)/chat');
  };

  const handleRegister = async () => {
    setErrorMessage('');
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      return;
    }

    if (!email || !password) {
      setErrorMessage('Merci de remplir correctement tous les champs 🤔');
      return;
    }

    // If the user is a coach, redirect to the multi-step coach registration
    // screen with the base account information instead of creating the account
    // directly here.
    if (role === 'coach') {
      router.push({
        pathname: '/(tabs)/registerCoach',
        params: {
          email,
          password,
          firstName,
          lastName,
          role,
        },
      } as any);
      return;
    }

    // Default flow for "eleve": registration via mock API (pas de backend réel)
    const res = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        role,
        firstName,
        lastName,
      }),
    });

    const { token, user } = res as any;
    if (token) {
      await SecureStore.setItemAsync('token', token);
    }
    if (user?.role) {
      await SecureStore.setItemAsync('role', user.role);
    }

    router.push('/(tabs)/chat');
  };

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
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
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
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.auth__button} onPress={handleLogin}>
            <Text style={styles.auth__buttonText}>Se connecter 🔥</Text>
          </TouchableOpacity>
          {errorMessage ? <Text style={{ color: 'red', marginTop: 8 }}>{errorMessage}</Text> : null}
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
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          {/* Last Name */}
          <View style={styles.auth__inputWrapper}>
            <Ionicons name="person-outline" size={20} color="grey" />
            <TextInput
              style={styles.auth__input}
              placeholder="Nom"
              placeholderTextColor="#94a3b8"
              value={lastName}
              onChangeText={setLastName}
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
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
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
              value={password}
              onChangeText={setPassword}
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
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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

          <TouchableOpacity style={styles.auth__button} onPress={handleRegister}>
            <Text style={styles.auth__buttonText}>Créer un compte 💪</Text>
          </TouchableOpacity>
          {errorMessage ? <Text style={{ color: 'red', marginTop: 8 }}>{errorMessage}</Text> : null}
        </>
      )}
    </View>
  );
}
