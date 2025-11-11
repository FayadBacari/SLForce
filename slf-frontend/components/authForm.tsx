// import of the different libraries
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { auth } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';

// Import CSS styles
import styles from './ui/authForm';

// Import helper apiFetch

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

  // Use rooter for Navigation.
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      // Save token to SecureStore
      await SecureStore.setItemAsync('token', token);
      router.push('/(tabs)/chat');
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        setErrorMessage("L’adresse e-mail n’est pas valide 🤔");
      } else if (error.code === 'auth/user-not-found') {
        setErrorMessage("Aucun compte trouvé avec cette adresse e-mail 🚫");
      } else if (error.code === 'auth/wrong-password') {
        setErrorMessage("Le mot de passe est incorrect 🔐");
      } else if (error.code === 'auth/too-many-requests') {
        setErrorMessage("Trop de tentatives, réessaie plus tard ⏳");
      } else {
        setErrorMessage("Une erreur est survenue. Réessaie plus tard ⚠️");
      }
    }
  };

  const handleRegister = async () => {
    setErrorMessage('');
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      await SecureStore.setItemAsync('token', token);
      // Persist selected role locally to adapt UI (e.g., hide Athlète tab for coach)
      await SecureStore.setItemAsync('role', role);
      router.push('/(tabs)/chat');
    } catch (error: any) {
  if (error.code === 'auth/email-already-in-use') {
    setErrorMessage("Cette adresse e-mail est déjà utilisée 🔑");
  } else if (error.code === 'auth/invalid-email') {
    setErrorMessage("L’adresse e-mail n’est pas valide 🤔");
  } else if (error.code === 'auth/weak-password') {
    setErrorMessage("Ton mot de passe est trop faible. Minimum 6 caractères 💪");
  } else {
    setErrorMessage("Une erreur est survenue. Réessaie plus tard ⚠️");
  }
}
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
