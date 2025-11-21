// import of different libraries
import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// import component 
import Icon from '../../components/Icon';

// import css 
import { styles } from '../../styles/profile';
import { AthleteRecords, AthleteProfile } from '../../types';

const Profile = () => {
  const [isEditingRecords, setIsEditingRecords] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [records, setRecords] = useState<AthleteRecords>({
    muscleUp: '16.25',
    traction: '50',
    dips: '70',
    squat: '120',
  });

  const [profile, setProfile] = useState<AthleteProfile>({
    name: 'Cassim',
    photo: null,
    gender: 'male',
    weightCategory: '-80',
    weight: '78',
    height: '175',
  });

  useEffect(() => {
    const loadAthlete = async () => {
      try {
        const userId = await SecureStore.getItemAsync('userId');
        if (!userId) {
          return;
        }

        const BASE = 'http://localhost:5132';
        const url = `${BASE}/users/${userId}/athlete`;

        const resp = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!resp.ok) {
          return;
        }

        const json = await resp.json();

        if (!json.athleteProfile) {
          return;
        }

        const a = json.athleteProfile;

        setProfile(prev => ({
          name: a.name ?? prev.name,
          photo: a.avatar ?? prev.photo,
          gender: a.gender ?? prev.gender,
          weightCategory: a.weightCategory ?? prev.weightCategory,
          weight: a.weight !== undefined ? String(a.weight) : prev.weight,
          height: a.height !== undefined ? String(a.height) : prev.height,
        }));

        setRecords(prev => ({
          muscleUp: a.records?.muscleUp !== undefined ? String(a.records.muscleUp) : prev.muscleUp,
          traction: a.records?.traction !== undefined ? String(a.records.traction) : prev.traction,
          dips: a.records?.dips !== undefined ? String(a.records.dips) : prev.dips,
          squat: a.records?.squat !== undefined ? String(a.records.squat) : prev.squat,
        }));
      } catch (err) {
      }
    };

    loadAthlete();
  }, []);

  const filterNumericInput = (value: string, allowDecimal = true) => {
    let filtered = value.replace(allowDecimal ? /[^0-9.]/g : /[^0-9]/g, '');
    if (allowDecimal) {
      const parts = filtered.split('.');
      if (parts.length > 2) {
        filtered = parts[0] + '.' + parts.slice(1).join('');
      }
    }
    return filtered;
  };

  const handleRecordChange = (field: keyof typeof records, value: string) => {
    const filtered = filterNumericInput(value, true);
    if (filtered === '' && value !== '') return;
    setRecords({ ...records, [field]: filtered });
  };

  const handleProfileChange = (field: keyof typeof profile, value: any) => {
    if (field === 'weight' || field === 'height') {
      const filtered = filterNumericInput(value, false);
      if (filtered === '' && value !== '') return;
      setProfile({ ...profile, [field]: filtered });
    } else {
      setProfile({ ...profile, [field]: value });
    }
  };

  const calculateTotal = () => {
    const total =
      parseFloat(records.muscleUp || '0') +
      parseFloat(records.traction || '0') +
      parseFloat(records.dips || '0') +
      parseFloat(records.squat || '0');
    return total.toFixed(2);
  };

  const maleCategories = ['-66', '-73', '-80', '-87', '-94', '-104', '+104'];
  const femaleCategories = ['-52', '-63', '-70', '+70'];
  const categories = profile.gender === 'male' ? maleCategories : femaleCategories;

  return (
    <SafeAreaView style={styles.app}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.app__container}>
        <View style={styles.header}>
          <View style={styles.header__content}>
            <View>
              <Text style={styles.header__title}>Ma Fiche Athlète</Text>
              <Text style={styles.header__subtitle}>Street Lifting Records</Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.main}
          contentContainerStyle={styles.main__content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <View style={styles.card__header}>
              <View style={styles.card__titleWrapper}>
                <Icon emoji="👤" size={24} />
                <Text style={styles.card__title}>Profil Athlète</Text>
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
                    <Text />
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
                <Text style={styles.profile__name}>{profile.name}</Text>
              )}
              <Text style={styles.profile__username}>@{profile.name.toLowerCase()}_beast</Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.field__label}>GENRE</Text>
              <View style={styles.genderSelector}>
                <TouchableOpacity
                  onPress={() => isEditingProfile && handleProfileChange('gender', 'male')}
                  disabled={!isEditingProfile}
                  style={[
                    styles.genderSelector__button,
                    profile.gender === 'male' && styles['genderSelector__button--active'],
                    !isEditingProfile && styles['genderSelector__button--disabled'],
                  ]}
                >
                  <Text style={styles.genderSelector__emoji}>👨</Text>
                  <Text style={styles.genderSelector__text}>HOMME</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => isEditingProfile && handleProfileChange('gender', 'female')}
                  disabled={!isEditingProfile}
                  style={[
                    styles.genderSelector__button,
                    profile.gender === 'female' && styles['genderSelector__button--active'],
                    !isEditingProfile && styles['genderSelector__button--disabled'],
                  ]}
                >
                  <Text style={styles.genderSelector__emoji}>👩</Text>
                  <Text style={styles.genderSelector__text}>FEMME</Text>
                </TouchableOpacity>
            </View>
          </View>

            <View style={styles.field}>
              <Text style={styles.field__label}>CATÉGORIE DE POIDS</Text>
              <View style={styles.categoryGrid}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => isEditingProfile && handleProfileChange('weightCategory', cat)}
                    disabled={!isEditingProfile}
                    style={[
                      styles.categoryGrid__button,
                      profile.weightCategory === cat && styles['categoryGrid__button--active'],
                      !isEditingProfile && styles['categoryGrid__button--disabled'],
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryGrid__text,
                        profile.weightCategory === cat && styles['categoryGrid__text--active'],
                      ]}
                    >
                      {cat} kg
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statsRow__item}>
                <View style={styles.field__labelWrapper}>
                  <Icon emoji="⚖️" size={16} />
                  <Text style={styles.field__label}>POIDS (kg)</Text>
                </View>
                <TextInput
                  value={profile.weight}
                  onChangeText={(text) => handleProfileChange('weight', text)}
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
                  <Icon emoji="📏" size={16} />
                  <Text style={styles.field__label}>TAILLE (cm)</Text>
                </View>
                <TextInput
                  value={profile.height}
                  onChangeText={(text) => handleProfileChange('height', text)}
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
                onPress={async () => {
                  const userId = await SecureStore.getItemAsync('userId');
                  if (!userId) return;

                  await fetch(`http://localhost:5132/users/${userId}/athlete`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      ...profile,
                      weight: Number(profile.weight),
                      height: Number(profile.height),
                      records: {
                        muscleUp: Number(records.muscleUp),
                        traction: Number(records.traction),
                        dips: Number(records.dips),
                        squat: Number(records.squat),
                      },
                    }),
                  });

                  setIsEditingProfile(false);
                }}
                style={[styles.button, styles['button--full'], styles['button--save']]}
              >
                <Icon emoji="💾" size={20} />
                <Text style={styles.button__text}>Enregistrer le profil</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.card}>
            <View style={styles.card__header}>
              <View style={styles.card__titleWrapper}>
                <Icon emoji="🥇" size={24} />
                <Text style={styles.card__title}>Records Personnels</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsEditingRecords(!isEditingRecords)}
                style={[
                  styles.button,
                  styles['button--icon'],
                  isEditingRecords ? styles['button--danger'] : styles['button--warning'],
                ]}
              >
                <Icon emoji={isEditingRecords ? '✖️' : '✏️'} size={15} />
              </TouchableOpacity>
            </View>

            <View style={styles.recordsList}>
              <View style={[styles.recordItem, styles['recordItem--red']]}>
                <View style={styles.recordItem__header}>
                  <Icon emoji="" />
                  <Text style={styles.recordItem__label}>MUSCLE-UP</Text>
                  {!isEditingRecords && <Icon emoji="📈" size={16} />}
                </View>
                <View style={styles.recordItem__inputWrapper}>
                  <TextInput
                    value={records.muscleUp}
                    onChangeText={(text) => handleRecordChange('muscleUp', text)}
                    editable={isEditingRecords}
                    keyboardType="numeric"
                    style={[
                      styles.recordItem__input,
                      isEditingRecords
                        ? styles['recordItem__input--active']
                        : styles['recordItem__input--disabled'],
                    ]}
                  />
                  <Text style={styles.recordItem__unit}>kg</Text>
                </View>
              </View>

              <View style={[styles.recordItem, styles['recordItem--blue']]}>
                <View style={styles.recordItem__header}>
                  <Icon emoji="" />
                  <Text style={styles.recordItem__label}>TRACTION</Text>
                  {!isEditingRecords && <Icon emoji="📈" size={16} />}
                </View>
                <View style={styles.recordItem__inputWrapper}>
                  <TextInput
                    value={records.traction}
                    onChangeText={(text) => handleRecordChange('traction', text)}
                    editable={isEditingRecords}
                    keyboardType="numeric"
                    style={[
                      styles.recordItem__input,
                      isEditingRecords
                        ? styles['recordItem__input--active']
                        : styles['recordItem__input--disabled'],
                    ]}
                  />
                  <Text style={styles.recordItem__unit}>kg</Text>
                </View>
              </View>

              <View style={[styles.recordItem, styles['recordItem--green']]}>
                <View style={styles.recordItem__header}>
                  <Icon emoji="" />
                  <Text style={styles.recordItem__label}>DIPS</Text>
                  {!isEditingRecords && <Icon emoji="📈" size={16} />}
                </View>
                <View style={styles.recordItem__inputWrapper}>
                  <TextInput
                    value={records.dips}
                    onChangeText={(text) => handleRecordChange('dips', text)}
                    editable={isEditingRecords}
                    keyboardType="numeric"
                    style={[
                      styles.recordItem__input,
                      isEditingRecords
                        ? styles['recordItem__input--active']
                        : styles['recordItem__input--disabled'],
                    ]}
                  />
                  <Text style={styles.recordItem__unit}>kg</Text>
                </View>
              </View>

              <View style={[styles.recordItem, styles['recordItem--yellow']]}>
                <View style={styles.recordItem__header}>
                  <Icon emoji="" />
                  <Text style={styles.recordItem__label}>SQUAT</Text>
                  {!isEditingRecords && <Icon emoji="📈" size={16} />}
                </View>
                <View style={styles.recordItem__inputWrapper}>
                  <TextInput
                    value={records.squat}
                    onChangeText={(text) => handleRecordChange('squat', text)}
                    editable={isEditingRecords}
                    keyboardType="numeric"
                    style={[
                      styles.recordItem__input,
                      isEditingRecords
                        ? styles['recordItem__input--active']
                        : styles['recordItem__input--disabled'],
                    ]}
                  />
                  <Text style={styles.recordItem__unit}>kg</Text>
                </View>
              </View>
            </View>

            {isEditingRecords && (
              <TouchableOpacity
                onPress={async () => {
                  const userId = await SecureStore.getItemAsync('userId');
                  if (!userId) return;

                  await fetch(`http://localhost:5132/users/${userId}/athlete`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      ...profile,
                      weight: Number(profile.weight),
                      height: Number(profile.height),
                      records: {
                        muscleUp: Number(records.muscleUp),
                        traction: Number(records.traction),
                        dips: Number(records.dips),
                        squat: Number(records.squat),
                      },
                    }),
                  });

                  setIsEditingRecords(false);
                }}
                style={[styles.button, styles['button--full'], styles['button--saveRecords']]}
              >
                <Icon emoji="💾" size={20} />
                <Text style={styles.button__text}>Enregistrer les records</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.totalCard}>
            <View style={styles.totalCard__content}>
              <View>
                <Text style={styles.totalCard__subtitle}>TOTAL STREET LIFTING</Text>
                <Text style={styles.totalCard__total}>{calculateTotal()}</Text>
                <Text style={styles.totalCard__unit}>kg combinés</Text>
              </View>
              <Icon emoji="🎯" size={64} />
            </View>
          </View>

          <View style={styles.infoBox}>
            <Icon emoji="💡" size={24} />
            <View style={styles.infoBox__content}>
              <Text style={styles.infoBox__title}>Comment améliorer ton score ?</Text>
              <Text style={styles.infoBox__text}>
                Ton total Street Lifting est la somme de tes 4 records. Continue à t'entraîner
                régulièrement avec ton coach pour battre tes records ! 🔥
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
