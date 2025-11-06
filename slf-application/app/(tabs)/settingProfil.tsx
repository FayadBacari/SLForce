// import of the different libraries
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

// import of the different components
import { SwipeBackLayout } from '../../components/SwipeBackLayout';

// import CSS styles
import styles from '../../styles/settingProfil';


interface UserProfile {
  name: string;
  email: string;
  phone: string;
  photo: string | null;
}

const ProfileSettings: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Youssef',
    email: 'youssef@bearlift.com',
    phone: '+33 6 12 34 56 78',
    photo: null,
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords({ ...passwords, [field]: value });
  };

  const handleImageUpload = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets[0].uri) {
        setProfile({ ...profile, photo: response.assets[0].uri });
      }
    });
  };

  const handleSaveProfile = () => {
    console.log('Profile saved:', profile);
  };

  const handleChangePassword = () => {
    console.log('Password change:', passwords);
  };

  return (
    <SwipeBackLayout>
      <View style={styles.profile}>
        {/* White block in the header */}
        <View style={styles.profile__header} />
        <ScrollView
          style={styles.profile__scroll}
          contentContainerStyle={styles['profile__scroll-content']}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles['profile__photo-section']}>
            <View style={styles['profile__photo-wrapper']}>
              {profile.photo ? (
                <Image source={{ uri: profile.photo }} style={styles.profile__photo} />
              ) : (
                <View style={styles['profile__photo-placeholder']}>
                  <Text style={styles['profile__photo-emoji']}>👤</Text>
                </View>
              )}
            </View>
            <TouchableOpacity onPress={handleImageUpload} style={styles['profile__photo-btn']}>
              <Text style={styles['profile__photo-btn-text']}>Modifier la photo</Text>
            </TouchableOpacity>
          </View>

          {/* Info Section */}
          <View style={styles['profile__section-header']}>
            <Text style={styles['profile__section-title']}>INFORMATIONS PERSONNELLES</Text>
          </View>

          <View style={styles['profile__card']}>
            <View style={styles['profile__field']}>
              <View style={styles['profile__field-header']}>
                <View style={styles['profile__field-icon-wrapper']}>
                  <Text style={styles['profile__field-icon']}>👤</Text>
                </View>
                <Text style={styles['profile__field-label']}>Nom</Text>
              </View>
              <TextInput
                value={profile.name}
                onChangeText={(value) => handleProfileChange('name', value)}
                style={styles['profile__field-input']}
                placeholder="Ton nom"
                placeholderTextColor="#C7C7CC"
              />
            </View>

            <View style={styles['profile__field']}>
              <View style={styles['profile__field-header']}>
                <View style={styles['profile__field-icon-wrapper']}>
                  <Text style={styles['profile__field-icon']}>📧</Text>
                </View>
                <Text style={styles['profile__field-label']}>Email</Text>
              </View>
              <TextInput
                value={profile.email}
                onChangeText={(value) => handleProfileChange('email', value)}
                style={styles['profile__field-input']}
                placeholder="ton@email.com"
                placeholderTextColor="#C7C7CC"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles['profile__field']}>
              <View style={styles['profile__field-header']}>
                <View style={styles['profile__field-icon-wrapper']}>
                  <Text style={styles['profile__field-icon']}>📱</Text>
                </View>
                <Text style={styles['profile__field-label']}>Téléphone</Text>
              </View>
              <TextInput
                value={profile.phone}
                onChangeText={(value) => handleProfileChange('phone', value)}
                style={styles['profile__field-input']}
                placeholder="+33 6 00 00 00 00"
                placeholderTextColor="#C7C7CC"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <TouchableOpacity onPress={handleSaveProfile} style={styles['profile__save-btn']}>
            <Text style={styles['profile__save-btn-text']}>Enregistrer les modifications</Text>
          </TouchableOpacity>

          <View style={styles['profile__section-header']}>
            <Text style={styles['profile__section-title']}>CHANGER LE MOT DE PASSE</Text>
          </View>

          <View style={styles['profile__card']}>
            <View style={styles['profile__field']}>
              <View style={styles['profile__field-header']}>
                <View style={styles['profile__field-icon-wrapper']}>
                  <Text style={styles['profile__field-icon']}>🔒</Text>
                </View>
                <Text style={styles['profile__field-label']}>Mot de passe actuel</Text>
              </View>
              <View style={styles['profile__password-wrapper']}>
                <TextInput
                  value={passwords.current}
                  onChangeText={(value) => handlePasswordChange('current', value)}
                  style={styles['profile__password-input']}
                  placeholder="••••••••"
                  placeholderTextColor="#C7C7CC"
                  secureTextEntry={!showCurrentPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={styles['profile__password-toggle']}
                >
                  <Text style={styles['profile__password-toggle-text']}>
                    {showCurrentPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles['profile__field']}>
              <View style={styles['profile__field-header']}>
                <View style={styles['profile__field-icon-wrapper']}>
                  <Text style={styles['profile__field-icon']}>🔑</Text>
                </View>
                <Text style={styles['profile__field-label']}>Nouveau mot de passe</Text>
              </View>
              <View style={styles['profile__password-wrapper']}>
                <TextInput
                  value={passwords.new}
                  onChangeText={(value) => handlePasswordChange('new', value)}
                  style={styles['profile__password-input']}
                  placeholder="••••••••"
                  placeholderTextColor="#C7C7CC"
                  secureTextEntry={!showNewPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  style={styles['profile__password-toggle']}
                >
                  <Text style={styles['profile__password-toggle-text']}>
                    {showNewPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles['profile__field']}>
              <View style={styles['profile__field-header']}>
                <View style={styles['profile__field-icon-wrapper']}>
                  <Text style={styles['profile__field-icon']}>✅</Text>
                </View>
                <Text style={styles['profile__field-label']}>Confirmer le mot de passe</Text>
              </View>
              <View style={styles['profile__password-wrapper']}>
                <TextInput
                  value={passwords.confirm}
                  onChangeText={(value) => handlePasswordChange('confirm', value)}
                  style={styles['profile__password-input']}
                  placeholder="••••••••"
                  placeholderTextColor="#C7C7CC"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles['profile__password-toggle']}
                >
                  <Text style={styles['profile__password-toggle-text']}>
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={handleChangePassword} style={styles['profile__password-btn']}>
            <Text style={styles['profile__password-btn-text']}>Changer le mot de passe</Text>
          </TouchableOpacity>

          <View style={styles['profile__info-box']}>
            <Text style={styles['profile__info-icon']}>💡</Text>
            <View style={styles['profile__info-content']}>
              <Text style={styles['profile__info-title']}>Conseil de sécurité</Text>
              <Text style={styles['profile__info-text']}>
                Ton mot de passe doit contenir au moins 8 caractères avec des lettres, chiffres et
                symboles.
              </Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles['profile__section-header']}>
            <Text style={styles['profile__section-title']}>ACTIONS RAPIDES</Text>
          </View>

          <View style={styles['profile__actions']}>
            <TouchableOpacity style={styles['profile__action-item']}>
              <View style={styles['profile__action-icon-wrapper']}>
                <Text style={styles['profile__action-icon']}>📧</Text>
              </View>
              <View style={styles['profile__action-info']}>
                <Text style={styles['profile__action-title']}>Vérifier l'email</Text>
                <Text style={styles['profile__action-subtitle']}>Email non vérifié</Text>
              </View>
              <Text style={styles.profile__chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles['profile__action-item']}>
              <View style={styles['profile__action-icon-wrapper']}>
                <Text style={styles['profile__action-icon']}>📱</Text>
              </View>
              <View style={styles['profile__action-info']}>
                <Text style={styles['profile__action-title']}>Authentification 2FA</Text>
                <Text style={styles['profile__action-subtitle']}>Renforcer la sécurité</Text>
              </View>
              <Text style={styles.profile__chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles['profile__action-item']}>
              <View style={styles['profile__action-icon-wrapper']}>
                <Text style={styles['profile__action-icon']}>🔗</Text>
              </View>
              <View style={styles['profile__action-info']}>
                <Text style={styles['profile__action-title']}>Comptes liés</Text>
                <Text style={styles['profile__action-subtitle']}>Google, Facebook</Text>
              </View>
              <Text style={styles.profile__chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SwipeBackLayout>
  );
};

export default ProfileSettings;
