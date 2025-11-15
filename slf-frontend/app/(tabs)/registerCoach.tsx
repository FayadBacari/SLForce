// import of the different libraries
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import Icon
import Icon from '../../components/Icon';
import { apiFetch } from '../../services/auth';
// Import CSS Styles
import { styles } from '../../styles/registerCoach';

const CoachRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fadeAnim] = useState(new Animated.Value(1));

  const [coachData, setCoachData] = useState({
    name: '',
    avatar: '🥇',
    speciality: '',
    location: '',
    price: '',
    experience: '',
    description: '',
    skills: [] as string[],
  });

  const [tempSkill, setTempSkill] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const totalSteps = 7;

  const router = useRouter();
  const params = useLocalSearchParams();

  const email = String(params.email || '');
  const password = String(params.password || '');
  const firstName = String(params.firstName || '');
  const lastName = String(params.lastName || '');
  const role = (params.role as string) || 'coach';

  const handleNext = () => {
    if (currentStep < totalSteps) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentStep(currentStep - 1);
    }
  };

  const addSkill = () => {
    if (tempSkill.trim() && coachData.skills.length < 5) {
      setCoachData({
        ...coachData,
        skills: [...coachData.skills, tempSkill.trim()],
      });
      setTempSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setCoachData({
      ...coachData,
      skills: coachData.skills.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      setErrorMessage('Les informations de base du compte sont manquantes.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          role,
          firstName,
          lastName,
          coachProfile: {
            avatar: coachData.avatar,
            speciality: coachData.speciality,
            location: coachData.location,
            price: parseFloat(coachData.price),
            experience: parseInt(coachData.experience, 10),
            description: coachData.description,
            skills: coachData.skills,
          },
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
    } catch (error: any) {
      setErrorMessage(`Une erreur est survenue: ${error.message || 'Erreur inconnue'} ⚠️`);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
            <View style={styles.iconWrapper}>
              <Icon emoji="👤" size={80} />
            </View>
            <Text style={styles.stepTitle}>Quel est pseudo ?</Text>
            <Text style={styles.stepSubtitle}>Commence par nous dire comment tu t'appelles</Text>
            <TextInput
              value={coachData.name}
              onChangeText={(text) => setCoachData({ ...coachData, name: text })}
              placeholder="Ex: Ashura Workout"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              autoFocus
            />
          </Animated.View>
        );

      case 2:
        return (
          <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
            <View style={styles.iconWrapper}>
              <Icon emoji="⭐" size={80} />
            </View>
            <Text style={styles.stepTitle}>Ta spécialité ?</Text>
            <Text style={styles.stepSubtitle}>Dans quel domaine tu excelles ?</Text>
            <TextInput
              value={coachData.speciality}
              onChangeText={(text) => setCoachData({ ...coachData, speciality: text })}
              placeholder="Ex: Calisthenics Expert"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              autoFocus
            />
          </Animated.View>
        );

      case 3:
        return (
          <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
            <View style={styles.iconWrapper}>
              <Icon emoji="📍" size={80} />
            </View>
            <Text style={styles.stepTitle}>Où es-tu basé ?</Text>
            <Text style={styles.stepSubtitle}>
              Indique ta ville pour que les athlètes te trouvent
            </Text>
            <TextInput
              value={coachData.location}
              onChangeText={(text) => setCoachData({ ...coachData, location: text })}
              placeholder="Ex: Marseille, France"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              autoFocus
            />
          </Animated.View>
        );

      case 4:
        return (
          <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
            <View style={styles.iconWrapper}>
              <Icon emoji="💰" size={80} />
            </View>
            <Text style={styles.stepTitle}>Ton tarif mensuel ?</Text>
            <Text style={styles.stepSubtitle}>Combien factures-tu par mois ?</Text>
            <View style={styles.priceInputWrapper}>
              <TextInput
                value={coachData.price}
                onChangeText={(text) => setCoachData({ ...coachData, price: text })}
                placeholder="59.99"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                style={styles.priceInput}
                autoFocus
              />
              <Text style={styles.priceUnit}>€ / mois</Text>
            </View>
          </Animated.View>
        );

      case 5:
        return (
          <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
            <View style={styles.iconWrapper}>
              <Icon emoji="🏆" size={80} />
            </View>
            <Text style={styles.stepTitle}>Ton expérience ?</Text>
            <Text style={styles.stepSubtitle}>Depuis combien de temps tu coaches ?</Text>
            <View style={styles.experienceWrapper}>
              <TextInput
                value={coachData.experience}
                onChangeText={(text) => setCoachData({ ...coachData, experience: text })}
                placeholder="10"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                style={styles.experienceInput}
                autoFocus
              />
              <Text style={styles.experienceUnit}>ans</Text>
            </View>
          </Animated.View>
        );

      case 6:
        return (
          <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
            <View style={styles.iconWrapper}>
              <Icon emoji="📝" size={80} />
            </View>
            <Text style={styles.stepTitle}>Décris-toi !</Text>
            <Text style={styles.stepSubtitle}>Parle de ton parcours et ce que tu proposes</Text>
            <TextInput
              value={coachData.description}
              onChangeText={(text) => setCoachData({ ...coachData, description: text })}
              placeholder="Ex: Champion national de street workout. Transforme ton physique en 3 mois garanti !"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={5}
              style={styles.textArea}
              autoFocus
            />
          </Animated.View>
        );

      case 7:
        return (
          <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
            <View style={styles.iconWrapper}>
              <Icon emoji="💪" size={80} />
            </View>
            <Text style={styles.stepTitle}>Quelle discipline du street workout enseignes-tu ?</Text>
            <Text style={styles.stepSubtitle}>Ajoute jusqu'a deux discipline</Text>

            <View style={styles.skillsInputWrapper}>
              <TextInput
                value={tempSkill}
                onChangeText={setTempSkill}
                placeholder="Ex: Street-Lifting, Endurance, Freetyle ?"
                placeholderTextColor="#9CA3AF"
                style={styles.skillInput}
                maxLength={20}
                autoFocus
              />
              <TouchableOpacity
                onPress={addSkill}
                style={[
                  styles.addSkillButton,
                  (!tempSkill.trim() || coachData.skills.length >= 5) &&
                    styles.addSkillButtonDisabled,
                ]}
                disabled={!tempSkill.trim() || coachData.skills.length >= 5}
              >
                <Icon emoji="➕" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.skillsList}>
              {coachData.skills.map((skill, index) => (
                <View key={index} style={styles.skillChip}>
                  <Text style={styles.skillChipText}>{skill}</Text>
                  <TouchableOpacity onPress={() => removeSkill(index)}>
                    <Icon emoji="✖️" size={16} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {coachData.skills.length === 0 && (
              <Text style={styles.emptySkills}>Ajoute au moins une compétence</Text>
            )}
          </Animated.View>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return coachData.name.trim().length > 0;
      case 2:
        return coachData.speciality.trim().length > 0;
      case 3:
        return coachData.location.trim().length > 0;
      case 4:
        return coachData.price.trim().length > 0 && parseFloat(coachData.price) > 0;
      case 5:
        return coachData.experience.trim().length > 0 && parseInt(coachData.experience, 10) > 0;
      case 6:
        return coachData.description.trim().length > 20;
      case 7:
        return coachData.skills.length > 0;
      default:
        return false;
    }
  };

  return (
    <SafeAreaView style={styles.app}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          Étape {currentStep} sur {totalSteps}
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>{renderStep()}</View>

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        {currentStep > 1 && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Icon emoji="⬅️" size={20} />
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={currentStep === totalSteps ? handleSubmit : handleNext}
          disabled={!canProceed() || submitting}
          style={[
            styles.nextButton,
            currentStep === 1 && styles.nextButtonFull,
            (!canProceed() || submitting) && styles.nextButtonDisabled,
          ]}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps ? (submitting ? 'En cours...' : 'Terminer 🎉') : 'Suivant'}
          </Text>
          {currentStep < totalSteps && <Icon emoji="➡️" size={20} />}
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <View style={{ paddingHorizontal: 24, paddingTop: 12 }}>
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default CoachRegistration;
