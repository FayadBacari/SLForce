// import of different libraries
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

// import services
import { apiFetch } from '../services/auth';

// import css
import styles from './ui/authForm';


interface AuthFormProps {
  defaultTab?: 'login' | 'register';
}

export default function AuthForm({ defaultTab = 'login' }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'eleve' | 'coach'>('eleve');
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Merci de remplir tous les champs obligatoires 🤔');
      return;
    }

    try {
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
      if (user?._id) {
        await SecureStore.setItemAsync('userId', user._id);
      }

      if (user?.role === 'coach') {
        router.push('/(tabs)/profileCoach');
      } else {
        router.push('/(tabs)/profileAthlete');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Une erreur est survenue lors de la connexion');
    }
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

    try {
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
      if (user?._id) {
        await SecureStore.setItemAsync('userId', user._id);
      }

      router.push('/(tabs)/profileAthlete');
    } catch (error: any) {
      setErrorMessage(error.message || "Une erreur est survenue lors de l'inscription");
    }
  };

  return (
    <View style={styles.auth__container}>
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

      {activeTab === 'login' ? (
        <>
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
