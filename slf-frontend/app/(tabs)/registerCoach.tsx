// import of different libraries
import { useState } from 'react';
import { apiFetch } from '../../services/auth';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View, Animated } from 'react-native';

// import component 
import Icon from '../../components/Icon';

// import css 
import { styles } from '../../styles/registerCoach';
import { CoachRegistrationData, CoachRegistrationParams } from '../../types';

const CoachRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fadeAnim] = useState(new Animated.Value(1));

  const [coachData, setCoachData] = useState<CoachRegistrationData>({
    name: '',
    avatar: '🥇',
    speciality: '',
    location: '',
    price: '',
    experience: '',
    description: '',
    skills: [],
  });

  const [, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCheckingName, setIsCheckingName] = useState(false);
  const [, setIsNameAvailable] = useState<boolean | null>(null);

  const totalSteps = 7;

  const specialityOptions = ['Calisthenics', 'Autre'];
  const disciplineOptions = ['Street-Lifting', 'Set and Rep', 'Freestyle', 'Endurance'];

  const router = useRouter();
  const params = useLocalSearchParams<CoachRegistrationParams>();

  const handleNext = async () => {
    if (currentStep === 1) {
      const ok = await checkCoachNameAvailability(coachData.name);
      if (!ok) {
        return;
      }
    }

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

  const selectSpeciality = (speciality: string) => {
    setCoachData({ ...coachData, speciality });
  };

  const checkCoachNameAvailability = async (name: string): Promise<boolean> => {
    const trimmed = name.trim();
    if (!trimmed) {
      setErrorMessage('Le pseudo ne peut pas être vide.');
      setIsNameAvailable(null);
      return false;
    }

    setIsCheckingName(true);
    setErrorMessage('');
    try {
      const query = encodeURIComponent(trimmed);
      const res = await apiFetch(`/auth/coach-name?name=${query}`);
      const { available } = res as any;
      const isAvailable = !!available;
      setIsNameAvailable(isAvailable);
      if (!isAvailable) {
        setErrorMessage("Ce pseudo est déjà pris, merci d'en choisir un autre.");
      }
      return isAvailable;
    } catch (error: any) {
      setIsNameAvailable(null);
      setErrorMessage(error.message || 'Impossible de vérifier le pseudo pour le moment.');
      return false;
    } finally {
      setIsCheckingName(false);
    }
  };

  const toggleDiscipline = (discipline: string) => {
    if (coachData.skills.includes(discipline)) {
      setCoachData({
        ...coachData,
        skills: coachData.skills.filter((s) => s !== discipline),
      });
    } else if (coachData.skills.length < 2) {
      setCoachData({
        ...coachData,
        skills: [...coachData.skills, discipline],
      });
    }
  };

  const handleSubmit = async () => {
    setErrorMessage('');

    const email = params.email as string | undefined;
    const password = params.password as string | undefined;
    const firstName = params.firstName as string | undefined;
    const lastName = params.lastName as string | undefined;
    const role = (params.role as 'eleve' | 'coach' | undefined) || 'coach';

    if (!email || !password || !firstName || !lastName) {
      setErrorMessage("Informations du compte manquantes. Merci de recommencer l'inscription.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email,
        password,
        role,
        firstName,
        lastName,
        coachProfile: {
          name: coachData.name,
          avatar: coachData.avatar,
          speciality: coachData.speciality,
          location: coachData.location,
          price: Number(coachData.price),
          experience: Number(coachData.experience),
          description: coachData.description,
          skills: coachData.skills,
        },
      };

      const res = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
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

      router.push('/(tabs)/profileCoach');
    } catch (error: any) {
      setErrorMessage(error.message || "Une erreur est survenue lors de l'inscription coach");
    } finally {
      setLoading(false);
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
            <Text style={styles.stepTitle}>Quel est ton pseudo ?</Text>
            <Text style={styles.stepSubtitle}>Commence par nous dire comment tu t'appelles</Text>
            <TextInput
              value={coachData.name}
              onChangeText={(text) => {
                setCoachData({ ...coachData, name: text });
                setIsNameAvailable(null);
                setErrorMessage('');
              }}
              onBlur={() => {
                if (coachData.name.trim().length > 0) {
                  checkCoachNameAvailability(coachData.name);
                }
              }}
              placeholder="Ex: Coach Karim"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              autoFocus
            />
            {errorMessage ? (
              <Text style={{ color: '#EF4444', marginTop: 8, textAlign: 'center' }}>
                {errorMessage}
              </Text>
            ) : null}
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
              editable={false}
              placeholder="Sélectionne une option ci-dessous"
              placeholderTextColor="#9CA3AF"
              style={[styles.input, styles.inputReadOnly]}
            />

            <View style={styles.badgesRow}>
              {specialityOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => selectSpeciality(option)}
                  style={[
                    styles.badgeButton,
                    coachData.speciality === option && styles.badgeButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeButtonText,
                      coachData.speciality === option && styles.badgeButtonTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
            <Text style={styles.stepSubtitle}>Choisis 2 disciplines maximum</Text>

            <View style={styles.badgesGrid}>
              {disciplineOptions.map((discipline) => {
                const isSelected = coachData.skills.includes(discipline);
                return (
                  <TouchableOpacity
                    key={discipline}
                    onPress={() => toggleDiscipline(discipline)}
                    style={[styles.disciplineBadge, isSelected && styles.disciplineBadgeSelected]}
                  >
                    <Text
                      style={[
                        styles.disciplineBadgeText,
                        isSelected && styles.disciplineBadgeTextSelected,
                      ]}
                    >
                      {discipline}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.selectedInfo}>
              <Text style={styles.selectedInfoText}>
                {coachData.skills.length} / 2 sélectionnées
              </Text>
            </View>
          </Animated.View>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return coachData.name.trim().length > 0 && !isCheckingName;
      case 2:
        return coachData.speciality.trim().length > 0;
      case 3:
        return coachData.location.trim().length > 0;
      case 4:
        return coachData.price.trim().length > 0 && parseFloat(coachData.price) > 0;
      case 5:
        return coachData.experience.trim().length > 0 && parseInt(coachData.experience) > 0;
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

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          Étape {currentStep} sur {totalSteps}
        </Text>
      </View>

      <View style={styles.content}>{renderStep()}</View>

      <View style={styles.navigation}>
        {currentStep > 1 && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Icon emoji="⬅️" size={20} />
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={currentStep === totalSteps ? handleSubmit : handleNext}
          disabled={!canProceed()}
          style={[
            styles.nextButton,
            currentStep === 1 && styles.nextButtonFull,
            !canProceed() && styles.nextButtonDisabled,
          ]}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps ? 'Terminer 🎉' : 'Suivant'}
          </Text>
          {currentStep < totalSteps && <Icon emoji="➡️" size={20} />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CoachRegistration;
