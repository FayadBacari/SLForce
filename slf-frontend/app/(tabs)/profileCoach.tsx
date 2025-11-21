// import of the different libraries
import { useState } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { apiFetch } from '../../services/auth';

// import of the different components
import Icon from '../../components/Icon';

// import CSS styles
import { styles } from '../../styles/profileCoach';

const updateCoachProfile = async (userId: string, data: any) => {
  try {
    const res = await apiFetch(`/coachs/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  } catch (err) {
    console.log('Erreur update coach:', err);
  }
};

const CoachProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    photo: null as string | null,
    location: '',
    athletesCount: '',
    experience: '',
  });

  const [details, setDetails] = useState({
    description: '',
    specialty: '',
    price: '',
    disciplines: [] as string[],
  });

  useEffect(() => {
    const loadCoach = async () => {
      try {
        const userId = await SecureStore.getItemAsync('userId');
        if (!userId) return;

        const res = await apiFetch('/coachs', { method: 'GET' });
        const all = res.coachs || [];
        const coach = all.find((c: any) => c._id === userId);

        if (!coach) return;

        const p = coach.coachProfile || {};

        setProfile({
          name: p.name || '',
          title: p.speciality || '',
          photo: p.avatar || null,
          location: p.location || '',
          athletesCount: coach.students?.toString() || '0',
          experience: p.experience?.toString() || '0',
        });

        setDetails({
          description: p.description || '',
          specialty: p.speciality || '',
          price: p.price?.toString() || '',
          disciplines: Array.isArray(p.skills) ? p.skills : [],
        });
      } catch (err) {
        console.log('Erreur profil coach:', err);
      }
    };

    loadCoach();
  }, []);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);

  const availableDisciplines = ['Street-Lifting', 'Set and Rep', 'Freestyle', 'Endurance'];

  const handleProfileChange = (field: keyof typeof profile, value: any) => {
    if (field === 'experience' || field === 'athletesCount') {
      // autoriser uniquement les chiffres
      value = value.replace(/[^0-9]/g, '');
    } else if (field === 'name' || field === 'title' || field === 'location') {
      // autoriser uniquement lettres, espaces et tirets
      value = value.replace(/[^a-zA-ZÀ-ÿ \-]/g, '');
    }
    setProfile({ ...profile, [field]: value });
  };

  const handleDetailsChange = (field: keyof typeof details, value: string | string[]) => {
    if (field === 'price' && typeof value === 'string') {
      // autoriser uniquement les chiffres
      value = value.replace(/[^0-9]/g, '');
    } else if ((field === 'specialty' || field === 'description') && typeof value === 'string') {
      // autoriser lettres, chiffres, ponctuation de base et espaces
      value = value.replace(/[^a-zA-Z0-9À-ÿ ,.'\-]/g, '');
    }
    setDetails({ ...details, [field]: value });
  };

  const toggleDiscipline = (discipline: string) => {
    if (details.disciplines.includes(discipline)) {
      handleDetailsChange('disciplines', details.disciplines.filter(d => d !== discipline));
    } else if (details.disciplines.length < 2) {
      handleDetailsChange('disciplines', [...details.disciplines, discipline]);
    }
  };

  const saveProfile = async () => {
    const userId = await SecureStore.getItemAsync('userId');
    if (!userId) return;

    await updateCoachProfile(userId, {
      coachProfile: {
        name: profile.name,
        speciality: profile.title,
        avatar: profile.photo,
        location: profile.location,
        experience: Number(profile.experience),
        price: Number(details.price),
        description: details.description,
        skills: details.disciplines,
      }
    });

    setIsEditingProfile(false);
  };

  const saveDetails = async () => {
    const userId = await SecureStore.getItemAsync('userId');
    if (!userId) return;

    await updateCoachProfile(userId, {
      coachProfile: {
        speciality: details.specialty,
        description: details.description,
        price: Number(details.price),
        skills: details.disciplines,
        name: profile.name,
        avatar: profile.photo,
        location: profile.location,
        experience: Number(profile.experience),
      }
    });

    setIsEditingDetails(false);
  };

  return (
    <SafeAreaView style={styles.app}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.app__container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.header__content}>
            <View>
              <Text style={styles.header__title}>Profil Coach</Text>
              <Text style={styles.header__subtitle}>Street Lifting Expert</Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.main}
          contentContainerStyle={styles.main__content}
          showsVerticalScrollIndicator={false}
        >
          {/* Coach Profile Card */}
          <View style={styles.card}>
            <View style={styles.card__header}>
              <View style={styles.card__titleWrapper}>
                <Icon emoji="🦍" size={24} />
                <Text style={styles.card__title}>Informations Coach</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsEditingProfile(!isEditingProfile)}
                style={[
                  styles.button,
                  styles['button--icon'],
                  isEditingProfile ? styles['button--danger'] : styles['button--primary'],
                ]}
              >
                <Icon emoji={isEditingProfile ? '✖️' : '✏️'} size={15} />
              </TouchableOpacity>
            </View>

            <View style={styles.profile}>
              <View style={styles.profile__photoWrapper}>
                {profile.photo ? (
                  <Image source={{ uri: profile.photo }} style={styles.profile__photo} />
                ) : (
                  <View style={styles.profile__photoPlaceholder}>
                    <Text style={styles.profile__photoEmoji}>🦍</Text>
                  </View>
                )}
                {isEditingProfile && (
                  <TouchableOpacity style={styles.profile__cameraButton}>
                    <Icon emoji="📷" size={18} />
                  </TouchableOpacity>
                )}
              </View>

              {isEditingProfile ? (
                <TextInput
                  value={profile.name}
                  onChangeText={(text) => handleProfileChange('name', text)}
                  style={styles.profile__nameInput}
                />
              ) : (
                <View style={styles.profile__nameWrapper}>
                  <Text style={styles.profile__name}>{profile.name}</Text>
                  <Icon emoji="✓" size={20} />
                </View>
              )}

              {isEditingProfile ? (
                <TextInput
                  value={profile.title}
                  onChangeText={(text) => handleProfileChange('title', text)}
                  style={styles.profile__titleInput}
                />
              ) : (
                <Text style={styles.profile__title}>{profile.title}</Text>
              )}
            </View>

            {/* Location */}
            <View style={styles.field}>
              <View style={styles.field__labelWrapper}>
                <Icon emoji="📍" size={16} />
                <Text style={styles.field__label}>LOCALISATION</Text>
              </View>
              <TextInput
                value={profile.location}
                onChangeText={(text) => handleProfileChange('location', text)}
                editable={isEditingProfile}
                style={[
                  styles.input,
                  isEditingProfile ? styles['input--active'] : styles['input--disabled'],
                ]}
              />
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statsRow__item}>
                <View style={styles.field__labelWrapper}>
                  <Icon emoji="👥" size={16} />
                  <Text style={styles.field__label}>ATHLÈTES</Text>
                </View>
                <TextInput
                  value={profile.athletesCount}
                  onChangeText={(text) => handleProfileChange('athletesCount', text)}
                  editable={isEditingProfile}
                  keyboardType="numeric"
                  style={[
                    styles.input,
                    isEditingProfile ? styles['input--active'] : styles['input--disabled'],
                  ]}
                />
              </View>

              <View style={styles.statsRow__item}>
                <View style={styles.field__labelWrapper}>
                  <Icon emoji="🏆" size={16} />
                  <Text style={styles.field__label}>EXPÉRIENCE (ans)</Text>
                </View>
                <TextInput
                  value={profile.experience}
                  onChangeText={(text) => handleProfileChange('experience', text)}
                  editable={isEditingProfile}
                  keyboardType="numeric"
                  style={[
                    styles.input,
                    isEditingProfile ? styles['input--active'] : styles['input--disabled'],
                  ]}
                />
              </View>
            </View>

            {isEditingProfile && (
              <TouchableOpacity
                onPress={saveProfile}
                style={[styles.button, styles['button--full'], styles['button--save']]}
              >
                <Icon emoji="💾" size={20} />
                <Text style={styles.button__text}>Enregistrer le profil</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Coach Details Card */}
          <View style={styles.card}>
            <View style={styles.card__header}>
              <View style={styles.card__titleWrapper}>
                <Icon emoji="💼" size={24} />
                <Text style={styles.card__title}>Détails & Tarifs</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsEditingDetails(!isEditingDetails)}
                style={[
                  styles.button,
                  styles['button--icon'],
                  isEditingDetails ? styles['button--danger'] : styles['button--warning'],
                ]}
              >
                <Icon emoji={isEditingDetails ? '✖️' : '✏️'} size={15} />
              </TouchableOpacity>
            </View>

            {/* Description */}
            <View style={styles.field}>
              <View style={styles.field__labelWrapper}>
                <Icon emoji="📝" size={16} />
                <Text style={styles.field__label}>DESCRIPTION</Text>
              </View>
              <TextInput
                value={details.description}
                onChangeText={(text) => handleDetailsChange('description', text)}
                editable={isEditingDetails}
                multiline
                numberOfLines={3}
                style={[
                  styles.textArea,
                  isEditingDetails ? styles['textArea--active'] : styles['textArea--disabled'],
                ]}
              />
            </View>

            {/* Specialty */}
            <View style={styles.field}>
              <View style={styles.field__labelWrapper}>
                <Icon emoji="⭐" size={16} />
                <Text style={styles.field__label}>SPÉCIALITÉ</Text>
              </View>
              <View style={styles.specialtyBadge}>
                {isEditingDetails ? (
                  <TextInput
                    value={details.specialty}
                    onChangeText={(text) => handleDetailsChange('specialty', text)}
                    style={styles.specialtyBadge__input}
                  />
                ) : (
                  <Text style={styles.specialtyBadge__text}>{details.specialty}</Text>
                )}
              </View>
            </View>

            {/* Disciplines */}
            <View style={styles.field}>
              <View style={styles.field__labelWrapper}>
                <Icon emoji="💪" size={16} />
                <Text style={styles.field__label}>DISCIPLINES (MAX 2)</Text>
              </View>
              <View style={styles.disciplinesGrid}>
                {availableDisciplines.map((discipline) => {
                  const isSelected = details.disciplines.includes(discipline);
                  return (
                    <TouchableOpacity
                      key={discipline}
                      onPress={() => isEditingDetails && toggleDiscipline(discipline)}
                      disabled={!isEditingDetails}
                      style={[
                        styles.disciplineBadge,
                        isSelected && styles.disciplineBadgeSelected,
                        !isEditingDetails && styles.disciplineBadgeDisabled,
                      ]}
                    >
                      <Text style={[
                        styles.disciplineBadgeText,
                        isSelected && styles.disciplineBadgeTextSelected,
                      ]}>
                        {discipline}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {isEditingDetails && (
                <Text style={styles.disciplinesCounter}>
                  {details.disciplines.length} / 2 sélectionnées
                </Text>
              )}
            </View>

            {/* Price */}
            <View style={styles.priceSection}>
              <Text style={styles.priceSection__label}>A partir de</Text>
              <View style={styles.priceSection__wrapper}>
                <TextInput
                  value={details.price}
                  onChangeText={(text) => handleDetailsChange('price', text)}
                  editable={isEditingDetails}
                  keyboardType="numeric"
                  style={[
                    styles.priceSection__input,
                    isEditingDetails
                      ? styles['priceSection__input--active']
                      : styles['priceSection__input--disabled'],
                  ]}
                />
                <Text style={styles.priceSection__currency}>€</Text>
                <Text style={styles.priceSection__period}>/mois</Text>
              </View>
            </View>

            {isEditingDetails && (
              <TouchableOpacity
                onPress={saveDetails}
                style={[styles.button, styles['button--full'], styles['button--saveDetails']]}
              >
                <Icon emoji="💾" size={20} />
                <Text style={styles.button__text}>Enregistrer les détails</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Contact Button */}
          <TouchableOpacity style={styles.contactButton}>
            <Icon emoji="📧" size={24} />
            <Text style={styles.contactButton__text}>Contacter</Text>
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Icon emoji="💡" size={24} />
            <View style={styles.infoBox__content}>
              <Text style={styles.infoBox__title}>Ton profil est visible par tous les athlètes !</Text>
              <Text style={styles.infoBox__text}>
                Assure-toi que tes informations sont à jour pour attirer plus d'athlètes. 
                Ton expérience et ta spécialité sont des atouts majeurs ! 🔥
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CoachProfile;